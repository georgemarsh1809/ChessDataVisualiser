import express from 'express';
import { filterQuery } from '../utils/filterQuery.js';
import sql from '../postgres.js';
import { validateFilterParams } from '../middleware.js';

export const dashboardRouter = express.Router();

// First move endpoint
dashboardRouter.get('/first-move', async (req, res, next) => {
    validateFilterParams(req, res, next);

    const data = await sql`SELECT * FROM (SELECT
        COUNT(SUBSTRING(lines, 0, 6)) AS count_opening_move,
        SUBSTRING(lines, 0, 6) AS opening_move
    FROM
        game_data
    WHERE 
        1=1
        ${filterQuery(req.query)}
        GROUP BY
            SUBSTRING(lines, 0, 6)) as subquery
            WHERE count_opening_move > 5`;
    res.send(data);
});

// Result move endpoint
dashboardRouter.get('/outcome', async (req, res, next) => {
    validateFilterParams(req, res, next);

    const data = await sql`SELECT
        COUNT(result) AS count_result,
        result
    FROM
        game_data
    WHERE 
        1=1
        ${filterQuery(req.query)}
        GROUP BY
            result`;

    res.send(data);
});

// Result move endpoint
dashboardRouter.get('/wins-vs-length', async (req, res) => {
    const player = req.query?.player;

    if (player && typeof player !== 'string') {
        return res.status(HTPP_STATUS_CODES.BAD_REQUEST).send('Invalid player');
    }

    const START = 0;
    const BUCKET_SIZE = 10;
    const INFINITE_START = 100;

    const buckets = [];

    for (
        let bucketStart = START;
        bucketStart < INFINITE_START;
        bucketStart += BUCKET_SIZE
    ) {
        const bucketData = await sql`select
        count(
            case when result like 'Win' 
                then 1 
                else null 
            end) as number_of_wins,
            count(*) as number_of_games
        from
            game_data
        where
            player like ${player}
            and moves > ${bucketStart}
            and moves < ${bucketStart + BUCKET_SIZE}
            `;

        if (Number(bucketData[0].number_of_games) === 0) continue; // IMPORTANT

        buckets.push({
            name: `${bucketStart} - ${bucketStart + BUCKET_SIZE}`,
            winPercentage: Math.floor(
                (bucketData[0].number_of_wins / bucketData[0].number_of_games) *
                    100
            ),
            numberOfGames: bucketData[0].number_of_games,
        });
    }

    res.send(buckets);
});

dashboardRouter.get('/wins-vs-year', async (req, res) => {
    const player = req.query?.player;

    if (player && typeof player !== 'string') {
        return res.status(HTPP_STATUS_CODES.BAD_REQUEST).send('Invalid player');
    }

    const data = await sql`
        select 
            year,
            count(
                case when result like 'Win' 
                then 1 
                else null 
                end) as number_of_wins,
            count(*) as number_of_games
        from
            game_data
        where
            player like 'Tal'
        group by
            year
        order by
            year
    `;

    res.send(data);
});

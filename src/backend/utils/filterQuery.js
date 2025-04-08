import sql from "../postgres.js";

export const filterQuery = (query) => sql`${
  query?.player ? sql`AND player like ${query.player}` : sql``
}
  ${query?.yearStart ? sql`AND year > ${query.yearStart}` : sql``}
  ${query?.yearEnd ? sql`AND year < ${query.yearEnd}` : sql``}
  ${query?.color ? sql`AND color = ${query.color}` : sql``}
  ${query?.opponent ? sql`AND opponent = ${query.opponent}` : sql``}
  ${query?.result ? sql`AND result = ${query.result}` : sql``}
  ${query?.moves ? sql`AND moves > ${query.moves}` : sql``}
  ${query?.player_elo ? sql`AND player_elo > ${query.player_elo}` : sql``}
  ${query?.opponent_elo ? sql`AND opponent_elo > ${query.opponent_elo}` : sql``}
  ${query?.site ? sql`AND site = ${query.site}` : sql``}
  ${query?.event ? sql`AND event = ${query.event}` : sql``}`;

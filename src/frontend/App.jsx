import { useEffect } from 'react';
import { useStore } from './stateManagement/store';
import { BrowserRouter, Routes, Route } from 'react-router';
import { Layout } from './components/Layout';
import { DashboardTab } from './components/DashboardTab';
import { DataTab } from './components/DataTab';

function App() {
    const { playerProfile, pageNumber } = useStore();
    const setAllGamesData = useStore((state) => state.setAllGamesData);
    const setTotalGameData = useStore((state) => state.setTotalGameData);
    const setFirstMoveData = useStore((state) => state.setFirstMoveData);
    const setWinVsLengthData = useStore((state) => state.setWinVsLengthData);
    const setResultData = useStore((state) => state.setResultData);
    const setWinVsYearData = useStore((state) => state.setWinVsYearData);

    useEffect(() => {
        // API Call for All Game data on Data Tab
        // This use effect runs every time the pageNumber state changes (when the user clicks on the next or previous button)
        const getAllGamesData = async () => {
            const res = await fetch(
                'http://localhost:3000/data/all-game-data?' +
                    new URLSearchParams({
                        player: playerProfile,
                        pageNumber: pageNumber,
                    }).toString(),
                {
                    method: 'GET',
                }
            );

            const resData = await res.json();
            setAllGamesData(
                resData.map((row) => ({
                    opponent: row.opponent,
                    location: row.site,
                    event: row.event,
                    year: row.year,
                    result: row.result,
                    id: row.id,
                }))
            );
        };
        getAllGamesData();
    }, [pageNumber, playerProfile]);

    useEffect(() => {
        // This use effect runs every time the playerProfile state changes (whenever a new profile is loaded from the side modal)

        // API Call for Total Games data
        const getTotalGamesData = async () => {
            const res = await fetch(
                'http://localhost:3000/data/total-games-count?' +
                    new URLSearchParams({
                        player: playerProfile,
                    }).toString(),
                {
                    method: 'GET',
                }
            );

            const resData = await res.json();
            setTotalGameData(Number(resData[0]['count']));
        };

        // API Call for First Move data
        const getFirstMoveData = async () => {
            const res = await fetch(
                'http://localhost:3000/dashboard/first-move?' +
                    new URLSearchParams({
                        player: playerProfile,
                        color: 'White',
                    }).toString(),
                {
                    method: 'GET',
                }
            );

            const resData = await res.json();
            setFirstMoveData(
                resData.map((row) => ({
                    name: row.opening_move,
                    value: Number(row.count_opening_move),
                }))
            );
        };

        // API Call for Outcome data
        const getOutcomeData = async () => {
            const res = await fetch(
                'http://localhost:3000/dashboard/outcome?' +
                    new URLSearchParams({
                        player: playerProfile,
                    }).toString(),
                {
                    method: 'GET',
                }
            );
            const resData = await res.json();
            setResultData(
                resData.map((row) => ({
                    name: row.result,
                    value: Number(row.count_result),
                }))
            );
        };

        // API Call for Wins vs Length data
        const getWinsVsLengthData = async () => {
            const res = await fetch(
                'http://localhost:3000/dashboard/wins-vs-length?' +
                    new URLSearchParams({
                        player: playerProfile,
                    }).toString(),
                {
                    method: 'GET',
                }
            );
            const resData = await res.json();
            setWinVsLengthData(resData);
        };

        // API Call for Wins vs Year data
        const getWinsVsYear = async () => {
            const res = await fetch(
                'http://localhost:3000/dashboard/wins-vs-year?' +
                    new URLSearchParams({
                        player: playerProfile,
                    }).toString(),
                {
                    method: 'GET',
                }
            );
            const resData = await res.json();

            setWinVsYearData(
                resData.map((row) => ({
                    year: row.year,
                    winPercentage:
                        (Number(row.number_of_wins) /
                            Number(row.number_of_games)) *
                        100,
                }))
            );
        };

        getWinsVsLengthData();
        getTotalGamesData();
        getOutcomeData();
        getFirstMoveData();
        getWinsVsYear();
    }, [playerProfile]);

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route index element={<DashboardTab />} />
                        <Route path="data" element={<DataTab />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;

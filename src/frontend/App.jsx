import { useEffect } from "react";
import { Layout } from "./components/Layout";
import { DashboardTab } from "./components/DashboardTab";
import { BrowserRouter, Routes, Route } from "react-router";
import { DataTab } from "./components/DataTab";
import { useStore } from "./stateManagement/store";

function App() {
  // Importing all necessary state and state setter functions
  const { playerProfile, pageNumber, gameId } = useStore();
  const setFirstMoveData = useStore((state) => state.setFirstMoveData);
  const setResultData = useStore((state) => state.setResultData);
  const setTotalGameData = useStore((state) => state.setTotalGameData);
  const setAllGamesData = useStore((state) => state.setAllGamesData);



  // useEffect(() => {
  //   const getGameMovesById = async () => {
  //     const res = await fetch(
  //       "http://localhost:3000/get-moves?" +
  //       new URLSearchParams({
  //         id: gameId,
  //       }).toString(),
  //       {
  //         method: "GET",
  //       }
  //     );

  //     const resData = await res.json();
  //     // console.log("🚀 ~ getData ~ totalGame_resData:", resData);
  //     setCurrentGame(
  //       resData.toString()
  //     );
  //     console.log(resData)
  //   };

  //   getGameMovesById()
  // }, [gameId]

  // )


  useEffect(() => {
    // API Call for Total Games data
    const getAllGamesData = async () => {
      const res = await fetch(
        "http://localhost:3000/all-game-data?" +
        new URLSearchParams({
          player: playerProfile,
          pageNumber: pageNumber
        }).toString(),
        {
          method: "GET",
        }
      );

      const resData = await res.json();
      // console.log("🚀 ~ getData ~ totalGame_resData:", resData);
      setAllGamesData(
        resData.map((row) => ({
          opponent: row.opponent,
          location: row.site,
          event: row.event,
          year: row.year,
          result: row.result,
          id: row.id
        }))

      );
      console.log("All games data: ", resData)
    };
    getAllGamesData();
  }, [pageNumber, playerProfile])


  // useEffect for updating the graphs when player profile is chosen
  useEffect(() => {
    // This use effect runs every time the playerProfile state changes (whenever a new profile is loaded from the side modal)
    // Since all the graphs are dependent on this state change, all API calls can be declared inside the same useEffect

    // API Call for Total Games data
    const getTotalGamesData = async () => {
      const res = await fetch(
        "http://localhost:3000/total-games-count?" +
        new URLSearchParams({
          player: playerProfile,
        }).toString(),
        {
          method: "GET",
        }
      );

      const resData = await res.json();
      // console.log("🚀 ~ getData ~ totalGame_resData:", resData);
      setTotalGameData(
        Number(resData[0]["count"])
      );
    };

    // API Call for First Move data
    const getFirstMoveData = async () => {
      const res = await fetch(
        "http://localhost:3000/first-move?" +
        new URLSearchParams({
          player: playerProfile,
          color: "White",
        }).toString(),
        {
          method: "GET",
        }
      );

      const resData = await res.json();
      console.log("🚀 ~ getData ~ firstMoveResData:", resData);
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
        "http://localhost:3000/outcome?" +
        new URLSearchParams({
          player: playerProfile,
        }).toString(),
        {
          method: "GET",
        }
      );
      const resData = await res.json();
      // console.log("🚀 ~ getData ~ resData:", resData);
      setResultData(
        resData.map((row) => ({
          name: row.result,
          value: Number(row.count_result),
        }))
      );
    };



    getTotalGamesData();
    getOutcomeData();
    getFirstMoveData();
  }, [playerProfile]); // The dependency array is set to the playerProfile state


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

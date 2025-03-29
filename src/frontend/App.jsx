import { useEffect, useState } from "react";
import { Layout } from "./components/Layout";
import { DashboardTab } from "./components/DashboardTab";
import { BrowserRouter, Routes, Route } from "react-router";
import { DataTab } from "./components/DataTab";
import { useStore } from "./stateManagement/store";

function App() {
  const { playerProfile } = useStore();
  const setFirstMoveData = useStore((state) => state.setFirstMoveData);
  const setResultData = useStore((state) => state.setResultData);
  const setTotalGameData = useStore((state) => state.setTotalGameData);



  useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        "http://localhost:3000/total-games?" +
        new URLSearchParams({
          player: playerProfile,
        }).toString(),
        {
          method: "GET",
        }
      );

      const resData = await res.json();
      console.log("🚀 ~ getData ~ totalGame_resData:", resData);
      setTotalGameData(
        resData.map((row) => ({
          value: Number(row.count),
        }))
      );
    };
    getData();
  }, [playerProfile]);

  //First move
  useEffect(() => {
    console.log(playerProfile)

    const getData = async () => {
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
    getData();
  }, [playerProfile]);

  //Outcome
  useEffect(() => {
    const getData = async () => {
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
    getData();
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

import { useEffect, useState } from "react";
import { Layout } from "./components/Layout";
import { DashboardTab } from "./components/DashboardTab";
import { BrowserRouter, Routes, Route } from "react-router";
import { DataTab } from "./components/DataTab";
import { useStore } from "./stateManagement/store";

function App() {
  const setFirstMoveData = useStore((state) => state.setFirstMoveData);
  const setResultData = useStore((state) => state.setResultData);


  useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        "http://localhost:3000/first-move?" +
        new URLSearchParams({
          yearStart: 1960,
          player: "Tal",
          color: "White",
        }).toString(),
        {
          method: "GET",
        }
      );
      const resData = await res.json();
      console.log("🚀 ~ getData ~ resData:", resData);
      setFirstMoveData(
        resData.map((row) => ({
          name: row.opening_move,
          value: Number(row.count_opening_move),
        }))
      );
    };
    getData();
  }, []);


  useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        "http://localhost:3000/outcome?" +
        new URLSearchParams({
          yearStart: 1960,
          player: "Tal",
        }).toString(),
        {
          method: "GET",
        }
      );
      const resData = await res.json();
      console.log("🚀 ~ getData ~ resData:", resData);
      setResultData(
        resData.map((row) => ({
          name: row.result,
          value: Number(row.count_result),
        }))
      );
    };
    getData();
  }, []);

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

import { useState } from "react";
import { Layout } from "./components/Layout";
import DashboardTab from "./components/DashboardTab";
import { BrowserRouter, Routes, Route } from "react-router";
import DataTab from "./components/DataTab";

function App() {
  const [data, setData] = useState(null);
  const [tab, setTab] = useState("dashboard")

  console.log(tab)


  async function getData() {
    const res = await fetch("http://localhost:3000/test", { method: "GET" });
    const resData = await res.json();
    setData(JSON.stringify(resData));
  }

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

import { useState } from 'react'
import './App.css'
import { Chessboard } from 'react-chessboard' // How cool!
import Layout from './components/Layout'
import DashboardTab from './components/DashboardTab'

function App() {
  const [data, setData] = useState(null)
  // const [tab, setTab] = useState < 'data' | 'dashboard' > ('dashboard'); // All possible states, with default set in brackets 

  async function getData() {

    const res = await fetch("http://localhost:3000/test", { method: "GET" })
    const resData = await res.json()
    setData(JSON.stringify(resData))

  }

  return (
    <>

      <Layout>
        <DashboardTab />
      </Layout>

    </>
  )

}

export default App

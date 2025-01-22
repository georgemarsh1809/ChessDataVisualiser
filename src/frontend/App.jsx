import { useState } from 'react'
import './App.css'
import { Chessboard } from 'react-chessboard' // How cool!

function App() {
  const [data, setData] = useState(null)

  async function getData() {

    const res = await fetch("http://localhost:3000/test", { method: "GET" })
    const resData = await res.json()
    setData(JSON.stringify(resData))

  }

  return (
    <>
      <button onClick={getData}>
        Hit me!
      </button>
      <p>{data ? data : "No data"}</p>
      {/* <div style={{ minWidth: 300 }}>
        <Chessboard />
      </div> */}

    </>
  )
}

export default App

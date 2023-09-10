import {useEffect, useState} from 'react'
import io from 'socket.io-client'
import {v4 as uuidv4} from 'uuid'

const Dashboard = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    // Connect to the socket.io server
    const socket = io('https://timerseries.onrender.com/') // Replace with your server URL

    // Listen for incoming data
    socket.on('data', incomingData => {
      // Update the data state with the received data
      setData(incomingData)
    })

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <div>
      <h1>Real-Time Data Dashboard</h1>
      <div className="data-container">
        {data.map((item, index) => (
          <div key={uuidv4()} className="data-item">
            <strong>Data {index + 1}</strong>
            <p>Name: {item.name}</p>
            <p>Origin: {item.origin}</p>
            <p>Destination: {item.destination}</p>
            <p>Timestamp: {item.timestamp}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard

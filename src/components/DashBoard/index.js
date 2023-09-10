import {useState, useEffect} from 'react'
import socketIOClient from 'socket.io-client'
import {v4 as uuidv4} from 'uuid'

const ENDPOINT = 'https://timerseries.onrender.com' // Replace with your server's URL

function App() {
  const [data, setData] = useState([])
  const [successRate, setSuccessRate] = useState(0)

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT)

    socket.on('connect', () => {
      console.log('Connected to server')
    })

    socket.on('timeseriesData', newData => {
      // Update data when new data is received
      setData(newData)

      // Calculate success rate
      const totalDataPoints = data.length + 1 // Add 1 for the new data point
      const validDataPoints = newData.filter(item => item.valid).length
      const rate = (validDataPoints / totalDataPoints) * 100
      setSuccessRate(rate.toFixed(2))
    })

    return () => {
      socket.disconnect()
    }
  }, [data])

  return (
    <div className="App">
      <h1>Time Series Data</h1>
      <p>Success Rate: {successRate}%</p>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={uuidv4()} className={item.valid ? 'valid' : 'invalid'}>
              <td>{item.name}</td>
              <td>{item.origin}</td>
              <td>{item.destination}</td>
              <td>{item.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App

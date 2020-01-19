import React, { useState, useEffect } from 'react';
import DevItem from './component/DevItem'
import DevForm from './component/DevForm'
import api from './services/api'

import './global.css'
import './App.css'
import './Sidebar.css'

function App() {
  const [devs, setDevs] = useState([])

  useEffect(() => {
     loadDevs()
  }, [])

  async function loadDevs() {
    const { data } = await api.get('/devs')
    setDevs(data)
  }

  async function handleAddDev(data) {
    await api.post('/devs', data)
    setDevs([...devs, data])
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        <ul>
          {
            devs.map(dev => (
              <DevItem dev={dev} key={dev._id} />
            ))
          }
        </ul>
      </main>
    </div>
  )
}

export default App;

import React from 'react'
import './App.css'
import Header from './components/Header'
import DisplayPage from './pages/displayPage'

const MediaContext = React.createContext<string>('')

function App() {
  const [mediaDisplay, setMedia] = React.useState<string>("all")

  return (
    <MediaContext.Provider value={mediaDisplay}>
      <Header setMedia={setMedia}/>
      <DisplayPage />
    </MediaContext.Provider>
  )
}

export default App

export { MediaContext }
import React from 'react'
import './App.css'
import Header from './components/Header'
import DisplayPage from './pages/displayPage'

const MediaContext = React.createContext<string>('')

function App() {
  const [mediaDisplay, setMedia] = React.useState<string>("All")

  return (
    <MediaContext.Provider value={mediaDisplay}>
      <div className='xl:flex'>
        <div className='flex-basis'>
          <Header setMedia={setMedia} mediaDisplay={mediaDisplay}/>
        </div>
        <div className='grow'>
          <DisplayPage />   
        </div>
      </div>
    </MediaContext.Provider>
  )
}

export default App

export { MediaContext }
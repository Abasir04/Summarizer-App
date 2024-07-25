import './App.css'

import Content from './components/Content'
import Hero from './components/Hero'

function App() {

  return (
    <main>
      <div className="main">
        <div className="gradient"></div>
      </div>

      <div className="app">
        <Hero />
        <Content />
      </div>
    </main> 
  )
}

export default App

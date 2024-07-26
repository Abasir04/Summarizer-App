import './App.css'

import Hero from './components/Hero'
import Content from './components/Content'

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

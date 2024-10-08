import {logo} from '../assets'

const Hero = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
      <nav className='w-full flex justify-between items-center mb-10 pt-3'>
        <img 
          src={logo} 
          alt="Sum_logo" 
          className='w-28 object-contain pb-2'
        />
        <button 
          type="button" 
          onClick={() => window.open('http://github.com/Abasir04')}
          className='black_btn'
        >
          Github
        </button>
      </nav>

      <h1 className='head_text'>
        Summarize Articles with
        <br/>
        <span className='orange_gradient'>
          OpenAI GPT-4
        </span>
      </h1>
      <h2 className='desc'>
        Simplify your reading with Summize, an open-source article summarizer that transforms lengthy articles into clear and concise summaries
      </h2>
    </header>
  )
}

export default Hero
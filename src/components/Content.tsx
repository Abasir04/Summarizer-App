/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react'
import { MdOutlineKeyboardArrowRight } from "react-icons/md"
import { useLazyGetUrlSummaryQuery, useLazyExtractUrlTextQuery } from '../services/article'

import { copy, linkIcon, loader, tick } from '../assets' 

const Content = () => {

  const [article, setArticle] = useState({
    url: '',
    summary: ''
  });
  const [allArticles, setAllArticles] = useState([])

  useEffect(() => {
    const articlesFromLocalStorage: string | null = localStorage.getItem('articles')
    const parsedArticlesFLS = articlesFromLocalStorage ? JSON.parse(articlesFromLocalStorage) : null
    
    if(parsedArticlesFLS){
      setAllArticles(parsedArticlesFLS)
    }
  }, [])
  

  const [getSummary ] = useLazyGetUrlSummaryQuery() 
  {/*, { error, isLoading} */} 

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const { data } = await getSummary({
      articleUrl: article.url
    })

    if(data?.summary){
      const newArticle = {...article, summary: data.summary}
      const updatedAllArticle = {newArticle, ...allArticles}

      setArticle(newArticle)
      setAllArticles(updatedAllArticle)

      localStorage.setItem('articles', JSON.stringify(updatedAllArticle))
    }
  }

  return (
    <section className='mt-16 w-full max-w-xl'>
      {/*Search*/} 
      <div className='flex flex-col w-full gap-2'>
        <form 
          className='relative flex justify-center items-center'
          onSubmit={handleSubmit}
        >
          <img src={linkIcon} alt="link_Icon" className='absolute left-0 my-2 ml-3 w-5'/>
          <input 
            type='url'
            value={article.url}
            className='url_input peer'
            placeholder='Enter a URL'
            onChange={(e) => setArticle({ ...article, url: e.target.value})}
            required
          />
          <button
            type='submit'
            className='submit_btn m-0 p-2 w-5 peer-focus:border-gray-700 peer-focus:text-gray-700'
          >
            <MdOutlineKeyboardArrowRight />
          </button>
        </form>
      {/* Browse URL History */}
      </div>
      {/* Show Results */}
    </section>
  )
}

export default Content
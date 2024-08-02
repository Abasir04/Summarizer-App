/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react'
import { MdOutlineKeyboardArrowRight } from "react-icons/md"
import { useLazyGetUrlSummaryQuery, useLazyExtractUrlTextQuery } from '../services/article'

import { copy, linkIcon, loader, tick } from '../assets' 

const Content = () => {

  const [article, setArticle] = useState({
    url: '',
    text: '',
    summary: ''
  });
  const [allArticles, setAllArticles] = useState<{ url: string; text: string; summary: string; }[]>([])
  const [copied, setCopied] = useState('')

  const [getSummary, { error, isLoading}] = useLazyGetUrlSummaryQuery() 
  const [getText] = useLazyExtractUrlTextQuery()

  useEffect(() => {
    const articlesFromLocalStorage = localStorage.getItem('articles')
    if (articlesFromLocalStorage) {
      try {
        const parsedArticles = JSON.parse(articlesFromLocalStorage)
        if (Array.isArray(parsedArticles)) {
          setAllArticles(parsedArticles)
        } else {
          setAllArticles([]);
        }
      } catch (error) {
        console.error('Error parsing articles from localStorage', error);
        setAllArticles([]);
      }
    } else {
      setAllArticles([]);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  
    const { data: summaryData } = await getSummary({ articleUrl: article.url })
    const { data: textData } = await getText({ articleUrl: article.url })
  
    if (summaryData.summary && textData.md) {
      const newArticle = { ...article, text: textData.md, summary: summaryData.summary }
      const updatedAllArticles = [newArticle, ...allArticles]
  
      setArticle(newArticle)
      setAllArticles(updatedAllArticles)

      console.log('Article Text')
      console.log(newArticle.text)
  
      localStorage.setItem('articles', JSON.stringify(updatedAllArticles))
    }
  };
  
  const handleCopy = (copyUrl: string) => {
    setCopied(copyUrl)
    navigator.clipboard.writeText(copyUrl)
    setTimeout(() => setCopied(''), 5000)
  }

  return (
    <section className='mt-16 w-full max-w-xl'>

      <div className='flex flex-col w-full gap-2'>

        {/*Search*/} 
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
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className='link_card'
            >
              <div onClick={() => handleCopy(item.url)} className="copy_btn">
                <img 
                  src={copied === item.url ? tick : copy} 
                  alt="copy_icon"
                  className='w-[40%] h-[40%] object-contain' />
              </div>
              <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>
                {item.url}
              </p>
            </div>
          ))}
        </div>
        
      </div>

      {/* Show Results */}
      <div className="my-10 max-w-full flex justify-center items-center">
        {isLoading ? (
          <img src={loader} alt="load_icon" className='w-[30%] h-[30%] object-contain'/>
        ) : error ? (
          <p className="font-satoshi font-bold text-black text-center">
            Well, that's not supposed to happen
            <br />
            <span className="font-satoshi font-normal text-gray-700">
              We are working on it...
            </span>
          </p>
        ) : article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                Article&nbsp;
                <span className='blue_gradient'>
                Summary
                </span>
              </h2>
              <div className="summary_box">
                <p className='font-inter font-medium text-sm text-gray-700'>{article.summary}</p>
              </div>
            </div>
          )
        }
      </div>

    </section>
  )
}

export default Content
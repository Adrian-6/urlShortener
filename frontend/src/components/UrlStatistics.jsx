import axios from 'axios';
import { useState } from 'react';
import { format, parseISO } from 'date-fns'
import Loading from '../assets/Loading';

const UrlStatistics = () => {

  const [urlInput, setUrlInput] = useState('');
  const [urlInfo, setUrlInfo] = useState('');
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const date = parseISO(urlInfo?.lastUse)
  const dateFormatted = urlInfo ? format(date, 'dd/MM/yyyy kk:mm') : null

  async function handleSubmit() {
    try {
      setIsLoading(true)
      setError(null)
      await axios.get(`${import.meta.env.VITE_API_URL}/getUrlInfo/${encodeURIComponent(urlInput)}`, {
        headers: {
          'content-type': 'application/json'
        }
      }).then(res => {
        setUrlInfo(res.data);
        setUrlInput('')
      })

    } catch (err) {
      setUrlInfo(null)
      setError('An error occured. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  };

  function urlValidation(input) {
    let regex = /(?=(urlx\.pl|https:\/\/(www\.)?urlx\.pl))[a-zA-Z]+\.[A-Za-z0-9]+/i
    return regex.test(input);
  }

/*   const handleSendMessage = () => {
    e.preventDefault()
    if (message.trim() !== '') {
        setMessage('')
      
        sendMessage(newMessage)
    }
} */

const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
}

  const handleOnClick = e => {
    try {
      e.preventDefault();
      if (!urlValidation(urlInput)) {
        setError('Incorrect URL')
        return;
      } else {
        window.grecaptcha.ready(() => {
          window.grecaptcha.execute(import.meta.env.VITE_RECAPTCHA_KEY, { action: 'submit' }).then(token => {
            handleSubmit(token);
          });
        })
      };
    } catch (err) {
      setError(err.message)
    }
  }

  let isDisabled = !urlInput ? true : false

  return (
    <div className="urlbox">
      <h1 className='urlbox__header'>Check your short link statistics</h1>
      <p>
        Enter the URL to find out how many clicks it has received so far and when was it last used.
      </p>
      <div className="input-box">
        <form onSubmit={(e) => e.preventDefault()} className="url-form">
          <label htmlFor="shortUrl" className='hidden'>Enter your shortened URL here to check it's statistics</label>
          <input type="text" id="shortUrl" className="url-form__input" required value={urlInput} placeholder="Enter here your shortened URL" onChange={
            (e) => {
              setUrlInput(e.target.value)
            }
          }
          onKeyDown={handleKeyPress}
            name="Url" />
          <button name="button" className="url-form__button" type="button" disabled={isDisabled} onClick={(e) => handleOnClick(e)}>Get Statistics</button>
        </form>
        <p className='urlbox__p'>
          Example: {`${import.meta.env.VITE_API_URI}/AbCd`}
        </p>
      </div>
      <div className={`short-url-box url-statistics-box`}>
        {error ? <p className="errmsg">{error}</p> : null}
        {
          isLoading ?
            <Loading />
            : null
        }
        {urlInfo ?
          <>
            <a target="_blank" href={`${import.meta.env.VITE_API_URL}/${urlInfo?.shortUrl}`}>
              {`${import.meta.env.VITE_API_URI}/${urlInfo?.shortUrl}`}
            </a>
            <a target="_blank" href={urlInfo?.longUrl}>
              {urlInfo?.longUrl}
            </a>
            <p>
              Link clicked {urlInfo?.uses} times
            </p>
            <p>
              Last time used: {dateFormatted}
            </p>
          </>
          : null}
      </div>
    </div>
  )
}

export default UrlStatistics
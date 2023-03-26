import axios from 'axios';
import { useState } from 'react';

const UrlStatistics = () => {

  const [urlInput, setUrlInput] = useState('');
  const [urlInfo, setUrlInfo] = useState('');
  const [error, setError] = useState('')

  async function handleSubmit(token) {
    try {
      const res = await axios.get(`${import.meta.env.VITE_RECAPTCHA_KEY}/getUrlInfo/${encodeURIComponent(urlInput)}`, {
        headers: {
          'content-type': 'application/json'
        }
      });
      setUrlInfo(res.data.urlInfo);
      console.log(res);
      setError(null)
    } catch (err) {
      setError(err.response.data.message)
    }
  };

  function urlValidation(input) {
    let regex = /[a-zA-Z]+\.[A-Za-z0-9]+/i;
    return regex.test(input);
  }
  const handleOnClick = e => {
    try {
      e.preventDefault();
      /*  if (!urlValidation(urlInput)) {
         setError('Incorrect Url')
         setUrlInfo('')
         return;
       } */
      window.grecaptcha.ready(() => {
        window.grecaptcha.execute(import.meta.env.VITE_RECAPTCHA_KEY, { action: 'submit' }).then(token => {
          handleSubmit(token);
        });
      });
    } catch (err) {
      setError(err.message)
    }
  }


  return (
    <div className="main">
      <h1 className='main__header'>Check your short link statistics</h1>
      <div className="input-box">
        <form onSubmit={(e) => e.preventDefault()} className="url-form">
          <input type="text" id="shortUrl" className="url-form__input" required value={urlInput} placeholder="Your short link" onChange={
            (e) => {
              setUrlInput(e.target.value)
            }
          }
            name="Url" />
          <button name="button" className="url-form__button" type="button" onClick={(e) => handleOnClick(e)}>Get Statistics</button>
        </form>
      </div>
      <div>
        {error ? <p>{error}</p> : null}
      </div>
    </div>
  )
}

export default UrlStatistics
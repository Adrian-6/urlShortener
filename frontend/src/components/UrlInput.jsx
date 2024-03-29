import axios from 'axios';
import { useState } from 'react';
import CopyButton from './CopyButton';
import Loading from '../assets/Loading';
const UrlInput = () => {

    const [urlInput, setUrlInput] = useState('');
    const [longUrl, setLongUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit(token) {
        try {
            setIsLoading(true)
            setError(null)
            await axios.post(`${import.meta.env.VITE_API_URL}/newEntry`,
                {
                    urlToShorten: urlInput,
                    gRecaptchaToken: token
                },
                {
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                .then(res => {
                    setShortUrl(res.data.shortUrl);
                    setUrlInput('')
                    setLongUrl(res.data.longUrl)
                    console.log(res);
                    setError(null)
                })
        } catch (err) {
            setError('An error occured. Please try again later.')
        }
        finally {
            setIsLoading(false)
        }
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit()
        }
    }

    function urlValidation(input) {
        let regex = /[a-zA-Z]+\.[A-Za-z0-9]+/i;
        return regex.test(input);
    }
    const handleOnClick = e => {
        try {
            e.preventDefault();
            if (!urlValidation(urlInput)) {
                setError('Incorrect URL')
                setShortUrl('')
                return;
            }
            window.grecaptcha.ready(() => {
                window.grecaptcha.execute(import.meta.env.VITE_RECAPTCHA_KEY, { action: 'submit' }).then(token => {
                    handleSubmit(token);
                });
            });
        } catch (err) {
            setError(err.message)
        }
    }

    let isDisabled = !urlInput ? true : false

    return (
        <div className="urlbox">
            <h1 className='urlbox__header'>Paste the URL to be shortened</h1>
            <div className="input-box">
                <form onSubmit={(e) => e.preventDefault()} className="url-form">
                    <label htmlFor="longUrl" className='hidden'>Enter your URL here to shorten it</label>
                    <input type="text" id="longUrl" className="url-form__input" required value={urlInput} placeholder="Enter the link here" onChange={
                        (e) => {
                            setUrlInput(e.target.value)
                        }
                    }
                        onKeyDown={handleKeyPress}
                        name="Url" />
                    <button name="button" className="url-form__button" type="button" disabled={isDisabled} onClick={(e) => handleOnClick(e)}>Shorten!</button>
                </form>
            </div>
            <div className='short-url-box'>
                {error ? <p className="errmsg">{error}</p> : null}
                {
                    isLoading ?
                        <Loading />
                        : null
                }
                {shortUrl ?
                    <>
                        <p>{longUrl}</p>
                        <a target="_blank" href={`${import.meta.env.VITE_API_URL}/${shortUrl}`} >
                            {`${import.meta.env.VITE_API_URI}/${shortUrl}`}
                        </a>
                        <CopyButton content={shortUrl} />
                    </>
                    : null}
            </div>
            <p>UrlX is a free service to shorten URLs and create short links</p>
            <div>
            </div>
        </div>
    )
}

export default UrlInput

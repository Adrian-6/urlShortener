import axios from 'axios';
import { useState } from 'react';
import CopyButton from './CopyButton';

const UrlInput = () => {


    const [urlInput, setUrlInput] = useState('');
    const [longUrl, setLongUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [error, setError] = useState('')


    async function handleSubmit(token) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/newEntry`,
                {
                    Url: urlInput,
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
            if (!urlValidation(urlInput)) {
                setError('Incorrect Url')
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


    return (
        <div className="main">
            <h1 className='main__header'>Url Shortener</h1>
            <div className="input-box">
                <form onSubmit={(e) => e.preventDefault()} className="url-form">
                    <input type="text" id="longUrl" className="url-form__input" required value={urlInput} placeholder="Shorten your link" onChange={
                        (e) => {
                            setUrlInput(e.target.value)
                        }
                    }
                        name="Url" />
                    <button name="button" className="url-form__button" type="button" onClick={(e) => handleOnClick(e)}>Shorten!</button>
                </form>
            </div>
            <div className='short-url-box'>
                {shortUrl ?
                    <>
                        <p>{longUrl}</p>
                        <a target="_blank" href={`${import.meta.env.VITE_API_URL}/${shortUrl}`} >
                            {`${import.meta.env.VITE_API_URL}/${shortUrl}`}
                        </a>
                        <CopyButton content={shortUrl} />
                    </>
                    : null}
            </div>
            <div>
                {error ? <p>{error}</p> : null}
            </div>
        </div>
    )
}

export default UrlInput
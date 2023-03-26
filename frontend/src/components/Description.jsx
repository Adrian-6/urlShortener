import React from 'react'

const Description = () => {
    return (
        <div className='description'>
            <h2 className='description__header'>
                Simple and fast URL shortener!
            </h2>
            <p className='description__p'>
                ShortURL allows to reduce long links from <a target="_blank" href="https://instagram.com">Instagram</a>, <a target="_blank" href="https://facebook.com">Facebook</a>, <a target="_blank" href="https://youtube.com">YouTube</a>, <a target="_blank" href="https://twitter.com">Twitter</a>, <a target="_blank" href="https://linkedin.com">LinkedIn</a> and sites with authority on the Internet. Just paste the long URL, click the Shorten button, copy the shortened URL and share it on websites, chat and emails. After shortening the URL, check <a href={`${import.meta.env.VITE_BASE_URL}/stats`}>how many clicks it received</a>.
            </p>
            <h2 className='description__header'>
                Shorten, share and track
            </h2>
            <p className="description__p">
                Your shortened URLs can be used in publications, documents, advertisements, blogs, forums, instant messages, and other locations. Track statistics for your business and projects by monitoring the number of hits from your URL with the click counter.
            </p>
        </div>
    )
}

export default Description
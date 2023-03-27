import React from 'react'

const DescriptionCards = () => {
    return (
        <div className="description__cards">
            <div className="description__card">
                <img src="../../thumbs-up-regular.svg" height="75px" width="75px" role="none" />
                <h3>Easy</h3>
                <p>
                    UrlX is easy and fast, enter the long link to get your shortened link
                </p>
            </div>
            <div className="description__card">
                <img src="../../link-solid.svg" height="75px" width="75px" role="none" />
                <h3>Shortened</h3>
                <p>
                    Use any link, no matter what size, UrlX always shortens
                </p>
            </div>
            <div className="description__card">
                <img src="../../mobile-screen-button-solid.svg" height="75px" width="75px" role="none" />
                <h3>Devices</h3>
                <p>
                    Compatible with smartphones, tablets and desktop
                </p>
            </div>
            <div className="description__card">
                <img src="../../arrow-up-right-dots-solid.svg" height="75px" width="75px" role="none" />
                <h3>Statistics</h3>
                <p>
                    Check the amount of clicks that your shortened URL received
                </p>
            </div>
        </div>
    )
}

export default DescriptionCards
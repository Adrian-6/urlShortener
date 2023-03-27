import React from 'react'
const Header = () => {
    return (
        <header className="header">
            <div className='header__text'>
                <a href={import.meta.env.VITE_BASE_URL} className="header__link">
                    <h1>UrlX</h1>
                </a>
            </div>
        </header>
    )
}

export default Header
import React from 'react'
import UrlInput from './UrlInput'
import Description from './Description'
import DescriptionCards from './DescriptionCards'

const Home = () => {
    return (
        <div className="main">
            <UrlInput />
            <Description />
            <DescriptionCards />
        </div>
    )
}

export default Home
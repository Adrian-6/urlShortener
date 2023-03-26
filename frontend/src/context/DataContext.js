import { useState, createContext, useEffect } from "react"
import axios from 'axios';


const DataContext = createContext({})

export const DataProvider = ({ children }) => {

    const [shortUrl, setShortUrl] = useState('');
    const [urlSuffix, setUrlSuffix] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [longUrl, setLongUrl] = useState('')


    async function getData() {
        try {
            let res = await axios({
                method: 'post',
                url: import.meta.env.VITE_API_URL,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    Url: longUrl,
                }
            })
            if (res) {
                setUrlSuffix(res.data.message.shortUrl)
                setShortUrl((`${import.meta.env.VITE_API_URL}/${urlSuffix}`));
            }
        } catch (err) {
            console.error(err);
        }


        // fetchPromise.then((response) => {
        //     const shUrl = (response.data.shortUrl);
        //     setUrlSuffix(shUrl);
        //     console.log("fetchPromise.then: " + JSON.stringify(response.data.shortUrl));
        // })
        //     .catch(function (error) {
        //         console.log(error);
        //     });

    }
    useEffect(() => {
        getData()
        setLongUrl('')
        // setShortUrl((`http://localhost:3500/${urlSuffix}`));
    }, [isLoading]);


    console.log(urlSuffix)

    return (
        <DataContext.Provider value={{
            shortUrl, setShortUrl, urlSuffix, setUrlSuffix, isLoading, setIsLoading, longUrl, setLongUrl
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;
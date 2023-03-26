
const CopyButton = ({ content }) => {

    const link = `${import.meta.env.VITE_API_URL}/${content}`

    function handleCopy(link) {
        navigator.clipboard.writeText(link);
    }

    return (
        <button className="copy-button" onClick={() => handleCopy(link)}>Copy</button>
    )
}

export default CopyButton

const Footer = () => {
    const date = new Date().getFullYear()
    return (
        <footer className="footer">
            <p>&copy; {date} UrlX - Tool to shorten a long link.</p>
            <div className="footer-nav">
                <span><a href="/">Home </a></span>
                <span><a href="/stats">Url Statistics </a></span>
                <span><a href="/terms-of-service">Terms Of Service </a></span>
                <span><a href="/privacy">Privacy </a></span>
                <span><a target="_blank" href="mailto:adrian.wroblewski10@gmail.com">Contact</a></span>
            </div>
        </footer>
    )
}

export default Footer

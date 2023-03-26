import { Link } from "react-router-dom";

const Footer = () => {
    const date = new Date().getFullYear()
    return (
        <footer className="footer">
            <p>&copy; {date} Url Shortener- Tool to shorten a long link.</p>
            <Link to="/">Home </Link>
            <Link to="/stats">Url Statistics </Link>
            <Link to="/terms-of-service">Terms Of Service </Link>
            <Link to="/privacy">Privacy </Link>
            <Link to="/contact">Contact</Link>
        </footer>
    )
}

export default Footer
import { Link } from "react-router-dom";
//link to homepage, url click counter, TOS, privacy, contact

const Nav = () => {
    return (
        <nav className="navbar">
            <div className="nav-item"><Link to="/">Home</Link></div>
            <div className="nav-item"><Link to="contact">Contact</Link></div>
        </nav>
    )
}

export default Nav
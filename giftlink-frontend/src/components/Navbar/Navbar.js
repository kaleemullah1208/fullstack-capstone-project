import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AuthContext';

export default function Navbar() {
    const { isLoggedIn, setIsLoggedIn, userName } = useAppContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('auth-token');
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('email');
        setIsLoggedIn(false);
        navigate('/app/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            <div className="container">
                <Link className="navbar-brand fw-bold text-primary" to="/">GiftLink</Link>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/home.html">Home</a>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/app">Gifts</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/app/search">Search</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto align-items-center">
                        {isLoggedIn ? (
                            <>
                                <li className="nav-item me-3">
                                    <span className="navbar-text fw-semibold">Hello, {userName}</span>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>Logout</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/app/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="btn btn-primary btn-sm ms-2" to="/app/register">Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

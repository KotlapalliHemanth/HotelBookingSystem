import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    return (
        <div id="header" className="header" >
            <Link to="/" className='link'>
                <div className="logo">
                    <img src="https://www.example.com/logo.png" alt="Logo" />
                </div>
            </Link>
            <div className="title">
                Hotel Booking
            </div>
            {!isLoggedIn ? 
                <div className='loger-container'>
                <Link to="/login" className='link'><span className="material-symbols-outlined authen" id='login-btn' title='log in'>login</span></Link>
                <Link to="/register" className='link'><span className="material-symbols-outlined authen" id='register-btn' title='register'>person_add</span></Link>
                </div>:
                <div className='login-container'>
                <Link to="/profile" className='link'><span className="material-symbols-outlined authen" id='profile-btn' title='profile'>person</span></Link>
                <span className="material-symbols-outlined authen" id='logout-btn' title='log out'>logout</span>
                </div>
            }
                    
        </div>
    );
}

export default Header;

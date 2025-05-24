import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {  setLogout } from '../store/Slices/user/UserSlice';

const Header = () => {
    const loggedIn = useSelector(state => state.user.login);
    const dispatch = useDispatch();
    // const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(setLogout());
        
        
    };

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
            {!loggedIn ? 
                <div className='loger-container'>
                    <Link to="/login" className='link'><span className="material-symbols-outlined authen" id='login-btn' title='log in'>login</span></Link>
                    <Link to="/register" className='link'><span className="material-symbols-outlined authen" id='register-btn' title='register'>person_add</span></Link>
                </div> :
                <div className='loger-container'>
                    <Link to="/profile" className='link'><span className="material-symbols-outlined authen" id='profile-btn' title='profile'>person</span></Link>
                    <Link to="/" className='link'><span className="material-symbols-outlined authen" id='logout-btn' title='log out' onClick={handleLogout}>logout</span></Link>
                </div>
            }
        </div>
    );
}

export default Header;

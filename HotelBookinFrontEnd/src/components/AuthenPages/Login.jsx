import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout, setLoggedin } from '../../store/Slices/user/UserSlice';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const loggedIn = useSelector(state => state.user.login);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // On mount, if token exists, set login state and redirect
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(setLoggedin(true));
            console.log(loggedIn);

            navigate('/');
        }
        if (!token) {
            dispatch(setLoggedin(false));
            console.log(loggedIn)
        
        }
    }, [dispatch, navigate, loggedIn]);

    // On login state change, redirect if logged in
    useEffect(() => {
        if (loggedIn) {
            navigate('/');
        }
    }, [loggedIn, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);
        setErrorMessage('');
        if (username === '' || password === '') {
            setError(true);
            setErrorMessage('Please fill in all fields');
            return;
        }
        const data = { username, password };

        try {
            const response = await axios.post('http://localhost:8080/auth/login', data, {
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                dispatch(setLoggedin(true));
                // navigate('/') will be triggered by useEffect above
            }
        } catch (error) {
            setError(true);
            setErrorMessage(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <div id="loginBox">
            <div className='errorBox'>
                {error && <div className='error'>{errorMessage}</div>}
            </div>
            <form onSubmit={handleSubmit}>
                <div className="inputBox">
                    <input
                        type="text"
                        id="loginUsername"
                        className="forminput"
                        placeholder=" "
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <span></span>
                    <label htmlFor="loginUsername" id="loginUserLabel" className='userLabel'>Enter Email/UserName</label>
                </div>
                <div className='inputBox'>
                    <input
                        type="password"
                        id="loginPassword"
                        className="forminput"
                        placeholder=" "
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <span></span>
                    <label htmlFor="loginPassword" id="LoginPasswordLabel" className='userLabel'>Enter Password</label>
                </div>
                <button type="submit" id="loginButton">Log In</button><br />
                <div className='redirector-link'>
                    <Link to="/passwordchange" className='link' id='forgotPassword'>Forgot Password?</Link><br /><br />
                    <Link to="/register" className='link' id='register'>Don't have an account? Register</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;

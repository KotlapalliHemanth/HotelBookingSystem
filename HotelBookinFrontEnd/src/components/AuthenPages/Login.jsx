import {useEffect, useState} from 'react';
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loggedIn, setLoggedIn] = useState(false); 


    useEffect(
        () => {
            const token = localStorage.getItem('token');
            if (token) {
                setLoggedIn(true);// need to store and use login status in the redux store
            }
        }, []
    );   

    useEffect(() => {
        if (loggedIn) {
            // Redirect to the home page if the user is logged in
            const navigate = useNavigate();
            navigate('/');
        }
    }, [loggedIn]);


    const handleSubmit = (e) => {
        e.preventDefault();
        setError(false);
        setErrorMessage('');
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        if (username === '' || password === '') {
            setError(true);
            setErrorMessage('Please fill in all fields');
            return;
        }
        const data = {
            username: username,
            password: password
        };

        console.log(data);

        const response = axios.post('http://localhost:8080/auth/login', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            console.log(response.data);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);// need  to set the token name as the type of the usertoken 
                setLoggedIn(true);

            } 
            // else {
            //     setError(true);
            //     setErrorMessage('Invalid username or password');
            // }
        }).catch((error) => {
            console.error(error);
            setError(true);
            setErrorMessage(error.response.data.message);
        });
        // Make an API call to the backend to authenticate the user
        // If the authentication is successful, redirect to the home page};
        // If the authentication fails, set the error message
        // setError(true);
        // setErrorMessage('Invalid username or password');
    }

    return (
        <div id="loginBox">
            <div className='errorBox'>
                {error ? <div className='error'>{errorMessage}</div> : <div className='error'></div>}
            </div>
                <form action="" onSubmit={handleSubmit}>
                    <div className="inputBox">
                        <input type="text" id="loginUsername" className="forminput" placeholder=" " />
                        {/* value={username} onChange={e=>setUsername(e.target.value)} */}
                        <span></span>
                        <label htmlFor="loginUsername" id="loginUserLabel" className='userLabel'>Enter Email/UserName</label>
                    </div>
                    <div className='inputBox'>
                        <input type="password" id="loginPassword" className="forminput" placeholder=" " />  
                        {/* value={password} onChange={e=>setPassword(e.target.value)} */}
                        <span></span>
                        <label htmlFor="loginPassword" id="LoginPasswordLabel" className='userLabel'>Enter Password</label>
                    </div>
                    <div></div>
                    
                    <button type="submit" id="loginButton">Log In</button><br />

                    <div className='redirector-link'>
                    <Link to="/passwordchange" className='link' id='forgotPassword'>Forgot Password?</Link><br /><br />
                    <Link to="/register" className='link' id='register'>Don't have an account? Register</Link>
                    </div>
                </form>
                
        </div>
    );
}

export default Login;

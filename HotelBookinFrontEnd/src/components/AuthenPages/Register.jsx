import {useState, useEffect} from 'react';
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

const Register = () => {

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    

    const navigate = useNavigate();

    useEffect(() => {
        if (registrationSuccess) {
            navigate('/login');
        }
    }, [registrationSuccess]);

    const handleSubmit = (e) => {  
        
        e.preventDefault();
        setError(false);
        setErrorMessage('');
        const username = document.getElementById('registerUsername').value;
        const email = document.getElementById('registerEmail').value;
        const mobile = document.getElementById('registerMobile').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;

        if (username === '' || email === '' || mobile === '' || password === '' || confirmPassword === '') {
            setError(true);
            setErrorMessage('Please fill in all fields');
            return;
        }
        if (password !== confirmPassword) {
            setError(true);
            setErrorMessage('Passwords do not match');
            return;
        }
        
        const data = {
            username: username,
            email: email,
            mobile: mobile,
            password: password,
            confirmPassword: confirmPassword
        };
        console.log(data);

        const response = axios.post('http://localhost:8080/api/auth/register', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            console.log(response.data);
            setRegistrationSuccess(true);
        }).catch((error) => {
            setError(true);
            setErrorMessage(error.response.data.message);
            
        });
        // Make an API call to the backend to register the user
        // If the registration is successful, redirect to the login page
        // setRegistrationSuccess(true);
        // If the registration fails, set the error message

     }

    return (
        <div id='registerBox' > 
            <div className='errorBox'>
                {error ? <div className='error'>{errorMessage}</div> : <div className='error'></div>}
            </div>
            <form id="registrationForm" action="" onSubmit={handleSubmit}>
                    <div className="inputBox">
                        <input type="text" id="registerUsername" placeholder=" " />
                        {/* value={username} onChange={e=>setUsername(e.target.value)} */}
                        <span></span>
                        <label htmlFor="registerUsername" id="registerUserLabel" className='userLabel'>Enter username</label>
                    </div>
                    <div className="inputBox">
                        <input type="text" id="registerEmail" placeholder=" " />
                        {/* value={username} onChange={e=>setUsername(e.target.value)} */}
                        <span></span>
                        <label htmlFor="registerEmail" id="registerEmailLabel" className='userLabel'>Enter Email</label>
                    </div>
                    <div className="inputBox">
                        <input type="text" id="registerMobile" placeholder=" " />
                        {/* value={username} onChange={e=>setUsername(e.target.value)} */}
                        <span></span>
                        <label htmlFor="registerMobile" id="registerMobileLabel" className='userLabel'>Enter Mobile Number</label>
                    </div>
                    <div className='inputBox'>
                        <input type="password" id="registerPassword" placeholder=" " />  
                        {/* value={password} onChange={e=>setPassword(e.target.value)} */}
                        <span></span>
                        <label htmlFor="registerPassword" id="registerPasswordLabel" className='userLabel'>Enter Password</label>
                    </div>
                    <div className='inputBox'>
                        <input type="password" id="registerConfirmPassword" placeholder=" " />  
                        {/* value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} */}
                        <span></span>
                        <label htmlFor="registerConfirmPassword" id="registerConfirmPasswordLabel" className='userLabel'>Enter Confirm Password</label>
                    </div>
                    <div></div>
                    
                    <button type="submit" id="registerButton">Register</button><br />

                    <div className='redirector-link'>
                    <Link to="/login" className='link' id='login'>Already have an account? Log In</Link>
                    </div>
                </form>
        </div>
    );
}

export default Register;

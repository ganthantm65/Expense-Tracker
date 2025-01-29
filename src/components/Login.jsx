import React, { useState } from 'react';
import { Button, Toaster, Position } from '@blueprintjs/core';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faLock } from '@fortawesome/free-solid-svg-icons';
import '/home/ganthan/Documents/projects/expense-tracker/src/App.css';

const toaster = Toaster.create({
    position: Position.TOP,
});

const Login = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        const url = `http://localhost/expense/login`;
        const payload = { username, password };

        try {
            const response = await fetch(url, {
                method: 'POST',
                header: { 'Content-Type': 'application/json' },  
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            console.log(data);
            
            if (data.success) {
                navigate('/dashboard', { state: { data } });
            } else {
                toaster.show({
                    message: 'Invalid username or password',
                    intent: 'danger',
                });
            }
        } catch (error) {
            toaster.show({
                message: 'Server error. Please try again.',
                intent: 'danger',
            });
        }
    };

    return (
        <div className="login">
            <h2>Login</h2>
            <div>
                <FontAwesomeIcon icon={faUser}/>
                <input
                    id="login-user"
                    value={username}
                    onChange={(event) => setUserName(event.target.value)}
                    placeholder="Enter username"
                    autoComplete="off"
                />
            </div>
            <div>
                <FontAwesomeIcon icon={faLock}/>
                <input
                    id="login-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter password"
                    type="password"
                    autoComplete="off"
                />
            </div>
            <Button intent="primary" onClick={handleLogin} id='login-btn'>
                Login
            </Button>
            <p>Don't Have Account <Link to="/signup">Sign up</Link></p>
        </div>
    );
};

export default Login;

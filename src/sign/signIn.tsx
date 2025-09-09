import { useState } from 'react';
import type { FormEvent } from 'react';
import { TextField, InputLabel, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignIn() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [tokenError, setTokenError] = useState<string | null>(null);

  const navigate = useNavigate();

  // Email validation regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset errors
    setEmailError(null);
    setPasswordError(null);
    setError(null);
    setTokenError(null);

    if (!email || !password) {
      if (!email) setEmailError('Email is required');
      if (!password) setPasswordError('Password is required');
      return;
    }

    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        'https://jsonplaceholder.typicode.com/posts',
        { email, password }
      );

      if (response.status === 201) {
        const token = localStorage.getItem('authToken');
        if (token) {
            navigate('/dashboard');
        } else {
            setTokenError("It doesn't exist user who have it's email")
        }
      }
    } catch (err: unknown) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('Failed to sign in. Please try again.');
        }
    } finally {
      setLoading(false);
    }
  };

    return (
        <div className="sign">
            <div className="sign-in">
                <div className="sign-in-div">
                    <div className="sign-in-logo">
                        <div className="sign-in-logo-bar"></div>
                        <div className="sign-in-logo-text">CRUD OPERATIONS</div>
                    </div>
                    <Typography variant="h6" className="sign-in-boldtext">
                        SIGN IN
                    </Typography>
                    <Typography variant="body2" className="sign-in-normaltext">
                        Enter your credentials to access your account
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <div className="sign-in-input">
                            <InputLabel sx={{ fontSize: '14px' }}>Email</InputLabel>
                            <TextField
                                className="sign-input"
                                variant="outlined"
                                fullWidth
                                placeholder="Enter your email"
                                size="small"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                sx={{
                                '& .MuiInputBase-input::placeholder': {
                                    fontSize: '12px',
                                },
                                }}
                                error={!!emailError}
                                helperText={emailError}
                            />
                        </div>

                        <div className="sign-in-input marginTop">
                            <InputLabel sx={{ fontSize: '14px' }}>Password</InputLabel>
                            <TextField
                                type="password"
                                variant="outlined"
                                fullWidth
                                placeholder="Enter your password"
                                size="small"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                sx={{
                                '& .MuiInputBase-input::placeholder': {
                                    fontSize: '12px',
                                },
                                }}
                                error={!!passwordError}
                                helperText={passwordError}
                            />
                        </div>

                        <Button
                            variant="contained"
                            className="sign-in-button"
                            type="submit"
                              disabled={loading}
                            >
                            {loading ? 'Signing in...' : 'SIGN IN'}
                        </Button>
                    </form>

                    {error && <Typography color="error">{error}</Typography>}
                    {tokenError && <Typography color="error">{tokenError}</Typography>}

                    <div className="sign-in-register">
                        <Typography variant="body2">Don’t have an account?</Typography>
                        <Link to="/signup" className="sign-in-register-link">
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;

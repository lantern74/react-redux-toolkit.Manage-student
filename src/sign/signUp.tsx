import { useState } from 'react';
import type { FormEvent } from 'react';
import { TextField, InputLabel, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);

  const navigate = useNavigate();

  // Email validation regex
  const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    
    e.preventDefault();

    // Reset error states
    setEmailError(null);
    setPasswordError(null);
    setConfirmPasswordError(null);
    setError(null);

    // Validate fields
    if (!email || !password || !confirmPassword) {
      if (!email) setEmailError('Email is required');
      if (!password) setPasswordError('Password is required');
      if (!confirmPassword) setConfirmPasswordError('Please confirm your password');
      return;
    }

    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      return;
    }

    setLoading(true);

    function generateFakeToken() {
        const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
        const payload = btoa(JSON.stringify({ email, iat: Date.now() }));
        const signature = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
        return `${header}.${payload}.${signature}`;
    }

    try {
        
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts',
        { email, password }
      );

      if (response.status === 201) {
        const token = generateFakeToken();
        localStorage.setItem('authToken', token);

        navigate('/dashboard');
      } else {
        setError('Unexpected response. Please try again.');
      }
    } catch (err: unknown) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('Failed to sign up. Please try again.');
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
                    <Typography variant="h6" className="sign-in-boldtext">SIGN UP</Typography>
                    <Typography variant="body2" className="sign-in-normaltext">
                        Enter your credentials to create your account
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
                                '& .MuiInputBase-input::placeholder': { fontSize: '12px' },
                                }}
                                error={!!emailError}
                                helperText={emailError}
                            />
                        </div>
                        <div className="sign-in-input marginTop">
                            <InputLabel sx={{ fontSize: '14px' }}>Password</InputLabel>
                            <TextField
                                variant="outlined"
                                fullWidth
                                placeholder="Enter your password"
                                size="small"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                sx={{
                                '& .MuiInputBase-input::placeholder': { fontSize: '12px' },
                                }}
                                error={!!passwordError}
                                helperText={passwordError}
                            />
                        </div>
                        <div className="sign-in-input marginTop">
                            <InputLabel sx={{ fontSize: '14px' }}>Confirm Password</InputLabel>
                            <TextField
                                variant="outlined"
                                fullWidth
                                placeholder="Confirm your password"
                                size="small"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                sx={{
                                '& .MuiInputBase-input::placeholder': { fontSize: '12px' },
                                }}
                                error={!!confirmPasswordError}
                                helperText={confirmPasswordError}
                            />
                        </div>
                        <Button
                            variant="contained"
                            className="sign-in-button"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Registering...' : 'REGISTER'}
                        </Button>
                    </form>
                    {error && <Typography color="error">{error}</Typography>}
                    <div className="sign-in-register">
                        <Typography variant="body2">Already have an account?</Typography>
                        <Link to="/signin" className="sign-in-register-link">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;

import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ isSignUp }) => {
  const [signUpData, setSignUpData] = useState({
    fName: '',
    lName: '',
    email: '',
    password: ''
  });

  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isSignUp) {
      setSignUpData({ ...signUpData, [name]: value });
    } else {
      setSignInData({ ...signInData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = isSignUp
      ? {
          signUp: true,
          fName: signUpData.fName,
          lName: signUpData.lName,
          email: signUpData.email.trim().toLowerCase(),
          password: signUpData.password
        }
      : {
          signIn: true,
          email: signInData.email.trim().toLowerCase(),
          password: signInData.password
        };

    try {
      const res = await fetch('http://localhost/kids_learning/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      alert(data.message);

      if (isSignUp && data.status === 'success') {
        navigate('/login');
      } else if (!isSignUp && data.status === 'success') {
        // Store user info and redirect
        localStorage.setItem('firstName', data.firstName);
        localStorage.setItem('email', data.email);
        navigate('/');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <h1 className="form-title">{isSignUp ? 'Register' : 'Sign In'}</h1>
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <>
              <div className="input-group">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  name="fName"
                  placeholder="First Name"
                  value={signUpData.fName}
                  onChange={handleChange}
                  required
                />
                <label>First Name</label>
              </div>
              <div className="input-group">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  name="lName"
                  placeholder="Last Name"
                  value={signUpData.lName}
                  onChange={handleChange}
                  required
                />
                <label>Last Name</label>
              </div>
            </>
          )}

          <div className="input-group">
            <i className="fas fa-envelope"></i>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={isSignUp ? signUpData.email : signInData.email}
              onChange={handleChange}
              required
            />
            <label>Email</label>
          </div>

          <div className="input-group">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={isSignUp ? signUpData.password : signInData.password}
              onChange={handleChange}
              required
            />
            <label>Password</label>
          </div>

          <input type="submit" className="btn" value={isSignUp ? 'Sign Up' : 'Sign In'} />
        </form>

        <div className="links">
          <p>{isSignUp ? 'Already have an account?' : "Don't have an account yet?"}</p>
          <button onClick={() => navigate(isSignUp ? '/login' : '/signup')}>
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
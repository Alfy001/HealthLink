import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PatientAuth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const endpoint = isLogin ? 'login' : 'signup';
    try {
      const response = await fetch(`http://localhost:3000/patient/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      if (response.ok) {
        navigate('/patient-dashboard');
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Patient Login' : 'Patient Signup'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Need an account? Signup' : 'Already have an account? Login'}
      </button>
    </div>
  );
}

export default PatientAuth;
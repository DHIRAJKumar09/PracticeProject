import React, { useState } from 'react';
<<<<<<< HEAD
import { Eye, Plus } from 'lucide-react';
=======
import { Eye, EyeOff, Plus } from 'lucide-react'; // 1. Added EyeOff
>>>>>>> e1aed918fc67f4c13e043267245f654b8ec9c430
import '../Style/Register.css';

const Register = () => {
  const initialState = { name: '', lastName: '', email: '', password: '', repeat: '' };
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState(''); 
  const [success, setSuccess] = useState('');
<<<<<<< HEAD
  
=======
  const [showPassword, setShowPassword] = useState(false); // You added this - Good!

>>>>>>> e1aed918fc67f4c13e043267245f654b8ec9c430
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(''); 
    if (success) setSuccess('');
  };

<<<<<<< HEAD
=======
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // You added this - Good!
  };

>>>>>>> e1aed918fc67f4c13e043267245f654b8ec9c430
  const handleSubmit = (e) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    
    if (!passwordRegex.test(formData.password)) {
      setError("Password must be 8+ characters with 1 uppercase and 1 special character.");
      return;
    }
    if (formData.password !== formData.repeat) {
      setError("Passwords do not match!");
      return;
    }

    setError('');
    setSuccess(`Registration Successful for ${formData.name}!`);
    setFormData(initialState);
    setTimeout(() => setSuccess(''), 4000);
  };

  return (
    <div className="full-page-bg">
      <div className="register-container">
        <div className="sidebar">
          <div className="logo">GENESIS</div>
          <h1>New User<br/>Registration.</h1>
          <div className="sidebar-footer">TERMS OF USE AND CONTRAINDICATIONS</div>
        </div>

        <div className="form-content">
          <h2 className="title">SIGN UP</h2>
          <div className="profile-wrapper">
            <div className="profile-circle">
              <img src="https://images.pexels.com/photos/11412540/pexels-photo-11412540.jpeg?auto=compress&cs=tinysrgb&w=200" alt="user" />
            </div>
            <div className="add-btn"><Plus size={12} color="white"/></div>
          </div>

          <form className="main-form" onSubmit={handleSubmit}>
            <div className="input-row">
              <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
              <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
            </div>
            <input type="email" name="email" placeholder="Email" className="full-width" value={formData.email} onChange={handleChange} required />
<<<<<<< HEAD
            <div className="input-row">
              <div className="pass-box">
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <Eye className="eye-icon" size={16}/>
              </div>
              <div className="pass-box">
                <input type="password" name="repeat" placeholder="Repeat" value={formData.repeat} onChange={handleChange} required />
                <Eye className="eye-icon" size={16}/>
              </div>
            </div>
=======
            
            <div className="input-row">
              {/* --- CHANGES MADE HERE --- */}
              <div className="pass-box">
                <input 
                  type={showPassword ? "text" : "password"} // CHANGE 1: Use the state
                  name="password" 
                  placeholder="Password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  required 
                />
                <span onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                  {showPassword ? <EyeOff size={16} className="eye-icon"/> : <Eye size={16} className="eye-icon"/>}
                </span>
              </div>

              <div className="pass-box">
                <input 
                  type={showPassword ? "text" : "password"} // CHANGE 2: Use the state
                  name="repeat" 
                  placeholder="Repeat" 
                  value={formData.repeat} 
                  onChange={handleChange} 
                  required 
                />
                <span onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                  {showPassword ? <EyeOff size={16} className="eye-icon"/> : <Eye size={16} className="eye-icon"/>}
                </span>
              </div>
            </div>

>>>>>>> e1aed918fc67f4c13e043267245f654b8ec9c430
            <div className="message-area">
              {error && <div className="error-text">{error}</div>}
              {success && <div className="success-text">{success}</div>}
            </div>
            <button type="submit" className="submit-button">CREATE ACCOUNT</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
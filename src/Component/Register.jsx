import React, { useState } from "react";

const Register = () => {
 
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    mobileNumber: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

   
    if (name === "mobileNumber") {
      if (isNaN(value)) return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.userName.length < 4) {
      setMessage("Username must be at least 4 characters long");
      return;
    }

    
    console.log("Registration successful", formData);
    setMessage(`Successfully registered ${formData.userName}`);
    
  
    setFormData({
      userName: "",
      email: "",
      mobileNumber: "",
      password: "",
    });
  };

  return (
    
    <div style={styles.container}>
     
      <div style={styles.formBox}>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <input
              type="text"
              name="userName"
              placeholder="Username"
              value={formData.userName}
              onChange={handleChange}
             
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <input
              type="tel"
              name="mobileNumber"
              placeholder="Mobile Number"
              value={formData.mobileNumber}
              onChange={handleChange}
              maxLength="10" 
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>
            Register
          </button>
        </form>
      
        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
};


const styles = {
  container: { display: "flex", justifyContent: "center", marginTop: "50px" },
  formBox: { 
    width: "300px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    textAlign: "center",
  },
  inputGroup: { marginBottom: "15px" },
  input: { 
    width: "90%",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ddd",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  message: { marginTop: "10px", color: "green", fontWeight: "bold" },
};

export default Register;
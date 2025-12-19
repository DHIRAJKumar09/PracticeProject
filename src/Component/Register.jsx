import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    otp: ""
  });

  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Limit mobile number: only numbers and max 10 digits
    if (name === "mobile") {
      const onlyNums = value.replace(/[^0-9]/g, ""); 
      if (onlyNums.length <= 10) {
        setFormData({ ...formData, [name]: onlyNums });
      }
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  // 📱 Send OTP
  const sendOtp = async () => {
    if (formData.mobile.length !== 10) {
      setMessage("Please enter a valid 10-digit mobile number");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: formData.mobile })
      });

      const data = await res.json();

      if (res.ok) {
        setOtpSent(true);
        setMessage("OTP sent successfully ✅");
      } else {
        setMessage(data.message || "Failed to send OTP");
      }
    } catch {
      setMessage("Server error connecting to OTP service");
    }
    setLoading(false);
  };

  // 📝 Register
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    if (!formData.otp) {
      setMessage("Enter the OTP received on your phone");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Registration successful 🎉");
        setFormData({
          name: "",
          email: "",
          mobile: "",
          password: "",
          confirmPassword: "",
          otp: ""
        });
        setOtpSent(false);
      } else {
        setMessage(data.message || "Registration failed");
      }
    } catch {
      setMessage("Server error during registration");
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.title}>Create Account</h2>

        {message && (
          <div style={{
            ...styles.message,
            backgroundColor: message.includes("successful") || message.includes("✅") ? "#d4edda" : "#f8d7da",
            color: message.includes("successful") || message.includes("✅") ? "#155724" : "#721c24"
          }}>
            {message}
          </div>
        )}

        <input
          style={styles.input}
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          style={styles.input}
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <div style={styles.mobileContainer}>
          <input
            style={{...styles.input, flex: 1}}
            type="tel"
            name="mobile"
            placeholder="Mobile Number (10 digits)"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
          {!otpSent && (
            <button 
              type="button" 
              onClick={sendOtp} 
              disabled={loading} 
              style={styles.inlineButton}
            >
              {loading ? "..." : "Send OTP"}
            </button>
          )}
        </div>

        {otpSent && (
          <>
            <input
              style={styles.input}
              type="text"
              name="otp"
              placeholder="Enter 6-digit OTP"
              value={formData.otp}
              onChange={handleChange}
              required
            />
            <button type="button" onClick={sendOtp} style={styles.resendText}>
              Didn't get it? Resend OTP
            </button>
          </>
        )}

        <input
          style={styles.input}
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <input
          style={styles.input}
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading} style={styles.submitButton}>
          {loading ? "Processing..." : "Register"}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f0f2f5",
    padding: "20px"
  },
  form: {
    width: "100%",
    maxWidth: "400px",
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  title: {
    textAlign: "center",
    margin: "0 0 10px 0",
    color: "#1c1e21",
    fontSize: "24px"
  },
  message: {
    padding: "10px",
    borderRadius: "6px",
    fontSize: "14px",
    textAlign: "center",
    transition: "all 0.3s ease"
  },
  input: {
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #dddfe2",
    fontSize: "16px",
    outline: "none",
  },
  mobileContainer: {
    display: "flex",
    gap: "10px"
  },
  inlineButton: {
    padding: "0 15px",
    backgroundColor: "#42b72a",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "13px"
  },
  resendText: {
    background: "none",
    border: "none",
    color: "#1877f2",
    cursor: "pointer",
    fontSize: "13px",
    textAlign: "left",
    padding: "0"
  },
  submitButton: {
    padding: "14px",
    backgroundColor: "#1877f2",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px"
  }
};

export default Register;
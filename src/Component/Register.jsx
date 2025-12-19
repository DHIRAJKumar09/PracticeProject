import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // --- CHANGE #1: MOBILE NUMBER LIMIT ---
    // This blocks non-numbers and stops the user at 10 digits
    if (name === "mobile") {
      const onlyNums = value.replace(/[^0-9]/g, "");
      if (onlyNums.length <= 10) {
        setFormData({ ...formData, [name]: onlyNums });
      }
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  // --- CHANGE #2: SIMULATED SEND OTP ---
  // Removed the fetch call to localhost:5000
  const sendOtp = () => {
    if (formData.mobile.length !== 10) {
      setMessage("❌ Please enter a 10-digit mobile number");
      return;
    }

    setLoading(true);
    setMessage("");

    // Simulate a network delay (0.6 seconds)
    setTimeout(() => {
      setOtpSent(true); // This tells React to show the OTP input box
      setLoading(false);
      setMessage("OTP sent successfully! ✅");
    }, 600);
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("❌ Passwords do not match");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setMessage("Registration successful! 🎉");

     
      setFormData({
        name: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
        otp: "",
      });
      setOtpSent(false); 
    }, 1000);
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.title}>Create Account</h2>

        {message && (
          <div
            style={{
              ...styles.message,
              backgroundColor:
                message.includes("successful") || message.includes("✅")
                  ? "#d4edda"
                  : "#f8d7da",
              color:
                message.includes("successful") || message.includes("✅")
                  ? "#155724"
                  : "#721c24",
            }}
          >
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

        <div style={styles.mobileRow}>
          <input
            style={{ ...styles.input, flex: 1 }}
            type="tel"
            name="mobile"
            placeholder="Mobile (10 digits)"
            value={formData.mobile}
            onChange={handleChange}
            required
            disabled={otpSent}
          />
          {!otpSent && (
            <button
              type="button"
              onClick={sendOtp}
              disabled={loading}
              style={styles.otpBtn}
            >
              {loading ? "..." : "Send OTP"}
            </button>
          )}
        </div>

      
        {otpSent && (
          <div style={styles.otpSection}>
            <input
              style={styles.input}
              type="text"
              name="otp"
              placeholder="Enter any 6-digit OTP"
              value={formData.otp}
              onChange={handleChange}
              required
            />
          </div>
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

        <button type="submit" disabled={loading} style={styles.submitBtn}>
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
  },
  form: {
    width: "100%",
    maxWidth: "380px",
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  title: { textAlign: "center", color: "#333" },
  message: {
    padding: "12px",
    borderRadius: "8px",
    fontSize: "14px",
    textAlign: "center",
  },
  input: {
    padding: "12px 15px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "15px",
    outline: "none",
  },
  mobileRow: { display: "flex", gap: "10px" },
  otpBtn: {
    padding: "0 15px",
    backgroundColor: "#42b72a",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  otpSection: {
    padding: "10px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    border: "1px dashed #ccc",
  },
  submitBtn: {
    padding: "14px",
    backgroundColor: "#1877f2",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default Register;

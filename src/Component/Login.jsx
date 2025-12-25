import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "admin@gmail.com" && password === "12345") {
      alert("Login Successful ✅");
    } else {
      alert("Invalid Credentials ❌");
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={handleSubmit}>
        <h2 style={styles.title}>Login</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button}>
          Login
        </button>

        <p style={styles.text}>
          Don't have an account? <span style={styles.link}><a href="/register">Sign Up</a></span>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
  },
  card: {
    background: "#fff",
    padding: "40px",
    width: "320px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    background: "#667eea",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },
  text: {
    marginTop: "15px",
    fontSize: "14px",
    color: "#555",
  },
  link: {
    color: "#667eea",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Login;

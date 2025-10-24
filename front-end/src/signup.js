import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("User registered successfully!");
        setShowPopup(true);
      } else {
        setStatus("error");
        setMessage(data.message);
      }
    } catch (err) {
      setStatus("error");
      setMessage("Server error. Please try again later.");
    }
  };

  const handleOkClick = () => {
    setShowPopup(false);
    navigate("/login");
  };

  return (
    <div className="signup-bg">
      {/* ✅ Inline CSS here */}
      <style>{`
        .signup-bg {
          background: linear-gradient(135deg, #1e3a8a, #2563eb);
          background-size: cover;
          background-position: center;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .signup-container {
          background: white;
          padding: 40px 45px;
          border-radius: 20px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          width: 100%;
          max-width: 400px;
          text-align: center;
          animation: fadeIn 0.6s ease-in-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .signup-title {
          font-size: 24px;
          font-weight: 700;
          color: #1e3a8a;
        }

        .signup-subtitle {
          color: #6b7280;
          font-size: 14px;
          margin-bottom: 20px;
        }

        .signup-form label {
          display: block;
          text-align: left;
          margin: 10px 0 5px;
          color: #374151;
          font-weight: 500;
        }

        .signup-form input {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #d1d5db;
          border-radius: 10px;
          outline: none;
          margin-bottom: 15px;
          font-size: 14px;
          transition: border-color 0.3s;
        }

        .signup-form input:focus {
          border-color: #2563eb;
        }

        .signup-btn {
          background-color: #2563eb;
          color: white;
          font-weight: 600;
          padding: 10px 0;
          border: none;
          border-radius: 10px;
          width: 100%;
          cursor: pointer;
          transition: background 0.3s;
        }

        .signup-btn:hover {
          background-color: #1d4ed8;
        }

        .login-link {
          margin-top: 15px;
          color: #6b7280;
          font-size: 14px;
        }

        .login-link span {
          color: #2563eb;
          cursor: pointer;
          font-weight: 600;
        }

        .popup-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .popup-box {
          background: white;
          padding: 25px 30px;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }

        .popup-box button {
          background-color: #2563eb;
          color: white;
          padding: 8px 16px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
        }

        .message.error {
          color: #b91c1c;
          background: #fee2e2;
          border-radius: 8px;
          padding: 8px 10px;
          margin-bottom: 10px;
        }
      `}</style>

      {/* ✅ Signup UI */}
      <div className="signup-container">
        <h2 className="signup-title">Create Your Account</h2>
        <p className="signup-subtitle">Join our platform to submit and track complaints easily</p>

        {message && status === "error" && (
          <div className={`message ${status}`}>{message}</div>
        )}

        <form onSubmit={handleSubmit} className="signup-form">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
            required
          />

          <button type="submit" className="signup-btn">Sign Up</button>

          <p className="login-link">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Login</span>
          </p>
        </form>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <p>{message}</p>
            <button onClick={handleOkClick}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;

import { useState } from "react";
import css from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

//component for login
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailWarning, setEmailWarning] = useState(false);
  const [passwordWarning, setPasswordWarning] = useState(false);

  const navigate = useNavigate();

  //function to handle submit action
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email && !password) {
      setEmailWarning(true);
      setPasswordWarning(true);
      return;
    }
    if (!email) {
      setEmailWarning(true);
      return;
    }
    if (!password) {
      setPasswordWarning(true);
      return;
    }
    if (!emailWarning && !passwordWarning) {
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      navigate("/profile");
    }
  };

  //function to show/hide password
  const handleVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className={css.login}>
      <form className={css.inputForm} noValidate>
        <div className={css.emailInput}>
          <label>Email:</label>
          <input
            type="email"
            className={emailWarning ? css.inputWarning : "email"}
            value={email}
            placeholder="Enter your email address"
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailWarning(false);
            }}
            onBlur={(e) => {
              const regex = /^[\w-\.]+@([\w-]+\.)+[\ws-]{2,4}$/;
              if (!regex.test(email)) {
                setEmailWarning(true);
              } else {
                setEmailWarning(false);
              }
            }}
          />
          {emailWarning && (
            <span className={css.warning}>
              Please enter valid email address.
            </span>
          )}
        </div>
        <div className={css.passwordInput}>
          <label>Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className={passwordWarning ? css.inputWarning : "email"}
            value={password}
            placeholder="Enter password"
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordWarning(false);
            }}
            onBlur={(e) => {
              const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
              if (!regex.test(password)) {
                setPasswordWarning(true);
              } else {
                setPasswordWarning(false);
              }
            }}
          />
          {passwordWarning && password !== "" && (
            <span className={css.warning}>Please enter valid password.</span>
          )}
          {passwordWarning && password === "" && (
            <span className={css.warning}>Please enter password.</span>
          )}
          <div className={css.note}>
            <p style={{ fontSize: "13px" }}>Note:</p>
            <p>1. Password must be at least 8 characters.</p>
            <p>2. Password must contain uppercase and lower case.</p>
            <p>3. Password must contain at least one digit.</p>
          </div>
          {showPassword ? (
            <VisibilityIcon
              onClick={handleVisibility}
              className={css.visibility}
            />
          ) : (
            <VisibilityOffIcon
              onClick={handleVisibility}
              className={css.visibility}
            />
          )}
        </div>
        <button className={css.submitBtn} onClick={handleSubmit}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

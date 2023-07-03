import css from "./Profile.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//Profile component
const Profile = () => {
  //state for email and password fetching from localstorage
  const [email] = useState(localStorage.getItem("email") || "");
  const [password] = useState(localStorage.getItem("password") || "");
  const navigate = useNavigate();

  //function to navigate back page
  const handleBack = () => {
    navigate("/");
    localStorage.clear();
  };

  //redirect to Login page if email and password empty
  useEffect(() => {
    if (!email && !password) {
      navigate("/");
    }
  });

  return (
    <div className={css.profile}>
      <div>User Credentials</div>
      <p>
        <b>Email:</b> {email}
      </p>
      <p>
        <b> Password: </b>
        {password}
      </p>
      <button className={css.backButton} onClick={handleBack}>
        Back
      </button>
    </div>
  );
};

export default Profile;

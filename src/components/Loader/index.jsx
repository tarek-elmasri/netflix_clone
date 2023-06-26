import netflixLogo from "../../assets/login_logo.png";
import "./styles.css";

const index = ({ message }) => {
  return (
    <div className="loader">
      <img src={netflixLogo} alt="Netflix" />
      {message && <p>{message}</p>}
    </div>
  );
};

export default index;

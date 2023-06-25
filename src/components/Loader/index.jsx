import netflixLogo from "../../assets/login_logo.png";
import "./styles.css";

const index = () => {
  return (
    <div className="loader">
      <img src={netflixLogo} alt="Netflix" />
    </div>
  );
};

export default index;

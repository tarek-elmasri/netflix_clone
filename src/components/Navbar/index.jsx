import "./styles.css";
import netflixLogo from "../../assets/netflix.png";
import avatarImg from "../../assets/avatar.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigator = useNavigate();
  const [show, setShow] = useState(false);

  const setTransition = () => {
    if (window.scrollY > 100) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", setTransition);
    return () => window.removeEventListener("scroll", setTransition);
  }, []);

  return (
    <>
      <nav className={`nav ${show && "nav__black"}`}>
        <div className="nav__content">
          <img
            className="nav__logo"
            src={netflixLogo}
            alt="Netflix"
            onClick={() => navigator("/")}
          />
          <img
            className="nav__avatar"
            src={avatarImg}
            alt="Profile"
            onClick={() => navigator("/profile")}
          />
        </div>
      </nav>
    </>
  );
};

export default Navbar;

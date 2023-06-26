import { useState } from "react";
import { useSelector } from "react-redux";
import { Loader, Navbar, Plans } from "../../components";
import firebaseApi from "../../api/firebaseApi";
import avatarImg from "../../assets/avatar.png";
import "./styles.css";

const ProfileScreen = () => {
  const user = useSelector((state) => state.user);

  // const [isRedirected, setIsRedirected] = useState(false);

  // if (isRedirected)
  //   return <Loader message="Please wait while generating your payment." />;

  return (
    <div className="profile">
      <Navbar />
      <div className="profile__body">
        <h1>Edit Profile</h1>
        <div className="profile__info">
          <img src={avatarImg} alt="profile" />
          <div className="profile__details">
            <h2 style={{ color: "#fff" }}>{user.email}</h2>
            <div className="profile__plans">
              <h3>Plans</h3>
              <Plans /*setIsRedirected={setIsRedirected}*/ />
              <button
                className="profile__signout"
                onClick={() => firebaseApi.logout()}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;

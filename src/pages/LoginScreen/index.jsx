import "./styles.css";
import loginLogo from "../../assets/login_logo.png";
import { useState } from "react";
import { firebaseApi } from "../../api";
import Auth from "../../components/Auth";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const LoginScreen = () => {
  const user = useSelector((state) => state.user);

  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");

  if (user.loggedIn) return <Navigate to="/" />;

  return (
    <div className="login">
      <div>
        <img
          className="login__logo"
          src={loginLogo}
          alt="Netflix"
          onClick={() => firebaseApi.logout()}
        />
        <button className="login__button" onClick={() => setShowForm(true)}>
          Sign In
        </button>

        <div className="login__gradient" />
      </div>
      <div className="login__body">
        {showForm ? (
          <Auth type={"login"} initialEmailValue={email} />
        ) : (
          <>
            <h1>Unlimited films, TV programmes and more.</h1>
            <h2>Watch anywhere. Cancel at any time</h2>
            <h3>
              Ready to watch? Enter your email to create or restart your
              membership.
            </h3>

            <div className="login__input">
              <form className="login__form">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                />
                <button
                  className="login__getStarted"
                  onClick={() => setShowForm(true)}
                >
                  GET STARTED
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginScreen;

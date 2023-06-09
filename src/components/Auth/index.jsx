import { useState } from "react";
import { PulseLoader } from "react-spinners";
import PropTypes from "prop-types";
import "./styles.css";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";

const Auth = ({ type, initialEmailValue }) => {
  const { register, signIn, isLoading, error } = useFirebaseAuth("/");

  const [form, setForm] = useState({
    email: initialEmailValue ?? "",
    password: "",
    type: type ?? "login",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const isLogin = form.type !== "signup";

  return (
    <div className="signup">
      <form>
        <h1>{isLogin ? "Sign In" : "Sign Up"}</h1>
        {error && <p className="signup__error">* {error}</p>}
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
        />
        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          type="password"
        />
        <button
          disabled={isLoading}
          onClick={() => (isLogin ? signIn(form) : register(form))}
        >
          {isLoading ? (
            <PulseLoader size={10} color="#fff" />
          ) : isLogin ? (
            "Sign In"
          ) : (
            "Sign Up"
          )}
        </button>
        <h4>
          <span className="signup__gray">
            {isLogin ? "New to Netflix? " : "Already have account? "}
          </span>
          <span
            className="signup__link"
            onClick={() =>
              setForm((prev) => ({
                ...prev,
                type: isLogin ? "signup" : "login",
              }))
            }
          >
            {isLogin ? "Sign Up now." : "Sign In now."}
          </span>
        </h4>
      </form>
    </div>
  );
};

Auth.propTypes = {
  type: PropTypes.oneOf(["signup", "login"]),
  initialEmailValue: PropTypes.string,
};
export default Auth;

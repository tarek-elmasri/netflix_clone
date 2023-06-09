import { useNavigate } from "react-router-dom";
import { firebaseApi } from "../api";
import { useState } from "react";

const useFirebaseAuth = (redirectUrl) => {
  const redirect = useNavigate();

  const [form, setForm] = useState({
    isLoading: false,
    error: null,
  });

  const handleSignuopError = (error) => {
    const { code, message } = error;
    switch (code) {
      case "auth/invalid-email":
        return "Invalid Email Format.";
      case "auth/missing-email":
        return "Email is required.";
      case "auth/email-already-in-use":
        return "Email already in use.";
      case "auth/weak-password":
        return "Password must be at least of 6 characters.";
      case "auth/missing-password":
        return "Password is required.";

      default:
        return message;
    }
  };

  const register = async ({ email, password }) => {
    setForm((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      await firebaseApi.registerUser({
        email,
        password,
      });

      return redirect(redirectUrl ?? "/");
    } catch (error) {
      setForm((prev) => ({
        ...prev,
        isLoading: false,
        error: handleSignuopError(error),
      }));
    }
  };

  const signIn = async ({ email, password }) => {
    setForm((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      await firebaseApi.login({
        email,
        password,
      });

      return redirect(redirectUrl ?? "/");
    } catch (error) {
      setForm((prev) => ({
        ...prev,
        error: "Invalid Email or Password.",
        isLoading: false,
      }));
    }
  };

  return {
    isLoading: form.isLoading,
    error: form.error,
    register,
    signIn,
  };
};

export default useFirebaseAuth;

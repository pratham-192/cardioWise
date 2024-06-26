import React, { useState } from "react";
import mail_logo from "../assets/mail_logo.png";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { publicRoute } from "../Contexts/ProtectedRoute";
import bal_asha_team from "../assets/bal_asha_team.png";
import { useTranslation } from "react-i18next";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

function SignUp() {
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
 const [name, setName] = useState("");
  const [err, seterr] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const SignUpHandler = async () => {
    const response = await axios.post(
      `https://cvd-server.onrender.com/users/create`,
      {
        category: "user",
        name:name,
        email:email,
        password:pass
      }
    );
    if (response.data.email) {
      localStorage.setItem("userDetails", JSON.stringify(response.data));
      navigate("/cvd");
    }else {
        seterr("User already exists");
        return;
      }
    
  }
  return (
    <div className="h-screen w-screen fixed inset-0 bg-white">
      <div className="h-screen w-screen flex justify-center items-center sm:grid sm:grid-cols-3">
        <div className="h-0 sm:h-screen">
          <img src={bal_asha_team} className="h-full sm:block hidden" />
        </div>
        <div className="col-span-2 w-full flex flex-col justify-center items-center">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img className="h-20" src={mail_logo} alt="logo" />
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                {t("Sign in to your account")}
              </h1>
              <GoogleOAuthProvider clientId="76573299231-pjd4utiu7shkk8em0b4m8gpej0cfp4eo.apps.googleusercontent.com">
              <GoogleLogin
  onSuccess={async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      console.log(decoded);

      const response2 = await axios.post(
        `https://cvd-server.onrender.com/users/get_user_google`,
        {
          email: decoded.email,
          name: decoded.given_name,
        }
      );
      console.log(response2);
      if (response2.data.email) {
        localStorage.setItem("userDetails", JSON.stringify(response2.data));
        navigate("/cvd");
      } else {
        seterr("email and password don't match");
        return;
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>

                </GoogleOAuthProvider>
              <div className="space-y-4 md:space-y-6">
              <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {t("Name")}
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="abcd"
                    value={name}
                    required=""
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {t("Email")}
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="abcd@gmail.com"
                    value={email}
                    required=""
                    onChange={(e) => setemail(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {t("Password")}
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    value={pass}
                    onChange={(e) => setpass(e.target.value)}
                  />
                </div>
                <div className="text-red-500 text-sm">{err}</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div
                      className="ml-3 text-sm"
                      onClick={() => navigate("/forgot-password")}
                    >
                      <label
                        htmlFor="remember"
                        className="text-gray-700 dark:text-gray-300 cursor-pointer hover:underline"
                      >
                        {t("Forgot Password")}?
                      </label>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-slate-100 bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  onClick={() => SignUpHandler()}
                >
                  {t("Sign Up")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default publicRoute(SignUp);

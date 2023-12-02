import React, { useState } from "react";
import mail_logo from "../assets/mail_logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { publicRoute } from "../Contexts/ProtectedRoute";
import { useTranslation } from "react-i18next";

function Login() {
  const [email, setemail] = useState("");
  const [err, seterr] = useState("");
  const [success, setsuccess] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const forgotPasswordHandler = async () => {
    const response = await axios.post(
      `https://cvd-server.onrender.com/users/reset_password`,
      {
        email: email,
      }
    );
    if (!response.data.message) {
      seterr("No user with this email exists");
      setsuccess("");
    } else {
      setsuccess("Mail sent succcesfully redirecting to login page...");
      seterr("");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  };

  return (
    <div className="h-screen w-screen fixed inset-0 bg-black">
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img className="h-20" src={mail_logo} alt="logo" />
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                {t("Enter your user id")}
              </h1>
              <div className="space-y-4 md:space-y-6">
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
                <div className="text-red-500 text-sm">{err}</div>
                <div className="text-green-500 text-sm">{success}</div>
                <button
                  type="submit"
                  className="w-full text-slate-100 bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  onClick={() => forgotPasswordHandler()}
                >
                  {t("Send Credentials")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default publicRoute(Login);

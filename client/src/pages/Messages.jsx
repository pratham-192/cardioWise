import React, { useState, useEffect } from "react";
import { Header } from "../components";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { TiTick } from "react-icons/ti";
import { protectedRoute } from "../Contexts/ProtectedRoute";
import MessagePopUp from "../components/Modal/MessagePopUp";
import PopUp from "../components/Modal/PopUp";

const Messages = () => {
  const [allMessages, setallMessages] = useState({});
  const { t } = useTranslation();
  const user = JSON.parse(localStorage.getItem("userDetails"));
  const [openMessagePopUp, setopenMessagePopUp] = useState(false);
  const [openPopUp, setopenPopUp] = useState(false);

  useEffect(async () => {
    if (!user) return;
    if (user.category === "admin") {
      const response = await axios.post(
        "https://cvd-server.onrender.com/users/message/get_message",
        {
          from_user_id: user._id,
        }
      );
      setallMessages(response.data.response);
    } else {
     
      const response = await axios.get(
        "https://cvd-server.onrender.com/users/get_messages",
      );
      setallMessages(response.data.response);
    }
  }, [user]);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl capitalize">
      {user.category === "admin" ? (
        <Header category={t("Apps")} title={t("Notifications Sent")} />
      ) : (
        <Header category={t("Apps")} title={t("Notifications Received")} />
      )}
      
      {openMessagePopUp ? (
        <MessagePopUp
          setopenMessagePopUp={setopenMessagePopUp}
          to_user_id={user._id}
          to_user_name={user.name}
          setopenPopUp={setopenPopUp}
        />
      ) : (
        ""
      )}
      {openPopUp ? (
        <PopUp
          status={true}
          heading="Success"
          message="Notification sent succesfully"
          setopenPopUp={setopenPopUp}
        />
      ) : (
        ""
      )}
      {user.category==="admin"?( <div className="space-x-8 flex justify-around mt-32 md:mt-0 md:justify-center">
            <button
              className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
              onClick={() => setopenMessagePopUp(true)}
            >
              {t("send notification")}
            </button>
            
          </div>):("")}
      <ul className="w-full divide-y divide-gray-200 dark:divide-gray-700">
        {allMessages && allMessages.length
          ? allMessages.map((message, index) => {
              return (
                <li className="py-2 sm:py-4" key={index}>
                  <div
                    className={`flex sm:py-2 px-3 rounded py-1 items-center space-x-4 capitalize ${
                      message &&
                      message.seen &&
                      message.from_user &&
                      message.from_user._id === user._id
                        ? "bg-slate-50"
                        : ""
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900  dark:text-white">
                        {message && message.content}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {user.category === "admin"
                          ? message && message.to_user && message.to_user.name
                          : message &&
                            message.from_user &&
                            message.from_user.name}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-sm text-base text-gray-900 dark:text-white">
                      {/* {message &&
                      message.from_user &&
                      message.from_user._id === user._id ? (
                        <span
                          className={`pr-3 ${
                            message && message.seen
                              ? "text-blue-500"
                              : "text-slate-700"
                          }`}
                        >
                          <TiTick size={22} />
                        </span>
                      ) : (
                        ""
                      )} */}
                      {new Date(
                        message && message.createdAt
                      ).toLocaleTimeString("en-GB", {
                        hour: "numeric",
                        minute: "numeric",
                      })}
                      {", "}
                      {new Date(
                        message && message.createdAt
                      ).toLocaleDateString()}
                    </div>
                  </div>
                </li>
              );
            })
          : ""}
      </ul>
    </div>
  );
};
export default protectedRoute(Messages);

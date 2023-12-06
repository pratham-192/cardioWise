import React, { useState, useEffect } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { Button } from ".";
import { useStateContext } from "../Contexts/ContextProvider";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Notification = () => {
  const { currentColor } = useStateContext();
  const { t } = useTranslation();
  const [messages, setmessages] = useState();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userDetails"));

  const seeAllMessageHandler = async () => {
    navigate("/notifications");
  };

  useEffect(async () => {
    if(user.category==="user"){
      const response = await axios.get(
        "https://cvd-server.onrender.com/users/get_messages",
        
      );
      setmessages(response.data.response);
    }
  }, []);

  return (
    <div className="nav-item absolute right-5 md:right-40 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <p className="font-semibold text-lg dark:text-gray-200">
            {t("Notifications")}
          </p>
          <button
            type="button"
            className="text-white text-xs rounded p-1 px-2 bg-orange-theme "
          >
            {" "}
            {messages ? messages.length : "0"} New
          </button>
        </div>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="mt-5 ">
        {messages?.map((message, index) => {
          return (
            <div
              key={index}
              className="flex items-center leading-8 gap-5 border-b-1 border-color p-3"
            >
              <div>
                <p className="font-semibold dark:text-gray-200">
                  {message.content}
                </p>
               
                <p className="text-gray-500 text-sm dark:text-gray-400">
                  {new Date(message.createdAt).toLocaleTimeString("en-GB", {
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </p>
              </div>
            </div>
          );
        })}
        <div className="mt-5" onClick={() => seeAllMessageHandler()}>
          {user.category==="admin"?(<Button
            color="white"
            bgColor={currentColor}
            text={t("send notification")}
            borderRadius="10px"
            width="full"
          />):(<Button
            color="white"
            bgColor={currentColor}
            text={t("see all notification")}
            borderRadius="10px"
            width="full"
          />)}
          
        </div>
      </div>
    </div>
  );
};

export default Notification;

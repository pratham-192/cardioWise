import axios from "axios";
import React, { useState } from "react";
import { AiFillMessage } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import { useTranslation } from "react-i18next";

export default function MessagePopUp({
  setopenMessagePopUp,

  setopenPopUp,
}) {
  const [message, setmessage] = useState("");
  const { t } = useTranslation();

  const sendMessageHandler = async () => {
    await axios.post("https://cvd-server.onrender.com/users/message/create", {
      content: message,
      from_user_id: JSON.parse(localStorage.getItem("userDetails"))._id,
    });
    setopenPopUp(true);
    setopenMessagePopUp(false);
  };
  return (
    <div className="z-50 h-screen w-screen fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center overflow-y-hidden">
      <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
        <div className="">
          <div
            className="flex justify-end items-center hover:text-slate-400 cursor-pointer"
            onClick={() => setopenMessagePopUp(false)}
          >
            <ImCross />
          </div>
          <div>
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-400 text-slate-100">
              <AiFillMessage size={20} />
            </div>
            <div className="mt-3 text-center font-semibold">
              {t("Send notification")} 
            </div>
            <div className="mt-3 sm:mt-5">
              <label htmlFor="full_name" className="text-sm">
                {t("Content")}
              </label>
              <textarea
                rows="5"
                className="pt-2 border mt-1 rounded px-4 w-full bg-gray-50"
                value={message}
                onChange={(e) => setmessage(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="mt-5 mr-1 sm:mt-6">
            <button
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 sm:text-sm"
              onClick={() => sendMessageHandler()}
            >
              {t("Send Message")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

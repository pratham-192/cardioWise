import React, { useState, useEffect } from "react";
import { Header } from "../components";
import { useTranslation } from "react-i18next";
import axios from "axios";

const ChatBot = () => {
  const { t } = useTranslation();

  const [messageHistory, setmessageHistory] = useState(
    "Bot: Hey! How can I help you?"
  );
  // {'role':'bot', 'content':'Hey! How can I help you?'}
  const [messageArr, setmessageArr] = useState([]);
  const [userMessage, setuserMessage] = useState("");
  const [messageSent, setmessageSent] = useState(false);
console.log(messageArr)
  const sendMessageHandler = async () => {
    setmessageSent(true);
    // var newmessageHistory = messageHistory + "\n" + "Worker: " + userMessage;
    messageArr.push({'role':'user','content':userMessage})
    console.log(messageArr)
    const response = await axios.post(
      "https://cvd-server.onrender.com/users/chat",
      {
        messages: messageArr,
      }
    );
    console.log(response);
    // newmessageHistory = newmessageHistory + "\nBot: ";
    // newmessageHistory = newmessageHistory + response.data;
    setmessageSent(false);
    // setmessageHistory(newmessageHistory);
  };

  // useEffect(() => {
  //   const conversationArray = messageHistory.split("\n");
  //   const newmessageArr = [];

  //   for (const message of conversationArray) {
  //     if (message.startsWith("Bot:")) {
  //       newmessageArr.push({ from: "bot", message: message.slice(4).trim() });
  //     } else if (message.startsWith("Worker:")) {
  //       newmessageArr.push({
  //         from: "worker",
  //         message: message.slice(7).trim(),
  //       });
  //     }
  //   }
  //   setmessageArr(newmessageArr);
  // }, [messageHistory]);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl ">
      <Header category={t("App")} title={t("Chat Bot")} />
      <div>
        <div className="flex h-screen antialiased text-gray-800">
          <div className="flex flex-row h-full w-full overflow-x-hidden">
            <div className="flex flex-col flex-auto h-full p-6">
              <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
                <div className="flex flex-col h-full overflow-x-auto mb-4">
                  <div className="flex flex-col h-full">
                    <div className="grid grid-cols-12 gap-y-2">
                      {messageArr && messageArr.length
                        ? messageArr.map((message) => {
                            if (message.role === "bot")
                              return (
                                <div className="col-start-1 col-end-8 p-3 rounded-lg">
                                  <div className="flex flex-row items-center">
                                    <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                      <div>{message.content}</div>
                                    </div>
                                  </div>
                                </div>
                              );
                            else
                              return (
                                <div className="col-start-6 col-end-13 p-3 rounded-lg">
                                  <div className="flex items-center justify-start flex-row-reverse">
                                    <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                                      <div>{message.content}</div>
                                    </div>
                                  </div>
                                </div>
                              );
                          })
                        : ""}

                      {messageSent ? (
                        <div className="col-start-6 col-end-13 p-3 rounded-lg">
                          <div className="flex items-center justify-start flex-row-reverse">
                            <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                              <div>{userMessage}</div>
                            </div>
                          </div>
                        </div>
                        
                      ) : (
                        ""
                      )}
                      {messageSent ? (
                        <div className="col-start-1 col-end-8 p-3 rounded-lg">
                        <div className="flex flex-row items-center">
                          <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                            <div>...</div>
                          </div>
                        </div>
                      </div>
                        
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                  <div className="flex-grow ml-4">
                    <div className="relative w-full">
                      <input
                        type="text"
                        className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                        placeholder="Type your message here"
                        value={userMessage}
                        onChange={(e) => setuserMessage(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="ml-4">
                    <button
                      className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                      onClick={() => sendMessageHandler()}
                    >
                      <span>Send</span>
                      <span className="ml-2">
                        <svg
                          className="w-4 h-4 transform rotate-45 -mt-px"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          ></path>
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;

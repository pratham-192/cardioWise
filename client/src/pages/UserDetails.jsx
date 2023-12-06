import React, { useEffect, useState } from "react";
import { Header } from "../components";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import UpdateWorkerPopUp from "../components/Modal/UpdateWorkerPopUp";
import { useTranslation } from "react-i18next";
// import MessagePopUp from "../components/Modal/MessagePopUp";
import PopUp from "../components/Modal/PopUp";
import { adminRoute, managerRoute } from "../Contexts/ProtectedRoute";

const UserDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const workerId = location.search.substring(4);
  const [cvdHistory, setCvdHistory] = useState([]);
const [workerJoinDate, setworkerJoinDate] = useState()
  const [workerDetails, setworkerDetails] = useState({});
  // const [openupdateWorker, setopenupdateWorker] = useState(false);
  const [imageUrl, setimageUrl] = useState("");
  // const [openMessagePopUp, setopenMessagePopUp] = useState(false);
  // const [openPopUp, setopenPopUp] = useState(false);
  const { t } = useTranslation();

  useEffect(async () => {
    const response = await axios.post(
      "https://cvd-server.onrender.com/users/getuserbyemail",
      {
        user_id: workerId,
      }
    );
    setworkerDetails(response.data.response);
    const response2 = await axios.post(
      "https://cvd-server.onrender.com/users/get_image",
      {
        user_id: workerId,
      }
    );
    setworkerJoinDate(response.data.response.createdAt.substring(0,10));
    // console.log(response)
    if (response2.data && response2.data.response) {
      const uint8Array = new Uint8Array(response2.data.response.data);
      const blob = new Blob([uint8Array]);
      setimageUrl(URL.createObjectURL(blob));
    }
    const res=await axios.post(
      "https://cvd-server.onrender.com/users/cvd_history",{
        email:workerId
      }
    )
    setCvdHistory(res.data.response);
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl ">
      <div className="flex justify-start items-center mb-7">
        <button
          className="hover:text-slate-500"
          onClick={() => navigate("/users")}
        >
          <FaArrowLeft />
        </button>
      </div>
      {/* {openupdateWorker ? (
        <UpdateWorkerPopUp
          setopenupdateWorker={setopenupdateWorker}
          workerDetails={workerDetails}
        />
      ) : (
        ""
      )} */}
      {/* {openMessagePopUp ? (
        <MessagePopUp
          setopenMessagePopUp={setopenMessagePopUp}
          to_user_id={workerDetails._id}
          to_user_name={workerDetails.name}
          setopenPopUp={setopenPopUp}
        />
      ) : (
        ""
      )}
      {openPopUp ? (
        <PopUp
          status={true}
          heading="Success"
          message="Message sent succesfully"
          setopenPopUp={setopenPopUp}
        />
      ) : (
        ""
      )} */}
      <Header title={t("user details")} />
      <div className="p-8 bg-white mt-16 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="grid grid-cols-2 text-center order-last md:order-first mt-20 md:mt-0">
            <div>
              <p className="font-bold text-gray-700 text-xl">
                {workerDetails && workerDetails.category}
              </p>
              <p className="text-gray-400">{t("category")}</p>
            </div>
            <div>
              <p className="font-bold text-gray-700 text-xl">
                {workerDetails && workerDetails.zone}
              </p>
              <p className="text-gray-400">{t("Zone")}</p>
            </div>
            {/* <div>
                <p className="font-bold text-gray-700 text-xl">89</p>
                <p className="text-gray-400">{t('Comments')}</p>
              </div> */}
          </div>
          <div className="relative">
            <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
              {imageUrl ? (
                <img src={imageUrl} className="h-48 w-48 rounded-full" />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-24 w-24"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          </div>
          <div className="space-x-8 flex justify-around mt-32 md:mt-0 md:justify-center">
            <div>
              <p className="font-bold text-gray-700 text-xl">
                {workerDetails && workerDetails.contactNo}
              </p>
              <p className="text-gray-400">{t("contact no")}</p>
            </div>
            <div>
              <p className="font-bold text-gray-700 text-xl">
                {workerDetails && workerDetails.CVDScore}
              </p>
              <p className="text-gray-400">{t("cvd score")}</p>
            </div>
          </div>
          {/* <div className="space-x-8 flex justify-around mt-32 md:mt-0 md:justify-center">
            <button
              className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
              onClick={() => setopenMessagePopUp(true)}
            >
              {t("Message")}
            </button>
            <button
              className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
              onClick={() => setopenupdateWorker(true)}
            >
              {t("Edit Details")}
            </button>
          </div> */}
        </div>
        <div className="mt-20 text-center border-b pb-12">
          <h1 className="text-4xl font-medium text-gray-700">
            {workerDetails && workerDetails.name}
            {/* <span className="font-light text-gray-500">27</span> */}
          </h1>
          <p className="font-light text-gray-600 mt-3 lowercase">
            {workerDetails && workerDetails.email}
          </p>
          {/* <p className="mt-8 text-gray-500">
            {workerDetails && workerDetails.address}
          </p> */}
        </div>
        <div className="mt-12 flex flex-col justify-center">
          {workerDetails ? (
            <div className="pl-3 text-lg font-bold">{t("other details")}</div>
          ) : (
            ""
          )}
          <ul className="w-full divide-y divide-gray-200 dark:divide-gray-700 ">
            
                  <li
                    className="py-2 my-2 sm:py-4 capitalize mt-2 cursor-pointer hover:bg-slate-100 px-3 rounded"
                    
                  >
                    <div className="flex items-center space-x-4 capitalize">
                  
                      <div className="flex-1 min-w-0 ">
                      <p className="text-gray-400">{t("aadhar card no")}</p>
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          {workerDetails.aadharCardNo}
                        </p>
                       
                      </div>
                      
                      
                    </div>
                  </li>
                  <li
                    className="py-2 my-2 sm:py-4 capitalize mt-2 cursor-pointer hover:bg-slate-100 px-3 rounded"
                    
                  >
                    <div className="flex items-center space-x-4 capitalize">
                  
                    <div className="flex-1 min-w-0 ">
                      <p className="text-gray-400">{t("Address")}</p>
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          {workerDetails.address}
                        </p>
                       
                      </div>
                      
                      
                    </div>
                  </li>
                  <li
                    className="py-2 my-2 sm:py-4 capitalize mt-2 cursor-pointer hover:bg-slate-100 px-3 rounded"
                    
                  >
                    <div className="flex items-center space-x-4 capitalize">
                  
                    <div className="flex-1 min-w-0 ">
                      <p className="text-gray-400">{t("join date")}</p>
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          {workerJoinDate}
                        </p>
                       
                      </div>
                      
                      
                    </div>
                  </li>
                      
                
          </ul>
        </div>
        <div className="mt-12 flex flex-col justify-center">
          {workerDetails &&
          cvdHistory &&
          cvdHistory.length ? (
            <div className="pl-3 text-lg font-bold">{t("history")}</div>
          ) : (
            ""
          )}
          <ul className="w-full divide-y divide-gray-200 dark:divide-gray-700 ">
            {workerDetails &&
              cvdHistory &&
              cvdHistory.map((history) => {
                return (
                  <li
                    className="py-2 my-2 sm:py-4 capitalize mt-2 cursor-pointer hover:bg-slate-100 px-3 rounded"
                    onClick={() =>
                      navigate(`/cvd-details?id=${history._id}` , { state: { workerId } })
                    }
                  >
                    <div className="flex items-center space-x-4 capitalize">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          {history.CVDScore===-1?"Not calculated":history.CVDScore}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {t("cvd score")}
                        </p>
                      </div>
                      <div className="inline-flex items-center text-sm text-base font-semibold text-gray-900 dark:text-white">
                        <div className="flex gap-2 justify-center items-center text-gray-700 capitalize">
                          <p>
                            {history.CVDScore > 0.5 ? (
                              <p className="h-3 w-3 rounded-full bg-red-400"></p>
                            ) : (
                              <p>
                                
                                  <p className="h-3 w-3 rounded-full bg-green-400"></p>
                              
                                 
                                
                              </p>
                            )}
                          </p>
                          <p>{history.CVDScore>0.5?t("dangerous"):t("okay")}</p>
                        </div>
                      </div>
                      <div className="inline-flex items-center text-sm text-base font-semibold text-gray-900 dark:text-white">
                        {t(`${history.createdAt.substring(0,10)}`)}
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default adminRoute(UserDetails);

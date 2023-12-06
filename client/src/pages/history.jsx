import axios from "axios";
import React, { useState, useEffect } from "react";
import { Header } from "../components";
import PopUp from "../components/Modal/PopUp";
import { useTranslation } from "react-i18next";
import { protectedRoute } from "../Contexts/ProtectedRoute";
import { useNavigate } from "react-router-dom";
const History = () => {
  const navigate = useNavigate();
  const currentuser = JSON.parse(localStorage.getItem("userDetails"));
  const [cvdHistory, setCvdHistory] = useState([])
  const [userId, setuserId] = useState(currentuser.email);
  // console.log(userId)
  const [userName, setuserName] = useState(currentuser.name);
  const [userEmail, setuserEmail] = useState(currentuser.email);
  const [userCat, setuserCat] = useState(currentuser.category);
  const [userPass, setuserPass] = useState(currentuser.password);
  const [userZone, setuserZone] = useState(currentuser.zone);
  const [userAddress, setuserAddress] = useState(currentuser.address);
  const [userAadhar, setuserAadhar] = useState(currentuser.aadharCardNo);
  const [userContact, setuserContact] = useState(currentuser.contactNo);
  const [avatar, setavatar] = useState();
  const { t } = useTranslation();

  const [openPopUp, setopenPopUp] = useState(false);


  useEffect(async() => {
    const res=await axios.post(
      "https://cvd-server.onrender.com/users/cvd_history",{
        email:currentuser.email
      }
    )
    setCvdHistory(res.data.response);
  }, [])
  
  

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl ">
      <Header category={t("App")} title={t("Your CVD History")} />
      
        <div className="container max-w-screen-lg mx-auto">
          
        <div className="mt-12 flex flex-col justify-center">
          
          <ul className="w-full divide-y divide-gray-200 dark:divide-gray-700 ">
            {currentuser &&
              cvdHistory &&
              cvdHistory.map((history) => {
                return (
                  <li
                    className="py-2 my-2 sm:py-4 capitalize mt-2 cursor-pointer hover:bg-slate-100 px-3 rounded"
                    onClick={() =>
                      navigate(`/cvd-details?id=${history._id}`)
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

export default protectedRoute(History);

import React, { useEffect, useState } from "react";
import { Header } from "../components";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaSave } from "react-icons/fa";
import axios from "axios";
import PopUp from "../components/Modal/PopUp";
import { useTranslation } from "react-i18next";
import { MdDelete } from "react-icons/md";
// import ConfirmPopUp from "../components/Modal/ConfirmPopUp";

const ChildDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const historyId = location.search.substring(4);
const [historyDetails, setHistoryDetails] = useState({});
  const { t } = useTranslation();
  const user = JSON.parse(localStorage.getItem("userDetails"));
  if (!user ) navigate("/login");

useEffect(async () => {
  const response=await axios.post("https://cvd-server.onrender.com/users/cvd_report",
  {report_id:historyId})
setHistoryDetails(response.data.response);
  
}, [])

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl ">
      {/* {openConfirmPopUp == 3 ? (
        <ConfirmPopUp
          message={"Are you sure you want to delete this document"}
          heading={"Delete Document"}
          setopenConfirmPopUp={setopenConfirmPopUp}
        />
      ) : (
        ""
      )} */}
      {/* {showMissingReport ? (
        <MissingReport
          childDetails={childDetails}
          setshowMissingReport={setshowMissingReport}
          imageUrl={imageUrl}
        />
      ) : (
        ""
      )} */}
      <div className="flex justify-start items-center mb-7">
        <button
          className="hover:text-slate-500"
          onClick={() => {
            if (user && user.category==="admin" && location.state) navigate(`/user-details?id=${location.state.workerId}`);
            else navigate("/edit-profile");
          }}
        >
          <FaArrowLeft />
        </button>
      </div>
      {/* {openEditDetails ? (
        <UpdateChildPopUp
          childDetails={childDetails}
          setopenEditDetails={setopenEditDetails}
        />
      ) : (
        ""
      )}
      {openPopUp ? (
        <PopUp
          setopenPopUp={setopenPopUp}
          status={popUpDetails.status}
          message={popUpDetails.message}
          heading={popUpDetails.heading}
        />
      ) : (
        ""
      )} */}
      <Header title={t("cvd test details")} />
      <div className="p-8 bg-white mt-16 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 pt-10">
          {/* <div className="relative">
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
          </div> */}
          <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
            <div>
              <p className="font-bold text-gray-700 text-md">
                {historyDetails && historyDetails.CVDScore===-1?"Not Calculated":historyDetails.CVDScore}
              </p>
              <p className="text-gray-400">{t("cvd score")}</p>
            </div>
            {/* <div>
              <p className="font-bold text-gray-700 text-md capitalize">
                {historyDetails && historyDetails.caseStatus}
              </p>
              <p className="text-gray-400">{t("Status")}</p>
            </div> */}
            
          </div>
          {/* <div className="flex justify-between text-md mt-32 md:mt-0 md:justify-center">
            <button
              className="text-white py-2 px-4 mr-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 capitalize"
              onClick={() => setshowMissingReport(true)}
            >
              {t("Generate Missing Report")}
            </button>
            <button
              className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 capitalize"
              onClick={() => setopenEditDetails(true)}
            >
              {t("Edit Details")}
            </button>
            <div>
              <p className="font-bold text-gray-700 text-md capitalize">
                {historyDetails && historyDetails.childClassification}
              </p>
              <p className="text-gray-400">{t("Classification")}</p>
            </div>
          </div> */}
        </div>
        <div className=" text-center border-b pb-6">
          {/* <h1 className="text-4xl font-medium text-gray-700">
            {historyDetails && historyDetails.childName}{" "}
          </h1>
          <p className="font-light text-lg text-gray-600 mt-3">
            {historyDetails && historyDetails.shelterHome}
          </p>
          <p className="mt-8 text-gray-500">
            {childDetails && childDetails.district},{" "}
            {childDetails && childDetails.state}
          </p> */}
        </div>
         <div className="mt-6 flex flex-col">
          
          <p className="text-gray-800 font-light p-1 lg:mx-16 border-b-2 py-4">
            {t("Email")} :{" "}
            <span className="text-slate-600 font-bold">
              {historyDetails && historyDetails.email}
            </span>
          </p>
          <p className="text-gray-800 font-light p-1 lg:mx-16 border-b-2 py-4">
            {t("Would you say that in general, your health is")} :{" "}
            <span className="text-slate-600 font-bold">
              {historyDetails &&
                (historyDetails.generalHealth === 5
                  ? t('very good')
                  : historyDetails.generalHealth === 4
                  ? t('good')
                  : historyDetails.generalHealth === 3
                  ? t('excellent')
                  : historyDetails.generalHealth === 2
                  ? t('fair')
                  : historyDetails.generalHealth === 1
                  ? t('poor')
                  : '')}
            </span>
          </p>
          <p className="text-gray-800 font-light p-1 lg:mx-16 border-b-2 py-4">
            {t("During the past month, other than your regular job, did you participate in any physical activities or exercises such as running, calisthenics, golf, gardening, or walking for exercise?")} :{" "}
            <span className="text-slate-600 font-bold">
              {historyDetails && historyDetails.exercise===1?t("yes"):t("no")}
            </span>
          </p>
          
          <p className="text-gray-800 font-light p-1 lg:mx-16 border-b-2  py-4">
            {t("(Ever told) (you had) skin cancer?")} :
            <span className="text-slate-600 font-bold py-4 pb-5 p-1">
              {historyDetails && historyDetails.skinCancer===1?t("yes"):t("no")}
            </span>
          </p>
          <p className="text-gray-800 font-light p-1 lg:mx-16 border-b-2 py-4">
            {t("(Ever told) (you had) any other types of cancer?")} :{" "}
            <span className="text-slate-600 font-bold">
              {historyDetails && historyDetails.otherCancer===1?t("yes"):t("no")}
            </span>
          </p>
          <p className="text-gray-800 font-light p-1 lg:mx-16 border-b-2 py-4">
            {t("(Ever told) (you had) a depressive disorder (including depression, major depression, dysthymia, or minor depression)?")} :{" "}
            <span className="text-slate-600 font-bold">
              {historyDetails && historyDetails.depression===1?t("yes"):t("no")}
            </span>
          </p>
          <p className="text-gray-800 font-light p-1 lg:mx-16 border-b-2 py-4">
            {t("(Ever told) (you had) diabetes?")} :{" "}
            <span className="text-slate-600 font-bold">
              {historyDetails && historyDetails.diabetes===1?t("yes"):t("no")}
            </span>
          </p>
          <p className="text-gray-800 font-light p-1 lg:mx-16 border-b-2 py-4">
            {t("(Ever told) (you had) some form of arthritis, rheumatoid arthritis, gout, lupus, or fibromyalgia?")} :{" "}
            <span className="text-slate-600 font-bold">
              {historyDetails && historyDetails.arthritis===1?t("yes"):t("no")}
            </span>
          </p>
          <p className="text-gray-800 font-light p-1 lg:mx-16 border-b-2 py-4">
            {t("Sex")} :{" "}
            <span className="text-slate-600 font-bold">
              {historyDetails && historyDetails.sex===1?t("yes"):t("no")}
            </span>
          </p>
          <p className="text-gray-800 font-light p-1 lg:mx-16 border-b-2 py-4">
            {t("In what Age category do you belong?")} :{" "}
            <span className="text-slate-600 font-bold">
            {historyDetails && historyDetails.ageCategory}
            </span>
          </p>
          <p className="text-gray-800 font-light p-1 lg:mx-16 border-b-2 py-4">
            {t("Have you smoked at least 100 cigarettes in your entire life?")} :{" "}
            <span className="text-slate-600 font-bold">
              {historyDetails && historyDetails.smokingHistory===1?t("yes"):t("no")}
            </span>
          </p>
          <p className="text-gray-800 font-light p-1 lg:mx-16 border-b-2 py-4">
            {t("About how long has it been since you last visited a doctor for a routine checkup?")} :{" "}
            <span className="text-slate-600 font-bold">
              {historyDetails &&
                (historyDetails.checkup === 1
                  ? t('within the past year')
                  : historyDetails.checkup === 2
                  ? t('within the past 2 years')
                  : historyDetails.checkup === 3
                  ? t('within the past 5 years')
                  : historyDetails.checkup === 4
                  ? t('5 or more years ago')
                  : historyDetails.checkup === 0
                  ? t('never')
                  : '')}
            </span>
          </p>
          <p className="text-gray-800 font-light p-1 lg:mx-16 border-b-2 py-4">
            {t("How tall are you? (cm)")} :{" "}
            <span className="text-slate-600 font-bold">
              {historyDetails && historyDetails.height}
            </span>
          </p>
          <p className="text-gray-800 font-light p-1 lg:mx-16 border-b-2 py-4">
            {t("weight (Kg)")} :{" "}
            <span className="text-slate-600 font-bold">
              {historyDetails && historyDetails.weight}
            </span>
          </p>
          <p className="text-gray-800 font-light p-1 lg:mx-16 border-b-2 py-4">
            {t("During the past 30 days, how many days did you have at least one drink of any alcoholic beverage such as beer, wine, a malt beverage or liquor?")} :{" "}
            <span className="text-slate-600 font-bold">
              {historyDetails && historyDetails.alcoholConsumption}
            </span>
          </p>
          <p className="text-gray-800 font-light p-1 lg:mx-16 border-b-2 py-4">
            {t("Not including juices, how often did you eat fruit (past 30 days)?")} :{" "}
            <span className="text-slate-600 font-bold">
              {historyDetails && historyDetails.fruitConsumption}
            </span>
          </p>
          <p className="text-gray-800 font-light p-1 lg:mx-16 border-b-2 py-4">
            {t("How often did you eat a green leafy or lettuce salad, with or without other vegetables?")} :{" "}
            <span className="text-slate-600 font-bold">
              {historyDetails && historyDetails.greenVegetablesConsumption}
            </span>
          </p>
          <p className="text-gray-800 font-light p-1 lg:mx-16 border-b-2 py-4">
            {t("How often did you eat any kind of fried potatoes, including French fries, home fries, or hash browns?")} :{" "}
            <span className="text-slate-600 font-bold">
              {historyDetails && historyDetails.friedPotatoConsumption}
            </span>
          </p>
          {/* <p className="text-gray-800 font-bold p-1 lg:mx-16 border-b-2 py-4">
            {t("All uploaded Documents")} :{" "}
            {allDocuments && allDocuments.length
              ? allDocuments.map((document) => {
                  return (
                    <div
                      className="text-slate-600 font-light p-2 mt-1 hover:bg-slate-100 rounded flex justify-between items-center"
                      key={document.docId}
                    >
                      <span
                        className="hover:underline cursor-pointer"
                        onClick={() => downloadDocumentHandler(document.docId)}
                      >
                        {document.name}
                      </span>
                      <span
                        className="text-red-500 cursor-pointer hover:text-red-400"
                        onClick={() => {
                          setdltDocId(document.docId);
                          setopenConfirmPopUp(3);
                        }}
                      >
                        <MdDelete size={25} />
                      </span>
                    </div>
                  );
                })
              : ""}
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default ChildDetails;

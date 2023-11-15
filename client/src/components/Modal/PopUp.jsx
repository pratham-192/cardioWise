import React from "react";
import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import { useTranslation } from "react-i18next";

export default function PopUp({ message, heading, status, setopenPopUp }) {
  const { t } = useTranslation();
  return (
    <div className="z-50 h-screen w-screen fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center overflow-y-hidden">
      <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
        {status ? (
          <div>
            <div>
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                <TiTick size={20} />
              </div>
              <div className="mt-3 text-center sm:mt-5">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {t(`${heading}`)}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{t(`${message}`)}</p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                onClick={() => {
                  setopenPopUp(false);
                }}
              >
                {t("Confirm")}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div>
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-300">
                <ImCross size={20} />
              </div>
              <div className="mt-3 text-center sm:mt-5">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {t(`${heading}`)}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{t(`${message}`)}</p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                onClick={() => {
                  setopenPopUp(false);
                }}
              >
                {t("Confirm")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { BsCheck } from "react-icons/bs";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { themeColors } from "../Data/dummy";
import { useStateContext } from "../Contexts/ContextProvider";
import { useTranslation } from "react-i18next";

const ThemeSettings = () => {
  const { setColor, setMode, currentMode, currentColor, setThemeSettings } =
    useStateContext();
  const { t, i18n } = useTranslation();
  return (
    <div className="bg-half-transparent w-screen fixed nav-item top-0 right-0">
      <div className="float-right h-screen dark:text-gray-200 bg-white dark:[#484bf2] w-400">
        <div className="flex justify-between items-center p-4 ml-4">
          <p className="font-semibold text-xl">{t("Settings")}</p>
          <button
            type="button"
            onClick={() => setThemeSettings(false)}
            style={{ color: "rgb(153, 171, 180", borderRadius: "50%" }}
            className="text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray"
          >
            <MdOutlineCancel />
          </button>
        </div>

        <div className="flex-col border-t-1 border-color p-4 ml-4">
          <p className="font-semibold text-lg">{t("Theme Options")}</p>

          <div className="mt-4">
            <input
              type="radio"
              id="light"
              name="theme"
              value="Light"
              onChange={setMode}
              className="cursor-pointer"
              checked={currentMode === "Light"}
            />
            <label htmlFor="light" className="ml-2 text-md cursor-pointer">
              {t("Light")}
            </label>
          </div>
          <div className="mt-4">
            <input
              type="radio"
              id="dark"
              name="theme"
              value="Dark"
              className="cursor-pointer"
              onChange={setMode}
              checked={currentMode === "Dark"}
            />
            <label htmlFor="dark" className="ml-2 text-md cursor-pointer">
              {t("Dark")}
            </label>
          </div>
        </div>
        <div className="flex-col border-t-1 border-color p-4 ml-4">
          <p className="font-semibold text-lg">{t("Theme Colors")}</p>
          <div className="flex gap-3">
            {themeColors.map((item, index) => (
              <TooltipComponent
                key={index}
                content={item.name}
                position="TopCenter"
              >
                <div
                  className="relative mt-2 cursor-pointer flex gap-5 items-center"
                  key={item.name}
                >
                  <button
                    type="button"
                    className="h-10 w-10 rounded-full cursor-pointer"
                    style={{ backgroundColor: item.color }}
                    onClick={() => setColor(item.color)}
                  >
                    <BsCheck
                      className={`ml-2 text-2xl text-white ${
                        item.color === currentColor ? "block" : "hidden"
                      }`}
                    />
                  </button>
                </div>
              </TooltipComponent>
            ))}
          </div>
        </div>
        <div className="flex-col border-t-1 border-color p-4 ml-4">
          <p className="font-semibold text-lg">{t("Language Options")}</p>

          <div className="mt-4">
            <input
              type="radio"
              id="english"
              value="en"
              onChange={() => i18n.changeLanguage("en")}
              className="cursor-pointer"
              checked={i18n.language === "en"}
            />
            <label htmlFor="english" className="ml-2 text-md cursor-pointer">
              English
            </label>
          </div>
          <div className="mt-4">
            <input
              type="radio"
              id="hindi"
              value="hi"
              className="cursor-pointer"
              onChange={() => i18n.changeLanguage("hi")}
              checked={i18n.language === "hi"}
            />
            <label htmlFor="hindi" className="ml-2 text-md cursor-pointer">
              हिंदी
            </label>
          </div>
          <div className="mt-4">
            <input
              type="radio"
              id="hindi"
              value="hi"
              className="cursor-pointer"
              onChange={() => i18n.changeLanguage("mr")}
              checked={i18n.language === "mr"}
            />
            <label htmlFor="hindi" className="ml-2 text-md cursor-pointer">
              मराठी
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;

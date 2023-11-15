import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import mail_logo from "../assets/mail_logo.png";
import { MdOutlineCancel } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { useTranslation } from "react-i18next";
import { links } from "../Data/dummy";
import { useStateContext } from "../Contexts/ContextProvider";

const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize, currentColor } =
    useStateContext();
  const { t } = useTranslation();
  const user = JSON.parse(localStorage.getItem("userDetails"));
  if (!user) {
    setActiveMenu(false);
  }

  const handleCloseSidebar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={handleCloseSidebar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <img src={mail_logo} className="h-20" />
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-10 ">
            {links.map((item) => {
              if (
                item.title === "Dashboard" &&
                user &&
                user.category !== "admin"
              )
                return "";
              else
                return (
                  <div key={item.title}>
                    <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                      {t(`${item.title}`)}
                    </p>
                    {item.links.map((link) => {
                      if (
                        user &&
                        user.category &&
                        link.allowed.includes(user.category)
                      ) {
                        return (
                          <NavLink
                            to={`/${link.name}`}
                            key={link.name}
                            onClick={handleCloseSidebar}
                            style={({ isActive }) => ({
                              backgroundColor: isActive ? currentColor : "",
                            })}
                            className={({ isActive }) =>
                              isActive ? activeLink : normalLink
                            }
                          >
                            {link.icon}
                            <span className="capitalize ">
                              {t(`${link.name}`)}
                            </span>
                          </NavLink>
                        );
                      } else {
                        return "";
                      }
                    })}
                  </div>
                );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;

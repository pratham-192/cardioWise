import React, { useState, useEffect } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Search,
  Inject,
  Toolbar,
  Sort,
  Filter
} from "@syncfusion/ej2-react-grids";
// import AddWorkerPopUp from "../components/Modal/AddWorkerPopUp";
import axios from "axios";
import { Header } from "../components";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { adminRoute, managerRoute } from "../Contexts/ProtectedRoute";

const Employees = () => {
  const [workerData, setworkerData] = useState([]);
  // const [openAddWorker, setopenAddWorker] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userDetails"));
  const { t } = useTranslation();

  useEffect(async () => {
    if (user && user.category === "admin") {
      const response = await axios.get(
        "https://cvd-server.onrender.com/users/all_users"
      );
      setworkerData(response.data.response);
    } 
  }, []);

  let grid;
  const rowSelected = () => {
    if (grid) {
      const selectedrecords = grid.getSelectedRecords();
      navigate(`/user-details?id=${selectedrecords[0].email}`);
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl capitalize">
      {/* {openAddWorker ? (
        <AddWorkerPopUp setopenAddWorker={setopenAddWorker} />
      ) : (
        ""
      )}
      <Header category={t("Page")} title={t("Workers")} />
      <button
        className="p-2 mb-2 font-light text-sm rounded px-5 hover:bg-slate-100 cursor-pointer w-32 flex justify-center items-center"
        onClick={() => setopenAddWorker(true)}
      >
        {t("Add New")} +
      </button> */}
      <GridComponent
        dataSource={workerData}
        allowPaging
        allowSorting
        toolbar={["Search"]}
        width="auto"
        rowSelected={rowSelected}
        ref={(g) => (grid = g)}
      >
        <ColumnsDirective>
          <ColumnDirective
            field="email"
            headerText={t("email")}
            format="C2"
            isPrimaryKey={true}
            width="100"
          ></ColumnDirective>
          <ColumnDirective
            field="name"
            headerText={t("Name")}
            width="120"
            textAlign="Left"
          ></ColumnDirective>
          <ColumnDirective
            field="category"
            headerText={t("Category")}
            width="120"
          ></ColumnDirective>
          <ColumnDirective
            field="CVDScore"
            headerText={t("cvd score")}
            width="120"
          ></ColumnDirective>
        </ColumnsDirective>
        <Inject services={[Page, Search, Toolbar, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};
export default adminRoute(Employees);

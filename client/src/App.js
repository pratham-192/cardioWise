import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import { Employees, Login,  EditProfile ,SignUp} from './pages';
import './App.css';
import './i18n'

import { useStateContext } from './Contexts/ContextProvider';
import ChildDetails from './pages/ChildDetails';
import WorkerDetails from './pages/WorkerDetails';
// import FlowManagement from './pages/FlowManagement';
// import { Calendar } from './pages';
import Messages from './pages/Messages';
import ForgotPassword from './pages/ForgotPassword';
// import ManageData from './pages/ManageData';
import ChatBot from './pages/ChatBot';
import CvdPredictionForm from './pages/cvd';

const App = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
            <TooltipComponent
              content="Settings"
              position="Top"
            >
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: '50%' }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>

            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            <div>
              {themeSettings && (<ThemeSettings />)}

              <Routes>
                <Route path="/notifications" element={(<Messages />)} />
                {/* <Route path="/calendar" element={(<Calendar />)} /> */}
                <Route path="/login" element={(<Login />)} />
                <Route path="/signup" element={(<SignUp />)} />
                <Route path="/edit-profile" element={<EditProfile />} />
                <Route path="/chat-bot" element={(<ChatBot />)} />
                <Route path="/forgot-password" element={(<ForgotPassword />)} />
                {/* <Route path="/analytics" element={(<Analytics />)} /> */}
                <Route path="/users" element={<Employees />} />
                <Route path="/user-details" element={<WorkerDetails />} />
                <Route path="/cvd" element={<CvdPredictionForm />} />
                {/* <Route path="/manage-data" element={<ManageData />} /> */}
                {/* <Route path="/cases" element={<Cases />} /> */}
                {/* <Route path="/progress" element={<Kanban />} /> */}
                
                {/* <Route path="/child-alloted" element={<ChildAlloted />} /> */}
                <Route path="/cvd-details" element={<ChildDetails />} />
                {/* <Route path="/flow-management" element={<FlowManagement />} /> */}
                {/* <Route path="/messages" element={<Messages />} /> */}
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
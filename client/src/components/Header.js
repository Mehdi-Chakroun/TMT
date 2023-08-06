import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { FaSignOutAlt, FaChartBar, FaUser, FaUserShield, FaBars, FaTimes } from 'react-icons/fa';
import RoleIcon from './RoleIcon';

const Header = () => {
    const role = localStorage.getItem('role');
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  
    const closeSidebar = () => {
      setIsSidebarOpen(false);
    };
  return (
    <>
    <header className="bg-gray-800 text-white">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">TMT</h1>
        </div>

        <div className="hidden md:flex md:items-center md:ml-4">
          <RoleIcon role={role} />

          <FaUser className="text-white mr-1 ml-4 text-xl" />
          <p className="mr-4">{`${firstName} ${lastName}`}</p>

          {role === 'ADMIN' || role === 'SUPER_ADMIN' ? (
            <>
              <Link to="/admin" className="mr-4 flex items-center">
                <FaUserShield className="mr-1" />
                Admin
              </Link>
            </>
          ) : null}

          <Link to="/dashboard" className="mr-4 flex items-center">
            <FaChartBar className="mr-1" />
            Dashboard
          </Link>

          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = '/';
            }}
            className="flex bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2 items-center"
          >
            <FaSignOutAlt className="text-white mr-2 text-xl" /> Logout
          </button>
        </div>

        <div className="md:hidden ml-4">
          <button
            onClick={toggleSidebar}
            className="text-white focus:outline-none focus:text-white"
          >
            <FaBars className="text-2xl" />
          </button>
        </div>
      </div>
    </header>

    {/* Sidebar */}
    {isSidebarOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-50">
        <div className="w-64 bg-gray-800 h-screen overflow-y-auto transform transition-transform ease-in-out duration-300">
          <div className="flex justify-between items-center p-4">
            <h1 className="text-2xl font-bold text-white">TMT</h1>
            <button
              onClick={closeSidebar}
              className="text-white focus:outline-none focus:text-white"
            >
              <FaTimes className="text-2xl" />
            </button>
          </div>
          <nav className="mt-4">
            <Link
              to="/dashboard"
              onClick={closeSidebar}
              className="flex items-center block py-2 px-4 text-white hover:bg-gray-700"
            >
              <FaChartBar className="mr-2" /> Dashboard
            </Link>
            {role === 'ADMIN' || role === 'SUPER_ADMIN' ? (
              <Link
                to="/admin"
                onClick={closeSidebar}
                className="flex items-center block py-2 px-4 text-white hover:bg-gray-700"
              >
                <FaUserShield className="mr-2" /> Admin
              </Link>
            ) : null}
            <button
              onClick={() => {
                localStorage.clear();
                window.location.href = '/';
              }}
              className="flex bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2 ml-3 mt-5 items-center"
            >
              <FaSignOutAlt className="text-white mr-2 text-xl" /> Logout
            </button>
          </nav>
        </div>
      </div>
    )}
  </>
  );
};

export default Header;

import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { FaSignOutAlt, FaChartBar, FaUser, FaUserShield, FaBars, FaTimes } from 'react-icons/fa';

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
    <header className="bg-blue-900 text-white py-4">
  <div className="container mx-auto flex justify-between items-center">
    <div className="text-3xl font-semibold ml-4">TMT</div>

    <div className="md:hidden m-4">
      <button
        onClick={toggleSidebar}
        className="text-2xl text-gray-300 focus:outline-none"
      >
        <FaBars />
      </button>
    </div>

    <div className="hidden md:flex items-center space-x-4">
      <div className="flex items-center">
        <FaUser className="text-xl mr-1" />
        <p className="text-lg">{`${firstName} ${lastName}`}</p>
      </div>

      {role === 'ADMIN' || role === 'SUPER_ADMIN' ? (
        <Link to="/admin" className="text-xl text-gray-300 hover:text-gray-500 flex items-center">
          <FaUserShield className="mr-1" />
          Admin
        </Link>
      ) : null}

      <Link to="/dashboard" className="text-xl text-gray-300 hover:text-gray-500 flex items-center">
        <FaChartBar className="mr-1" />
        Dashboard
      </Link>

      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = '/';
        }}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
      >
        <FaSignOutAlt className="text-xl" />
        Logout
      </button>
    </div>
  </div>
</header>

{isSidebarOpen && (
  <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50">
    <div className="w-64 h-screen overflow-y-auto bg-blue-900 text-white transform transition-transform ease-in-out duration-300">
      <div className="flex justify-between items-center p-4">
        <div className="text-3xl font-semibold">TMT</div>
        <button
          onClick={closeSidebar}
          className="text-2xl text-gray-400 hover:text-gray-200"
        >
          <FaTimes />
        </button>
      </div>
      <nav className="mt-4">
        <Link
          to="/dashboard"
          onClick={closeSidebar}
          className="text-xl text-gray-300 block py-2 px-4 hover:text-gray-500 flex items-center"
        >
          <FaChartBar className="mr-1" />
          Dashboard
        </Link>
        {role === 'ADMIN' || role === 'SUPER_ADMIN' ? (
          <Link
            to="/admin"
            onClick={closeSidebar}
            className="text-xl text-gray-300 block py-2 px-4 hover:text-gray-500 flex items-center"
          >
            <FaUserShield className="mr-1" />
            Admin
          </Link>
        ) : null}
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = '/';
          }}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg mt-4 flex items-center space-x-2 ml-4"
        >
          <FaSignOutAlt className="text-xl" />
          Logout
        </button>
      </nav>
    </div>
  </div>
)}
  </>
  );
};

export default Header;

import React from 'react';
import { Link } from 'react-router-dom';
import { FaSignOutAlt, FaChartBar, FaUser, FaUserShield } from 'react-icons/fa';
import RoleIcon from './RoleIcon';

const Header = () => {
    const role = localStorage.getItem('role');
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');

  return (
    <header className="flex items-center justify-between bg-gray-800 text-white p-4">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold">TMT</h1>
      </div>

      <div className="flex items-center">
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
        <button onClick={() => {
            localStorage.clear();
            window.location.href = '/';
            }} 
            className="flex bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2 items-center">
            <FaSignOutAlt className="text-white mr-2 text-xl" /> Logout
        </button>
      </div>
    </header>
  );
};

export default Header;

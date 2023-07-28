import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import { FaSignOutAlt } from 'react-icons/fa';
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
        <p className="mr-4">{`${firstName} ${lastName}`}</p>

        {/* Show links based on user's role */}
        {role === 'ADMIN' || role === 'SUPER_ADMIN' ? (
          <>
            {/* Link to Admin Page */}
            <Link to="/admin" className="mr-4">
              Admin
            </Link>
          </>
        ) : null}

        {/* Logout link */}
        <button onClick={() => {
            localStorage.clear();
            window.location.href = '/';
            }} 
            className="flex bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2 align-text-bottom">
            <FaSignOutAlt className="text-white mr-2 text-xl" /> Logout
        </button>
      </div>
    </header>
  );
};

export default Header;

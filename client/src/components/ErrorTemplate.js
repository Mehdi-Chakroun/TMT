import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import Header from './Header';
const ErrorTemplate = ({ errorMessage }) => {
  return (
    <>
        <Header />
        <div className="flex items-center justify-center h-screen max-h-96">
          <div className="flex flex-col items-center space-y-4">
              <FaExclamationCircle className="text-red-500 text-4xl" />
              <h2 className="text-2xl font-semibold text-gray-800">Oops! An Error Occurred</h2>
              <p className="text-red-500">{errorMessage}</p>
          </div>
        </div>
    </>
  );
};

export default ErrorTemplate;

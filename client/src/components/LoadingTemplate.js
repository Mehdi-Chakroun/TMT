import React from 'react';
import Header from './Header';
const LoadingTemplate = () => {
  return (
    <>
        <Header />
        <div className="flex items-center justify-center h-screen max-h-96">
          <div className="w-24 h-24 border-t-4 border-blue-500 rounded-full animate-spin"></div>
        </div>
    </>
  );
};

export default LoadingTemplate;

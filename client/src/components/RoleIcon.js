import React from 'react';
import { FaUser, FaUserShield, FaUserCog } from 'react-icons/fa';

const RoleIcon = ({ role }) => {
    if (role === 'ADMIN') {
        return (
          <div className="text-green-600 mb-1 flex items-center">
              <FaUserShield className="mr-2" />
          </div>
        
        );
    } else if (role === 'SUPER_ADMIN') {
        return (
          <div className="text-purple-600 mb-1 flex items-center">
              <FaUserCog className="mr-2" />
          </div>
        );
    } else {
        return (
          <div className="text-yellow-400 mb-1 flex items-center">
              <FaUser className="mr-2" />
          </div>
        );
    }
};

export default RoleIcon;

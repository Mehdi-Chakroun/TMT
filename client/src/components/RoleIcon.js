import React from 'react';
import { FaUser, FaUserShield, FaUserCog } from 'react-icons/fa';

const RoleIcon = ({ role }) => {
    if (role === 'ADMIN') {
        return (
          <div className="text-green-600 mb-1 flex items-center">
              <FaUserShield className="mr-2" />
              <span>Admin</span>
          </div>
        
        );
    } else if (role === 'SUPER_ADMIN') {
        return (
          <div className="text-purple-600 mb-1 flex items-center">
              <FaUserCog className="mr-2" />
              <span>Super Admin</span>
          </div>
        );
    } else {
        return (
          <div className="text-yellow-400 mb-1 flex items-center">
              <FaUser className="mr-2" />
              <span>User</span>
          </div>
        );
    }
};

export default RoleIcon;

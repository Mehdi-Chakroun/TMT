import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faCode, faUserTie, faCogs, faChalkboardTeacher, faScrewdriverWrench, faShieldAlt, faMicroscope } from '@fortawesome/free-solid-svg-icons'
const TypeIcon = ({ type }) => {
  const getTypeIcon = () => {
    switch (type) {
      case 'Config':
        return <FontAwesomeIcon icon={faCog} />;
      case 'Integration':
        return <FontAwesomeIcon icon={faCode} />;
      case 'Consulting':
        return <FontAwesomeIcon icon={faUserTie} />;
      case 'Development':
        return <FontAwesomeIcon icon={faCogs} />;
      case 'Training':
        return <FontAwesomeIcon icon={faChalkboardTeacher} />;
      case 'Maintenance':
        return <FontAwesomeIcon icon={faScrewdriverWrench} />;
      case 'Security':
        return <FontAwesomeIcon icon={faShieldAlt} />;
      case 'Testing':
        return <FontAwesomeIcon icon={faMicroscope} />;
      default:
        return null;
    }
  };

  return getTypeIcon();
};

export default TypeIcon;

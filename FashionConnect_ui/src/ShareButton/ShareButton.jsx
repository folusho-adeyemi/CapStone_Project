import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

const ShareButton = ({ imageUrl }) => {
  const handleShare = () => {
    FB.ui({
      method: 'share',
      href: imageUrl,
    }, function (response) {
      if (response && !response.error_message) {
        console.log('Content shared successfully!');
      } else {
        console.error('Error sharing content:', response && response.error_message);
      }
    });
  };

  return (
    <button onClick={handleShare}>Share to FB<FontAwesomeIcon icon={faFacebook}/></button>
  );
};

export default ShareButton;

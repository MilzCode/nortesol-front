import React from 'react';

const GetCheckAuthFB = () => {
	const token = localStorage.getItem('fb-tk');
	if (!token) return false;
    
};

export default GetCheckAuthFB;

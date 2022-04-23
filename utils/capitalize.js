const Capitalize = (str = '') => {
	str = str.toLowerCase();
	return str.charAt(0).toUpperCase() + str.slice(1);
};

export default Capitalize;

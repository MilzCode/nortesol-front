const IsNumber = (value) => {
	return !isNaN(parseFloat(value)) && isFinite(value);
};

export default IsNumber;

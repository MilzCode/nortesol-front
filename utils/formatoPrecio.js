const formatNumberToprice = (price) => {
	price = Math.round(price);
	return `$${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
};

const formatPriceToNumber = (price) => {
	return Number(price.replace(/[^0-9]/g, ''));
};

export default formatNumberToprice;
export { formatPriceToNumber };

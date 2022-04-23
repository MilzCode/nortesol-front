import axios from 'axios';
import { APIURL } from '../utils/constantes';

const GetPortadas = async () => {
	try {
		const data = await axios.get(APIURL + 'portadas');
		return data.data;
	} catch (error) {
		return {
			ok: false,
		};
	}
};

export default GetPortadas;

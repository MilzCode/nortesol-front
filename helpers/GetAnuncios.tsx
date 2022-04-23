import axios from 'axios';
import { APIURL } from '../utils/constantes';

const GetAnuncios = async () => {
	try {
		const data = await axios.get(APIURL + 'anuncios');
		return data.data;
	} catch (error) {
		return {
			ok: false,
		};
	}
};

export default GetAnuncios;

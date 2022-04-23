import Firebase from '../firebase';

const DoSignOut = async () => {
	localStorage.removeItem('tken');
};

export default DoSignOut;

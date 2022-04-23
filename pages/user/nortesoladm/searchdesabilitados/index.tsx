import Search from '../../../../components/search';
import Wredirect from '../../../../helpers/Wredirect';

const modeDisabled = ({ me, auth }: any) => {
	if (!auth || !me.admin) {
		Wredirect();
		return null;
	}
	return <Search desabilitados />;
};

export default modeDisabled;

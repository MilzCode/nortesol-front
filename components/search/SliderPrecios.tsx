import React from 'react';
import Nouislider from 'nouislider-react';

/*
    Este componente es una modificacion del componente react-nouislider
    para que funcione adecuadamente como un filtro de precios para el estilo de esta pagina

    El componente se encarga de mostrar un slider con los precios minimos y maximos

    recibe:
        - maxValue: el valor maximo del slider (recibe pesos)
        - minValue: el valor minimo del slider (recibe pesos), si no se pasa este valor se toma el valor 0
        //propiedades relevantes de nouislider
        - step: cantidad de pasos que tiene el slider (cuato se desplaza el slider) (recibe un valor entre 0 y 100), si no se pasa este valor se toma el valor 0
        - onChange: funcion que se ejecuta cuando el slider cambia de valor
        - y otras propiedades de nouislider

*/

const SliderPrecios = (props: any) => {
	//datos principales
	const { maxValue } = props;
	//BASE es el factor comportamiento exponencial del slider
	//Cuando maxValue = 1 millon (1000000) BASE = 50
	const BASE = 50 * (maxValue / 1000000);

	//format 55555 to $55,555
	const formatNumberToprice = (price: number) => {
		if (price >= maxValue) {
			return `$${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}+`;
		}
		return `$${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
	};

	//Los precios nosotros los vemos de forma exponencial y no de forma lineal
	//esta funcion adapta el filtro de una forma mas natural a como entendemos los precios
	//hay que enteder que esta funcion recibe un valor entre 0 y 100 y devuelve un valor entre 0 y maxValue
	const filtroPrecios = (value: number) => {
		//para precios menores a 150 mil no vale la pena hacer la adaptacion y el filtro se comportara linealmente
		if (maxValue <= 150000) {
			value = (value * maxValue) / 100;
			value = Math.floor(value);
			return value;
		}
		//en caso contrario, el filtro se comportara exponencialmente
		value = ((Math.pow(BASE, value / 100) - 1) * maxValue) / (BASE - 1);
		value = Math.floor(value);
		return value;
	};

	//esta funcion hace lo inverso de la funcion filtroPrecios, esto sirve para que el slider
	//reciba un valor minimo en pesos y devuelva un valor entre 0 y 100
	const filtroPreciosInverso = (valueConvertido: number) => {
		if (valueConvertido <= 0 || valueConvertido >= maxValue) return 0;
		if (maxValue <= 150000) {
			valueConvertido = (valueConvertido * 100) / maxValue;
			return Math.floor(valueConvertido);
		}
		valueConvertido =
			100 *
			(Math.log((valueConvertido * (BASE - 1)) / maxValue + 1) /
				Math.log(BASE));
		return Math.floor(valueConvertido);
	};

	const minValue = filtroPreciosInverso(props.minValue) || 0;

	return (
		<Nouislider
			range={{ min: minValue, max: 100 }}
			start={[minValue, 100]}
			connect
			tooltips={[true, true]}
			format={{
				to: (value: number) => {
					return `${formatNumberToprice(filtroPrecios(value))}`;
				},
				from: (value: string) => {
					return parseInt(value);
				},
			}}
			{...props}
		/>
	);
};

export default SliderPrecios;

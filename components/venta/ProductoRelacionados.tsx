import React from 'react';
import Slider from 'react-slick';
import ProductoVistaMiniatura from './ProductoVistaMiniatura';

const ProductoRelacionados = ({ productosRel, desabilitados }: any) => {
	const Arrow = (props: any) => {
		const { className, style, onClick } = props;
		return (
			<div
				className={`${className} productoRelacionados__arrow`}
				style={{
					...style,
				}}
				onClick={onClick}
			/>
		);
	};
	const cantProdRel = productosRel ? productosRel.length : 0;
	const settings = {
		infinite: true,
		speed: 500,
		slidesToShow: Math.min(cantProdRel, 4),
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 4000,
		nextArrow: <Arrow />,
		prevArrow: <Arrow />,
		responsive: [
			{
				breakpoint: 1300,
				settings: {
					slidesToShow: Math.min(cantProdRel, 3),
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 930,
				settings: {
					slidesToShow: Math.min(cantProdRel, 2),
					slidesToScroll: 1,
				},
			},
		],
	};
	return (
		<>
			{productosRel && productosRel.length > 0 ? (
				<>
					<hr />
					<div className="productoRelacionados">
						<h4 className="productoRelacionados__titulo">
							Quizá te pueda interesar...
						</h4>
						<Slider {...settings}>
							{productosRel.map((p: any, i: any) => (
								<ProductoVistaMiniatura
									nombre={p.nombre}
									precio={p.precio}
									nombre_url={p.nombre_url}
									imagen={p.imagen}
									key={i}
									desabilitado={desabilitados}
									porcentaje_descuento={p.porcentaje_descuento}
								/>
							))}
						</Slider>
					</div>
				</>
			) : (
				<>
					<br />
					{/* <hr /> */}
					{/* <div className="productoRelacionados">
						<h4 className="productoRelacionados__titulo">
							Quizá te pueda interesar...
						</h4>
						<Slider {...settings}>
							<div>ok</div>
						</Slider>
					</div> */}
				</>
			)}
		</>
	);
};

export default ProductoRelacionados;

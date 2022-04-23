import React from 'react';
import Image from 'next/image';
import Slider from 'react-slick';

const ProductoHeadImagenes = ({ imagenes = [] }: any) => {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 4000,
		arrows: false,
	};
	return (
		<div className="productoHeadImagen">
			<Slider {...settings}>
				{imagenes.length > 0 ? (
					imagenes.map((imagen: any, i: any) => (
						<div key={i}>
							<Image
								src={imagen ?? '/static/img/noimage.jpg'}
								alt="..."
								height="720"
								width="1280"
								objectFit="contain"
							/>
						</div>
					))
				) : (
					<div>
						<Image
							src={`/static/img/noimage.jpg`}
							alt="..."
							height="720"
							width="1280"
							objectFit="contain"
						/>
					</div>
				)}
			</Slider>
		</div>
	);
};

export default ProductoHeadImagenes;

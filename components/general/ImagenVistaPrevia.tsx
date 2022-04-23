import React from 'react';

const ImagenVistaPrevia = ({ onDelete, src, alt }: any, ...props: any) => {
	if (!src) return null;
	return (
		<div
			className="imagenVistaPrevia"
			onClick={() => {
				onDelete();
			}}
		>
			<img src={src ?? '/static/img/noimage.jpg'} alt={alt ?? '...'} />
			<div className="imagenVistaPrevia__clickZone">
				<i className="fas fa-times"></i>
			</div>
		</div>
	);
};

export default ImagenVistaPrevia;

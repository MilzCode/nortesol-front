import React from 'react';

const ProductoBody = ({ contenido }: any) => {
	return (
		<div className="productoBody">
			<h2>DESCRIPCIÓN</h2>
			<div
				className="productoBody__content"
				dangerouslySetInnerHTML={{ __html: contenido }}
			></div>
		</div>
	);
};

export default ProductoBody;

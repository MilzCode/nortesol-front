import React, { useEffect, useState } from 'react';
import Footer from './recursos/Footer';
import Header from './recursos/Header';

const Layout = (props: any) => {
	return (
		<>
			<Header {...props} />
			<main className="layout__content">{props.children}</main>
			<Footer {...props} />
		</>
	);
};

export default Layout;

import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html>
			<Head>
				<link rel="icon" href="/nortesol.ico" />

				<link
					rel="stylesheet"
					href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
				/>
				<link
					rel="stylesheet"
					type="text/css"
					href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
				/>
				<link
					rel="stylesheet"
					type="text/css"
					href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}

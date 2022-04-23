import React from 'react';
import { useEffect } from 'react';

interface props {
	maxPage?: number;
	onChange?: (page: number) => void;
}

const RangeFrom = (from = 0, cant: number) => {
	const arr: Array<number> = [];
	let s = from;
	for (let i = 0; i < cant; i++) {
		arr.push(s++);
	}
	return arr;
};

const GetUnfoldedFirst = (
	maxPage: number,
	maxToShow: number,
	currentPage: number
) => {
	const middle = Math.floor(maxToShow / 2);
	const start = currentPage - middle;
	const end = currentPage + middle;
	if (start < 1) {
		return 1;
	}
	if (end > maxPage) {
		return maxPage - maxToShow + 1;
	}
	return start;
};

const Next = (page: number, maxPage: number) => {
	if (page < maxPage) return page + 1;
	return page;
};
const Prev = (page: number) => {
	if (page > 1) return page - 1;
	return page;
};
let lastMaxPage = 0;
//maxCantPagesToShow ONLY IMPAR NUMBERS
const maxCantPagesToShow = 5;
const maxUnfoldedPages = 50;

const Paginador = ({ maxPage = 0, onChange = () => {} }: props) => {
	const [currentPage, setCurrentPage] = React.useState<number>(1);
	const [pages, setPages] = React.useState<Array<number>>([]);
	const [unfold, setUnfold] = React.useState<boolean>(false);
	const [pagesUnfold, setPagesUnfold] = React.useState<Array<number>>([]);

	useEffect(() => {
		if (maxPage <= 0) return;
		let isNewPages = true;
		let firstNewPage = 2;
		let isNewMaxPage = lastMaxPage !== maxPage;
		if (maxPage > maxCantPagesToShow) {
			if (currentPage < maxCantPagesToShow) {
				// caso pagina en el inicio
				pages[0] == firstNewPage && !isNewMaxPage && (isNewPages = false);
			} else if (currentPage + Math.floor(maxCantPagesToShow / 2) >= maxPage) {
				// caso pagina en el final
				firstNewPage = maxPage - maxCantPagesToShow;
				pages[0] == firstNewPage && !isNewMaxPage && (isNewPages = false);
			} else {
				// caso pagina en el medio
				firstNewPage = currentPage - Math.floor(maxCantPagesToShow / 2);
				pages[0] == firstNewPage && !isNewMaxPage && (isNewPages = false);
			}
			if (isNewPages) {
				//actualiza el paginador
				setPages(RangeFrom(firstNewPage, maxCantPagesToShow));
			}
		} else {
			// caso sin paginas extras
			pages[0] == firstNewPage && !isNewMaxPage && (isNewPages = false);
			if (isNewPages) {
				//actualiza el paginador

				setPages(RangeFrom(firstNewPage, maxPage - 1));
			}
		}
		const newUnfoldedFirst = GetUnfoldedFirst(
			maxPage,
			maxUnfoldedPages,
			currentPage
		);
		if (maxUnfoldedPages >= maxPage) {
			setPagesUnfold(RangeFrom(newUnfoldedFirst, maxPage));
		} else {
			setPagesUnfold(RangeFrom(newUnfoldedFirst, maxUnfoldedPages));
		}
		lastMaxPage = maxPage;
		document.body.scrollTop = 0; // For Safari
		document.documentElement.scrollTop = 0;
		onChange(currentPage);
	}, [currentPage, maxPage]);

	useEffect(() => {
		setCurrentPage(1);
	}, [maxPage]);
	return (
		<div className="reactpaginator">
			<button
				name="previus"
				className="reactpaginator__arrow-btn"
				disabled={currentPage == 1}
				onClick={() => {
					setCurrentPage(Prev(currentPage));
				}}
			>
				<i className="fas fa-sort-up" />
			</button>
			<button
				onClick={() => {
					setCurrentPage(1);
				}}
				className={
					'reactpaginator__btn' + (currentPage == 1 ? '--current' : '')
				}
			>
				1
			</button>
			{pages.map((page: number) => (
				<button
					key={page}
					onClick={() => {
						setCurrentPage(page);
					}}
					className={
						'reactpaginator__btn' + (currentPage == page ? '--current' : '')
					}
				>
					{page}
				</button>
			))}
			{maxPage > maxCantPagesToShow + 1 && (
				<button
					onClick={() => {
						setCurrentPage(maxPage);
					}}
					className={
						'reactpaginator__btn' + (currentPage == maxPage ? '--current' : '')
					}
				>
					{maxPage}
				</button>
			)}
			<button
				onClick={() => {
					setCurrentPage(Next(currentPage, maxPage));
				}}
				name="Next"
				className="reactpaginator__arrow-btn"
				disabled={currentPage == maxPage}
			>
				<i className="fas fa-sort-down" />
			</button>
			{/* UNFOLD */}
			{(pages[maxCantPagesToShow - 1] < maxPage - 1 || pages[0] > 2) && (
				<div className="reactpaginator__unfold-container">
					<button
						onClick={() => {
							setUnfold(!unfold);
						}}
						className="reactpaginator__btn-unfold"
					>
						...
					</button>
					{unfold && (
						<div
							className="reactpaginator__unfold"
							onMouseLeave={() => {
								setUnfold(false);
							}}
						>
							{pagesUnfold.map((page: number) => (
								<button
									key={page}
									onClick={() => {
										setCurrentPage(page);
									}}
									className={
										'reactpaginator__btn' +
										(currentPage == page ? '--current' : '')
									}
								>
									{page}
								</button>
							))}
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default Paginador;

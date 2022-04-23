import React, { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import BotonFAColores1 from '../general/BotonFAColores1';
// import SunEditorCore from "suneditor/src/lib/core";
const SunEditor = dynamic(() => import('suneditor-react'), {
	ssr: false,
});
const configSunEditor = {
	height: '50vh',
	resizingBar: false,
	font: ['Roboto', 'Arial', 'tahoma', 'Courier New,Courier'],
	defaultStyle: 'font-family: Roboto; font-size:1em; line-height: 1;',
	imageFileInput: false,
	videoFileInput: false,
	buttonList: [
		// default
		['undo', 'redo'],
		[':p-Opciones de Texto-default.more_paragraph', 'font'],
		['bold', 'underline', 'italic', 'strike'],
		['fontColor', 'hiliteColor', 'textStyle'],
		['align'],
		['removeFormat'],
		['outdent', 'indent'],
		['list', 'horizontalRule', 'table'],
		['subscript', 'superscript'],
		['link', 'image', 'video'],
		['print'],
		//code view
		['codeView'],
	],
};

interface editorTextoProps {
	setStateContenido: any;
	setStateImagesToUpload?: any;
	dataInicial?: any;
}

const EditorTexto = ({
	setStateContenido,
	setStateImagesToUpload,
	dataInicial,
}: editorTextoProps) => {
	// const editor = useRef<SunEditorCore>();
	// const getSunEditorInstance = (sunEditor: SunEditorCore) => {
	//   editor.current = sunEditor;
	// };
	let imagesUserAddPaste: any = {};
	const handleContenido = (e: any) => {
		setStateContenido(e);
	};

	// @ts-ignore
	const handleOnImageUpload = async (
		// @ts-ignore
		targetElement, // @ts-ignore
		// @ts-ignore
		index, // @ts-ignore
		// @ts-ignore
		state, // @ts-ignore
		imageInfo, // @ts-ignore
		remainingFilesCount
	) => {
		if (imageInfo && imageInfo.size > 0) {
			if (setStateImagesToUpload) {
				imagesUserAddPaste[index] = imageInfo;
				setStateImagesToUpload(imagesUserAddPaste);
			} else {
				targetElement.src = '';
				targetElement.parentElement.parentElement.remove();
				alert('No esta permitido pegar imagenes');
			}
		}
		if (state === 'delete') {
			if (setStateImagesToUpload) {
				delete imagesUserAddPaste[index];
				setStateImagesToUpload(imagesUserAddPaste);
			}
		}
	};

	return (
		<div className="editorTexto">
			{/* <div className="editorTexto__textArea"> */}
			<SunEditor
				defaultValue={dataInicial}
				lang="es"
				setOptions={configSunEditor as any}
				onChange={handleContenido}
				onImageUpload={handleOnImageUpload}
			/>
			{/* </div> */}
			<br />
		</div>
	);
};
export default EditorTexto;

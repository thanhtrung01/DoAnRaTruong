/* eslint-disable no-mixed-operators */
import React, { useEffect, useRef, useState, useCallback, Component } from 'react';
import {
	Container,
	RightContainer,
	Title,
	DescriptionText,
	DescriptionInputWrapper,
	DescriptionInput,
	UploadImageInput,
	UploadedImage
} from './styled';
import DescriptionIcon from '@mui/icons-material/TextSnippetOutlined';
import BottomButtonGroup from '../../../Pages/BoardPage/BoardComponents/BottomButtonGroup/BottomButtonGroup.js';
import { useDispatch, useSelector } from 'react-redux';
import { descriptionUpdate } from '../../../../Services/cardService';
// import { updateDescriptionOfCard } from '../../../../Services/cardService';
// import { TextField, Button } from '@mui/material';
// import Dropzone from 'react-dropzone-uploader';
import { useDropzone } from 'react-dropzone';
const Description = () => {
	const thisCard = useSelector((state) => state.card);
	const images = useSelector((state) => state.card.images);
	console.log("thisCard", thisCard)
	const description = useSelector((state) => state.card.description);
	const dispatch = useDispatch();
	const [inputFocus, setInputFocus] = useState(false);
	const [descriptionApi, setDescription] = useState(thisCard.description);
	const [imagesApi, setImages] = useState(thisCard.images);
	// const [images, setImages] = useState(thisCard.images);
	const ref = useRef();
	const ref2 = useRef();
	const transferData = (data) => {
		setImages(data.card.images)
	}
	const [files, setFiles] = useState([]);
	const onDrop = useCallback((acceptedFiles) => {
		setFiles(acceptedFiles);
	}, []);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
	// useEffect(() => {
	// 	setImages(thisCard.images);
	// }, [thisCard.images]);

	useEffect(() => {
		setDescription(thisCard.description);
	}, [thisCard.description]);

	useEffect(() => {
		if (inputFocus) {
			ref.current.focus();
		}
	}, [inputFocus]);

	const handleClickOutside = (event) => {
		if (ref2.current && !ref2.current.contains(event.target)) {
			setInputFocus(false);
			setDescription(thisCard.description);
			// setImages(thisCard.images);
		} else {
			setInputFocus(true);
		}
	};

	const handleImageUpload = async (e) => {
		const formImages = await e.target.files[0];
		setImages(formImages);


	};
	const handleSaveClick = async () => {
		console.log('get api')
		setInputFocus(false);
		await descriptionUpdate(
			thisCard.cardId,
			thisCard.listId,
			thisCard.boardId,
			imagesApi,
			descriptionApi,
			dispatch,
			transferData
		);
	};
	// const reloadUpdateImg = async (images, transferData) => {
	// 	await descriptionUpdate(
	// 		dispatch,
	// 		thisCard._id,
	// 		descriptionApi,
	// 		imagesApi
	// 	);


	// }
	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true);
		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	});

	return (
		<Container ref={ref2}>
			<DescriptionIcon fontSize='small' />
			<RightContainer>
				<Title>Mô tả</Title>
				{descriptionApi && !inputFocus ? (
					<div>
						<DescriptionText onClick={() => setInputFocus(true)}>
							{descriptionApi}
						</DescriptionText>
						<UploadedImage src={imagesApi[0]} />
					</div>


				) : (
					<>
						<DescriptionInputWrapper>
							<DescriptionInput
								ref={ref}
								minHeight={inputFocus ? '5.5rem' : '2.5rem'}
								placeholder='Thêm mô tả chi tiết hơn...'
								value={descriptionApi}
								onChange={(e) => setDescription(e.target.value)}
							/>
							
						</DescriptionInputWrapper>
						<DescriptionInputWrapper>
						<UploadedImage src={imagesApi[0]} />
							<UploadImageInput
								type="file"
								// accept="image/*" 
								onChange={handleImageUpload}
							/>
						</DescriptionInputWrapper>
					</>

					// <DescriptionInputWrapper></DescriptionInputWrapper>
					// &&
					// <DescriptionInput
					// 	ref={ref}
					// 	minHeight={inputFocus ? '5.5rem' : '2.5rem'}
					// 	placeholder='Add a more detailed description...'
					// 	value={images}
					// 	// value={images}
					// 	onChange={(e) => setDescription(e.target.value)}
					// />
					// <DescriptionInput>
					// 	<Dropzone onDrop={this.onDrop}>
					// 		{({ getRootProps, getInputProps }) => (
					// 			<div {...getRootProps()}>
					// 				<input {...getInputProps()} />
					// 				<p>Drag 'n' drop some files here, or click to select files</p>
					// 			</div>
					// 		)}
					// 	</Dropzone>
					// 	<div>
					// 		{this.state.files.map(file => (
					// 			<img key={file.name} src={file.preview} />
					// 		))}
					// 	</div>
					// </DescriptionInput>

				)}
				<div style={{ display: inputFocus ? 'block' : 'none' }}>
					<BottomButtonGroup
						closeCallback={() => {
							setInputFocus(false);
							// setDescription(thisCard.description);
							// setDescription(thisCard.images);
						}}
						clickCallback={handleSaveClick}
						title='Save'
					/>
				</div>
			</RightContainer>
		</Container>
	);
};

export default Description;

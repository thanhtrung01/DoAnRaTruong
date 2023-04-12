import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
	Container,
	SectionContainer,
	MemberSectionContainer,
	MemberInfoContainer,
	SectionHeaderContainer,
	DescriptionSectionContainer,
	MemberEmail,
	IconWrapper,
	SectionTitle,
	MemberName,
	DescriptionInput,
	HiddenText,
} from './styled';
import MemberIcon from '@mui/icons-material/PersonOutlineOutlined';
import DescriptionIcon from '@mui/icons-material/TextSnippetOutlined';
import BottomButtonGroup from '../../../Pages/BoardPage/BoardComponents/BottomButtonGroup/BottomButtonGroup';
import { getLists, boardDescriptionUpdate } from '../../../../Services/boardService';
import { Avatar } from '@mui/material';
const getBoards = async () => {
	const newAxios = axios.create();
	delete newAxios.defaults.headers.common['Authorization'];
	const res = getLists(res)
	return res.data;
};
const AboutMenu = () => {
	const textAreaRef = useRef();
	const hiddenTextRef = useRef();
	const descriptionAreaRef = useRef();

	const dispatch = useDispatch();

	// const board = useSelector((state) => state.board);
	const [board, setBoards] = useState([]);
	useEffect(() => {
		getBoards().then((res) => {
			setTimeout(() => {
				setBoards(res);
			}, 2000);
		});
	}, []);
	const [description, setDescription] = useState(board.description);
	const [textareaFocus, setTextareaFocus] = useState(false);

	const onChangeHandler = function (e) {
		const target = e.target;
		setDescription(target.value);
		textAreaRef.current.style.height = '5.5rem';
		textAreaRef.current.style.height = `${target.scrollHeight}px`;
	};
	const handleSaveClick = () => {
		setTextareaFocus(false);
		boardDescriptionUpdate(board.id, description, dispatch);
	};

	const handleClickOutside = (e) => {
		if (descriptionAreaRef.current)
			if (!descriptionAreaRef.current.contains(e.target)) {
				setTextareaFocus(false);
				setDescription(board.description);
			}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	});

	return (
		<Container>
			<SectionContainer>
				<SectionHeaderContainer>
					<IconWrapper>
						<MemberIcon fontSize='inherit' />
					</IconWrapper>
					<SectionTitle>Board Admins</SectionTitle>
				</SectionHeaderContainer>
				{board.members
					.filter((members) => members.role === 'owner')
					.map((members) => {
						return (
							<MemberSectionContainer key={members.email}>
								<Avatar
									sx={{ width: '3rem', height: '3rem', bgcolor: members.color, fontWeight: '800' }}
								>
									{members.name[0].toUpperCase()}
								</Avatar>
								<MemberInfoContainer>
									<MemberName>{`${members.name.replace(
										/^./,
										members.name[0].toUpperCase()
									)} ${members.username.toUpperCase()}`}</MemberName>
									<MemberEmail>{members.email}</MemberEmail>
								</MemberInfoContainer>
							</MemberSectionContainer>
						);
					})}
			</SectionContainer>
			<SectionContainer>
				<SectionHeaderContainer>
					<IconWrapper>
						<DescriptionIcon fontSize='inherit' />
					</IconWrapper>
					<SectionTitle>Description</SectionTitle>
				</SectionHeaderContainer>
				<DescriptionSectionContainer ref={descriptionAreaRef}>
					<DescriptionInput
						ref={textAreaRef}
						onChange={onChangeHandler}
						value={description}
						onFocus={() => setTextareaFocus(true)}
						textHeight={hiddenTextRef.current ? hiddenTextRef.current.scrollHeight : '1rem'}
						focused={textareaFocus}
						placeholder='It’s your board’s time to shine! Let people know what this board is used for and what they can expect to see.'
					/>
					{textareaFocus && (
						<BottomButtonGroup
							title='Save'
							clickCallback={handleSaveClick}
							closeCallback={() => setTextareaFocus(false)}
						/>
					)}
				</DescriptionSectionContainer>
			</SectionContainer>
			<HiddenText ref={hiddenTextRef}>{description}</HiddenText>
		</Container>
	);
};

export default AboutMenu;

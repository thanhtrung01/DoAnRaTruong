import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DropdownMenu from './DropdownMenu';
import SearchBar from './SearchBar';
import { xs } from '../BreakPoints';
import { getBoards } from '../Services/boardsService';
import { useDispatch, useSelector } from 'react-redux';
import ProfileBox from './ProfileBox';
import { useHistory } from 'react-router-dom';
import { BellIcon, QuestionIcon } from '../Icons/Icons';
import { ToastContainer } from 'react-toastify';
import CreateBoard from '../Components/Modals/CreateBoardModal/CreateBoard';

const Container = styled.div`
	z-index: 100;
	height: 3rem;
	width: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	backdrop-filter: blur(24px);
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: 0.5rem 1rem;
	gap: 0.5rem;
	${xs({
	padding: '0.5rem, 0rem',
})}
`;

const LeftSide = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	gap: 1rem;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	${xs({
	gap: '0.1rem',
	width: 'fit-content',
})}
`;

const RightSide = styled.div`
	// width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-end;
`;

const LogoContainer = styled.div`
	display: flex;
	align-items: center;
`;

const TrelloLogo = styled.img`
	width: 75px;
	height: 15px;
	cursor: pointer;
`;

const DropdownContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	${xs({
	display: 'none',
})}
`;
const Board = styled.div`
	color: white;
	border-radius: 5px;
	${(props) =>
		props.isImage
			? 'background-image: url(' + props.link + ');'
			: 'background-color: ' + props.link + ';'}

	background-position: center center;
	background-size: cover;
	opacity: 60%;
	cursor: pointer;
	will-change: opacity;
	transition: opacity 450ms;
	&:hover {
		opacity: 100%;
		transition: opacity 150ms;
		font-weight: 400;
	}
`;

const AddBoard = styled(Board)`
	background-color: transparent;
	background-image: linear-gradient(
		to right,
		#565F6C 0%,
		#565F6C 100%
	);
	padding: 0.25rem;
	font-size: 0.89rem;
	transition: 2s;
	opacity: 65%;
	background-size: 200% auto;
	color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	text-decoration: none;
	font-weight: 400;
	&:hover {
		background-position: right center;
		color: #fff;
		transition: 400ms ease-in;
	}
`;

const Navbar = (props) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const { pending, boardsData } = useSelector((state) => state.boards);
	const [openModal, setOpenModal] = useState(false);
	// const [searchString, setSearchString] = useState('');
	const handleModalClose = () => {
		setOpenModal(false);
	};

	const handleClick = (e) => {
		history.push(`/board/${e.target.id}`);
	};

	useEffect(() => {
		getBoards(false, dispatch);
	}, [dispatch]);

	useEffect(() => {
		document.title = 'Boards | Todoweb';
	}, []);

	return (
		<Container>

			<LeftSide>
				<LogoContainer>
					<TrelloLogo
						onClick={() => {
							history.push('/boards');
						}}
						src="https://res.cloudinary.com/thanhtrung01/image/upload/v1680876059/logo/logo_todoapp_ut96zh.gif"
					/>
				</LogoContainer>
				<DropdownContainer>
					<DropdownMenu title="Bảng làm việc của bạn" />
				</DropdownContainer>
				<DropdownContainer>
					<DropdownMenu title="Gần đây" />
				</DropdownContainer>
				<DropdownContainer>
					<DropdownMenu title="Đã đánh dấu sao" />
				</DropdownContainer>
				<DropdownContainer>
					<DropdownMenu title="Mẫu" />
				</DropdownContainer>
				<DropdownContainer>
					{ (
						<AddBoard onClick={() => setOpenModal(true)}>
							Tạo mới
						</AddBoard>
					)}
					{openModal && <CreateBoard callback={handleModalClose} />}
				</DropdownContainer>
			</LeftSide>
			<RightSide>
				<SearchBar
					searchString={props.searchString}
					setSearchString={props.setSearchString}
				/>
				<BellIcon />
				<QuestionIcon />
				<ToastContainer
					position="top-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="light"
				/>
				<ProfileBox />
			</RightSide>
		</Container>
	);
};

export default Navbar;

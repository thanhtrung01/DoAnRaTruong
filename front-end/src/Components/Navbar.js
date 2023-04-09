import React from 'react';
import styled from 'styled-components';
import DropdownMenu from './DropdownMenu';
import SearchBar from './SearchBar';
import { xs } from '../BreakPoints';
import ProfileBox from './ProfileBox';
import { useHistory } from 'react-router-dom';
import { BellIcon, QuestionIcon } from '../Icons/Icons';

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

const Navbar = (props) => {
	const history = useHistory();

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
					<DropdownMenu title="Your Boards" />
				</DropdownContainer>
				<DropdownContainer>
					<DropdownMenu title="Work Spaces" />
				</DropdownContainer>
				<DropdownContainer>
					<DropdownMenu title="Recent Board" />
				</DropdownContainer>
				<DropdownContainer>
					<DropdownMenu title="Starred Board" />
				</DropdownContainer>
				<DropdownContainer>
					<DropdownMenu title="Template" />
				</DropdownContainer>
				<DropdownContainer>
					<DropdownMenu
						isDropdownIcon={false}
						title="Create New Board"
					/>
				</DropdownContainer>
			</LeftSide>
			<RightSide>
				<SearchBar
					searchString={props.searchString}
					setSearchString={props.setSearchString}
				/>
				<BellIcon />
				<QuestionIcon />
				<ProfileBox />
			</RightSide>
		</Container>
	);
};

export default Navbar;

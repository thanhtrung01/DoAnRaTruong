import React, { useState } from 'react';
import { Container, SearchContainer, SearchBar, ChipContainer } from './styled';
import Button from '../../ReUsableComponents/Button';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import { makeStyles } from '@mui/styles';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserFromEmail } from '../../../../../Services/userService';
import { openAlert } from '../../../../../Redux/Slices/alertSlice';
import { boardMemberAdd } from '../../../../../Services/boardService';

const useStyles = makeStyles({
	root: {
		maxWidth: '8rem',
		opacity: '70%',
	},
});

const ChipComponent = (props) => {
	const { avatar, name, username, email, callback } = props;
	const classes = useStyles();
	return (
		<Tooltip TransitionComponent={Zoom} title={`${name} ${username}`} size='small' placement='top' arrow>
			<Chip
				className={classes.root}
				onDelete={() => callback(email)}
				avatar={
					<Avatar
						sx={{ width: 28, height: 28, bgcolor: props.color, fontSize: '0.875rem', fontWeight: '800' }}
						src={avatar[0]}
					>
						{name.toString()[0]}
					</Avatar>}
				label={name}
				size='small'
				color='secondary'
			/>
		</Tooltip>
	);
};

const InviteMembers = () => {
	const [memberMail, setMemberMail] = useState('');
	const [members, setMembers] = useState([]);
	const dispatch = useDispatch();
	const boardMembers = useSelector((state) => state.board.members);
	const boardId = useSelector(state=>state.board.id);
	const handleAddClick = async () => {
		const checkMember = boardMembers.filter((m) => m.email === memberMail)[0];
		if (checkMember) {
			dispatch(
				openAlert({
					message: `${checkMember.name} đã là thành viên của bảng này!`,
					severity: 'error',
				})
			);
			setMemberMail('');
			return;
		}

		const result = await getUserFromEmail(memberMail, dispatch);
		if (!result) return;
		setMembers((prev) => [...prev, result]);
		setMemberMail('');
	};
	const handleDelete = (email) => {
		const newMembers = members.filter((member) => member.email !== email);
		setMembers([...newMembers]);
	};

	const handleInviteClick= async()=>{
		await boardMemberAdd(boardId,members,dispatch);
	}

	return (
		<Container>
			<SearchContainer>
				<SearchBar
					type='email'
					placeholder="Email của thành viên"
					value={memberMail}
					onChange={(e) => {
						setMemberMail(e.target.value);
					}}
				/>
				<Button title='Thêm' style={{ flex: '1' }} clickCallback={handleAddClick} />
			</SearchContainer>
			<ChipContainer>
				{members.map((member) => {
					return <ChipComponent key={member.email} callback={handleDelete} {...member} />;
				})}
			</ChipContainer>
			{members.length > 0 && <Button clickCallback={handleInviteClick} title='Invite' />}
		</Container>
	);
};

export default InviteMembers;

import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Redux/Slices/userSlice';
import { reset } from '../Redux/Slices/boardsSlice';
import { useHistory } from 'react-router';
import './scss/profile.scss';

export default function ProfileBox() {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const history = useHistory();
	const dispatch = useDispatch();
	const open = Boolean(anchorEl);
	const name = useSelector((state) => state.user.userInfo.name);
	const avatar = useSelector((state) => state.user.userInfo.avatar);
	const color = useSelector((state) => state.user.userInfo.color);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<React.Fragment>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					textAlign: 'center',
				}}
			>
				<Tooltip title="Logout">
					<IconButton
						onClick={handleClick}
						size="small"
						sx={{ ml: 2 }}
					>
						<Avatar
							sx={{
								width: 32,
								height: 32,
								bgcolor: color,
								fontSize: '0.875rem',
								fontWeight: '800',
							}}
						>
							{
								(name === null || avatar===[null]) 
								? (
									(name !== null)
									? 
									name[0]
									:
									'user'
								)
								: (
								<img
									alt="profile"
									src={avatar}
									style={{ width: "100%" }}
								/>
								)
							}

						</Avatar>
					</IconButton>
				</Tooltip>
			</Box>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: 'visible',
						filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
						mt: 1.5,
						'& .MuiAvatar-root': {
							width: 32,
							height: 32,
							ml: -0.5,
							mr: 1,
						},
						'&:before': {
							content: '""',
							display: 'block',
							position: 'absolute',
							top: 0,
							right: 14,
							width: 10,
							height: 10,
							bgcolor: 'background.paper',
							transform: 'translateY(-50%) rotate(45deg)',
							zIndex: 0,
						},
					},
				}}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				<MenuItem>

					{
						(name !== null) 
						?<div
							className="profile-link"
							onClick={() => {
								history.push('/profile');
							}}
						> {name} </div> 
						:<div
							className="profile-link"
							onClick={() => {
							history.push('/profile');
							}}
						> 
						user name
						</div>
					}

				</MenuItem>
				<MenuItem>
					<div
						className="profile-link"
						onClick={() => {
							history.push('/profile');
						}}
					>
						Profile
						<span className="profile-line-space"></span>
					</div>
				</MenuItem>
				<MenuItem
					onClick={() => {
						dispatch(reset);
						dispatch(logout());
					}}
				>
					<ListItemIcon>
						<Logout fontSize="small" />
					</ListItemIcon>
					Logout
				</MenuItem>
			</Menu>
		</React.Fragment>
	);
}

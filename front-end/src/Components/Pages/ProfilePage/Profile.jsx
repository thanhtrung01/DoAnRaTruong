import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './profile.scss';
import Navbar from '../../Navbar';
import { updateInfoUser } from '../../../Services/userService';

import {
	DefaultChangeImageIcon,
	DefaultImageIcon,
	EarthImageIcon,
} from '../../../Icons/Icons';
import { useDispatch, useSelector } from 'react-redux';

function Profile(props) {
	const infoUser = useSelector((state) => state.user);
	console.log(infoUser);
	const dispatch = useDispatch();

	const [nameUser, setNameUser] = useState(
		infoUser.userInfo.name || 'name user'
	);
	const [avatarApi, setAvatarApi] = useState(
		infoUser.userInfo.avatar[0] ||
			'https://i1.wp.com/avatar-management--avatars.us-west-2.prod.public.atl-paas.net/initials/NT-3.png?ssl=1)'
	);

	const [avatar, setAvatar] = useState(
		infoUser.userInfo.avatar[0] ||
			'https://i1.wp.com/avatar-management--avatars.us-west-2.prod.public.atl-paas.net/initials/NT-3.png?ssl=1)'
	);

	const handleNameUser = (e) => {
		setNameUser(e.target.value);
	};
	const handleAvatar = (e) => {
		// setAvatar(e.target.files[0]);x
		setAvatarApi(e.target.files);

		console.log(e.target.files);
	};

	const handleEditUser = async () => {
		const getUserFromProfile = await updateInfoUser(
			dispatch,
			infoUser.userInfo._id,
			nameUser,
			avatarApi
		);
		console.log(getUserFromProfile);
	};

	return (
		<>
			<Navbar />
			<div className="profile-container">
				<div className="profile-wrap">
					<h3 className="profile-title">Ảnh hồ sơ và ảnh tiêu đề</h3>
					<div className="profile-image-wrap">
						<div className="image-background-gradient"></div>
						<div className="image-background-normal">
							<div className="image-background-normal-child">
								<p>Ai có thể xem ảnh hồ sơ của bạn?</p>
								<div className="image-background-normal-child-item">
									<EarthImageIcon />
									<span>Bất kỳ ai</span>
								</div>
							</div>
						</div>
						<input type="file" onChange={handleAvatar} />
						<div className="profile-logo-wrap">
							<img
								className="profile-image"
								src={avatar}
								alt=""
							/>
							<DefaultChangeImageIcon />
						</div>
						<div className="profile-hover-content">
							<DefaultImageIcon />
							<p>Cập nhật hình ảnh tiêu đề của bạn</p>
						</div>
					</div>
					<h3 className="profile-title profile-description ">
						Giới thiệu về bạn
					</h3>
					<div className="profile-info">
						<div className="profile-info-padding">
							<div className="info-item full-name">
								<div className="full-name-left">
									<span>Họ tên</span>
									<input
										value={nameUser}
										onChange={handleNameUser}
										type="text"
									/>
								</div>
								<div className="full-name-right">
									<span>
										Ai có thể thấy được nội dung này?
									</span>
									<div className="name-action">
										<EarthImageIcon />
										<p>Bất kỳ ai</p>
									</div>
								</div>
							</div>
							<div className="info-item">
								<div className="full-name-left">
									<span>Chức danh</span>
									<p>Chức danh của bạn</p>
								</div>
								<div className="full-name-right">
									<span style={{ visibility: 'hidden' }}>
										Ai có thể thấy được nội dung này?
									</span>
									<div className="name-action">
										<EarthImageIcon />
										<p>Bất kỳ ai</p>
									</div>
								</div>
							</div>
							<div className="info-item">
								<div className="full-name-left">
									<span>Phòng ban</span>
									<p>Phòng ban của bạn</p>
								</div>
								<div className="full-name-right">
									<span style={{ visibility: 'hidden' }}>
										Ai có thể thấy được nội dung này?
									</span>
									<div className="name-action">
										<EarthImageIcon />
										<p>Bất kỳ ai</p>
									</div>
								</div>
							</div>
							<div className="info-item">
								<div className="full-name-left">
									<span>Tổ chức</span>
									<p>Tổ chức của bạn</p>
								</div>
								<div className="full-name-right">
									<span style={{ visibility: 'hidden' }}>
										Ai có thể thấy được nội dung này?
									</span>
									<div className="name-action">
										<EarthImageIcon />
										<p>Bất kỳ ai</p>
									</div>
								</div>
							</div>
							<div className="info-item">
								<div className="full-name-left">
									<span>Cư trú tại</span>
									<p>Vị trí của bạn</p>
								</div>
								<div className="full-name-right">
									<span style={{ visibility: 'hidden' }}>
										Ai có thể thấy được nội dung này?
									</span>
									<div className="name-action">
										<EarthImageIcon />
										<p>Bất kỳ ai</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<button className="profile-edit" onClick={handleEditUser}>
						Edit
					</button>
				</div>
			</div>
		</>
	);
}

Profile.propTypes = {};

export default Profile;

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import './profile.scss';
import Navbar from '../../Navbar';
import { updateInfoUser } from '../../../Services/userService';
import Dropzone from 'react-dropzone';
import {
	DefaultChangeImageIcon,
	DefaultImageIcon,
	EarthImageIcon,
} from '../../../Icons/Icons';
import { useDispatch, useSelector } from 'react-redux';

function Profile(props) {
	const infoUser = useSelector((state) => state.user);
	const color = useSelector((state) => state.user.userInfo.color);
	console.log(infoUser);
	const dispatch = useDispatch();
	const name = useSelector((state) => state.user.userInfo.name);
	const avatar = useSelector((state) => state.user.userInfo.avatar);
	
	const [nameUser, setNameUser] = useState(
		name ||'add name user'
	);
	const [avatarApi, setAvatarApi] = useState(
		avatar|| 'https://res.cloudinary.com/thanhtrung01/image/upload/v1681693079/to-do-app/jfhtywfis0xfrpv4jvaz.jpg'
	);
	console.log(avatarApi);

	const handleNameUser = (e) => {
		setNameUser(e.target.value);
	};
	const handleAvatar = (e) => {
		setAvatarApi(e.target.files[0]);
	};


	const handleEditUser = async () => {
		await updateInfoUser(
			dispatch,
			infoUser.userInfo._id,
			nameUser,
			avatarApi
		);
		console.log(avatarApi);
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
						<input
							type="file"
							onChange={handleAvatar}
						/>
						<div className="profile-logo-wrap">
							<img
								sx={{
									width: 32,
									height: 32,
									bgcolor: color,
									fontSize: '0.875rem',
									fontWeight: '800',
								}}
								className="profile-image"
								src={avatar[0]}
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

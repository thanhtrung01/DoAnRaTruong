import React from 'react';
import PropTypes from 'prop-types';

import './profile.scss';
import Navbar from '../../Navbar';
import {
	DefaultChangeImageIcon,
	DefaultImageIcon,
	EarthImageIcon,
} from '../../../Icons/Icons';

function Profile(props) {
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
						<div className="profile-logo-wrap">
							<img
								className="profile-image"
								src="https://i1.wp.com/avatar-management--avatars.us-west-2.prod.public.atl-paas.net/initials/NT-3.png?ssl=1"
								alt=""
							/>
							<DefaultChangeImageIcon />
						</div>
						<div className="profile-hover-content">
							<DefaultImageIcon />
							<p>Cập nhật hình ảnh tiêu đề của bạn</p>
						</div>
					</div>
					<h3 className="profile-title ">Giới thiệu về bạn</h3>
					<div className="profile-info">
						<div className="profile-info-padding">
							<div className="info-item full-name">
								<div className="full-name-left">
									<span>Họ tên</span>
									<p>Nhut Dang Thanh</p>
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
									<span>Họ tên</span>
									<p>Nhut Dang Thanh</p>
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
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

Profile.propTypes = {};

export default Profile;

import React from 'react';
import './style.scss';

import LogoTrello from '../../assets/images/Logo-trello.gif';
import DownIcon, {
	SearchIcon,
	BellIcon,
	QuestionIcon,
	NoteIcon,
} from './Icons';
import DotsContent from './DotsContent';

const Header = () => {
	return (
		<header className="header">
			<nav className="navbar">
				<div className="navbar-left">
					<div className="navbar-dots">
						<svg
							role="presentation"
							focusable="false"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M4 5C4 4.44772 4.44772 4 5 4H7C7.55228 4 8 4.44772 8 5V7C8 7.55228 7.55228 8 7 8H5C4.44772 8 4 7.55228 4 7V5ZM4 11C4 10.4477 4.44772 10 5 10H7C7.55228 10 8 10.4477 8 11V13C8 13.5523 7.55228 14 7 14H5C4.44772 14 4 13.5523 4 13V11ZM11 4C10.4477 4 10 4.44772 10 5V7C10 7.55228 10.4477 8 11 8H13C13.5523 8 14 7.55228 14 7V5C14 4.44772 13.5523 4 13 4H11ZM10 11C10 10.4477 10.4477 10 11 10H13C13.5523 10 14 10.4477 14 11V13C14 13.5523 13.5523 14 13 14H11C10.4477 14 10 13.5523 10 13V11ZM17 4C16.4477 4 16 4.44772 16 5V7C16 7.55228 16.4477 8 17 8H19C19.5523 8 20 7.55228 20 7V5C20 4.44772 19.5523 4 19 4H17ZM16 11C16 10.4477 16.4477 10 17 10H19C19.5523 10 20 10.4477 20 11V13C20 13.5523 19.5523 14 19 14H17C16.4477 14 16 13.5523 16 13V11ZM5 16C4.44772 16 4 16.4477 4 17V19C4 19.5523 4.44772 20 5 20H7C7.55228 20 8 19.5523 8 19V17C8 16.4477 7.55228 16 7 16H5ZM10 17C10 16.4477 10.4477 16 11 16H13C13.5523 16 14 16.4477 14 17V19C14 19.5523 13.5523 20 13 20H11C10.4477 20 10 19.5523 10 19V17ZM17 16C16.4477 16 16 16.4477 16 17V19C16 19.5523 16.4477 20 17 20H19C19.5523 20 20 19.5523 20 19V17C20 16.4477 19.5523 16 19 16H17Z"
								fill="currentColor"
							></path>
						</svg>
						<div className="dots-absolute">
							<div className="dots-title">
								<p>Bắt đầu sử dụng sản phẩm Atlassiasdasd</p>
								<NoteIcon />
							</div>
							<DotsContent />
						</div>
					</div>
					<div className="navbar-logo g-hover-header">
						<img src={LogoTrello} alt="" />
					</div>
					<div className="navbar-space-work g-hover-header">
						<span>Các không gian làm việc</span>
						<DownIcon className="space-icon" />
					</div>
					<div className="navbar-recent g-hover-header">
						<span>Gần đây </span>
						<DownIcon className="space-icon" />
					</div>
					<div className="navbar-checked-star g-hover-header">
						<span>Đã đánh dấu sao</span>{' '}
						<DownIcon className="space-icon" />
					</div>
					<div className="navbar-template g-hover-header">
						<span>Mẫu</span> <DownIcon className="space-icon" />
					</div>
					<div className="navbar-do-new g-hover-header new--lighter">
						<span>Tạo mới</span>
					</div>
				</div>
				<div className="navbar-right">
					<div className="navbar-search">
						<SearchIcon className={'nav-search-icon'} />
						<input type="text" placeholder="Tìm kiếm" />
					</div>
					<div className="navbar-bell g-right-navbar">
						<BellIcon />
						<span>4</span>
					</div>
					<div className="navbar-question g-right-navbar">
						<QuestionIcon className={'nav-question-icon'} />
					</div>
					<div className="navbar-avatar">NT</div>
				</div>
			</nav>
			<div className="board-header">Board header</div>
		</header>
	);
};

export default Header;

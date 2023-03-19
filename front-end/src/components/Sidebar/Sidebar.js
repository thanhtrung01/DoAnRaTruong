import React, { useState } from 'react';
import './style.scss';
import { Link } from 'react-router-dom';

const Sidebar = () => {
	const [show, setShow] = useState(false);

	return (
		<>
			<aside className={`sidebaras ${show ? 'show' : null}`}>
				<div className="header-toggle" onClick={() => setShow(!show)}>
					<i
						className={`fas fa-bars ${
							show ? 'fa-solid fa-caret-left' : null
						}`}
					></i>
				</div>
				<nav className="nav">
					<div style={{ marginTop: '1pc' }}>
						<Link to="/" className="nav-logo">
							<div className="icon">
								<a href="">T</a>
							</div>
							<div className="text">
								<span className="nav-logo-name">
									Trello Không gian làm việc
								</span>
								<br />
								<span className="fre">Miễn phí</span>
							</div>
						</Link>
						<hr style={{ marginLeft: '11px' }} />
						<div className="nav-list">
							<Link to="/dashboard" className="nav-link active">
								<i class="fa-solid fa-table"></i>
								<span className="nav-link-name">Bảng</span>
							</Link>

							<a
								href="/hotel"
								className="nav-link active"
								style={{ display: 'flex' }}
							>
								<i
									class="fa-solid fa-table"
									style={{ marginTop: '5px' }}
								></i>
								<span
									className="nav-link-name"
									style={{ marginTop: '5px' }}
								>
									Thành Viên
								</span>
								<a
									href="#"
									style={{
										marginLeft: '6pc',
										fontSize: '23px',
										color: '#fff',
										fontWeight: 'bold',
									}}
								>
									+
								</a>
							</a>

							<div
								className="nav-link"
								style={{ display: 'block', width: '13pc' }}
							>
								<i
									class="fa-solid fa-gear"
									style={{ marginRight: '5px' }}
								></i>
								<span className="nav-link-name">
									Các cài đặt Không gian làm việc
								</span>
								<a
									href="/"
									style={{
										marginLeft: '173px',
										fontSize: '23px',
										color: '#fff',
										fontWeight: 'bold',
									}}
								>
									...
								</a>
							</div>

							<h1
								style={{
									fontSize: '14px',
									fontWeight: '600',
									marginLeft: '12px',
									lineHeight: '24px',
									color: '#fff',
								}}
							>
								Dạng xem Không gian làm việc
							</h1>

							<a
								href="/hotel"
								className="nav-link active"
								style={{ display: 'flex' }}
							>
								<i
									class="fa-solid fa-table"
									style={{ marginTop: '5px' }}
								></i>
								<span
									className="nav-link-name"
									style={{ marginTop: '5px' }}
								>
									Bảng
								</span>
								<a
									href="#"
									style={{
										marginLeft: '138px',
										fontSize: '23px',
										color: '#fff',
										fontWeight: 'bold',
									}}
								>
									...
								</a>
							</a>

							<a
								href="/hotel"
								className="nav-link active"
								style={{ display: 'flex' }}
							>
								<i
									class="fa-solid fa-table"
									style={{ marginTop: '5px' }}
								></i>
								<span
									className="nav-link-name"
									style={{ marginTop: '5px' }}
								>
									Lịch
								</span>
								<a
									href="/"
									style={{
										marginLeft: '141px',
										fontSize: '23px',
										color: '#fff',
										fontWeight: 'bold',
									}}
								>
									...
								</a>
							</a>

							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
								}}
							>
								<span
									className="nav-link-name"
									style={{
										fontSize: '16px',
										marginLeft: '12px',
										marginTop: '1pc',
										fontWeight: '600',
										lineHeight: '24px',
										color: '#fff',
									}}
								>
									Các bảng của bạn
								</span>
								<a
									href="/"
									style={{
										marginTop: '17px',
										fontSize: '23px',
										marginRight: '8px',
										color: '#fff',
										fontWeight: 'bold',
									}}
								>
									+
								</a>
							</div>
						</div>
					</div>

					<Link to="/logout" className="nav-link">
						<i className="fas fa-sign-out nav-link-icon"></i>
						<span className="nav-link-name">Logout</span>
					</Link>
				</nav>
			</aside>
		</>
	);
};

export default Sidebar;

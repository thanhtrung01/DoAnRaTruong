import React from 'react';
import {
	DropDownIcon,
	FilterIcon,
	GraphIcon,
	ShareUserIcon,
	ThreeDotsIcon,
	UtilityIcon,
} from './Icons';
import NT from '../../assets/images/nt.png';
import HQ from '../../assets/images/hq.png';
import TT from '../../assets/images/tt.png';

const BoardNavBar = () => {
	return (
		<div className="board-header-container">
			<div className="board-header-item board-item-left">
				<div className="board-title ">
					<p>Project đồ án ra trường</p>
					<div className="title-star opacity-hover">
						<i className="fa-regular fa-star"></i>
					</div>
				</div>
				<div className="board-setup">
					<div className="board-private opacity-hover">
						<i class="fa-solid fa-lock"></i>
						<span>Riêng tư</span>
					</div>
					<div className="board-struct opacity-hover">
						<GraphIcon className="struct-icon" />
						<p>Bảng</p>
					</div>
					<div className="board-dropdown opacity-hover">
						<DropDownIcon />
					</div>
				</div>
			</div>
			<div className="board-header-item  board-item-right">
				<div className="board-utility opacity-hover">
					<UtilityIcon />
					<span>Tiện ích bổ sung</span>
				</div>
				<div className="board-auto opacity-hover">
					<span
						style={{
							backgroundImg: `url(https://a.trellocdn.com/prgb/assets/664d88a0fc08655e416b.svg)`,
						}}
					></span>
					<span>Tự động hóa</span>
				</div>
				<div className="board-filter opacity-hover">
					<FilterIcon />
					<span>Lọc</span>
				</div>
				<div className="board-members">
					<img src={NT} alt="" />
					<img src={HQ} alt="" />
					<img src={TT} alt="" />
				</div>
				<div className="board-share opacity-hover">
					<ShareUserIcon />
					<span>Chia sẻ</span>
				</div>
				<div className="board-more opacity-hover">
					<ThreeDotsIcon />
				</div>
			</div>
		</div>
	);
};

export default BoardNavBar;

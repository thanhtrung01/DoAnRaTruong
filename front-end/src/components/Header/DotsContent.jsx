import React from 'react';
import PropTypes from 'prop-types';
import DotItem from './DotItem';

function DotsContent(props) {
	return (
		<div className="dots-content">
			<div className="content-wrap">
				<DotItem
					image={
						'https://fd-assets.prod.atl-paas.net/image/logos/contrib/trello/icons/white.svg'
					}
					mainTitle="Trello"
				/>
				<div className="content-attend">
					<p className="attend">Tham gia</p>
					<DotItem
						image={
							'https://fd-assets.prod.atl-paas.net/image/logos/contrib/jira-software/icons/white.svg'
						}
						mainTitle="Jira Software"
						subTitle="jiraanhkulong"
					/>
					<DotItem
						image={
							'https://fd-assets.prod.atl-paas.net/image/logos/contrib/jira-software/icons/white.svg'
						}
						mainTitle="Jira Software"
						subTitle="trungapitest"
					/>
				</div>
				<div className="content-discover">
					<p className="discover">Khám phá</p>
					<DotItem
						className={'bg-gray'}
						image={
							'https://fd-assets.prod.atl-paas.net/image/logos/contrib/confluence/icons/blue.svg'
						}
						mainTitle="Confluence"
						subTitle="Công cụ tài liệu"
					/>
					<DotItem
						className={'bg-gray'}
						image={
							'https://fd-assets.prod.atl-paas.net/image/logos/contrib/jira-service-management/icons/blue.svg'
						}
						mainTitle="Jira Service Management"
						subTitle="Quản lý dịch vụ CNTT cộng tác"
					/>
					<DotItem
						className={'bg-gray'}
						image={
							'https://fd-assets.prod.atl-paas.net/image/logos/contrib/opsgenie/icons/blue.svg'
						}
						mainTitle="Opsgenie"
						subTitle="Quản lý lỗi hiện tại"
					/>
					<DotItem
						className={'bg-gray'}
						image={
							'https://fd-assets.prod.atl-paas.net/image/logos/contrib/opsgenie/icons/blue.svg'
						}
						mainTitle="Opsgenie"
						subTitle="Quản lý lỗi hiện tại"
					/>
				</div>
			</div>
		</div>
	);
}

DotsContent.propTypes = {};

export default DotsContent;

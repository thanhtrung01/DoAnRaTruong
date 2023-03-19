import React from 'react';
import PropTypes from 'prop-types';

function DotsItem({ image, mainTitle, subTitle, className }) {
	return (
		<div className="content-item">
			<div className={`item-img ${className}`}>
				<img src={image} alt="" />
			</div>
			<div className={`item-title ${subTitle ? 'title-lines' : ''}`}>
				<p>{mainTitle}</p>
				<span>{subTitle}</span>
			</div>
		</div>
	);
}

DotsItem.propTypes = {};

export default DotsItem;

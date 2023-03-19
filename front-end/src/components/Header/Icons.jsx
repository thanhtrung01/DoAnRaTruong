import React from 'react';
import PropTypes from 'prop-types';

function DownIcon({ className }) {
	return (
		<svg
			className={className}
			role="presentation"
			focusable="false"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z"
				fill="currentColor"
			></path>
		</svg>
	);
}

DownIcon.propTypes = {};

export const SearchIcon = ({ className }) => {
	return (
		<svg
			className={className}
			width="24"
			height="24"
			viewBox="0 0 24 24"
			role="presentation"
		>
			<path
				d="M16.436 15.085l3.94 4.01a1 1 0 01-1.425 1.402l-3.938-4.006a7.5 7.5 0 111.423-1.406zM10.5 16a5.5 5.5 0 100-11 5.5 5.5 0 000 11z"
				fill="currentColor"
				fill-rule="evenodd"
			></path>
		</svg>
	);
};

export const BellIcon = ({ className }) => {
	return (
		<svg
			className={className}
			width="24"
			height="24"
			viewBox="0 0 24 24"
			role="presentation"
		>
			<path
				d="M6.586 17.829a2 2 0 002.829 0L6.585 15a2 2 0 000 2.829zm4.798-12.351A5.036 5.036 0 0114.954 4c.972 0 1.945.28 2.788.839.02-.026.043-.05.066-.074a1.01 1.01 0 111.354 1.494 5.048 5.048 0 01-.64 6.356l-.725.725c-.782.783-1.813 2.21-2.312 3.207l-1.509 3.016c-.249.5-.773.584-1.171.187l-8.556-8.555c-.397-.397-.308-.924.187-1.172l3.017-1.508c.989-.494 2.42-1.526 3.206-2.312l.725-.725zm2.739 9.63c.517-.975 1.568-2.396 2.354-3.182l.725-.726a3.048 3.048 0 00.387-3.835c-.19-.286-.718-.766-.859-.86A3.043 3.043 0 0015.047 6a3.04 3.04 0 00-2.156.892l-.95.951c-.784.785-2.219 1.82-3.201 2.311l-1.74.87 6.07 6.069 1.053-1.985z"
				fill="currentColor"
				fill-rule="evenodd"
			></path>
		</svg>
	);
};

export const QuestionIcon = ({ className }) => {
	return (
		<svg
			className={className}
			width="24"
			height="24"
			role="presentation"
			focusable="false"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M2 12C2 6.47667 6.47667 2 12 2C17.5233 2 22 6.47667 22 12C22 17.5233 17.5233 22 12 22C6.47667 22 2 17.5233 2 12ZM4 12C4 16.4188 7.58124 20 12 20C16.4188 20 20 16.4188 20 12C20 7.58124 16.4188 4 12 4C7.58124 4 4 7.58124 4 12ZM8 10C7.99999 7.48383 10.3214 5.51108 12.9389 6.10713C14.3829 6.43513 15.5569 7.60513 15.8899 9.04813C16.3809 11.1771 15.1719 13.0911 13.3589 13.7471C13.1549 13.8201 13.0099 14.0021 13.0099 14.2191V14.0001C13.0099 14.5521 12.5629 15.0001 12.0099 15.0001C11.4579 15.0001 11.0099 14.5521 11.0099 14.0001V12.9871C11.0179 12.4411 11.4599 12.0001 11.9999 12.0001C13.1029 12.0001 13.9999 11.1021 13.9999 10.0001C13.9999 8.89713 13.1029 8.00013 11.9999 8.00013C10.8959 8.00013 9.99935 8.92313 10.0004 10.0271C9.98522 10.5666 9.54291 11 9 11C8.47773 11 8.04856 10.599 8.00385 10.0882C8.00385 10.0882 8 10.0297 8 10ZM12 18C11.448 18 11 17.552 11 17C11 16.448 11.448 16 12 16C12.552 16 13 16.448 13 17C13 17.552 12.552 18 12 18Z"
				fill="currentColor"
			></path>
		</svg>
	);
};

export const NoteIcon = ({ className }) => {
	return (
		<svg width="32" height="32" viewBox="0 0 24 24" role="presentation">
			<g fill="currentColor">
				<path d="M19.005 19c-.003 0-.005.002-.005.002l.005-.002zM5 19.006c0-.004-.002-.006-.005-.006H5v.006zM5 4.994V5v-.006zM19 19v-6h2v6.002A1.996 1.996 0 0119.005 21H4.995A1.996 1.996 0 013 19.006V4.994C3 3.893 3.896 3 4.997 3H11v2H5v14h14zM5 4.994V5v-.006zm0 14.012c0-.004-.002-.006-.005-.006H5v.006zM11 5H5v14h14v-6h2v6.002A1.996 1.996 0 0119.005 21H4.995A1.996 1.996 0 013 19.006V4.994C3 3.893 3.896 3 4.997 3H11v2zm8 0v3a1 1 0 002 0V4a1 1 0 00-1-1h-4a1 1 0 000 2h3z"></path>
				<path d="M12.707 12.707l8-8a1 1 0 10-1.414-1.414l-8 8a1 1 0 001.414 1.414z"></path>
			</g>
		</svg>
	);
};

export default DownIcon;

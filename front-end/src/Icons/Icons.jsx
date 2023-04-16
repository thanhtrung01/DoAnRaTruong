import './icon.scss';

const BellIcon = function () {
	return (
		<div className="bell-icon">
			<svg width="24" height="24" viewBox="0 0 24 24" role="presentation">
				<path
					d="M6.586 17.829a2 2 0 002.829 0L6.585 15a2 2 0 000 2.829zm4.798-12.351A5.036 5.036 0 0114.954 4c.972 0 1.945.28 2.788.839.02-.026.043-.05.066-.074a1.01 1.01 0 111.354 1.494 5.048 5.048 0 01-.64 6.356l-.725.725c-.782.783-1.813 2.21-2.312 3.207l-1.509 3.016c-.249.5-.773.584-1.171.187l-8.556-8.555c-.397-.397-.308-.924.187-1.172l3.017-1.508c.989-.494 2.42-1.526 3.206-2.312l.725-.725zm2.739 9.63c.517-.975 1.568-2.396 2.354-3.182l.725-.726a3.048 3.048 0 00.387-3.835c-.19-.286-.718-.766-.859-.86A3.043 3.043 0 0015.047 6a3.04 3.04 0 00-2.156.892l-.95.951c-.784.785-2.219 1.82-3.201 2.311l-1.74.87 6.07 6.069 1.053-1.985z"
					fill="white"
					fillRule="evenodd"
				></path>
			</svg>
			<span className="bell-quantity">6</span>
		</div>
	);
};

const QuestionIcon = function () {
	return (
		<div className="question-icon">
			<svg
				width="22"
				height="22"
				role="presentation"
				focusable="false"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M2 12C2 6.47667 6.47667 2 12 2C17.5233 2 22 6.47667 22 12C22 17.5233 17.5233 22 12 22C6.47667 22 2 17.5233 2 12ZM4 12C4 16.4188 7.58124 20 12 20C16.4188 20 20 16.4188 20 12C20 7.58124 16.4188 4 12 4C7.58124 4 4 7.58124 4 12ZM8 10C7.99999 7.48383 10.3214 5.51108 12.9389 6.10713C14.3829 6.43513 15.5569 7.60513 15.8899 9.04813C16.3809 11.1771 15.1719 13.0911 13.3589 13.7471C13.1549 13.8201 13.0099 14.0021 13.0099 14.2191V14.0001C13.0099 14.5521 12.5629 15.0001 12.0099 15.0001C11.4579 15.0001 11.0099 14.5521 11.0099 14.0001V12.9871C11.0179 12.4411 11.4599 12.0001 11.9999 12.0001C13.1029 12.0001 13.9999 11.1021 13.9999 10.0001C13.9999 8.89713 13.1029 8.00013 11.9999 8.00013C10.8959 8.00013 9.99935 8.92313 10.0004 10.0271C9.98522 10.5666 9.54291 11 9 11C8.47773 11 8.04856 10.599 8.00385 10.0882C8.00385 10.0882 8 10.0297 8 10ZM12 18C11.448 18 11 17.552 11 17C11 16.448 11.448 16 12 16C12.552 16 13 16.448 13 17C13 17.552 12.552 18 12 18Z"
					fill="white"
				></path>
			</svg>
		</div>
	);
};

const DefaultImageIcon = function () {
	return (
		<div className="default-image-icon">
			<svg width="30" height="30" viewBox="0 0 24 24" role="presentation">
				<path
					d="M3 4.995C3 3.893 3.893 3 4.995 3h14.01C20.107 3 21 3.893 21 4.995v14.01A1.995 1.995 0 0119.005 21H4.995A1.995 1.995 0 013 19.005V4.995zM10.5 16.5L9 15l-3 3h12v-2.7L15 12l-4.5 4.5zM8 10a2 2 0 100-4 2 2 0 000 4z"
					fill="white"
					fillRule="evenodd"
				></path>
			</svg>
		</div>
	);
};

const DefaultChangeImageIcon = function () {
	return (
		<div className="default-change-image-icon">
			<svg width="24" height="24" viewBox="0 0 24 24" role="presentation">
				<g fill="white" fillRule="evenodd">
					<path d="M2 6.994C2 5.893 2.898 5 3.99 5h16.02C21.108 5 22 5.895 22 6.994v12.012A1.997 1.997 0 0120.01 21H3.99A1.994 1.994 0 012 19.006V6.994zM12 17a4 4 0 100-8 4 4 0 000 8zm5-8c0 .556.448 1 1 1 .556 0 1-.448 1-1 0-.556-.448-1-1-1-.556 0-1 .448-1 1zM8 4c0-.552.453-1 .997-1h6.006c.55 0 .997.444.997 1v1H8V4z"></path>
					<circle cx="12" cy="13" r="2"></circle>
				</g>
			</svg>
		</div>
	);
};

const EarthImageIcon = function () {
	return (
		<div className="earth-image-icon">
			<svg width="20" height="20" viewBox="0 0 24 24" role="presentation">
				<path
					d="M12 21a9 9 0 100-18 9 9 0 000 18zm-.9-1.863A7.19 7.19 0 014.8 12c0-.558.072-1.089.189-1.611L9.3 14.7v.9c0 .99.81 1.8 1.8 1.8v1.737zm6.21-2.286A1.786 1.786 0 0015.6 15.6h-.9v-2.7c0-.495-.405-.9-.9-.9H8.4v-1.8h1.8c.495 0 .9-.405.9-.9V7.5h1.8c.99 0 1.8-.81 1.8-1.8v-.369c2.637 1.071 4.5 3.654 4.5 6.669 0 1.872-.72 3.573-1.89 4.851z"
					fill="currentColor"
					fillRule="evenodd"
				></path>
			</svg>
		</div>
	);
};

export {
	BellIcon,
	QuestionIcon,
	DefaultImageIcon,
	DefaultChangeImageIcon,
	EarthImageIcon,
};

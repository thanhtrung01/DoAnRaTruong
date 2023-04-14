// const config = require('../config/config');
// const { google } = require('googleapis');
// const oauth2Client = new google.auth.OAuth2(
//     config.GOOGLE_CLIENT_ID,
//     config.GOOGLE_CLIENT_SECRET,
//     config.GOOGLE_REDIRECT_URI
// );

// const verifyGoogle = async (req, res, next) => {
//     try {
//         if (req.headers['Authorization']==null) {
//             next();
//             return res
//                 .status(200)
//                 .send({ errMessage: 'finish!' });

//         }
//     } catch (error) {
//         next(error);
//     }
// };

// module.exports = {
//     oauth2Client,
//     verifyGoogle
// } ;
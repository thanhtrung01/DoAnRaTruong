// const passport = require('passport');
// const JwtStrategy = require('passport-jwt').Strategy
// const LocalStrategy = require('passport-local').Strategy
// const { ExtractJwt } = require('passport-jwt')
// const config = require('../config/config');
// const GooglePlusTokenStrategy = require('passport-google-plus-token');

// passport.use(new GooglePlusTokenStrategy({
//     clientID: config.GOOGLE_CLIENT_ID,
//     clientSecret: config.GOOGLE_CLIENT_SECRET,
//     passReqToCallback: true
// }, async (accessToken, refreshToken, profile, done) => {
//     // User.findOrCreate({'google.id': profile.id}, function(error, user) {
//     //     return next(error, user);
//     // });
//     try {
//         console.log('accessToken', accessToken);
//         console.log('refreshToken', refreshToken);
//         console.log('profile', profile);
//         console.log('accessToken', accessToken)
//     } catch (error) {
//         done(error, false);
//     }
// }))
// module.exports = passport;
// passport.use(new GoogleStrategy({
//     clientID: 'YOUR_CLIENT_ID', // Thay thế bằng CLIENT_ID của bạn
//     clientSecret: 'YOUR_CLIENT_SECRET', // Thay thế bằng CLIENT_SECRET của bạn
//     callbackURL: 'YOUR_REDIRECT_URL', // Thay thế bằng REDIRECT_URL của bạn
// }, async (accessToken, refreshToken, profile, done) => {
//     // Xử lý thông tin người dùng sau khi đăng nhập thành công với Google
//     // Kiểm tra xem người dùng đã tồn tại trong cơ sở dữ liệu chưa
//     const user = await User.findOne({ googleId: profile.id });
//     if (user) {
//         // Người dùng đã tồn tại, trả về thông tin
//         return done(null, user);
//     } else {
//         // Người dùng chưa tồn tại, tạo mới và lưu vào cơ sở dữ liệu
//         const newUser = new User({
//             googleId: profile.id,
//             displayName: profile.displayName,
//             email: profile.emails[0].value
//         });
//         await newUser.save();
//         return done(null, newUser);
//     }
// }));

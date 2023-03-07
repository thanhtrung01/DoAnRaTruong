const config = require('../../config/config');
const User = require('../../models/User');

const CTRL = {};

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Đăng nhập tài khoản
CTRL.login = (req, res) => {
    User.findOne({
            $or: [{ email: req.body.email }, { phone: req.body.email }, { username: req.body.email }],
        },
        (err, user) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err,
                });
            }

            if (!user) {
                return res.status(404).json({
                    ok: false,
                    msg: 'phone/email/Password invalid!',
                });
            }

            if (!bcrypt.compareSync(req.body.password, user.password)) {
                return res.status(404).json({
                    ok: false,
                    msg: 'phone/email/Password invalid!',
                });
            }

            let token = jwt.sign({ data: user }, config.ACCESS_TOKEN_SECRET, {
                expiresIn: '2h',
            });

            return res.status(201).json({
                ok: true,
                user,
                token,
            });
        },
    );
};

//Đăng ký tài khoản
CTRL.register = async(req, res) => {
    const passwordHash = await bcrypt.hash(req.body.password, 12);
    const newUser = new User({...req.body,  password: passwordHash });
    if (req.file) {
		newUser.avatar = req.file.path;
	}
    const refresh_token = createAccessToken({ id: newUser._id });
    try {
        const savedUser = await newUser.save();
        res.status(200).json({ refresh_token });
    } catch (err) {
        console.log(err);
        res.status(500).json(err, {
            ok: false,
            msg: 'Passwords with letters and characters greater than 8!',
        });
    }
};

//Quên mật khẩu
CTRL.resetPassword = async(req, res) => {
    try {
        const { password } = req.body;
        const passwordHash = await bcrypt.hash(password, 12);

        await User.findOneAndUpdate({ _id: req.user.id }, {
            password: passwordHash,
        }, );
        res.status(200).json({
            msg: 'Password successfully changed!',
        });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

CTRL.logout = async(req, res) => {
    try {
        res.clearCookie('refreshtoken', {
            path: '/api/auth/refresh_token',
            httpOnly: true,
        });

        return res.status(200).json({
            msg: 'Logged out!',
        });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '2h',
    });
};

module.exports = CTRL;
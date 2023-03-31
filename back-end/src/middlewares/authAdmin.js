const User = require('../models/User.models.js');
// const jwt = require('jsonwebtoken');
const authAdmin = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.user.id });
        console.log(req.user.id);

        if (user.role !== 1) {
            return res
                .status(400)
                .json({ msg: 'Admin resources access denied!' });
        }
        next();
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "admin") {
                next();
                return;
            }
        }
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};
// isAdmin = (req, res, next) => {
//     User.findById(req.userId).exec((err, user) => {
//       if (err) {
//         res.status(500).send({ message: err });
//         return;
//       }

//       Role.find(
//         {
//           _id: { $in: user.roles }
//         },
//         (err, roles) => {
//           if (err) {
//             res.status(500).send({ message: err });
//             return;
//           }

//           for (let i = 0; i < roles.length; i++) {
//             if (roles[i].name === "admin") {
//               next();
//               return;
//             }
//           }

//           res.status(403).send({ message: "Require Admin Role!" });
//           return;
//         }
//       );
//     });
//   };
module.exports = authAdmin;

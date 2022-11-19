'use strict';
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const none = ['/login', '/register'];
const debug = console.log.bind(console);
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'access-token-secret-example-khongthetietlo@123';

// const Joi = require('joi');

async function isAuth(req, res, next) {
	const tokenFromClient = req.headers['x-access-token'] || req.body.token || req.query.token;
	if (tokenFromClient) {
		// Nếu tồn tại token
		try {
			// Thực hiện giải mã token xem có hợp lệ hay không?
			const decoded = await jwtTest.verifyToken(tokenFromClient, accessTokenSecret);
			// Nếu token hợp lệ, lưu thông tin giải mã được vào đối tượng req, dùng cho các xử lý ở phía sau.
			req.jwtDecoded = decoded;
			// Cho phép req đi tiếp sang controller.
			next();
		} catch (error) {
			// Nếu giải mã gặp lỗi: Không đúng, hết hạn...etc:
			debug('Error while verify token:', error);
			return res.status(401).json({
				message: 'Unauthorized.',
			});
		}
	} else {
		return res.status(403).send({
			message: 'No token provided.',
		});
	}
}



// async function verifyToken(token) {
// 	let result = null;
// 	const secret = _var.jwt.secretToken;
// 	return new Promise((resolve) => {
// 		jwt.verify(token, secret, function (error, resp) {
// 			if (resp) {
// 				result = resp;
// 			}
// 			resolve(result);
// 		});
// 	});
// }




module.exports = {
	// verifyAPI,
	isAuth,
};

const _ = require('lodash');

function formatPermission(routes, routeParents) {
	let result = [];

	_.forEach(routeParents, (rp) => {
		// push child to parent
		const codeP = rp.code;
		let children = [];

		_.forEach(routes, (item) => {
			const { actionId, actionName, actionKey, groupId, groupName, routeId, routeName, routeKey, code, shortName, status } = item;
			const sub = code.substring(0, 3);

			if (codeP === sub) {
				let route = _.find(children, { routeId });
				let _actions = [], action;

				if (!route) {
					route = {
						groupId,
						groupName,
						routeId,
						routeName,
						routeKey,
						code,
						shortName,
						status,
						actions: [],
					}
					children.push(route);
				}

				_actions = route.actions;
				action = _.find(_actions, { actionId });
				if (!action && actionId) {
					action = {
						actionId,
						actionName,
						actionKey,
					};
					_actions.push({
						actionId,
						actionName,
						actionKey,
					});
				}
			}
		});

		if (_.size(children) > 0) {
			rp.children = children;
			result.push(rp);
		}
	});

	return result;
}

function boDauTiengViet(str) {
	str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
	str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
	str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
	str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
	str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
	str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
	str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
	str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
	str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
	str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
	str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
	str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
	str = str.replace(/Đ/g, "D");
	str = str.replace(/đ/g, "d");
	return str;
}


function generateRandomString(length) {
	let result = '';
	const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	length = length ? length : possible.length;

	for (let i = 0; i < 5; i++)
		result += possible.charAt(Math.floor(Math.random() * length));

	return result;
}

module.exports = { formatPermission, generateRandomString, boDauTiengViet };

let logger = require('../utils/log')(module),
	request = require('request'),
	obj;

module.exports = function(user, query) {
	let url = 'https://api.rozklad.hub.kpi.ua';

	if (query) {
		if (query.group == 51)
			url += '/groups/580/timetable/';
		if (query.group == 52)
			url += '/groups/583/timetable/';
		if (query.group == 53)
			url += '/groups/585/timetable/';
	} else {
		if (user.group == 'КВ-51')
			url += '/groups/580/timetable/';
		if (user.group == 'КВ-52')
			url += '/groups/583/timetable/';
		if (user.group == 'КВ-53')
			url += '/groups/585/timetable/';
	};

	return function (cb) {
		console.log(url);
		request(url, (err, res, body) => {
			if (err) return cb(err);
			res.statusCode == 200 ? obj = JSON.parse(body) : logger.info('Fail: ' + res.statusCode);
			return cb(null, obj);
		});
	}
}
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
		if (user.group == 51)
			url += '/groups/580/timetable/';
		if (user.group == 52)
			url += '/groups/583/timetable/';
		if (user.group == 53)
			url += '/groups/585/timetable/';
	};

	request(url, (err, res, body) => {
		if (err) logger.error(err);
		console.log('1', obj);
		res.statusCode == 200 ? obj = JSON.parse(body) : logger.info('Fail: ' + res.statusCode);
		console.log('2', obj);
	});
	console.log('3', obj);
	return obj;
}
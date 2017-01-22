let logger = require('../utils/log'),
	options = {
		host: 'api.rozklad.hub.kpi.ua',
		port: 80,
		path: '',
		method: 'GET'
	};

module.exports = function(http, user, query) {
	if (query) {
		if (query.groupNumber == 51)
			options.path = '/groups/580/timetable/'
		if (query.groupNumber == 52)
			options.path = '/groups/583/timetable/'
		if (query.groupNumber == 53)
			options.path = '/groups/585/timetable/'
	} else {
		if (user.groupNumber == 51)
			options.path = '/groups/580/timetable/'
		if (user.groupNumber == 52)
			options.path = '/groups/583/timetable/'
		if (user.groupNumber == 53)
			options.path = '/groups/585/timetable/'
	};

	function getScheduleJSON(options, cb) {
		let req = http.request(options, (res) => {
			let data = '';
			res.setEncoding('utf8');

			res.on('data', (chunk) => data += chunk);
			res.on('end', () => {
				let obj = JSON.parse(data);
				cb(obj);
			})
		});

		req.on('error', (e) => { logger.error(e) });
		req.end();
	};

	return {getScheduleJSON, options};
}
let logger = require('../utils/log')(module),
	request = require('request'),
	host = 'https://api.rozklad.hub.kpi.ua',
	searchName = '';

module.exports = function(user, query) {
	query.group ? searchName = query.group : searchName = user.group.toLowerCase(); 

	return function(cb) {
		function callback(err, res, body) {
			if (err) logger.error(err);
			else {
				body = JSON.parse(body);
				groupsArray = body.results;

				for (let i = 0; i < groupsArray.length; i++) {
					let group = groupsArray[i];
					if (group.name == searchName) {
						getSchedule(group.id, cb);
						return;
					}
				}
				if (body.next != null) request(body.next, callback)
				else return cb();
			}
		}

		request('https://api.rozklad.hub.kpi.ua/groups/?limit=100', callback);
	}
};

function getSchedule(id, cb) {
	request('https://api.rozklad.hub.kpi.ua/groups/' + id + '/timetable/', (err, res, body) => {
		if (err) cb(err);
		else {
			body = JSON.parse(body);
			res.statusCode == 200 ? cb(null, body) : cb(res.statusCode);
		}
	})
}
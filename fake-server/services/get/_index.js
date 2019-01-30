module.exports = {
	path: '/',
	render: function(req, res) {

		var html = '<h1>dyson</h1><p>Endpoints:</p>';

		var endpoints = [
			'/panchang_api/advanced_panchang',
			'/panchang_api/monthly_panchang',
		];

		html += '<ul>' + endpoints.map(function(endpoint) {
			return '<li><a href="' + endpoint + '">' + endpoint + '</a></li>';
		}).join('') + '</ul>';

		res.status(200).send(html);
	}
};
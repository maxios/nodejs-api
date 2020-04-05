const crypto = require('crypto');

module.exports = function generateSignature(...strings) {
	return crypto
		.createHash('sha256')
		.update(strings.join(''))
		.digest('hex');
};

const crypto = require('crypto');

module.exports.generateSignature = (...strings) => {
	return crypto
		.createHash('sha256')
		.update(strings.join(''))
		.digest('hex');
};

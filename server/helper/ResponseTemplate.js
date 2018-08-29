class ResponseTemplate {
	success (obj) {
		return {
			success: true,
			...obj
		};
	}
	error (obj) {
		return {
			success: false,
			...obj
		}
	}
}

const responseTemplate = new ResponseTemplate();
module.exports = responseTemplate;
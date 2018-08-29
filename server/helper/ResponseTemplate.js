class ResponseTemplate {
	success (obj) {
		return {
			success: true,
			...obj
		};
	}
}

const responseTemplate = new ResponseTemplate();
module.exports = responseTemplate;
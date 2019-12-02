export default class RelatedTagUtils {

	static getMachineNameFromUrl(url) {
		let match = url.match(/[^/]+$/);
		let machineName = '';

		if (match.length > 0) {
			machineName = match[0]
		}

		return machineName;
	}

}

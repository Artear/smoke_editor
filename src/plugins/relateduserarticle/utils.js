export function extractArticleIdFromInput(value) {
	const matches = value.match(/(\d+)$/);

	if (!matches) {
		return false;
	}

	return matches[0];
}

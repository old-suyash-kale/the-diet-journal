export function setBusy(Key, bool = true) {
	return {
		type: 'SET_BUSY',
		payload: { Key, bool }
	};
};
import {
	INoteContextReducerAction,
	INote,
	ISelectedTagListReducerAction
} from './noteTypes';



export function selectedTagListReducer(state: string[], action: ISelectedTagListReducerAction): string[] {
	switch (action.type) {
		case "added":
			return [...state, action.payload.tag];
		case "removed":
			return state.filter(e => e !== action.payload.tag);
		case "cleared":
			return [];
		default:
			return state;
	}
}

export function noteListReducer(state: INote[], action: INoteContextReducerAction): INote[] {
	switch (action.type) {
		case 'added':
			const newNote = action.payload.data as INote;
			newNote.uid = action.payload.id;
			return [...state, newNote];
		case 'modified':
			return state.map(e => {
				if (e.uid !== action.payload.id) {
					return e;
				} else {
					const modifiedObject = action.payload.data as INote;
					modifiedObject.uid = e.uid;
					return modifiedObject;
				}
			});
		case 'removed':
			return state.filter(e => e.uid !== action.payload.id);
		case 'cleared':
			return [];
		default:
			return state;
	}
}
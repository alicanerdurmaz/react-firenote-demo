import {
	INoteContextReducerAction,
	INote,
	ISelectedTagList,
	ISelectedTagListReducerAction
} from './noteTypes';


export function selectedTagListReducer(state: ISelectedTagList[], action: ISelectedTagListReducerAction): ISelectedTagList[] {
	switch (action.type) {
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
			return state;
		case 'removed':
			return state;
		default:
			return state;
	}
}
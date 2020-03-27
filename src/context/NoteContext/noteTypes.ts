export type INoteContext = {
	notesList: INote[];
	tagsList: string[];
	selectedTagList: string[];
	dispatchSelectedTagList: React.Dispatch<ISelectedTagListReducerAction>;
}
export type INote = {
	uid: string;
	color: string;
	content: string;
	createdAt: Date;
	lastEdited: Date;
	tags: string[];
	title: string;
};

export type INoteContextReducerAction = {
	type: 'added' | 'modified' | 'removed';
	payload: {
		data: firebase.firestore.DocumentData;
		id: string;
	};
};


export type ISelectedTagListReducerAction = {
	type: 'added' | 'modified' | 'removed' | 'cleared';
	payload: {
		tag: string;
	};
};
export type INoteContext = {
	notesList: INote[];
	tagsList: string[];
	selectedTagList: string[];
	dispatchSelectedTagList: React.Dispatch<ISelectedTagListReducerAction>;
	setSearchTerm: React.Dispatch<React.SetStateAction<string>>
	searchTerm: string;
}
export type INote = {
	uid: string;
	color: string;
	content: string;
	createdAt: Date;
	lastEdited: Date;
	tags: string[];
	title: string;
	words: string[];
};

export type INoteContextReducerAction = {
	type: 'added' | 'modified' | 'removed' | 'cleared';
	payload: {
		data: firebase.firestore.DocumentData | {};
		id: string;
	};
};


export type ISelectedTagListReducerAction = {
	type: 'added' | 'modified' | 'removed' | 'cleared';
	payload: {
		tag: string;
	};
};

export enum CustomQuery {
	None = 1,
	Tag,
	Term,
}
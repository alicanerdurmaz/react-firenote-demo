import firebase, { firestore } from '../../components/Firebase/firebase';


type Data = {
	color: string;
	content: string;
	tags: string[];
	title: string;
}

export const firestoreAddNote = (userId: string, data: Data) => {

	firestore
		.collection(userId)
		.doc('notes')
		.collection('notesCollection')
		.add({
			title: data.title,
			content: data.content,
			tags: data.tags,
			color: data.color,
			lastEdited: new Date(),
			createdAt: new Date(),
			words: wordsParser(data.content, data.title)
		})
		.then(function (docRef) {
			console.log('Document written with ID: ', docRef.id);
		})
		.catch(function (error) {
			console.error('Error adding document: ', error);
		});
}

export const firestoreDeleteNote = (userId: string, docId: string) => {
	firestore
		.collection(userId)
		.doc('notes')
		.collection('notesCollection').doc(docId).delete().then(function () {
			console.log("Document successfully deleted!");
		}).catch(function (error) {
			console.error("Error removing document: ", error);
		});
}

export const firestoreAddTag = (userId: string, tag: string) => {
	const tagRef = firestore
		.collection(userId)
		.doc('tags');
	tagRef.update({
		tagList: firebase.firestore.FieldValue.arrayUnion(tag)
	});
}
export const firestoreRemoveTag = (userId: string, tag: string, docId: string) => {
	const tagRef = firestore
		.collection(userId)
		.doc('tags');
	tagRef.update({
		tagList: firebase.firestore.FieldValue.arrayRemove(tag)
	});
}


const wordsParser = (content: string, title: string): object => {
	const wordsArray = new Set(content.toLowerCase().split(" ").concat(title.toLowerCase().split(" ")));
	return Array.from(wordsArray);
}
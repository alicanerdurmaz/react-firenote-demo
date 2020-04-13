import firebase, { firestore, auth } from '../../components/Firebase/firebase';



type Data = {
	color: string;
	content: string;
	tags: string[];
	title: string;
	pinned: boolean;
}

export const firestoreAddNote = (data: Data) => {
	firestore
		.collection(auth.currentUser!.uid)
		.doc('notes')
		.collection('notesCollection')
		.add({
			title: data.title,
			content: data.content,
			tags: data.tags,
			color: data.color,
			lastEdited: new Date(),
			createdAt: new Date(),
			words: wordsParser(data.content, data.title),
			pinned: false
		})
		.then(function (docRef) {
			console.log('Document written with ID: ', docRef.id);
		})
		.catch(function (error) {
			console.error('Error adding document: ', error);
		});
}
export const firestoreUpdateNote = (data: Data, id: string) => {
	firestore
		.collection(auth.currentUser!.uid)
		.doc('notes')
		.collection('notesCollection').doc(id).update({
			title: data.title,
			content: data.content,
			tags: data.tags,
			color: data.color,
			lastEdited: new Date(),
			words: wordsParser(data.content, data.title),
			pinned: data.pinned,
		})
}
export const fireStorePinTest = (isPinned: boolean, uid: string) => {
	firestore
		.collection("DdAhaoSVldOjAViG6NzJOkuSebT2")
		.doc('notes')
		.collection('notesCollection').doc(uid).update({
			pinned: isPinned,
			lastEdited: new Date(),
		})
}

export const firestoreDeleteNote = (docId: string) => {
	firestore
		.collection(auth.currentUser!.uid)
		.doc('notes')
		.collection('notesCollection').doc(docId).delete().then(function () {
			console.log("Document successfully deleted!");
		}).catch(function (error) {
			console.error("Error removing document: ", error);
		});
}
export const firestoreDeleteMultipleNotes = (docIdList: string[]) => {
	let batch = firestore.batch();
	docIdList.forEach(uid => {
		const ref = firestore
			.collection(auth.currentUser!.uid)
			.doc('notes')
			.collection('notesCollection').doc(uid);
		batch.delete(ref);
	})
	batch.commit();

}

export const firestoreAddTag = (tag: string) => {
	const tagRef = firestore
		.collection(auth.currentUser!.uid)
		.doc('tags');
	tagRef.update({
		tagList: firebase.firestore.FieldValue.arrayUnion(tag)
	});
}
export const firestoreRemoveTag = (tag: string, docId: string) => {
	const tagRef = firestore
		.collection(auth.currentUser!.uid)
		.doc('tags');
	tagRef.update({
		tagList: firebase.firestore.FieldValue.arrayRemove(tag)
	});
}


const wordsParser = (content: string, title: string): object => {
	const wordsArray = new Set(content.toLowerCase().split(" ").concat(title.toLowerCase().split(" ")));
	return Array.from(wordsArray);
}
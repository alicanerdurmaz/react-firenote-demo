import React, { useState, createContext, useEffect, useContext } from 'react';
import { firestore } from '../../components/Firebase/firebase';
import { useAuthContext } from '../AuthContext';

const FirestoreContext = createContext<any | undefined>(undefined);

type Note = {
  uid: string;
  color: string;
  content: string;
  createdAt: firebase.firestore.FieldValue;
  lastEdited: firebase.firestore.FieldValue;
  tags: string[];
  title: string;
};

export const FirestoreProvider: React.FC = props => {
  const { currentUser } = useAuthContext();
  const [notesList, setNoteList] = useState<Note[]>([]);
  const [tagsList, setTagsList] = useState<string[]>([]);

  useEffect(() => {
    if (!currentUser) return;
    const unsubscribeNoteList = firestore
      .collection(currentUser.uid)
      .doc('notes')
      .collection('notesCollection')
      .onSnapshot(function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
          if (change.type === 'added') {
            console.log('added: ', change.doc.data(), change.doc.id);
          }
          if (change.type === 'modified') {
            console.log('modified: ', change.doc.data(), change.doc.id);
          }
          if (change.type === 'removed') {
            console.log('removed: ', change.doc.data(), change.doc.id);
          }
        });
      });
    const unsubscribeTagsList = firestore
      .collection(currentUser.uid)
      .doc('tags')
      .onSnapshot(function(doc) {
        console.log('Current data: ', doc.data());
      });
    return () => {
      unsubscribeNoteList();
      unsubscribeTagsList();
    };
  }, [currentUser]);

  return <FirestoreContext.Provider value={{ notesList }}>{props.children}</FirestoreContext.Provider>;
};

export const useFirebaseContext = () => {
  const context = useContext(FirestoreContext);
  if (context === undefined) {
    throw new Error('useCountState must be used within a CountProvider');
  }
  return context;
};

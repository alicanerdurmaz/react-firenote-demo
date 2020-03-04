import React, { useState, createContext, useEffect, useContext, useReducer } from 'react';
import { firestore } from '../../components/Firebase/firebase';
import { useAuthContext } from '../AuthContext';

type INoteContext = {
  notesList: INote[];
  tagsList: string[];
};

type INote = {
  uid: string;
  color: string;
  content: string;
  createdAt: Date;
  lastEdited: Date;
  tags: string[];
  title: string;
};
type INoteContextReducerAction = {
  type: 'added' | 'modified' | 'removed';
  payload: {
    data: firebase.firestore.DocumentData;
    id: string;
  };
};

export const FirestoreContext = createContext<INoteContext | undefined>(undefined);

export const FirestoreProvider: React.FC = props => {
  const { currentUser } = useAuthContext();
  const [notesList, dispatchNoteList] = useReducer(noteListReducer, []);
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
            dispatchNoteList({
              type: 'added',
              payload: {
                data: change.doc.data(),
                id: change.doc.id
              }
            });
          }
          if (change.type === 'modified') {
            // dispatchNoteList({
            //   type: 'modified',
            //   payload: {
            //     data: change.doc.data(),
            //     id: change.doc.id
            //   }
            // });
            console.log(change.doc.data(), change.doc.id);
          }
          if (change.type === 'removed') {
            console.log(change.doc.data(), change.doc.id);
            // dispatchNoteList({
            //   type: 'removed',
            //   payload: {
            //     data: change.doc.data(),
            //     id: change.doc.id
            //   }
            // });
          }
        });
      });
    const unsubscribeTagsList = firestore
      .collection(currentUser.uid)
      .doc('tags')
      .onSnapshot(function(doc) {
        if (doc.data()?.tagList) setTagsList(doc.data()?.tagList);
      });
    return () => {
      unsubscribeNoteList();
      unsubscribeTagsList();
    };
  }, [currentUser]);
  console.log(notesList);
  return <FirestoreContext.Provider value={{ notesList, tagsList }}>{props.children}</FirestoreContext.Provider>;
};

export const useFirebaseContext = () => {
  const context = useContext(FirestoreContext);
  if (context === undefined) {
    throw new Error('useCountState must be used within a CountProvider');
  }
  return context;
};

function noteListReducer(state: INote[], action: INoteContextReducerAction): INote[] {
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

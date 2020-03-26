import React, { useState, createContext, useEffect, useContext, useReducer } from 'react';
import { firestore } from '../../components/Firebase/firebase';
import { useAuthContext } from '../AuthContext';
import { INoteContext } from './noteTypes';
import { noteListReducer, selectedTagListReducer } from './noteReducer';

export const NoteContext = createContext<INoteContext | undefined>(undefined);

export const NoteContextProvider: React.FC = props => {
  const { currentUser } = useAuthContext();
  const [notesList, dispatchNoteList] = useReducer(noteListReducer, []);
  const [selectedTagList, dispatchSelectedTagList] = useReducer(selectedTagListReducer, []);
  const [tagsList, setTagsList] = useState<string[]>([]);

  useEffect(() => {
    if (!currentUser) return;
    const unsubscribeNoteList = firestore
      .collection(currentUser.uid)
      .doc('notes')
      .collection('notesCollection')
      .orderBy('lastEdited', 'desc')
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

  return (
    <NoteContext.Provider value={{ notesList, tagsList, dispatchSelectedTagList }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export const useFirebaseContext = () => {
  const context = useContext(NoteContext);
  if (context === undefined) {
    throw new Error('useCountState must be used within a CountProvider');
  }
  return context;
};

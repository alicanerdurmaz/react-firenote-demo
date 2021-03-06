import React, { useState, createContext, useEffect, useContext, useReducer } from 'react'
import { firestore } from '../../components/Firebase/firebase'
import { useAuthContext } from '../AuthContext'
import { INoteContext } from './noteTypes'
import { noteListReducer, selectedTagListReducer } from './noteReducer'

export const NoteContext = createContext<INoteContext | undefined>(undefined)

export const NoteContextProvider: React.FC = (props) => {
  const { currentUser } = useAuthContext()
  const [notesList, dispatchNoteList] = useReducer(noteListReducer, [])
  const [selectedTagList, dispatchSelectedTagList] = useReducer(selectedTagListReducer, [])
  const [tagsList, setTagsList] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {}, [selectedTagList, searchTerm])

  useEffect(() => {
    if (!currentUser) return

    dispatchNoteList({ type: 'cleared', payload: { data: {}, id: 'test' } })
    const notesCollectionRef = firestore.collection(currentUser.uid).doc('notes').collection('notesCollection')
    let notesCollectionRefWithQuery = null

    if (searchTerm.length > 0) {
      notesCollectionRefWithQuery = notesCollectionRef.where(
        'words',
        'array-contains-any',
        searchTerm.toLowerCase().split(' ')
      )
    } else if (selectedTagList.length > 0) {
      notesCollectionRefWithQuery = notesCollectionRef.where('tags', 'array-contains-any', selectedTagList)
    } else {
      notesCollectionRefWithQuery = notesCollectionRef
    }

    const unsubscribeNoteList = notesCollectionRefWithQuery
      .orderBy('lastEdited', 'asc')
      .onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
          if (change.type === 'added') {
            dispatchNoteList({
              type: 'added',
              payload: {
                data: change.doc.data(),
                id: change.doc.id,
              },
            })
          }
          if (change.type === 'modified') {
            dispatchNoteList({
              type: 'modified',
              payload: {
                data: change.doc.data(),
                id: change.doc.id,
              },
            })
          }
          if (change.type === 'removed') {
            dispatchNoteList({
              type: 'removed',
              payload: {
                data: change.doc.data(),
                id: change.doc.id,
              },
            })
          }
        })
      })
    const unsubscribeTagsList = firestore
      .collection(currentUser.uid)
      .doc('tags')
      .onSnapshot(function (doc) {
        if (doc.data()?.tagList) setTagsList(doc.data()?.tagList)
      })
    return () => {
      unsubscribeNoteList()
      unsubscribeTagsList()
    }
  }, [currentUser, selectedTagList, searchTerm])

  return (
    <NoteContext.Provider
      value={{ notesList, tagsList, dispatchSelectedTagList, selectedTagList, setSearchTerm, searchTerm }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export const useNoteContext = () => {
  const context = useContext(NoteContext)
  if (context === undefined) {
    throw new Error('useCountState must be used within a CountProvider')
  }
  return context
}

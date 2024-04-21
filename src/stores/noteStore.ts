import { Note } from '@/types/note';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type NoteStore = {
  notes: Note[];
  setNotes: (notes: Note[]) => void;
  addNote: (note: Note) => void;
  removeNote: (noteId: number) => void;
  updateNote: (note: Note) => void;
};

export const useNoteStore = create<NoteStore>()(
  devtools((set) => ({
    notes: [],
    setNotes: (notesArr) =>
      set((state) => ({
        ...state,
        notes: notesArr,
      })),
    addNote: (note) =>
      set((state) => ({
        ...state,
        notes: [...state.notes, note],
      })),
    removeNote: (noteId) =>
      set((state) => ({
        ...state,
        notes: state.notes.filter((note) => note.id !== noteId),
      })),
    updateNote: (updatedNote) =>
      set((state) => ({
        ...state,
        notes: state.notes.map((note) => {
          if (note.id === updatedNote.id) {
            return updatedNote;
          }
          return note;
        }),
      })),
  }))
);

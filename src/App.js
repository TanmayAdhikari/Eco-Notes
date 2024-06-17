import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import NotesList from './components/NotesList';
import Search from './components/Search';
import Header from './components/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: 'This is my first note!',
      date: '15/04/2021',
    },
    {
      id: nanoid(),
      text: 'This is my second note!',
      date: '21/04/2021',
    },
    {
      id: nanoid(),
      text: 'This is my third note!',
      date: '28/04/2021',
    },
    {
      id: nanoid(),
      text: 'This is my new note!',
      date: '30/04/2021',
    },
  ]);

  const [searchText, setSearchText] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('react-notes-app-data'));

    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('react-notes-app-data', JSON.stringify(notes));
    } catch (error) {
      console.error("Failed to save notes to local storage", error);
      toast.error("Failed to save notes. Please try again.");
    }
  }, [notes]);

  const addNote = (title, text) => {
    if (text.trim().length === 0) {
      toast.error("Note cannot be empty.");
      return;
    }

    const date = new Date();
    const newNote = {
      id: nanoid(),
      title: title || 'New Note',
      text: text,
      date: date.toLocaleDateString(),
      pinnedAt: null,
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
    toast.success("Note added successfully!");
  };

  const updateNote = ({ id,title, text, date, pinnedAt }) => {
    const newNotes = notes.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          title: title,
          text: text,
          date: date,
          pinnedAt: pinnedAt,
        };
      }
      return note;
    });
    setNotes(newNotes);
    toast.success("Note updated successfully!");
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    toast.info("Note deleted.");
  };

  const togglePinNote = (id) => {
    const newNotes = notes.map((note) => {
      if (note.id === id) {
        return { ...note, pinnedAt: note.pinnedAt ? null : new Date().toISOString() };
      }
      return note;
    });
    setNotes(newNotes);
    toast.success("Note pin status updated!");
  };
  //eslint-disable-next-line
  const sortedNotes = notes.sort((a, b) => {
    if (a.pinnedAt && b.pinnedAt) {
      return new Date(b.pinnedAt) - new Date(a.pinnedAt);
    } else if (a.pinnedAt) {
      return -1;
    } else if (b.pinnedAt) {
      return 1;
    }
    return new Date(b.date) - new Date(a.date);
  });

  return (
    <div className={`${darkMode && 'dark-mode'}`}>
      <div className='container'>
        <Header handleToggleDarkMode={setDarkMode} />
        <Search handleSearchNote={setSearchText} />
        <NotesList
          notes={notes.filter((note) =>
            note.text.toLowerCase().includes(searchText)
          )}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
          handleTogglePin={togglePinNote}
          updateNote={updateNote}
        />
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      </div>
    </div>
  );
};

export default App;

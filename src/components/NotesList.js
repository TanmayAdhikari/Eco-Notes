import React, { useState } from 'react';
import Note from './Note';
import AddNote from './AddNote';
import CustomPagination from './CustomPagination'; 
import '../index.css';

const NotesList = ({
  notes,
  handleAddNote,
  handleDeleteNote,
  handleTogglePin,
  updateNote,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 5;

  // Calculate the total number of pages
  const totalPages = Math.ceil(notes.length / notesPerPage);

  // Calculate the notes to show on the current page
  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);

  // Change page
  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <div className="notes-list">
        <AddNote handleAddNote={handleAddNote} />
        {currentNotes.map((note) => (
          <Note
            key={note.id}
            id={note.id}
            title={note.title}
            text={note.text}
            date={note.date}
            handleDeleteNote={handleDeleteNote}
            handleTogglePin={() => handleTogglePin(note.id)}
            updateNote={updateNote}
            pinnedAt={note.pinnedAt}
          />
        ))}
      </div>
      <CustomPagination
        totalPages={totalPages}
        currentPage={currentPage}
        handleChangePage={handleChangePage}
      />
    </div>
  );
};

export default NotesList;

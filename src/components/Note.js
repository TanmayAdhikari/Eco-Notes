import { useState } from 'react';
import { MdDeleteForever, MdOutlineEdit } from 'react-icons/md';
import { LuTreePine } from 'react-icons/lu';
// import './Note.css'; 

const Note = ({ id, text, title, date, handleDeleteNote, handleTogglePin, updateNote, pinnedAt }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(text);
    const [editedTitle, setEditedTitle] = useState(title);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSaveEdit = () => {
        updateNote({
            id: id,
            text: editedText,
            title: editedTitle,
            date: date,
            pinnedAt: null,
        });
        setIsEditing(false);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSaveEdit();
        }
    };

    return (
        <div className='note funky-note'>
            <div className='note-header'>
                <div className='note-title'>
                    {isEditing ? (
                        <textarea 
                            rows='1'
                            cols='10'
                            className='edit-title'
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            onBlur={handleSaveEdit}
                            onKeyPress={handleKeyPress}
                            style={{ maxHeight: '100px', overflowY: 'auto' }}
                        />
                    ) : (
                        <h3>{title}</h3>
                    )}
                </div>
                <div className='note-icons'>
                    <LuTreePine
                        onClick={() => handleTogglePin(id)}
                        className={`pin-icon ${pinnedAt ? 'pinned' : ''}`}
                        size='1.5em'
                    />
                    <MdDeleteForever
                        onClick={() => handleDeleteNote(id)}
                        className='delete-icon'
                        size='1.5em'
                    />
                    <MdOutlineEdit
                        onClick={handleEdit}
                        className='edit-icon'
                        size='1.5em'
                    />
                </div>
            </div>
            <div className='note-content'>
                {isEditing ? (
                    <textarea
                        rows='4'
                        cols='10'
                        className='edit-text'
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        onBlur={handleSaveEdit}
                        onKeyPress={handleKeyPress}
                        style={{ maxHeight: '100px', overflowY: 'auto' }}
                    />
                ) : (
                    <p>{text}</p>
                )}
            </div>
            <div className='note-footer'>
                <small>{date}</small>
            </div>
        </div>
    );
};

export default Note;
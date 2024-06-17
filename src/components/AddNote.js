import { useState } from 'react';
import { MdAddTask } from "react-icons/md";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddNote = ({ handleAddNote }) => {
    const [noteText, setNoteText] = useState('');
    const [title, setTitle] = useState('');
    const characterLimit = 200;

    const handleChange = (event) => {
        if (characterLimit - event.target.value.length >= 0) {
            setNoteText(event.target.value);
        }
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); 
            handleSaveClick();
        }
    };

    const handleSaveClick = () => {
        if (noteText.trim().length > 0 && title.trim().length > 0) {
            handleAddNote(title, noteText);
            setNoteText('');
            setTitle('');
        } else {
            toast.error("Title and note cannot be empty", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <div className='note new'>
            <input 
                type="text"
                placeholder="Enter Title here..."
                value={title}
                onChange={handleTitleChange}
                className="note-title-input"
            />
            <textarea
                rows='4'
                placeholder='Type to add a note...'
                value={noteText}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                className="note-textarea"
				style={{ maxHeight: '100px', overflowY: 'auto' }}
            ></textarea>
            <div className='note-footer'>
                <small>
                    {characterLimit - noteText.length} Remaining
                </small>
                <button className='save-btn' onClick={handleSaveClick}>
                    <MdAddTask size='1.3em' /> Save Note
                </button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AddNote;
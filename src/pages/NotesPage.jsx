import { Note, SingleNote } from '../components/components.js';
import { useEffect, useState } from 'react';
import { sendMessage } from '../utils/utils.js';
import DescriptionIcon from '@mui/icons-material/Description';

function NotesPage({ questionName }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showNote, setShowNote] = useState(false);

  // Gets notes from the service-worker.js
  async function getNotes() {
    const notesData = await sendMessage({ type: 'getNotes' });
    console.log('notesData is: ');
    console.log(notesData);
    if (!Object.keys(notesData).length) {
      setNotes([]);
    } else {
      setNotes(notesData.notes);
    }
    setLoading(false);
  }

  // Fetch notes on page load and reset notes on component unmount
  useEffect(() => {
    setLoading(true);
    getNotes();

    return () => {
      setNotes([]);
      setLoading(false);
    };
  }, [questionName]);

  return (
    <div>
      {questionName && (
        <div className="text-end">
          <span
            className=""
            onClick={() => {
              setShowNote(!showNote);
            }}
          >
            <DescriptionIcon
              htmlColor="whitesmoke"
              className="cursor-pointer"
            />
          </span>
        </div>
      )}
      {showNote && (
        <SingleNote questionName={questionName} setNotes={setNotes} setShowNote={setShowNote} />
      )}
      {loading && <div className="text-white">Loading...</div>}
      {!loading && notes.length
        ? notes.map((note, index) => (
            <Note
              key={index}
              questionName={note.questionName}
              descripton={note.descripton}
              userNote={note.userNote}
              tags={note.tags}
            />
          ))
        : ''}
    </div>
  );
}

export default NotesPage;

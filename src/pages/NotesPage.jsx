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

    // Resets the state on the component unmount
    return () => {
      setNotes([]);
      setLoading(false);
    };
  }, [questionName]);

  return (
    <div>
      {questionName && (
        <div className="text-end mb-4">
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
      <div className="h-[27rem] max-w-4xl overflow-scroll border border-gray-400 rounded-lg p-2 space-y-2 mb-4 ">
        {showNote && (
          <SingleNote setNotes={setNotes} setShowNote={setShowNote} />
        )}
        {loading && <div className="text-white">Fetching the notes...</div>}
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
          : null}
      </div>
    </div>
  );
}

export default NotesPage;

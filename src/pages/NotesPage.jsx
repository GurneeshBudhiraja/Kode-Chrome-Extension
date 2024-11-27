import { Note } from '../components/components.js';
import { useEffect, useState } from 'react';
import { sendMessage } from '../utils/utils.js';
function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

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

    return () => {
      setNotes([]);
      setLoading(false);
    };
  }, []);
  return (
    <div>
      {notes.length ? (
        notes.map((note, index) => (
          <Note
            key={index}
            questionName={note.questionName}
            descripton={note.descripton}
            userNote={note.userNote}
            tags={note.tags}
          />
        ))
      ) : (
        <div className="text-[#F5F5F5] bg-[#1A1B23] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-medium p-3 text-center border rounded-lg select-none w-5/6">
          No notes found
        </div>
      )}
    </div>
  );
}

export default NotesPage;

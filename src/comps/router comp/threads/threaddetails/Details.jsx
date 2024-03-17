import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc, updateDoc, arrayUnion, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // Import getAuth from Firebase Auth

const ThreadDetail = () => {
  const { id } = useParams();
  const [thread, setThread] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reply, setReply] = useState('');
  const [replies, setReplies] = useState([]);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const fetchThread = async () => {
      try {
        const db = getFirestore();
        const threadRef = doc(db, 'threads', id);
        const threadSnapshot = await getDoc(threadRef);
        if (threadSnapshot.exists()) {
          setThread({ id: threadSnapshot.id, ...threadSnapshot.data() });
          setReplies(threadSnapshot.data().replies || []); // Load existing replies
        } else {
          console.log('Thread not found');
        }
      } catch (error) {
        console.error('Error fetching thread:', error);
      }
      setLoading(false);
    };

    fetchThread();
  }, [id]);

  // Fetch the currently logged-in user's email
  useEffect(() => {
    const auth = getAuth();
    setUserEmail(auth.currentUser ? auth.currentUser.email : '');
  }, []);

  const handleReplyChange = (e) => {
    setReply(e.target.value);
  };

  const handleSubmitReply = async (e) => {
    e.preventDefault();
    try {
      const db = getFirestore();
      const threadRef = doc(db, 'threads', id);
      const replyData = {
        content: reply,
        time: new Date().toLocaleTimeString(), // Get current time
        email: userEmail, // Use the email of the currently logged-in user
      };
      await updateDoc(threadRef, { replies: arrayUnion(replyData) }); // Add reply to thread document
      setReplies([...replies, replyData]); // Update local state with new reply
      setReply(''); // Clear reply input field
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : thread ? (
        <div>
          <h2>{thread.heading}</h2>
          {/* Display existing replies */}
          <ul>
            {replies.map((reply, index) => (
              <li key={index}>
                <strong>{reply.email}</strong> - {reply.time}: {reply.content}
              </li>
            ))}
          </ul>
          {/* Form to submit a new reply */}
          <form onSubmit={handleSubmitReply}>
            <input type="text" value={reply} onChange={handleReplyChange} />
            <button type="submit">Submit Reply</button>
          </form>
        </div>
      ) : (
        <p>Thread not found</p>
      )}
    </div>
  );
};

export default ThreadDetail;

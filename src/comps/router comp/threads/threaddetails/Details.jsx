import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc, updateDoc, arrayUnion, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

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
          setReplies(threadSnapshot.data().replies || []);
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
        time: new Date().toLocaleTimeString(),
        email: userEmail,
      };
      await updateDoc(threadRef, { replies: arrayUnion(replyData) });
      setReplies([...replies, replyData]);
      setReply('');
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {loading ? (
        <p>Loading...</p>
      ) : thread ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">{thread.heading}</h2> {/* Larger main heading */}
          <ul>
            {replies.map((reply, index) => (
              <li key={index} className="mb-4"> {/* Added margin-bottom */}
                <div className="flex items-center mb-2">
                  <strong className="mr-2">{reply.email}</strong>
                  <span className="text-gray-500 text-sm">{reply.time}</span>
                </div>
                <p>{reply.content}</p>
              </li>
            ))}
          </ul>
          <form onSubmit={handleSubmitReply} className="mt-4">
            <input
              type="text"
              value={reply}
              onChange={handleReplyChange}
              placeholder="Write your reply..."
              className="w-full rounded border-gray-300 focus:outline-none focus:border-blue-500 p-2"
            />
            <button type="submit" className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
              Submit Reply
            </button>
          </form>
        </div>
      ) : (
        <p>Thread not found</p>
      )}
    </div>
  );
};

export default ThreadDetail;

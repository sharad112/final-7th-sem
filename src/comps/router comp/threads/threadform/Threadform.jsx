import React, { useState } from 'react';
import styles from './threadform.module.css';
import { collection, addDoc } from 'firebase/firestore';
import auth from '../../../../firebase/firebase';
import { getFirestore } from 'firebase/firestore'; // Import getFirestore

const ThreadForm = ({ onClose }) => {
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const db = getFirestore(); // Initialize Firestore

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true); // Set loading to true when form is submitted

  try {
    // Ensure 'threads' collection exists
    const threadsRef = collection(db, 'threads');
    await addDoc(threadsRef, {
      heading,
      description,
      createdAt: new Date().toISOString(), // Use JavaScript Date and time
      createdBy: auth.currentUser ? auth.currentUser.email : null, // Use the current user's email
      replies: 0, // Set default replies count to zero
    });

    // Reset form fields and state
    setHeading('');
    setDescription('');
    setError('');
    setLoading(false);
    onClose(); // Close the form popup
    console.log('Thread added successfully');
  } catch (error) {
    setError('Error adding thread: ' + error.message);
    setLoading(false);
  }
};


  return (
    <div className={styles.formPopup}>
      <div className={styles.formContent}>
        <span className={styles.close} onClick={onClose}>close</span>
        <h2 className={styles.heading}>Create New Thread</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="heading">Thread Heading:</label>
            <input 
              type="text" 
              id="heading" 
              value={heading} 
              onChange={(e) => setHeading(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              required 
            />
          </div>
          <div>
            <button type="submit" disabled={loading}>
              {loading ? 'Adding Thread...' : 'Create Thread'}
            </button>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default ThreadForm;

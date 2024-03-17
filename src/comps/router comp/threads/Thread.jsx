import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, orderBy, where, getDocs } from 'firebase/firestore';
import ThreadForm from './threadform/Threadform';
import styles from './thread.module.css';
import Ttable from './threadtable/Ttable';
import auth from '../../../firebase/firebase';// Import Firebase authentication

const Thread = () => {
    const [showForm, setShowForm] = useState(false); // State to manage form visibility
    const [threads, setThreads] = useState([]); // State to store fetched threads
    const [isMyThreads, setIsMyThreads] = useState(false); // State to track if showing only user's threads

    const db = getFirestore(); // Initialize Firestore

    useEffect(() => {
        fetchThreads(); // Fetch all threads when the component mounts
    }, []);

    useEffect(() => {
        fetchThreads(); // Fetch threads again when isMyThreads state changes
    }, [isMyThreads]);

    const fetchThreads = async () => {
        try {
            let threadsQuery;
            if (isMyThreads && auth.currentUser) {
                // Fetch threads created by the currently logged-in user
                threadsQuery = query(collection(db, 'threads'), where('createdBy', '==', auth.currentUser.email), orderBy('createdAt', 'desc'));
            } else {
                // Fetch all threads
                threadsQuery = query(collection(db, 'threads'), orderBy('createdAt', 'desc'));
            }

            const querySnapshot = await getDocs(threadsQuery);
            const threadsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setThreads(threadsData);
        } catch (error) {
            console.error('Error fetching threads:', error);
        }
    };

    const handleStartDiscussion = () => {
        setShowForm(true); // Show the form when clicking "start discussion"
    };

    const handleMyThreads = () => {
        setIsMyThreads(prevState => !prevState); // Toggle isMyThreads state
    };

    return (
        <div className={styles.thread_wrapper}>
            <div className={styles.thread_heading}>
                <div className={styles.thread_top_left}>
                    <h1>General Discussion</h1>
                    <p>All the discussion related to crops and its data</p>
                </div>

                <div className={styles.thread_top_right}>
                    <button className={styles.new} onClick={handleStartDiscussion}>Start Discussion</button>
                    <button className="history" onClick={handleMyThreads}>
                        {isMyThreads ? 'Show All Threads' : 'My Threads'}
                    </button>
                </div>
            </div>

            <div className="thread_bottom">
                {showForm && <ThreadForm onClose={() => setShowForm(false)} />}
                <Ttable data={threads}/>
                {/* Render the list of threads */}
                <div>
                    <h2>{isMyThreads ? 'My Threads' : 'All Threads'}</h2>
                </div>
            </div>
        </div>
    );
}

export default Thread;

import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import auth from '../../../firebase/firebase';

const History = () => {
    const [userSubmissions, setUserSubmissions] = useState([]);
    const [userEmail, setUserEmail] = useState("");

    const db = getFirestore(); // Initialize Firestore

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setUserEmail(user.email);
                fetchUserSubmissions(user.email);
            }
        });

        return unsubscribe;
    }, []);

    const fetchUserSubmissions = async (email) => {
        const q = query(collection(db, "submissions"), where("userEmail", "==", email));
        const querySnapshot = await getDocs(q);
        const submissions = [];
        querySnapshot.forEach((doc) => {
            submissions.push({ id: doc.id, ...doc.data() });
        });
        console.log("User submissions:", submissions); // Log the fetched data
        setUserSubmissions(submissions);
    };

    return (
        <div>
            <h2>Your Submission History</h2>
            <ul>
                {userSubmissions.map(submission => (
                    <li key={submission.id}>{submission.result}</li>
                ))}
            </ul>
        </div>
    );
};

export default History;

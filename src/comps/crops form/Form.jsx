import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './form.module.css';
import axios from 'axios';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import auth from '../../firebase/firebase';

const Form = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        humidity: "",
        P: "",
        temperature: "",
        rainfall: "",
        K: "",
        ph: "",
        N: ""
    });
    const [errors, setErrors] = useState({
        humidity: "",
        P: "",
        temperature: "",
        rainfall: "",
        K: "",
        ph: "",
        N: ""
    });
    const [userEmail, setUserEmail] = useState("");

    const db = getFirestore(); // Initialize Firestore

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setUserEmail(user.email);
            }
        });

        return unsubscribe;
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = { ...errors };

        // Validation for humidity
        if (data.humidity === "" || data.humidity < 40 || data.humidity > 90) {
            newErrors.humidity = "Humidity value should be between 40 and 90.";
        } else {
            newErrors.humidity = "";
        }

        // Validation for P
        if (data.P === "" || data.P < 10 || data.P > 50) {
            newErrors.P = "Phosphorus value should be between 10 and 50.";
        } else {
            newErrors.P = "";
        }

        // Validation for temperature
        if (data.temperature === "" || data.temperature < 10 || data.temperature > 40) {
            newErrors.temperature = "Temperature value should be between 10 and 40.";
        } else {
            newErrors.temperature = "";
        }

        // Validation for rainfall
        if (data.rainfall === "" || isNaN(data.rainfall)) {
            newErrors.rainfall = "Rainfall value should be a number.";
        } else {
            newErrors.rainfall = "";
        }

        // Validation for K
        if (data.K === "" || data.K < 0.5 || data.K > 2) {
            newErrors.K = "Potassium value should be between 0.5 and 2.";
        } else {
            newErrors.K = "";
        }

        // Validation for ph
        if (data.ph === "" || data.ph < 5.5 || data.ph > 7.5) {
            newErrors.ph = "pH value should be between 5.5 and 7.5.";
        } else {
            newErrors.ph = "";
        }

        // Validation for N
        if (data.N === "" || data.N < 0.1 || data.N > 5) {
            newErrors.N = "Nitrogen value should be between 0.1 and 5.";
        } else {
            newErrors.N = "";
        }

        setErrors(newErrors);

        if (Object.values(newErrors).some(error => error)) {
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:5000/predict_crop',
                { input_feature: data },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            const date = new Date();

            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            let currentDate = `${day}-${month}-${year}`;
            await addDoc(collection(db, 'submissions'), {
                result: response.data[0].predicted_crop,
                userEmail: userEmail,
                timestamp: serverTimestamp(),
                date:currentDate,
            });

            const recommendedCrop = response.data[0].predicted_crop;
            navigate("/result",{state:{crop:recommendedCrop}});  
        } catch (error) {
            console.error(error);
            alert('Error sending request.');
        }
    };

    return (
        <div className={styles.form}>
            <div className={styles.heading}>
                <h1>Crop Recommendation</h1>
                <p>Fill out the input fields correctly to get the crop recommendation</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className={styles.form_inside}>
                    <div className={styles.inputContainer}>
                        <label htmlFor="humidity">Humidity:</label>
                        <input type="number" name="humidity" id="humidity" placeholder="Enter the value of humidity" value={data.humidity} onChange={handleChange} />
                        <span className={styles.error}>{errors.humidity}</span>
                    </div>

                    <div className={styles.inputContainer}>
                        <label htmlFor="P">Phosphorus:</label>
                        <input type="number" name="P" id="P" placeholder="Enter the value of phosphorus" value={data.P} onChange={handleChange} />
                        <span className={styles.error}>{errors.P}</span>
                    </div>

                    <div className={styles.inputContainer}>
                        <label htmlFor="temperature">Temperature:</label>
                        <input type="number" name="temperature" id="temperature" placeholder="Enter the value of temperature" value={data.temperature} onChange={handleChange} />
                        <span className={styles.error}>{errors.temperature}</span>
                    </div>

                    <div className={styles.inputContainer}>
                        <label htmlFor="rainfall">Rainfall (mm):</label>
                        <input type="number" name="rainfall" id="rainfall" placeholder="Enter the value of rainfall (in mm)" value={data.rainfall} onChange={handleChange} />
                        <span className={styles.error}>{errors.rainfall}</span>
                    </div>

                    <div className={styles.inputContainer}>
                        <label htmlFor="K">Potassium:</label>
                        <input type="number" name="K" id="K" placeholder="Enter the value of potassium" value={data.K} onChange={handleChange} />
                        <span className={styles.error}>{errors.K}</span>
                    </div>

                    <div className={styles.inputContainer}>
                        <label htmlFor="ph">pH:</label>
                        <input type="number" name="ph" id="ph" placeholder="Enter the value of pH" value={data.ph} onChange={handleChange} />
                        <span className={styles.error}>{errors.ph}</span>
                    </div>

                    <div className={styles.inputContainer}>
                        <label htmlFor="N">Nitrogen:</label>
                        <input type="number" name="N" id="N" placeholder="Enter the value of nitrogen" value={data.N} onChange={handleChange} />
                        <span className={styles.error}>{errors.N}</span>
                    </div>
                    <br />
                    <button type="submit" className={styles.submit}>Get recommendation</button>
                </div>
            </form>
        </div>
    );
};

export default Form;

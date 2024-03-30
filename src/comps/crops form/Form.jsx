import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './form.module.css';
import axios from 'axios';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import auth from '../../firebase/firebase';
import { Audio } from "react-loader-spinner";

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
    const [loading, setLoading] = useState(false); // NEW LOADING STATE

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
        setLoading(true); // Set loading to true when form is submitted

        const newErrors = {};

        // Validation logic for each input field
        if (data.humidity === "" || data.humidity < 40 || data.humidity > 90) {
            newErrors.humidity = "Humidity value should be between 40 and 90.";
        }
        if (data.P === "" || data.P < 0 || data.P > 250) {
            newErrors.P = "Phosphorus value should be between 0 and 250.";
        }
        if (data.temperature === "" || data.temperature < 10 || data.temperature > 48) {
            newErrors.temperature = "Temperature value should be between 10 and 48.";
        }
        if (data.rainfall === "" || data.rainfall < 30 || data.rainfall > 300) {
            newErrors.rainfall = "Rainfall value should be between 30 and 300.";
        }
        if (data.K === "" || data.K < 0 || data.K > 250) {
            newErrors.K = "Potassium value should be between 0 and 250.";
        }
        if (data.ph === "" || data.ph < 0 || data.ph > 14) {
            newErrors.ph = "pH value should be between 0 and 14.";
        }
        if (data.N === "" || data.N < 0 || data.N > 250) {
            newErrors.N = "Nitrogen value should be between 0 and 250.";
        }

        setErrors(newErrors);

        if (Object.values(newErrors).some(error => error)) {
            setLoading(false); // Set loading to false if there are errors
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
                date: currentDate,
            });

            const recommendedCrop = response.data[0].predicted_crop;
            setLoading(false); // Set loading to false when response is received
            navigate("/result", { state: { crop: recommendedCrop } });
        } catch (error) {
            setLoading(false); // Set loading to false in case of error
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
                    <div className={styles.loaderContainer}>
                        {loading && <Audio type="Audio" color="#00BFFF" height={80} width={80} />}
                    </div>
                    {!loading && (
                        <button type="submit" className={styles.submit}>Get recommendation</button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Form;

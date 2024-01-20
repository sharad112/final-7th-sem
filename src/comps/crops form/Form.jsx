import React from 'react';
import { useState } from 'react';
import styles from './form.module.css';
import axios from 'axios';
import { getDatabase,ref,set } from 'firebase/database';

const Form = () => {
    const [data, setdata] = useState({
        humidity: "",
        P: "",
        temperature: "",
        rainfall: "",
        K: "",
        ph: "",
        N: ""
    })
    // function to save the result in the firebase database 
    const save_to_Database=async(result)=>
    {
        const db=getDatabase();
        set(ref(db, '/' + Math.floor(Math.random() * 10)), {
            // Your data goes here
            result: 'value1',
   
            // ... add other key-value pairs as needed
          })
            .then(() => {
              console.log('Data written successfully!');
            })
            .catch((error) => {
              console.error('Error writing data: ', error);
            });
    }
    // save_to_Database();
    // getting the response from the flask server 
    // const submit = async(e) => {
    //     e.preventDefault();
    //     console.log(data);

    //     try {
    //         const response=await axios.post('http://localhost:5000/predict_crop',{input_feature:data});
    //     }catch(error){
    //         console.error(error);
    //     }
    // }
    const submit = async (e) => {
        e.preventDefault();
        console.log(data);
    
        try {
            const response = await axios.post(
                'http://localhost:5000/predict_crop',
                { input_feature: data },
                {
                    headers: {
                        'Content-Type': 'application/json', // Set the content type to JSON
                        // Add any other headers if needed
                    },
                }
            );
            console.log(response.data); // Handle the response
        } catch (error) {
            console.error(error);
        }
    };

    const hanndlechange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setdata((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }
    return (
        <div className={styles.form} >
            <div className={styles.heading}>
                <h1>crop recommendation</h1>
                <p>fill out the input fields correctly to get the crop recommendation</p>
            </div>
            <form action="" className={styles.form_inside} onSubmit={submit} >
                <label htmlFor="humidity">
                    <input type="number" name="humidity" id="humidity" placeholder='enter the value of humidity' value={data.humidity} onChange={hanndlechange} />
                </label>

                <label htmlFor="phosporus">
                    <input type="number" name="P" id="phosporus" placeholder='enter the value of phosporus' value={data.phosporus} onChange={hanndlechange} />
                </label>

                <label htmlFor="temperature">
                    <input type="number" name="temperature" id="temperature" placeholder='enter the value of temperature' value={data.temperature} onChange={hanndlechange} />
                </label>

                <label htmlFor="rainfall">
                    <input type="number" name="rainfall" id="rainfall" placeholder='enter the value of rainfall' value={data.rainfall} onChange={hanndlechange} />
                </label>

                <label htmlFor="pottasium">
                    <input type="number" name="K" id="pottasium" placeholder='enter the value of pottasium' value={data.pottasium} onChange={hanndlechange} />
                </label>

                <label htmlFor="phvalue">
                    <input type="number" name="ph" id="phvalue" placeholder='enter the value of phvalue' value={data.phvalue} onChange={hanndlechange} />
                </label>

                <label htmlFor="nitrogen">
                    <input type="number" name="N" id="nitrogen" placeholder='enter the value of nitrogen' value={data.nitrogen} onChange={hanndlechange} />
                </label>
                <br />
                <button className={styles.submit} type="submit">get recommendation</button>
            </form>
        </div>
    )
}

export default Form
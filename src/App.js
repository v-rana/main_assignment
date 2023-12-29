

import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [id, setId] = useState('');
    const [friendID, setFriendID] = useState('');
    const [password, setPassword] = useState('');
    const [photo, setPhoto] = useState(null);

    const handleFileChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('id', id);
        formData.append('friendID', friendID);
        formData.append('password', password);
        formData.append('photo', photo);

        try {
            const response = await axios.post('http://localhost:3000/submit-form', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response.data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div>
            <label>
                ID:
                <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
            </label>
            <br />
            <label>
                Friend ID:
                <input type="text" value={friendID} onChange={(e) => setFriendID(e.target.value)} />
            </label>
            <br />
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <br />
            <label>
                Photo:
                <input type="file" onChange={handleFileChange} />
            </label>
            <br />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default App;


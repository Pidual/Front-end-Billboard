import React, { useState } from 'react';
import './AddSong.css';

const DeleteSong = () => {
    const [formData, setFormData] = useState({
        song_name: '',
        singer: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://127.0.0.1:4000/delete/<string:song_name>', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(formData)
        })
            .then(response => {
                if (response.ok) {
                    alert('Song added successfully!');
                    setFormData({
                        rank: '',
                        song_name: '',
                        singer: '',
                        last_week: '',
                        peak_position: '',
                        weeks_on_chart: ''
                    });
                } else {
                    alert('Failed to add song.');
                }
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <div className="AddSong">
            
        </div>
    );
};

export default DeleteSong;

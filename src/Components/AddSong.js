import React, { useState } from 'react';
import './AddSong.css';

const AddSong = () => {
    const [formData, setFormData] = useState({
        rank: '',
        song_name: '',
        singer: '',
        last_week: '',
        peak_position: '',
        weeks_on_chart: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://127.0.0.1:4000/music', {
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
            <h2>Add a New Song</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Rank:
                    <input type="text" name="rank" value={formData.rank} onChange={handleChange} required />
                </label>
                <label>
                    Song Name:
                    <input type="text" name="song_name" value={formData.song_name} onChange={handleChange} required />
                </label>
                <label>
                    Singer:
                    <input type="text" name="singer" value={formData.singer} onChange={handleChange} required />
                </label>
                <label>
                    Last Week:
                    <input type="text" name="last_week" value={formData.last_week} onChange={handleChange} required />
                </label>
                <label>
                    Peak Position:
                    <input type="text" name="peak_position" value={formData.peak_position} onChange={handleChange} required />
                </label>
                <label>
                    Weeks on Chart:
                    <input type="text" name="weeks_on_chart" value={formData.weeks_on_chart} onChange={handleChange} required />
                </label>
                <button type="submit">Agregar Cancion</button>
            </form>
        </div>
    );
};

export default AddSong;

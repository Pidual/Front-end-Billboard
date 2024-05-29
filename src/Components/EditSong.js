import React, { useState } from 'react';
import "./EditSong.css"
const EditSong = () => {
    const [songName, setSongName] = useState('');
    const [shouldShowEditForm, setShouldShowEditForm] = useState(false);
    const [rank, setRank] = useState('');
    const [newSongName, setNewSongName] = useState('');
    const [singer, setSinger] = useState('');
    const [lastWeek, setLastWeek] = useState('');
    const [peakPosition, setPeakPosition] = useState('');
    const [weeksOnChart, setWeeksOnChart] = useState('');

    const handleEditSongClick = async () => {
        const response = await fetch(`/edit/${songName}`);
        if (response.ok) {
            const data = await response.json();
            setShouldShowEditForm(true);
            setRank(data.rank);
            setNewSongName(data.song_name);
            setSinger(data.singer);
            setLastWeek(data.last_week);
            setPeakPosition(data.peak_position);
            setWeeksOnChart(data.weeks_on_chart);
        } else {
            console.error('Error fetching song data!');
            // Handle error (e.g., show error message)
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`/edit/${songName}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                rank,
                song_name: newSongName, // Corrected variable name
                singer,
                last_week: lastWeek, // Corrected variable name
                peak_position: peakPosition, // Corrected variable name
                weeks_on_chart: weeksOnChart, // Corrected variable name
            }),
        });

        if (response.ok) {
            // Handle successful edit (e.g., show confirmation message)
            console.log('Song edited successfully!');
        } else {
            // Handle edit error (e.g., show error message)
            console.error('Error editing song!');
        }
    };

    return (
        <div>
            {!shouldShowEditForm && (
                <div className="songNameToEdit">
                    <h2>Enter Song Name to Edit:</h2>
                    <input
                        type="text"
                        value={songName}
                        onChange={(e) => setSongName(e.target.value)}/>
                    <button onClick={handleEditSongClick}>Edit Song</button>
                </div>
            )}
            {shouldShowEditForm && (
                <form onSubmit={handleSubmit}>
                    <h2>Edit Song: {songName}</h2>
                    <div>
                        <label htmlFor="rank">Rank:</label>
                        <input
                            type="number"
                            id="rank"
                            value={rank}
                            onChange={(e) => setRank(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="newSongName">New Song Name:</label>
                        <input
                            type="text"
                            id="newSongName"
                            value={newSongName}
                            onChange={(e) => setNewSongName(e.target.value)}
                        />
                    </div>
                    {/* ... other input fields */}
                    <button type="submit">Edit Song</button>
                </form>
            )}
        </div>
    );
};

export default EditSong;

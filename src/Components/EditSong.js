import React, { useState } from 'react';

const EditSong = () => {
    const [songName, setSongName] = useState('');
    const [songInfo, setSongInfo] = useState(null);
    const [error, setError] = useState(null);
    const [shouldShowEditForm, setShouldShowEditForm] = useState(false);

    const [rank, setRank] = useState('');
    const [newSongName, setNewSongName] = useState('');
    const [singer, setSinger] = useState('');
    const [lastWeek, setLastWeek] = useState('');
    const [peakPosition, setPeakPosition] = useState('');
    const [weeksOnChart, setWeeksOnChart] = useState('');

    const handleFetchSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://127.0.0.1:4000/songs/${encodeURIComponent(songName)}`);
            if (response.ok) {
                const data = await response.json();
                setSongInfo(data);
                setNewSongName(data['Song Name']);
                setSinger(data['Singer']);
                setRank(data['Rank']);
                setLastWeek(data['Last Week']);
                setPeakPosition(data['Peak Position']);
                setWeeksOnChart(data['Weeks on Chart']);
                setShouldShowEditForm(true);
                setError(null);
            } else {
                const errorMessage = await response.text();
                setError(errorMessage || 'Failed to fetch song information');
                setSongInfo(null);
                setShouldShowEditForm(false);
            }
        } catch (error) {
            setError('An error occurred while fetching song information');
            setSongInfo(null);
            setShouldShowEditForm(false);
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const updatedSong = {
            'rank': rank,
            'song_name': newSongName,
            'singer': singer,
            'last_week': lastWeek,
            'peak_position': peakPosition,
            'weeks_on_chart': weeksOnChart,
        };

        try {
            const response = await fetch(`http://127.0.0.1:4000/edit/${encodeURIComponent(songName)}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedSong),
            });

            if (response.ok) {
                const data = await response.json();
                setSongInfo(data);
                setError(null);
                alert('Song updated successfully');
            } else {
                const errorMessage = await response.text();
                setError(errorMessage || 'Failed to update song information');
            }
        } catch (error) {
            setError('An error occurred while updating song information');
        }
    };

    return (
        <div>
            <h2>Get Song Information</h2>
            <form onSubmit={handleFetchSubmit}>
                <label>
                    Song Name:
                    <input
                        type="text"
                        value={songName}
                        onChange={(e) => setSongName(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Get Info</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {songInfo && shouldShowEditForm && (
                <div>
                    <h3>Edit Song: {songName}</h3>
                    <form onSubmit={handleEditSubmit}>
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
                        <div>
                            <label htmlFor="singer">Singer:</label>
                            <input
                                type="text"
                                id="singer"
                                value={singer}
                                onChange={(e) => setSinger(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="lastWeek">Last Week:</label>
                            <input
                                type="text"
                                id="lastWeek"
                                value={lastWeek}
                                onChange={(e) => setLastWeek(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="peakPosition">Peak Position:</label>
                            <input
                                type="text"
                                id="peakPosition"
                                value={peakPosition}
                                onChange={(e) => setPeakPosition(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="weeksOnChart">Weeks on Chart:</label>
                            <input
                                type="text"
                                id="weeksOnChart"
                                value={weeksOnChart}
                                onChange={(e) => setWeeksOnChart(e.target.value)}
                            />
                        </div>
                        <button type="submit">Edit Song</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default EditSong;

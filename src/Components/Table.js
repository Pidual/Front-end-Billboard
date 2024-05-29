import React, { useEffect, useState } from 'react';
import './Table.css'
const Table = () => {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:4000/songs')
            .then(response => response.json())
            .then(data => setSongs(data))
            .catch(error => console.error('Error fetching songs:', error));
    }, []);

    return (
        <div className="App">
            <h1>Song List</h1>
            <table>
                <thead>
                <tr>
                    <th>Rank</th>
                    <th>Song Name</th>
                    <th>Singer</th>
                    <th>Last Week</th>
                    <th>Peak Position</th>
                    <th>Weeks on Chart</th>
                </tr>
                </thead>
                <tbody>
                {songs.map(song => (
                    <tr key={song._id.$oid}>
                        <td>{song.Rank}</td>
                        <td>{song['Song Name']}</td>
                        <td>{song.Singer}</td>
                        <td>{song['Last Week']}</td>
                        <td>{song['Peak Position']}</td>
                        <td>{song['Weeks on Chart']}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;

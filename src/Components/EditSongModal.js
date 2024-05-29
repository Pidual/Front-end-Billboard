// src/components/EditSongModal.js
import React, { useState, useEffect } from 'react';
import './EditSongModal.css';

const EditSongModal = ({ isOpen, onRequestClose, songToEdit, handleSongEdited }) => {
    const [editedSong, setEditedSong] = useState({
        rank: '',
        songName: '',
        singer: '',
        lastWeek: '',
        peakPosition: '',
        weeksOnChart: ''
    });

    useEffect(() => {
        if (songToEdit) {
            setEditedSong(songToEdit);
        }
    }, [songToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedSong({
            ...editedSong,
            [name]: value
        });
    };

    const handleSearchSong = () => {
        fetch(`http://localhost:4000/song/${editedSong.songName}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Canción no encontrada');
                }
                return response.json();
            })
            .then(data => {
                setEditedSong({
                    ...editedSong,
                    rank: data.Rank,
                    singer: data.Singer,
                    lastWeek: data['Last Week'],
                    peakPosition: data['Peak Position'],
                    weeksOnChart: data['Weeks on Chart']
                });
            })
            .catch(error => {
                console.error('Error al buscar la canción:', error.message);
                // Manejar el error de canción no encontrada
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:4000/edit/${editedSong.songName}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    rank: editedSong.rank,
                    song_name: editedSong.songName, // Cambiado a snake_case
                    singer: editedSong.singer,
                    last_week: editedSong.lastWeek, // Cambiado a snake_case
                    peak_position: editedSong.peakPosition, // Cambiado a snake_case
                    weeks_on_chart: editedSong.weeksOnChart // Cambiado a snake_case
                })
            });
            if (!response.ok) {
                throw new Error('Error al editar la canción');
            }
            handleSongEdited(editedSong);
            onRequestClose();
        } catch (error) {
            console.error('Error al editar la canción:', error.message);
            // Manejar el error
        }
    };
    
    

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Editar Canción</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Song Name:
                        <input type="text" name="songName" value={editedSong.songName} onChange={handleChange} />
                        <button type="button" onClick={handleSearchSong}>Buscar</button>
                    </label>
                    <label>
                        Rank:
                        <input type="number" name="rank" value={editedSong.rank} onChange={handleChange} />
                    </label>
                    <label>
                        Singer:
                        <input type="text" name="singer" value={editedSong.singer} onChange={handleChange} />
                    </label>
                    <label>
                        Last Week:
                        <input type="number" name="lastWeek" value={editedSong.lastWeek} onChange={handleChange} />
                    </label>
                    <label>
                        Peak Position:
                        <input type="number" name="peakPosition" value={editedSong.peakPosition} onChange={handleChange} />
                    </label>
                    <label>
                        Weeks on Chart:
                        <input type="number" name="weeksOnChart" value={editedSong.weeksOnChart} onChange={handleChange} />
                    </label>
                    <button type="submit">Guardar</button>
                    <button type="button" onClick={onRequestClose}>Cancelar</button>
                </form>
            </div>
        </div>
    );
};

export default EditSongModal;

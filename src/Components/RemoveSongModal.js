import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root'); // Ajusta esto si tu elemento raíz tiene un ID diferente

const RemoveSongModal = ({ isOpen, onRequestClose, songToRemove, setSongToRemove, handleSongRemoved }) => {
    const handleRemoveSong = async () => {
        try {
            const response = await axios.delete(`http://127.0.0.1:4000/delete/${songToRemove}`);
            if (response.status === 204) {
                alert('Canción eliminada con éxito');
                handleSongRemoved();
            } else {
                alert('Canción no encontrada');
            }
        } catch (error) {
            alert('Error al eliminar la canción');
            console.error(error);
        } finally {
            onRequestClose();
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Quitar Cancion"
            className="modal"
            overlayClassName="overlay"
        >
            <h2>Quitar Cancion</h2>
            <input
                type="text"
                placeholder="Nombre de la canción"
                value={songToRemove}
                onChange={(e) => setSongToRemove(e.target.value)}
            />
            <button onClick={handleRemoveSong}>Quitar</button>
            <button onClick={onRequestClose}>Cancelar</button>
        </Modal>
    );
};

export default RemoveSongModal;

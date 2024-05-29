// src/components/Billboard.js
import React, { useState } from 'react';
import './Billboard.css';
import Table from "../Components/Table";
import AddSong from "../Components/AddSong";
import RemoveSongModal from '../Components/RemoveSongModal';
import EditSongModal from '../Components/EditSongModal';

const Billboard = () => {
    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [songToRemove, setSongToRemove] = useState('');
    const [songToEdit, setSongToEdit] = useState(null);

    const handleOpenRemoveModal = () => {
        setIsRemoveModalOpen(true);
    };

    const handleCloseRemoveModal = () => {
        setIsRemoveModalOpen(false);
    };

    const handleOpenEditModal = (song) => {
        setSongToEdit(song);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handleSongRemoved = () => {
        // Aquí puedes agregar lógica para actualizar la lista de canciones, si es necesario
        // Por ejemplo, puedes volver a cargar las canciones desde el backend
    };

    const handleSongEdited = (editedSong) => {
        // Aquí puedes agregar lógica para actualizar la canción editada en la lista
        // Por ejemplo, puedes hacer una solicitud al backend para guardar los cambios
    };

    return (
        <div className="billboard">
            <h1>BILLBOARD</h1>
            <div className="buttons">
                <AddSong />
                <button className="remove-song" onClick={handleOpenRemoveModal}>Quitar Cancion</button>
                <button className="edit-song" onClick={() => handleOpenEditModal(/* Aquí seleccionas la canción a editar */)}>Editar Cancion</button>
            </div>
            <Table onEditSong={handleOpenEditModal} />
            
            <RemoveSongModal 
                isOpen={isRemoveModalOpen}
                onRequestClose={handleCloseRemoveModal}
                songToRemove={songToRemove}
                setSongToRemove={setSongToRemove}
                handleSongRemoved={handleSongRemoved}
            />

            <EditSongModal 
                isOpen={isEditModalOpen}
                onRequestClose={handleCloseEditModal}
                songToEdit={songToEdit}
                handleSongEdited={handleSongEdited}
            />
        </div>
    );
};

export default Billboard;

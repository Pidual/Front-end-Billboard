// src/components/Billboard.js
import React from 'react';
import './Billboard.css';
import Table from "../Components/Table";
import AddSong from "../Components/AddSong";

const Billboard = () => {
    return (
        <div className="billboard">
            <h1>BILLBOARD</h1>
            <div className="buttons">
                <AddSong></AddSong>

                <button className="remove-song">Quitar Cancion</button>
                <button className="edit-song">Editar Cancion</button>
            </div>
            <Table></Table>
        </div>
    );
};

export default Billboard;

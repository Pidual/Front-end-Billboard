// src/components/Billboard.js
import React from 'react';
import './Billboard.css';
import Table from "../Components/Table";
import AddSong from "../Components/AddSong";
import EditSong from "../Components/EditSong";

const Billboard = () => {
    return (
        <div className="billboard">
            <h1>BILLBOARD</h1>
            <div className="buttons">
                <AddSong></AddSong>

                <button className="remove-song">Quitar Cancion</button>
                <EditSong></EditSong>
            </div>
            <Table></Table>
        </div>
    );
};

export default Billboard;

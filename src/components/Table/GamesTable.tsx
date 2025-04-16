import React, { useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import sampleGameData from './sampleGameData';
import { LoadGameData, LoadGameTableData } from '../../common/types';

const columns: TableColumn<LoadGameTableData>[] = [
    {
        name: 'Save Name',
        selector: row => row.saveName,
    },

    {
        name: 'Player Count',
        selector: row => row.playerCount,
    },
    {
        name: 'Open Slots',
        selector: row => row.openSlots,
    },
    {
        name: 'Globe ID',
        selector: row => row.globeID,
    },
    {
        name: 'Turn',
        selector: row => row.turn,
    },
    {
        name: 'Phase',
        selector: row => row.phase,
    },
    {
        name: 'Name',
        selector: row => row.name,
    }
];

function convertToLoadGameTableData(gameData: LoadGameData[]): LoadGameTableData[] {
    let rows: LoadGameTableData[] = [];
    if (gameData.length > 0) {
        for (let i = 0; i < gameData.length; i++) {
            rows.push({
                saveName: gameData[i].saveName,
                playerCount: gameData[i].playerCount,
                openSlots: gameData[i].openSlots,
                globeID: gameData[i].globeID,
                turn: gameData[i].turn,
                phase: gameData[i].phase,
                name: gameData[i].name
            })
        }
    }
    return rows
    
}

interface GamesTableProps {
    openGameData: LoadGameData[];
    setSelectedGame: (selectedGame: LoadGameTableData) => void;
}

const GamesTable: React.FC<GamesTableProps> = ({openGameData, setSelectedGame}) => {
    const [rows, setRows] = useState<LoadGameTableData[]>([]);

    const handleChange = ({selectedRows}: {selectedRows: LoadGameTableData[]}) => {
        setSelectedGame(selectedRows[0]);
    }
    useEffect(() => {
        setRows(convertToLoadGameTableData(openGameData));
    }, [openGameData])
    return <DataTable 
        title="Open Games"
        columns={columns}
        data={rows}
        selectableRows
        selectableRowsSingle
        onSelectedRowsChange={handleChange}
        />;
};

export default GamesTable;

interface ViewGamesButton {
    viewGames: () => void
}

const ViewGamesButton = ({viewGames}: ViewGamesButton) => {
    return (
        <button onClick={viewGames}>Join Existing Game</button>
    )
}

export default ViewGamesButton
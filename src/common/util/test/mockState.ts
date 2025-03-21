

const response = JSON.parse(JSON.stringify({
    "data": {
        "action": "newGame",
        "gameOptions": {
            "randomAssignment": false,
            "neutralArmies": true
        },
        "message": "New game created with save name: P3aOkRbgJQ - autosave turn 1 for 2 players",
        "status": "success",
        "gameState": {
            "saveName": "aL8ydh98gA - autosave turn 1",
            "id": "aL8ydh98gA",
            "players": [
                {
                    "id": 0,
                    "name": "Postgres Justin",
                    "cards": [],
                    "color": "red",
                    "armies": 26
                },
                {
                    "id": 1,
                    "name": "Postgres Joan",
                    "cards": [],
                    "color": "blue",
                    "armies": 26
                }
            ],
            "countries": [
                {
                    "id": 0,
                    "name": "Alaska",
                    "color": "red",
                    "armies": 1,
                    "ownerID": 0,
                    "continent": "North America",
                    "connectedTo": [
                        1,
                        5,
                        31
                    ]
                },
                {
                    "id": 1,
                    "name": "Alberta",
                    "color": "blue",
                    "armies": 1,
                    "ownerID": 1,
                    "continent": "North America",
                    "connectedTo": [
                        0,
                        5,
                        6,
                        8
                    ]
                },
                {
                    "id": 2,
                    "name": "Central America",
                    "color": "gray",
                    "armies": 2,
                    "ownerID": 99,
                    "continent": "North America",
                    "connectedTo": [
                        3,
                        5,
                        12
                    ]
                },
                {
                    "id": 3,
                    "name": "Eastern United States",
                    "color": "red",
                    "armies": 1,
                    "ownerID": 0,
                    "continent": "North America",
                    "connectedTo": [
                        2,
                        6,
                        7,
                        8
                    ]
                },
                {
                    "id": 4,
                    "name": "Greenland",
                    "color": "blue",
                    "armies": 1,
                    "ownerID": 1,
                    "continent": "North America",
                    "connectedTo": [
                        5,
                        6,
                        7,
                        14
                    ]
                },
                {
                    "id": 5,
                    "name": "Northwest Territory",
                    "color": "gray",
                    "armies": 2,
                    "ownerID": 99,
                    "continent": "North America",
                    "connectedTo": [
                        0,
                        1,
                        4,
                        6,
                        7
                    ]
                },
                {
                    "id": 6,
                    "name": "Ontario",
                    "color": "red",
                    "armies": 1,
                    "ownerID": 0,
                    "continent": "North America",
                    "connectedTo": [
                        1,
                        3,
                        4,
                        5,
                        7
                    ]
                },
                {
                    "id": 7,
                    "name": "Quebec",
                    "color": "blue",
                    "armies": 1,
                    "ownerID": 1,
                    "continent": "North America",
                    "connectedTo": [
                        3,
                        4,
                        6
                    ]
                },
                {
                    "id": 8,
                    "name": "Western United States",
                    "color": "gray",
                    "armies": 2,
                    "ownerID": 99,
                    "continent": "North America",
                    "connectedTo": [
                        1,
                        2,
                        3,
                        6
                    ]
                },
                {
                    "id": 9,
                    "name": "Argentina",
                    "color": "red",
                    "armies": 1,
                    "ownerID": 0,
                    "continent": "South America",
                    "connectedTo": [
                        10,
                        11
                    ]
                },
                {
                    "id": 10,
                    "name": "Brazil",
                    "color": "blue",
                    "armies": 1,
                    "ownerID": 1,
                    "continent": "South America",
                    "connectedTo": [
                        9,
                        11,
                        12,
                        24
                    ]
                },
                {
                    "id": 11,
                    "name": "Peru",
                    "color": "gray",
                    "armies": 2,
                    "ownerID": 99,
                    "continent": "South America",
                    "connectedTo": [
                        9,
                        10,
                        12
                    ]
                },
                {
                    "id": 12,
                    "name": "Venezuela",
                    "color": "red",
                    "armies": 1,
                    "ownerID": 0,
                    "continent": "South America",
                    "connectedTo": [
                        2,
                        10,
                        11
                    ]
                },
                {
                    "id": 13,
                    "name": "Great Britain",
                    "color": "blue",
                    "armies": 1,
                    "ownerID": 1,
                    "continent": "Europe",
                    "connectedTo": [
                        14,
                        15,
                        16,
                        19
                    ]
                },
                {
                    "id": 14,
                    "name": "Iceland",
                    "color": "gray",
                    "armies": 2,
                    "ownerID": 99,
                    "continent": "Europe",
                    "connectedTo": [
                        4,
                        13,
                        16
                    ]
                },
                {
                    "id": 15,
                    "name": "Northern Europe",
                    "color": "red",
                    "armies": 1,
                    "ownerID": 0,
                    "continent": "Europe",
                    "connectedTo": [
                        13,
                        16,
                        17,
                        18,
                        19
                    ]
                },
                {
                    "id": 16,
                    "name": "Scandinavia",
                    "color": "blue",
                    "armies": 1,
                    "ownerID": 1,
                    "continent": "Europe",
                    "connectedTo": [
                        13,
                        14,
                        15,
                        18
                    ]
                },
                {
                    "id": 17,
                    "name": "Southern Europe",
                    "color": "gray",
                    "armies": 2,
                    "ownerID": 99,
                    "continent": "Europe",
                    "connectedTo": [
                        15,
                        18,
                        19,
                        22,
                        24,
                        32
                    ]
                },
                {
                    "id": 18,
                    "name": "Ukraine",
                    "color": "red",
                    "armies": 1,
                    "ownerID": 0,
                    "continent": "Europe",
                    "connectedTo": [
                        15,
                        16,
                        17,
                        26,
                        32,
                        35
                    ]
                },
                {
                    "id": 19,
                    "name": "Western Europe",
                    "color": "blue",
                    "armies": 1,
                    "ownerID": 1,
                    "continent": "Europe",
                    "connectedTo": [
                        13,
                        15,
                        17,
                        24
                    ]
                },
                {
                    "id": 20,
                    "name": "Congo",
                    "color": "gray",
                    "armies": 2,
                    "ownerID": 99,
                    "continent": "Africa",
                    "connectedTo": [
                        21,
                        22,
                        23,
                        24,
                        25
                    ]
                },
                {
                    "id": 21,
                    "name": "East Africa",
                    "color": "red",
                    "armies": 1,
                    "ownerID": 0,
                    "continent": "Africa",
                    "connectedTo": [
                        20,
                        22,
                        23,
                        24,
                        25
                    ]
                },
                {
                    "id": 22,
                    "name": "Egypt",
                    "color": "blue",
                    "armies": 1,
                    "ownerID": 1,
                    "continent": "Africa",
                    "connectedTo": [
                        20,
                        21,
                        23,
                        24,
                        25
                    ]
                },
                {
                    "id": 23,
                    "name": "Madagascar",
                    "color": "gray",
                    "armies": 2,
                    "ownerID": 99,
                    "continent": "Africa",
                    "connectedTo": [
                        20,
                        21,
                        22,
                        24
                    ]
                },
                {
                    "id": 24,
                    "name": "North Africa",
                    "color": "red",
                    "armies": 1,
                    "ownerID": 0,
                    "continent": "Africa",
                    "connectedTo": [
                        20,
                        22,
                        23,
                        25
                    ]
                },
                {
                    "id": 25,
                    "name": "South Africa",
                    "color": "blue",
                    "armies": 1,
                    "ownerID": 1,
                    "continent": "Africa",
                    "connectedTo": [
                        20,
                        21,
                        22,
                        23
                    ]
                },
                {
                    "id": 26,
                    "name": "Afghanistan",
                    "color": "gray",
                    "armies": 2,
                    "ownerID": 99,
                    "continent": "Asia",
                    "connectedTo": [
                        27,
                        29,
                        33,
                        35
                    ]
                },
                {
                    "id": 27,
                    "name": "China",
                    "color": "red",
                    "armies": 1,
                    "ownerID": 0,
                    "continent": "Asia",
                    "connectedTo": [
                        26,
                        28,
                        29,
                        31,
                        33,
                        34
                    ]
                },
                {
                    "id": 28,
                    "name": "India",
                    "color": "blue",
                    "armies": 1,
                    "ownerID": 1,
                    "continent": "Asia",
                    "connectedTo": [
                        27,
                        29,
                        30,
                        32,
                        34
                    ]
                },
                {
                    "id": 29,
                    "name": "Irkutsk",
                    "color": "gray",
                    "armies": 2,
                    "ownerID": 99,
                    "continent": "Asia",
                    "connectedTo": [
                        26,
                        27,
                        28,
                        30
                    ]
                },
                {
                    "id": 30,
                    "name": "Japan",
                    "color": "red",
                    "armies": 1,
                    "ownerID": 0,
                    "continent": "Asia",
                    "connectedTo": [
                        28,
                        29
                    ]
                },
                {
                    "id": 31,
                    "name": "Kamchatka",
                    "color": "blue",
                    "armies": 1,
                    "ownerID": 1,
                    "continent": "Asia",
                    "connectedTo": [
                        0,
                        27,
                        29,
                        32,
                        34,
                        35
                    ]
                },
                {
                    "id": 32,
                    "name": "Middle East",
                    "color": "gray",
                    "armies": 2,
                    "ownerID": 99,
                    "continent": "Asia",
                    "connectedTo": [
                        28,
                        31,
                        33,
                        35
                    ]
                },
                {
                    "id": 33,
                    "name": "Mongolia",
                    "color": "red",
                    "armies": 1,
                    "ownerID": 0,
                    "continent": "Asia",
                    "connectedTo": [
                        26,
                        27,
                        32,
                        34
                    ]
                },
                {
                    "id": 34,
                    "name": "Siberia",
                    "color": "blue",
                    "armies": 1,
                    "ownerID": 1,
                    "continent": "Asia",
                    "connectedTo": [
                        27,
                        28,
                        31,
                        33,
                        35
                    ]
                },
                {
                    "id": 35,
                    "name": "Ural",
                    "color": "gray",
                    "armies": 2,
                    "ownerID": 99,
                    "continent": "Asia",
                    "connectedTo": [
                        26,
                        31,
                        34
                    ]
                },
                {
                    "id": 36,
                    "name": "Yakutsk",
                    "color": "red",
                    "armies": 1,
                    "ownerID": 0,
                    "continent": "Asia",
                    "connectedTo": [
                        28,
                        30,
                        31
                    ]
                },
                {
                    "id": 37,
                    "name": "Siam",
                    "color": "blue",
                    "armies": 1,
                    "ownerID": 1,
                    "continent": "Asia",
                    "connectedTo": [
                        27,
                        28,
                        41
                    ]
                },
                {
                    "id": 38,
                    "name": "Eastern Australia",
                    "color": "gray",
                    "armies": 2,
                    "ownerID": 99,
                    "continent": "Australia",
                    "connectedTo": [
                        40,
                        41
                    ]
                },
                {
                    "id": 39,
                    "name": "Indonesia",
                    "color": "red",
                    "armies": 1,
                    "ownerID": 0,
                    "continent": "Australia",
                    "connectedTo": [
                        37,
                        40,
                        41
                    ]
                },
                {
                    "id": 40,
                    "name": "New Guinea",
                    "color": "blue",
                    "armies": 1,
                    "ownerID": 1,
                    "continent": "Australia",
                    "connectedTo": [
                        38,
                        39,
                        41
                    ]
                },
                {
                    "id": 41,
                    "name": "Western Australia",
                    "color": "gray",
                    "armies": 2,
                    "ownerID": 99,
                    "continent": "Australia",
                    "connectedTo": [
                        37,
                        38
                    ]
                }
            ],
            "continents": [
                {
                    "id": 0,
                    "name": "North America",
                    "armies": 5,
                    "countries": [
                        0,
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        7,
                        8
                    ]
                },
                {
                    "id": 1,
                    "name": "South America",
                    "armies": 2,
                    "countries": [
                        9,
                        10,
                        11,
                        12
                    ]
                },
                {
                    "id": 2,
                    "name": "Europe",
                    "armies": 5,
                    "countries": [
                        13,
                        14,
                        15,
                        16,
                        17,
                        18,
                        19
                    ]
                },
                {
                    "id": 3,
                    "name": "Africa",
                    "armies": 3,
                    "countries": [
                        20,
                        21,
                        22,
                        23,
                        24,
                        25
                    ]
                },
                {
                    "id": 4,
                    "name": "Asia",
                    "armies": 7,
                    "countries": [
                        26,
                        27,
                        28,
                        29,
                        30,
                        31,
                        32,
                        33,
                        34,
                        35,
                        36,
                        37
                    ]
                },
                {
                    "id": 5,
                    "name": "Australia",
                    "armies": 2,
                    "countries": [
                        38,
                        39,
                        40,
                        41
                    ]
                }
            ],
            "globeID": "defaultGlobeID",
            "turn": 1,
            "turnTracker": {
                "phase": "deploy",
                "earnedCard": false,
                "armiesEarned": 0
            },
            "phase": "deploy",
            "activePlayerIndex": 0,
            "cardsAvailable": [
                {
                    "id": 0,
                    "name": "Alaska",
                    "symbol": "infantry"
                },
                {
                    "id": 1,
                    "name": "Alberta",
                    "symbol": "cavalry"
                },
                {
                    "id": 2,
                    "name": "Central America",
                    "symbol": "artillery"
                },
                {
                    "id": 3,
                    "name": "Eastern United States",
                    "symbol": "infantry"
                },
                {
                    "id": 4,
                    "name": "Greenland",
                    "symbol": "cavalry"
                },
                {
                    "id": 5,
                    "name": "Northwest Territory",
                    "symbol": "artillery"
                },
                {
                    "id": 6,
                    "name": "Ontario",
                    "symbol": "infantry"
                },
                {
                    "id": 7,
                    "name": "Quebec",
                    "symbol": "cavalry"
                },
                {
                    "id": 8,
                    "name": "Western United States",
                    "symbol": "artillery"
                },
                {
                    "id": 9,
                    "name": "Argentina",
                    "symbol": "infantry"
                },
                {
                    "id": 10,
                    "name": "Brazil",
                    "symbol": "cavalry"
                },
                {
                    "id": 11,
                    "name": "Peru",
                    "symbol": "artillery"
                },
                {
                    "id": 12,
                    "name": "Venezuela",
                    "symbol": "infantry"
                },
                {
                    "id": 13,
                    "name": "Great Britain",
                    "symbol": "cavalry"
                },
                {
                    "id": 14,
                    "name": "Iceland",
                    "symbol": "artillery"
                },
                {
                    "id": 15,
                    "name": "Northern Europe",
                    "symbol": "infantry"
                },
                {
                    "id": 16,
                    "name": "Scandinavia",
                    "symbol": "cavalry"
                },
                {
                    "id": 17,
                    "name": "Southern Europe",
                    "symbol": "artillery"
                },
                {
                    "id": 18,
                    "name": "Ukraine",
                    "symbol": "infantry"
                },
                {
                    "id": 19,
                    "name": "Western Europe",
                    "symbol": "cavalry"
                },
                {
                    "id": 20,
                    "name": "Congo",
                    "symbol": "artillery"
                },
                {
                    "id": 21,
                    "name": "East Africa",
                    "symbol": "infantry"
                },
                {
                    "id": 22,
                    "name": "Egypt",
                    "symbol": "cavalry"
                },
                {
                    "id": 23,
                    "name": "Madagascar",
                    "symbol": "artillery"
                },
                {
                    "id": 24,
                    "name": "North Africa",
                    "symbol": "infantry"
                },
                {
                    "id": 25,
                    "name": "South Africa",
                    "symbol": "cavalry"
                },
                {
                    "id": 26,
                    "name": "Afghanistan",
                    "symbol": "artillery"
                },
                {
                    "id": 27,
                    "name": "China",
                    "symbol": "infantry"
                },
                {
                    "id": 28,
                    "name": "India",
                    "symbol": "cavalry"
                },
                {
                    "id": 29,
                    "name": "Irkutsk",
                    "symbol": "artillery"
                },
                {
                    "id": 30,
                    "name": "Japan",
                    "symbol": "infantry"
                },
                {
                    "id": 31,
                    "name": "Kamchatka",
                    "symbol": "cavalry"
                },
                {
                    "id": 32,
                    "name": "Middle East",
                    "symbol": "artillery"
                },
                {
                    "id": 33,
                    "name": "Mongolia",
                    "symbol": "infantry"
                },
                {
                    "id": 34,
                    "name": "Siberia",
                    "symbol": "cavalry"
                },
                {
                    "id": 35,
                    "name": "Ural",
                    "symbol": "artillery"
                },
                {
                    "id": 36,
                    "name": "Yakutsk",
                    "symbol": "infantry"
                },
                {
                    "id": 37,
                    "name": "Siam",
                    "symbol": "cavalry"
                },
                {
                    "id": 38,
                    "name": "Eastern Australia",
                    "symbol": "artillery"
                },
                {
                    "id": 39,
                    "name": "Indonesia",
                    "symbol": "infantry"
                },
                {
                    "id": 40,
                    "name": "New Guinea",
                    "symbol": "cavalry"
                },
                {
                    "id": 41,
                    "name": "Western Australia",
                    "symbol": "artillery"
                },
                {
                    "id": 42,
                    "name": "Wild 1",
                    "symbol": "wildcard"
                },
                {
                    "id": 43,
                    "name": "Wild 2",
                    "symbol": "wildcard"
                }
            ],
            "matches": 0,
            "name": null,
            "lastEngagement": null
        }
    }
}))

export default response
const apiKey = 'FED83E28CAF96664064D9C88F5C3CEE8'; // Replace with your Steam API key
const steamId = '76561199233238021'; // Replace with your Steam ID

// Function to fetch game stats from Steam API
async function fetchGameStats() {
    const apiUrl = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${apiKey}&steamid=${steamId}&format=json`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log("API Response:", data);  // Add this line to debug the API response

        // Call function to populate the game stats table with the fetched data
        if (data.response && data.response.games) {
            populateGameStats(data.response.games);
        } else {
            console.error("No games data available.");
        }
    } catch (error) {
        console.error('Error fetching game data:', error);
    }
}

// Function to populate game stats in the table
function populateGameStats(games) {
    const gameStatsTable = document.getElementById('game-stats-body'); // Get the table body element
    gameStatsTable.innerHTML = ''; // Clear any existing rows

    // Check if the games array is empty
    if (games.length === 0) {
        gameStatsTable.innerHTML = '<tr><td colspan="2">No games found.</td></tr>';
        return;
    }

    // Loop through each game and create a row for the table
    games.forEach(game => {
        const row = document.createElement('tr');

        // Create and append App ID column
        const appidCell = document.createElement('td');
        appidCell.textContent = game.appid;
        row.appendChild(appidCell);

        // Create and append Playtime column
        const playtimeCell = document.createElement('td');
        playtimeCell.textContent = game.playtime_forever; // Display playtime in minutes
        row.appendChild(playtimeCell);

        // Append the row to the table body
        gameStatsTable.appendChild(row);
    });
}

// Call the fetchGameStats function on page load
document.addEventListener('DOMContentLoaded', fetchGameStats);

// $(document).ready(function () {
    const teamEl = document.getElementById("enter-team");
    const searchEl = document.getElementById("search-button");
    const clearEl = document.getElementById("clear-history");
    const nameEl = document.getElementById("team-name");
    const standingsEl = document.getElementById("standings");
    const currentOddsEl = document.getElementById("current-odds");
    const currentPositionEl = document.getElementById("position");
    const currentGamesEl = document.getElementById("games");
    const currentPointsEl = document.getElementById("points");
    const leagueEl = document.getElementById("league");
    const historyEl = document.getElementById("history");
    var currentStatsEl = document.getElementById("current-stats");
    let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
    const apiKeyStats = "9f7bab9a2e3d8137fcf83af0c6652b78d74c0";
    const apiKeyOdds =  "ad465671e8ad54919c6f069154537fce";

    function myFunction() {
        document.getElementById('myDropdown').classList.toggle('show');
    }
    
    window.onclick = function (event) {
        if (event.target && !event.target.classList.contains('drop')) {
            let dropdown = document.getElementsByClassName('leagues');
            let i;
            for (i = 0; i < dropdown.length; i++) {
                let openDropdown = dropdown[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }

    function showHomePage() {
        document.getElementById('home-section').style.display = 'block';
        document.getElementById('standings-section').style.display = 'none';
        document.getElementById('calendar-section').style.display = 'none';
}

    function showStandings() {
        document.getElementById('home-section').style.display = 'none';
        document.getElementById('standings-section').style.display = 'block';
        document.getElementById('calendar-section').style.display = 'none';
}

function showCalendar() {
        document.getElementById('home-section').style.display = 'none';
        document.getElementById('standings-section').style.display = 'none';
        document.getElementById('calendar-section').style.display = 'block';
}

    function getStats(teamName) {
        let queryURL = "https://api-baseball.p.rapidapi.com/timezone" + teamName + "&appid=" + APIKEY;
        axios.get(queryURL)
                .then(function (response) {
                    currentStatsEl.classList.remove("");
                    // Parse response to display current weather
                    const currentDate = new Date(response.data.dt * 1000);
                    const day = currentDate.getDate();
                    const month = currentDate.getMonth() + 1;
                    const year = currentDate.getFullYear();
                    nameEl.innerHTML = response.data.team.name + " (" + month + "/" + day + "/" + year + ") ";
                    let teamPic = response.data.team[0].icon;
                    currentPicEl.setAttribute("src", "https://api-baseball.p.rapidapi.com/standings?league=1&season=2023" + teamPic + "@2x.png");
                    currentPicEl.setAttribute("alt", response.data.team[0].description);
                    standingsEl = "Standings" + response.data.standings.name;
                    currentPositionEl.innerHTML = "Position " + response.data.position.name;
                    currentGamesEl.innerHTML = "Games: " + response.data.games.played + "played";
                    currentPointsEl.innerHTML = "Points: " + response.data.wind.speed + "points";
                    leagueEl.innerHTML = "League: " + response.data.league.name + "points";
                })
            }
             // Get history from local storage if any
    searchEl.addEventListener("click", function () {
        const searchTeam = teamEl.value;
        getStats(searchTeam);
        searchHistory.push(searchTeam);
        localStorage.setItem("search", JSON.stringify(searchHistory));
        renderSearchHistory();
    })
    // Clear History button
    clearEl.addEventListener("click", function () {
        localStorage.clear();
        searchHistory = [];
        renderSearchHistory();
    })
    function renderSearchHistory() {
        historyEl.innerHTML = "";
        for (let i = 0; i < searchHistory.length; i++) {
            const historyItem = document.createElement("input");
            historyItem.setAttribute("type", "text");
            historyItem.setAttribute("readonly", true);
            historyItem.setAttribute("class", "form-control d-block bg-white");
            historyItem.setAttribute("value", searchHistory[i]);
            historyItem.addEventListener("click", function () {
                getStats(historyItem.value);
            })
            historyEl.append(historyItem);
        }
    }
    renderSearchHistory();
    if (searchHistory.length > 0) {
        getStats(searchHistory[searchHistory.length - 1]);
    }
// });



// 
// const urlStats = 'https://api-baseball.p.rapidapi.com/standings?league=1&season=2023';
// const optionsStats = {
//     method: 'GET',
//     headers: {
//         'X-RapidAPI-Key': 'b9a2e3d8137fcf83af0c6652b78d74c0',
//         'X-RapidAPI-Host': 'api-baseball.p.rapidapi.com'
//     }
// };

// try {
//     const response = await fetch(urlStats, optionsStats);
//     const result = await response.text();
//     console.log(result);
// } catch (error) {
//     console.error(error);
// }

// const urlOdds = 'https://api-baseball.p.rapidapi.com/odds?game=5';
// const optionsOdds = {
//     method: 'GET',
//     headers: {
//         'X-RapidAPI-Key': 'ad465671e8ad54919c6f069154537fce',
//         'X-RapidAPI-Host': 'api-baseball.p.rapidapi.com'
//     }
// };

// try {
//     const response = await fetch(urlOdds, optionsOdds);
//     const result = await response.text();
//     console.log(result);
// } catch (error) {
//     console.error(error);
// }
// 
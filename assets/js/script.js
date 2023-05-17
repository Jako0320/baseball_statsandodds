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
let currentStatsEl = document.getElementById("current-stats");
let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
const apiKeyStats = "9f7bab9a2e3d8137fcf83af0c6652b78d74c0";
const apiKeyOdds = "ad465671e8ad54919c6f069154537fce";

// Display dropwdown menu in Standings
function myFunction() {
    document.getElementById('myDropdown').classList.toggle('show');
}

// Display dropwdown menu in Odds
function myFunction1() {
    document.getElementById('myDropdown1').classList.toggle('show');
}

// Hides dropdown when clicking outside the button
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

// const options = {
//     method: 'GET',
//     url: 'https://api-baseball.p.rapidapi.com/teams',
//     params: {
//         league: '1',
//         season: '2020'
//     },
//     headers: {
//         'X-RapidAPI-Key': '1758fda19dmshcb7e9f9e8e12fecp187acejsn16d775cbbb61',
//         'X-RapidAPI-Host': 'api-baseball.p.rapidapi.com'
//     }
// };
async function getTeams() {
    // const url = 'https://v1.baseball.api-sports.io/standings?name='+ teamName;
    let requestOptions = {
        method: 'GET',
        headers: {
            "x-rapidapi-key": "103b532ccbd16cb029fe4d58e363b2d6",
            "x-rapidapi-host": "v1.baseball.api-sports.io",
        },
        redirect: 'follow'
    };
    fetch("https://v1.baseball.api-sports.io/standings?season=2021&league=1", requestOptions)
        .then(response => response.text())
        .then(async result => {
            console.log(result)
            const data = await result.JSON;
            nameEl.innerHTML = "League: " + result.data;
            // searchSeasonEl.innerHTML = "Season: " + result.data.season;
            // leagueEl.innerHTML = data.league="";
        })
        .catch(error => console.error('error', error));
}

function getStats(league) {
    let requestOptions = {
        method: 'GET',
        headers: {
            "x-rapidapi-key": "103b532ccbd16cb029fe4d58e363b2d6",
            "x-rapidapi-host": "v1.baseball.api-sports.io",
        },
        redirect: 'follow'
    };
    
    fetch("https://v1.baseball.api-sports.io/standings?season=2023&league=1", requestOptions)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#standings-table tbody');
            tableBody.innerHTML = '';

            let chosenLeague = data.response.flatMap(teamArray => teamArray.filter(team => team.group.name === league))

            chosenLeague.forEach(item => {
                const row = document.createElement('tr');

                const logoCell = document.createElement('img');
                logoCell.src = item.team.logo;
                row.appendChild(logoCell)

                const teamCell = document.createElement('td');
                teamCell.textContent = item.team.name;
                row.appendChild(teamCell);

                const gamesCell = document.createElement('td');
                gamesCell.textContent = item.games.played;
                row.appendChild(gamesCell);

                const winsCell = document.createElement('td');
                winsCell.textContent = item.games.win.total;
                row.appendChild(winsCell);

                const lossCell = document.createElement('td');
                lossCell.textContent = item.games.lose.total;
                row.appendChild(lossCell);

                tableBody.appendChild(row);
            });
        })
    // .catch(error => console.error('Error:', error));
}

const alStanding = document.getElementById('AL');
alStanding.addEventListener('click', (event) => {
    getStats(event.target.innerText)
});

const nlStanding = document.getElementById('NL');
nlStanding.addEventListener('click', (event) => {
    getStats(event.target.innerText)
});

const nlEStanding = document.getElementById('NL_E');
nlEStanding.addEventListener('click', (event) => {
    getStats(event.target.innerText)
});

const nlCStanding = document.getElementById('NL_C');
nlCStanding.addEventListener('click', (event) => {
    getStats(event.target.innerText)
});

const nlWStanding = document.getElementById('NL_W');
nlWStanding.addEventListener('click', (event) => {
    getStats(event.target.innerText)
});

const alEStanding = document.getElementById('AL_E');
alEStanding.addEventListener('click', (event) => {
    getStats(event.target.innerText)
});

const alCStanding = document.getElementById('AL_C');
alCStanding.addEventListener('click', (event) => {
    getStats(event.target.innerText)
});

const alWStanding = document.getElementById('AL_W');
alWStanding.addEventListener('click', (event) => {
    getStats(event.target.innerText)
});

// Get history from local storage if any
searchEl.addEventListener("click", function () {
    const searchTeam = teamEl.value;
    getTeams(searchTeam);
    searchHistory.push(searchTeam);
    localStorage.setItem("team-search", JSON.stringify(searchHistory));
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
            getTeams(historyItem.value);
        })
        historyEl.append(historyItem);
    }
}
renderSearchHistory();
if (searchHistory.length > 0) {
    getTeams(searchHistory[searchHistory.length - 1]);
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
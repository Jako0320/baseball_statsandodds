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
const apiKeyStats = "b9a2e3d8137fcf83af0c6652b78d74c0";
const apiKeyOdds = "ad465671e8ad54919c6f069154537fce";
const alTeams = ["Los Angeles Angels", "Boston Red Sox", "Houston Astros", "Toronto Blue Jays", "Baltimore Orioles", "Tampa Bay Rays", "Cleveland Guardians", "Minnesota Twins", "Texas Rangers", "Detroit Tigers", "Oakland Athletics", "Chicago White Sox", "Kansas City Royals", "Seattle Mariners", "New York Yankees"];
const nlTeams = ["Los Angeles Dodgers", "Atlanta Braves", "New York Mets", "Philadelphia Phillies", "St. Louis Cardinals", "Chicago Cubs", "Milwaukee Brewers", "Washington Nationals", "Pittsburgh Pirates", "Miami Marlins", "San Francisco Giants", "Cincinnati Reds", "Arizona Diamondbacks", "Colorado Rockies", "San Diego Padres"];
const nlETeams = ["Atlanta Braves", "Washington Nationals", "Philadelphia Phillies", "New York Mets", "Miami Marlins"];
const nlCTeams = ["Cincinnati Reds", "St. Louis Cardinals", "Chicago Cubs", "Milwaukee Brewers", "Pittsburgh Pirates"];
const nlWTeams = ["Los Angeles Dodgers", "San Francisco Giants", "Colorado Rockies", "Arizona Diamondbacks", "San Diego Padres"];
const alETeams = ["Toronto Blue Jays", "Baltimore Orioles", "Tampa Bay Rays", "New York Yankees", "Boston Red Sox"];
const alCTeams = ["Minnesota Twins", "Detroit Tigers", "Kansas City Royals", "Cleveland Guardians", "Chicago White Sox"];
const alWTeams = ["Texas Rangers", "Houston Astros", "Los Angeles Angels", "Seattle Mariners", "Oakland Athletics"];

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

async function getTeams(searchTerm) {
    const url = 'https://odds.p.rapidapi.com/v4/sports/baseball_mlb/odds?regions=us&oddsFormat=decimal&markets=h2h&dateFormat=iso&sport=baseball_mlb';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'a66bd56646msh8af3d6a2a3f42d2p1eeefcjsndd2951cb69f8',
            'X-RapidAPI-Host': 'odds.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        let calTGames = result.filter(game => game.away_team.includes(searchTerm) || game.home_team.includes(searchTerm));

        const tableBody = document.querySelector('#calendar-table tbody');
        tableBody.innerHTML = '';

        calTGames.forEach(item => {
            const row = document.createElement('tr');

            const dateCell = document.createElement('td');
            dateCell.textContent = item.commence_time;
            row.appendChild(dateCell);

            const awayTCell = document.createElement('td');
            awayTCell.textContent = item.away_team;
            row.appendChild(awayTCell);

            const awayPCell = document.createElement('td');
            awayPCell.textContent = item.bookmakers[0].markets[0].outcomes[0].price;
            row.appendChild(awayPCell);

            const homePCell = document.createElement('td');
            homePCell.textContent = item.bookmakers[0].markets[0].outcomes[1].price;
            row.appendChild(homePCell);

            const homeTCell = document.createElement('td');
            homeTCell.textContent = item.home_team;
            row.appendChild(homeTCell);

            tableBody.appendChild(row);
        })

    }
    catch (error) {
        console.error(error);
    }
}


function getStats(league) {
    let requestOptions = {
        method: 'GET',
        headers: {
            "x-rapidapi-key": apiKeyStats,
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
            console.log(chosenLeague);
            chosenLeague.forEach(item => {
                const row = document.createElement('tr');

                const logoCell = document.createElement('img');
                logoCell.src = item.team.logo;
                logoCell.classList.add('logo-image');
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


async function getOdds(league) {
    const url = 'https://odds.p.rapidapi.com/v4/sports/baseball_mlb/odds?regions=us&oddsFormat=decimal&markets=h2h&dateFormat=iso&sport=baseball_mlb';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'a66bd56646msh8af3d6a2a3f42d2p1eeefcjsndd2951cb69f8',
            'X-RapidAPI-Host': 'odds.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        // restrict the array to only include teams that are in the selected league
        let calGames = result.filter(game => league.includes(game.away_team) || league.includes(game.home_team))
        console.log(calGames);
        const tableBody = document.querySelector('#calendar-table tbody');
        tableBody.innerHTML = '';
        // Creation of the table row by row
        calGames.forEach(item => {
            const row = document.createElement('tr');

            const dateCell = document.createElement('td');
            dateCell.textContent = item.commence_time;
            row.appendChild(dateCell);

            const awayTCell = document.createElement('td');
            awayTCell.textContent = item.away_team;
            row.appendChild(awayTCell);

            const awayPCell = document.createElement('td');
            awayPCell.textContent = item.bookmakers[0].markets[0].outcomes[0].price;
            row.appendChild(awayPCell);

            const homePCell = document.createElement('td');
            homePCell.textContent = item.bookmakers[0].markets[0].outcomes[1].price;
            row.appendChild(homePCell);

            const homeTCell = document.createElement('td');
            homeTCell.textContent = item.home_team;
            row.appendChild(homeTCell);

            tableBody.appendChild(row);
        })
    } catch (error) {
        console.error(error);
    }
}
// Event listeners for each dropdown menu option
const alCalendar = document.getElementById('AL_Cal');
alCalendar.addEventListener('click', () => {
    getOdds(alTeams)
});

const nlCalendar = document.getElementById('NL_Cal');
nlCalendar.addEventListener('click', () => {
    getOdds(nlTeams)
});

const nlECalendar = document.getElementById('NLE_Cal');
nlECalendar.addEventListener('click', () => {
    getOdds(nlETeams)
});

const nlCCalendar = document.getElementById('NLC_Cal');
nlCCalendar.addEventListener('click', () => {
    getOdds(nlCTeams)
});

const nlWCalendar = document.getElementById('NLW_Cal');
nlWCalendar.addEventListener('click', () => {
    getOdds(nlWTeams)
});

const alECalendar = document.getElementById('ALE_Cal');
alECalendar.addEventListener('click', () => {
    getOdds(alETeams)
});

const alCCalendar = document.getElementById('ALC_Cal');
alCCalendar.addEventListener('click', () => {
    getOdds(alCTeams)
});

const alWCalendar = document.getElementById('ALW_Cal');
alWCalendar.addEventListener('click', () => {
    getOdds(alWTeams)
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
    const searchHistoryContainer = document.getElementById("search-history-container");
    historyEl.innerHTML = "";
    const storedSearchHistory = JSON.parse(localStorage.getItem("team-search"));

    if (storedSearchHistory && storedSearchHistory.length > 0) {
        for (let i = 0; i < storedSearchHistory.length; i++) {
            const historyItem = document.createElement("input");
            historyItem.setAttribute("type", "text");
            historyItem.setAttribute("readonly", true);
            historyItem.setAttribute("class", "form-control d-block bg-white");
            historyItem.setAttribute("value", storedSearchHistory[i]);
            historyItem.addEventListener("click", function () {
                getTeams(historyItem.value);
            });
            historyEl.append(historyItem);
        };
    } else {
        const placeholder = document.createElement("div");
        placeholder.textContent = "No search history found";
        historyEl.append(placeholder);
    }
}
renderSearchHistory();
if (searchHistory.length > 0) {
    getTeams(searchTem);
}
window.addEventListener("DOMContentLoaded", renderSearchHistory);
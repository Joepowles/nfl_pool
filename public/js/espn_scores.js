// Function to fetch NFL scores for a specific week and year
function fetchNFLScores(year, weekNumber) {
    const url = `http://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?seasontype=2&dates=${year}&week=${weekNumber}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('NFL Scores:', data);
            displayScores(data);
        })
        .catch(error => {
            console.error('Error fetching NFL scores:', error);
        });
}

// Function to display scores (simple console output, can be expanded to display on webpage)
function displayScores(data) {
    let output = '<table><tr><th>Kickoff</th><th>Home Team</th><th>Away Team</th><th>Score</th><th>Winner</th></tr>';
    if (data && data.events) {
        data.events.forEach(event => {
            const { competitions } = event;
            if (competitions && competitions.length > 0) {
                const match = competitions[0];
                const { competitors, startDate } = match;
                const kickoff = new Date(startDate).toLocaleString(); // Format the date and time

                if (competitors && competitors.length > 0) {
                    const homeTeam = competitors.find(team => team.homeAway === 'home');
                    const awayTeam = competitors.find(team => team.homeAway === 'away');

                    if (homeTeam && awayTeam) {
                        const homeScore = parseInt(homeTeam.score);
                        const awayScore = parseInt(awayTeam.score);
                        let winner = '';
                        if (homeScore > awayScore) {
                            winner = `${homeTeam.team.abbreviation}`;
                        } else if (awayScore > homeScore) {
                            winner = `${awayTeam.team.abbreviation}`;
                        } else {
                            winner = 'Draw';
                        }

                        output += `<tr>
                            <td>${kickoff}</td>
                            <td>${homeTeam.team.abbreviation}</td>
                            <td>${awayTeam.team.abbreviation}</td>
                            <td>${homeTeam.score} - ${awayTeam.score}</td>
                            <td>${winner}</td>
                        </tr>`;
                    }
                }
            }
        });
        output += '</table>';
        document.getElementById('scoresTable').innerHTML = output;
    } else {
        document.getElementById('scoresTable').innerHTML = 'No data available for the specified week and year.';
    }
}

// Add this code to handle form submission and display results
document.getElementById('scoreForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const year = document.getElementById('year').value;
    const week = document.getElementById('week').value;
    fetchNFLScores(year, week);
});

// Example usage: Fetch scores for week 1 of the 2023 NFL season
// fetchNFLScores(2023, 1);


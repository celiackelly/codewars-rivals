//On page load, get usersList from localStorage and parse into array 
let usersList = JSON.parse(localStorage.getItem('users')) || []
let usersInfo 

//Map usersList onto URLs for fetch call
let urls = usersList.map(user => `https://www.codewars.com/api/v1/users/${user}`)

//Function: Sort array of user stat objects by honor (descending)
const sortbyHonor = (arr) => arr.sort((a, b) => b.honor - a.honor)

//Function: Fetch updated info/stats for each user; once all fetches have completed, sort the array 
function getUsersInfo() {
	Promise.all(urls.map(url => fetch(url)))
		.then(res => Promise.all(res.map(r => r.json())))
		.then(data => {
			usersInfo = sortbyHonor(data)
			console.log(usersInfo)
		})
		.catch(err => console.log(`Error: ${err}`))
}

//Generate leaderboard table from stats (userInfo array)
function generateLeaderboard() {
	const table = document.querySelector('table')
	const newTBody = document.createElement('tbody')
	
		usersInfo.forEach((user, i) => {
			const tr = document.createElement('tr')
			newTBody.appendChild(tr)
		
			const stats = [i + 1, user.ranks.overall.name, user.username, user.clan, user.honor]
			console.log(stats)
			stats.forEach(stat => {
				const td = document.createElement('td')
				td.textContent = stat
				tr.appendChild(td)
			})
		console.log(newTBody)
		})
	table.removeChild(document.querySelector('tbody'))
	table.appendChild(newTBody)
}

//Function- Add new user to localStorage
function addUser(e){
	e.preventDefault()
	
	const user = document.querySelector('.add-user input').value
	const url = `https://www.codewars.com/api/v1/users/${user}`

	fetch(url)
		.then(res => res.json()) // parse response as JSON
		.then(data => {
				
			//If no localStorage, set 'users' to empty array 
			if (!localStorage.getItem('users')) {
				let usersList= []
				localStorage.setItem('users', JSON.stringify(usersList))
			} 

			let usersList = []
			// Parse the serialized data back into an array of objects
			usersList = JSON.parse(localStorage.getItem('users')) || [];

			// Push the new data onto the array
			usersList.push(data.username);

			// Log the usersList array value
			console.log(usersList) 

			// Re-serialize the array back into a string and store it in localStorage
			localStorage.setItem('users', JSON.stringify(usersList));
		})
		.catch(err => {
			console.log(`error ${err}`)
		});
}

function regnerateLeaderboardOnAdd() {
	addUser()
	getUpdatedStats()
	generateLeaderboard()
}

//On page load, get users stats and generate leaderboard
getUsersInfo()
generateLeaderboard()

//Listen for add-user form submission
document.querySelector('.add-user').addEventListener('submit', regenerateLeaderboard)
//how do I then fire getUpdatedStats() and generateLeaderboard() ? maybe just combine those three in one larger function tied to the event listener




/*
On page load:
	- localStorage.getItem('users) - an array with just usernames
			-do all the parsing 
	- for each user, make a fetch call to Codewars API to get that user's info
			- store in a separate usersInfo array (not in local storage)- inside the object, but outside the fetch call
			- sort the array by honor 
	- create a tr for each user w/all the info for that user
			- each tr - appendChild to tbody 

On form submit: 
	- (can't just append the new user, because then they'll just be at the bottom, not sorted by honor...)
	- fetch call for new user's info 
	- do all the parsing and save the new username to localStorage
	- save new user stats to separate usersInfo array
	- re-sort the array 
	- create a tr for each user w/all the info for that user
			- each tr - appendChild to new tbody 
			- remove and replace tbody 

			NOT WORKING AT AAAAALLLLLLLL

*/
let usersInfo = []
let usersList = []

//Leaderboard constructor function
function Leaderboard() {

	const table = document.querySelector('table')
	
	this.getStoredUsernames = () => {
		//If no localStorage, set 'users' to empty array 
		if (!localStorage.getItem('users')) {
			localStorage.setItem('users', JSON.stringify(usersList))
		} 

		// Parse the serialized data back into an aray of objects and save in usersList
		usersList = JSON.parse(localStorage.getItem('users')) || [];

				console.log('Got stored usernames', usersList)
		return usersList
	}

	this.getUsersInfo = () => {
			
		usersList.forEach(user => {
			const url = `https://www.codewars.com/api/v1/users/${user}`	

			fetch(url) 
				.then(res => res.json()) // parse response as JSON
				.then(data => {

					//Save each user's info in usersInfo array (not localStorage)
					usersInfo.push(data)
				})
				.catch(err => console.log(`Error: ${err}`))
		})
		console.log('Get users info succeeded', usersInfo)
	}

	this.showLeaderboardStats = () => {

		//Create new tbody element
		const tbody = document.createElement('tbody')

		//Sort usersInfo array by honor
		usersInfo.sort((a, b) => b.honor - a.honor)

		//Add user data to the DOM in the leaderboard
		usersInfo.forEach((user, i) => {

			//Create a row for each user and append to tbody 
			const tr = document.createElement('tr')
			tbody.appendChild(tr)

			//Get stats for each user out of userInfo 
			const userStats = [i + 1, user.ranks.overall.name, user.username, user.clan, user.honor]

			///For each stat, make a td element and append to that user's row
			userStats.forEach(stat => {
				const td = document.createElement('td')
				td.textContent = stat
				tr.appendChild(td)
			})
			//Append each user row to tbody 
			tbody.appendChild(tr)
		})

		//Remove the old stats
		let existingTable = document.querySelector('tbody') || null
		if (existingTable) {
			table.removeChild(existingTable)
		}

		//Append the new stats (tbody) to the table in the DOM
		table.appendChild(tbody)
	}

	this.addNewUser = () => {
		const user = document.querySelector('input').value
		const url = `https://www.codewars.com/api/v1/users/${user}`
	
		fetch(url)
				.then(res => res.json()) // parse response as JSON
				.then(data => {
					console.log(data)
	
					// Push the new data onto the array
					usersList.push(data.username);
	
					// Re-serialize the array back into a string and store it in localStorage
					localStorage.setItem('users', JSON.stringify(usersList));
				})
				.catch(err => {
						console.log(`error ${err}`)
				});
				console.log('successfully added new user to localStorage', usersList)
	}

}

const leaderboard = new Leaderboard()
const form = document.querySelector('form')

leaderboard.getStoredUsernames()
leaderboard.getUsersInfo()
leaderboard.showLeaderboardStats()

form.addEventListener('submit', e => {
	e.preventDefault()
	leaderboard.addNewUser() 
	leaderboard.getUsersInfo()
	leaderboard.showLeaderboardStats()
})





//PROBLEM - the honor, rank, and position/sorting won't update, because those values are coming from local storage! 
//We need to fetch the data for each user in local storage each time

//Also, there must be a better solution to removing and replacing the whole tbody each time...


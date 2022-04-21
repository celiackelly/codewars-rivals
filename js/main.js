/* OOP
 - could you abtract more and make a USER class? 
 - what about components like tr and td? 
*/

class LeaderboardLogic {

	constructor() {
		this.usersList 
		this.usersInfo 
	}

	//Fetch updated info/stats for each user; once all fetches have completed, sort array by honor
	fetchUsersInfo() {
		this.usersList = localStorageLogic.getUsersList()
		const urls = this.usersList.map(user => `https://www.codewars.com/api/v1/users/${user}`)
		Promise.all(urls.map(url => fetch(url)))
			.then(res => Promise.all(res.map(r => r.json())))
			.then(data => {
				this.usersInfo = data
				this.sortByHonor()
				leaderboard.generate(this.usersInfo)
				console.log('sorted usersInfo', this.usersInfo)
			})
			.catch(err => console.log(`Error: ${err}`))
	}
	
	//Sort array of user stat objects by honor (descending)
	sortByHonor() {
		this.usersInfo.sort((a, b) => b.honor - a.honor)
	}

	//Add new user to localStorage and fetch updated users info
	async addUser(e){
		e.preventDefault()
		const user = document.querySelector('.add-user input').value
		const url = `https://www.codewars.com/api/v1/users/${user}`

		//Clear any previous error messages
		const errorMessage = document.querySelector('.error-message')
		errorMessage.textContent = ''
		errorMessage.classList.remove('fade-in-out')

		const newUser = await fetch(url)
			.then(res => res.json()) // parse response as JSON
			.then(data => {

				//If no Codewars user by that name, show error and return 
				if (!data.username) {
					errorMessage.textContent = 'Please enter a valid username.'
					errorMessage.classList.add('fade-in-out')
					throw new Error ('Not a valid username')
				}

				// Copy stored usersList and parse string into array
				let temporaryList = localStorageLogic.getUsersList()

				//Check if username is already in list; if so, throw error and return 
				if (temporaryList.includes(data.username)) {
					errorMessage.textContent = 'This user is already on the leaderboard.'
					errorMessage.classList.add('fade-in-out')
					throw new Error ('Username is already in localStorage')
				}

				//Push new username onto the array
				temporaryList.push(data.username);

				// Store new list in localStorage
				localStorageLogic.setUsersList(temporaryList)

				console.log('local storage', localStorage.users)

				//Clear text from input 
				document.querySelector('input').value = ''
			})
			.catch(err => {
				console.log(err)
			})
		
		//Fetch updated stats, including new user
		this.fetchUsersInfo()
	}
}

class LocalStorageLogic {

	//Retrieve 'users' and parse into array
	getUsersList() {
		return JSON.parse(localStorage.getItem('users')) || []
	}

	// Re-serialize array of users back into a string and store it in localStorage
	setUsersList(array) {
		return localStorage.setItem('users', JSON.stringify(array))
	}
}

class Board {
	//Generate leaderboard table from user stats
	generate(usersInfo) {
		const table = document.querySelector('table')
		const newTBody = document.createElement('tbody')
		
		usersInfo.forEach((user, i) => {
			const tr = document.createElement('tr')
			newTBody.appendChild(tr)
		
			const stats = [i + 1, user.ranks.overall.name, user.username, user.clan, user.honor]
			stats.forEach(stat => {
				const td = document.createElement('td')
				td.textContent = stat
				tr.appendChild(td)
			})
		})
		table.removeChild(document.querySelector('tbody'))
		table.appendChild(newTBody)
	}
}

const localStorageLogic = new LocalStorageLogic()
const leaderboardLogic = new LeaderboardLogic
const leaderboard = new Board

//On page load, get users stats and generate leaderboard
leaderboardLogic.fetchUsersInfo()

// //Listen for add-user form submission
document.querySelector('.add-user').addEventListener('submit', leaderboardLogic.addUser.bind(leaderboardLogic))



//Listen for end of error-message animation (fadeIn, fadeOut)
// const errorMessage = document.querySelector('.error-message')
// errorMessage.addEventListener('animationend', () => {
// 	errorMessage.classList.remove('fade-in-out')
// })

//Maybe instead, have an @reader rule? 
/*
https://www.w3.org/WAI/tutorials/forms/notifications/
Sometimes, for example, when using AJAX techniques, the browser is not loading a new page but shows changes, such as form errors, dynamically on the page. The list of errors should be inserted into a prominent container on the top to inform the user in such a case. In addition to the advice above, this container should have the role attribute set to alert to make assistive technology users aware of this change.
*/
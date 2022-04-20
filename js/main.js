//On page load, get usersList from localStorage and parse into array 
let usersList = JSON.parse(localStorage.getItem('users')) || []
let usersInfo = []

//Function: Sort array of user stat objects by honor (descending)
const sortbyHonor = (arr) => arr.sort((a, b) => b.honor - a.honor)

//Function: Fetch updated info/stats for each user; once all fetches have completed, sort the array 
function getUsersInfo() {
	let usersList = JSON.parse(localStorage.getItem('users')) || []
	let urls = usersList.map(user => `https://www.codewars.com/api/v1/users/${user}`)

	Promise.all(urls.map(url => fetch(url)))
		.then(res => Promise.all(res.map(r => r.json())))
		.then(data => {
			usersInfo = sortbyHonor(data)
			generateLeaderboard()
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
		stats.forEach(stat => {
			const td = document.createElement('td')
			td.textContent = stat
			tr.appendChild(td)
		})
	})
	table.removeChild(document.querySelector('tbody'))
	table.appendChild(newTBody)
}

//Function- Add new user to localStorage and run getUserInfo() after fetch
async function addUser(e){
	e.preventDefault()
	const user = document.querySelector('.add-user input').value
	const url = `https://www.codewars.com/api/v1/users/${user}`

	const newUser = await fetch(url)
		.then(res => res.json()) // parse response as JSON
		.then(data => {

			//If no user by that name, return 
			if (!data.username) {
				const errorMessage = document.querySelector('.error-message')
				errorMessage.textContent = 'Please enter a valid username.'
				errorMessage.classList.add('fade-in-out')
				throw new Error ('Not a valid username')
			}

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

			// Re-serialize the array back into a string and store it in localStorage
			localStorage.setItem('users', JSON.stringify(usersList));

			//Clear text from input 
			document.querySelector('input').value = ''
		})
		.catch(err => {
			console.log(err)
		})
	getUsersInfo()
}

//On page load, get users stats and generate leaderboard
getUsersInfo()

// //Listen for add-user form submission
document.querySelector('.add-user').addEventListener('submit', addUser)

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
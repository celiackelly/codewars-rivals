//On page load, get usersList from localStorage and parse into array 
let usersList = JSON.parse(localStorage.getItem('users')) || []
let usersInfo 

//Map usersList onto URLs for fetch call
let urls = usersList.map(user => `https://www.codewars.com/api/v1/users/${user}`)

//Function: Sort array of user stat objects by honor (descending)
const sortbyHonor = (arr) => arr.sort((a, b) => b.honor - a.honor)

//Function: Fetch updated stats for each user; once all fetches have completed, sort the array 
function getUsersStats() {
	Promise.all(urls.map(url => fetch(url)))
		.then(res => Promise.all(res.map(r => r.json())))
		.then(data => {
			usersInfo = sortbyHonor(data)
			console.log(usersInfo)
		})
		.catch(err => console.log(`Error: ${err}`))
}

//On page load, get users stats 
getUsersStats()

//Listen for add-user form submission
document.querySelector('.add-user').addEventListener('submit', addUser)

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


const table = document.querySelector('table')
const newTBody = document.createElement('tbody')

//Generate leaderboard table
	// usersInfo.forEach((user, i) => {
	
	// 	const tr = document.createElement('tr')
	// 	newTBody.appendChild(tr)
		
	// 	const stats = [i + 1, user.ranks.overall.name, user.username, user.clan, user.honor]
	// 	console.log(stats)
	// 	stats.forEach(stat => {
	// 		const td = document.createElement('td')
	// 		td.textContent = stat
	// 		tr.appendChild(td)
	// 	})
	// 	console.log(newTBody)
	// })

// For each user in usersInfo, add stats to the DOM

// table.removeChild(document.querySelector('tbody'))
// table.appendChild(newTBody)
// console.log(newTBody)

//PROBLEM - the honor, rank, and position/sorting won't update, because those values are coming from local storage! 
//We need to fetch the data for each user in local storage each time

//Also, there must be a better solution to removing and replacing the whole tbody each time...


//Problem - DOM stuff needs to be INSIDE the fetch call; otherwise, the rest of the document execution proceeds while waiting for the fetch to finish. 
//BUT if all the DOM stuff happens inside the fetch call, you can't sort the leaderboard, because the fetch is being executed one username at a time. 
//Might be able to sort the table once in place w/a separate function? 




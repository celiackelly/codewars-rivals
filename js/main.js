const table = document.querySelector('table')

//On page load, get usersList from localStorage and parse into array 
// let usersList = JSON.parse(localStorage.getItem('users')) || []
//hard coded for now, just to test
let usersList = ['sashavining', 'celiackelly']
let usersInfo = []

const newTBody = document.createElement('tbody')
//Problem - DOM stuff needs to be INSIDE the fetch call; otherwise, the rest of the document execution proceeds while waiting for the fetch to finish. BUT if all the DOM stuff happens inside the fetch call, you can't sort the leaderboard, because the fetch is being executed one username at a time. Might be able to sort the table once in place w/a separate function? 

//Also- WHY am I getting a duplicate row for Sasha? 


//Fetch and add user data to usersInfo array 
usersList.forEach(user => {
	const url = `https://www.codewars.com/api/v1/users/${user}`
	fetch(url)
		.then(res => res.json())
		.then(data => {
			console.log(data)
			usersInfo.push(data)

			//This is the problem- I need all the users pushed to the array FIRST, and then I need to cycle through and add to the DOM. But that's not what this is doing. This is why I get duplicates! 
			usersInfo.forEach((user, i) => {
				console.log('hello')
			
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
		})
		.catch(err => {
			console.log(`error ${err}`)
	})
})
//how to deal with duplicates getting pushed to the array? 

//Sort usersInfo by honor
usersInfo.sort((a, b) => b.honor - a.honor)
console.log(usersInfo)

//For each user in usersInfo, add stats to the DOM

table.removeChild(document.querySelector('tbody'))
table.appendChild(newTBody)
console.log(newTBody)


document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){
	
	const user = document.querySelector('input').value
	const url = `https://www.codewars.com/api/v1/users/${user}`

	fetch(url)
			.then(res => res.json()) // parse response as JSON
			.then(data => {
				console.log(data)
				
				//If no localStorage, set 'users' to empty array 
				if (!localStorage.getItem('users')) {
					let usersArray= []
					localStorage.setItem('users', JSON.stringify(usersArray))
				} 

				let usersArray = []
				// Parse the serialized data back into an array of objects
				usersArray = JSON.parse(localStorage.getItem('users')) || [];

				// Push the new data onto the array
				usersArray.push(data);

				// Log the array value
				console.log(usersArray) 

				//Sort usersArray by honor
				usersArray.sort((a, b) => b.honor - a.honor)

				// Re-serialize the array back into a string and store it in localStorage
				localStorage.setItem('users', JSON.stringify(usersArray));

				const newTBody = document.createElement('tbody')

				//Add user data to the DOM in the leaderboard
				usersArray.forEach((user, i) => {

					const tr = document.createElement('tr')
					newTBody.appendChild(tr)

					const userInfo = [i + 1, user.ranks.overall.name, user.username, user.clan, user.honor]

					userInfo.forEach(info => {
						const td = document.createElement('td')
						td.textContent = info
						tr.appendChild(td)
					})

					newTBody.appendChild(tr)
				})

				table.removeChild(document.querySelector('tbody'))
				table.appendChild(newTBody)

			})
			.catch(err => {
					console.log(`error ${err}`)
			});
}

//PROBLEM - the honor, rank, and position/sorting won't update, because those values are coming from local storage! 
//We need to fetch the data for each user in local storage each time

//Also, there must be a better solution to removing and replacing the whole tbody each time...


const leaderboard = document.querySelector('.leaderboard table')

//Need to populate the leaderboard on page load...




document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){
	
	const user = document.querySelector('input').value
	console.log(user)
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
				// Parse the serialized data back into an aray of objects
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

				leaderboard.removeChild(document.querySelector('tbody'))
				leaderboard.appendChild(newTBody)

			})
			.catch(err => {
					console.log(`error ${err}`)
			});
}

//PROBLEM - the honor, rank, and position/sorting won't update, because those values are coming from local storage! 
//We need to fetch the data for each user in local storage each time

//Also, there must be a better solution to removing and replacing the whole tbody each time...


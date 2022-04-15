document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){
  
  const user = document.querySelector('input').value
  console.log(user)
  const url = `https://www.codewars.com/api/v1/users/${user}`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)

      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}


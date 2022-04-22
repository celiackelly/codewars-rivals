# <a href="https://celiackelly.github.io/codewars-rivals/"><img src="/assets/codewars-logo.svg" height="40px">Codewars Rivals</a>
### Custom leaderboards to fuel the rivalries you really care about

I have a bit of an obsession with <a href="https://www.codewars.com/">Codewars</a>. And while I love the coding challenges...their social tools leave something to be desired. Why have three leaderboard tabs (allies, followers, and following) if you're going to show me the same 2,042 people in all of them? Why is my clan so huge that I can't find the five people I know in real life? 

Enter <a href="https://celiackelly.github.io/codewars-rivals/">Codewars Rivals.</a> Search for any Codewars user and add them to a custom leaderboard of your closest friends and bitterest rivals. Stats refresh on page load so you'll always know who's on top! All in the spirit of friendly competition, of course ;) 

<img src="/assets/codewars-rivals-screenshot-cropped.png">

---

## How It's Made

**Tech Used:** HTML5, CSS3, JavaScript, [Codewars API](https://dev.codewars.com/#introduction)
This app is my first passion project that delves into the world of web APIs, and I had a ton of fun building it. When you submit a username through the form, the app saves the username to localStorage. Then it fetches the stats for all usernames saved in localStorage from the Codewars API, sorts them by honor, and displays them in the leaderboard. When you return to Codewars Rivals, your custom leaderboard awaits you, as the names of your previously added users are saved in localStorage. 


## Lessons Learned

APIs,
local storage,
promises,
async / await, 
CSS animations 

## Next Steps

respond to various screen sizes, 
better OOP as I learn more, 
style user info in leaderboard to mimic colors/rank icons on Codewars

&nbsp;

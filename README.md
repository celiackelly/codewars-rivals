# <a href="https://celiackelly.github.io/codewars-rivals/"><img src="/assets/codewars-logo.svg" height="40px" alt="Codewars logo">Codewars Rivals</a>
### Custom leaderboards to fuel the rivalries you really care about

I have a bit of an obsession with <a href="https://www.codewars.com/">Codewars</a>. And while I love the coding challenges...their social tools leave something to be desired. Why have three leaderboard tabs (allies, followers, and following) if you're going to show me the same 2,042 people in all of them? Why is my clan so huge that I can't find the five people I know in real life? 

Enter <a href="https://celiackelly.github.io/codewars-rivals/">Codewars Rivals.</a> Search for any Codewars user and add them to a custom leaderboard of your closest friends and bitterest rivals. Stats refresh on page load so you'll always know who's on top! All in the spirit of friendly competition, of course ;) 

<a href="https://celiackelly.github.io/codewars-rivals/"><img src="/assets/codewars-rivals-screenshot-cropped.png" alt="Screenshot of Codewars Rivals app"></a>

---

## How It's Made

**Tech Used:** HTML5, CSS3, JavaScript, [Codewars API](https://dev.codewars.com/#introduction)

This app is my first passion project that delves into the world of web APIs, and I had a ton of fun building it. When you submit a username through the form, the app saves the username to localStorage. Then it fetches the stats for all usernames saved in localStorage from the Codewars API, sorts them by honor, and displays them in the leaderboard. When you return to Codewars Rivals, your custom leaderboard awaits you, as the names of your previously added users are saved in localStorage. 

## Lessons Learned

I made a whole first version of this app and felt elated...until I realized that the honor and rank stats would never update! I had saved the whole user object to localStorage after fetching it, and was pulling from those static stats to generate the leaderboard. Oops. 

I switched my approach to saving just the username in localStorage and making a fresh fetch call for each user on page load. But I was baffled that although I could see that all the users were being correctly added to localStorage, some rows were missing from the leaderboard. After a lot of Googling and stepping through functions in Chrome's debugger tool, I realized that the program was not waiting for responses from all the fetch calls before continuing to execute the program. I learned about **async / await** and **Promise.all(),** which I successfully implemented to fix the issue. 

Finally, I explored **CSS animations** to make the error messages fade in and out. 

## Next Steps

- [ ] improve responsiveness to various screen sizes
- [ ] improve the implementation of OOP principles as I learn more 
- [ ] style the user rows on the leaderboard to mimic the colors and rank icons on Codewars

&nbsp;

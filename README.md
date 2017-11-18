# StackNotifier

StackNotifier is Tampermonkey/Greasemonkey (or compatible) user script that aims to improve your experience with StackOverflow.com.

Once it runs, you will get live notifications about newest questions.

![alt text](https://i.imgur.com/Ji1LvHV.png "Logo Title Text 1")

## How to use StackNotifier?
1. Install [Tampermonkey](https://chrome.google.com/webstore/search/tampermonkey?hl=en&_category=extensions "Tampermonkey")/[Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/ "Greasemonkey") extension.
2. [Install StackNotifier](https://raw.githubusercontent.com/reski78/StackNotifier/master/stacknotifier.js "Install StackNotifier").
3. Make sure you are logged in StackOverflow. (!)
4. Go to page with newest questions, for example [JavaScript](https://stackoverflow.com/questions/tagged/javascript?sort=newest "JavaScript").

If you leave page tab/browser window, you will see title changed:

![alt text](https://i.imgur.com/NwNu3CR.png "Logo Title Text 1")

It means it's working!

##

Referrence to WebSocket connection is encapsulated, so I built it basing on [Mutation Observer](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver "Mutation Observer") API.
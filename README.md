# GitHub Feed Blacklist

## What is the script for?

As a team player, you work closely with your colleagues. Along the way, you’ll find reliable folks who become friends, and others who you’d rather not see again 😅. On GitHub, blocking a user might affect collaboration, and that’s not our style. We don’t mix personal feelings with work, but we also don’t want certain people popping up in our GitHub feed. It’s a problem of GitHub not distinguishing between work and personal boundaries and lacking user understanding in their content push. I’m not satisfied with their product design, so I wrote this script.

## How to use it?

> Note that you need to install the Tampermonkey extension first before clicking the link to install script.

[Install Script](https://raw.githubusercontent.com/helsonxiao/github-feed-blacklist/master/script.user.js)

Once everything is set up, visit github.com and set up a blacklist in the developer tools console. For example:

```js
localStorage.setItem("feed-blacklist", JSON.stringify(["username"]));
```

Here’s to smooth work and happy living! 🎉

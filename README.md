# SynchedIn

>This README describes part 4 of the activity. For earlier steps, see [part 1](https://github.com/jeremyrrose/synched-in), [part2](https://github.com/jeremyrrose/synched-in-part-2), [part3a](https://github.com/jeremyrrose/synched-in-part-3a) and [part3b](https://github.com/jeremyrrose/synched-in-part-3a).

_OMG what if there were an app that let you connect with other professionals in your field?_

_Like, a social network, but with less disinformation and fewer selfies and more of, like, people just kinda boasting about their professional achievements!_

Let's build a proof of concept!

## Current status

This repository was created with `create-react-app` and includes all the accoutrements thereof.

The packages `react-bootstrap` and `react-router-dom` have also been pre-installed.

## Setup

- Fork and clone this repository.
- `cd` into the resulting `synched-in` directory.
- Run `code .` or whatever you do to get a project directory up in VSCode.
- Run `npm i` to install React, React Router, and Bootstrap.
- Run `npm start` to fire up your dev server.

## Step 1: Pseudocode

Let's think about what we're doing.

This app will show a list of fake people who work at fake companies. Let's pretend it's real!

### Our goals
- **DONE** Show the list of people in a sensible way. 
- **DONE** Enable the app to show selected people based on their status in a few categories that are most important for business decsisions:
    - `devLevel`
    - `company`
    - `favoriteMusicGenre`
- **MAYBE DONE** Enable the user to add "favorites." These users can be shown in a special list.
- Enable the user to "block" users if they, for instance, have the temerity to list "Non Music" as their favorite music genre. That's insane. (Reasonable people call it "post-music," obviously.)
- **MAYBE DONE** **NEW** Enable users to search other users by name, then follow a link to display the found user's profile.

Depending on whether you've done steps 3a and 3b, you may have met all of these requirements aside from the "block" functionality.

### Think ahead

Let's pull it all together... and think about the future.

In this repository, the solutions for part 3a and part 3b have been merged. They were meant to operate in parallel, but they still managed to step on each other's toes. Fortunately, Git can help us manage merge conflicts.
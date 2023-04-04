# SynchedIn

>This README describes part 4 of the activity. For earlier steps, see [part 1](https://github.com/jeremyrrose/synched-in), [part2](https://github.com/jeremyrrose/synched-in-part-2), [part3a](https://github.com/jeremyrrose/synched-in-part-3a) and [part3b](https://github.com/jeremyrrose/synched-in-part-3a).

_OMG what if there were an app that let you connect with other professionals in your field?_

_Like, a social network, but with less disinformation and fewer selfies and more of, like, people just kinda boasting about their professional achievements!_

Let's build a proof of concept!

## Current status

This repository was created with `create-react-app` and includes all the accoutrements thereof.

The packages `react-bootstrap` and `react-router-dom` have also been pre-installed.

Parts 3a and 3b have been merged, so all the capabilities marked **DONE** under **Our goals** below are active.

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
- **DONE** Enable the user to add "favorites." These users can be shown in a special list.
- Enable the user to "block" users if they, for instance, have the temerity to list "Non Music" as their favorite music genre. That's insane. (Reasonable people call it "post-music," obviously.)
- **DONE** **NEW** Enable users to search other users by name, then follow a link to display the found user's profile.

Depending on whether you've done steps 3a and 3b, you may have met all of these requirements aside from the "block" functionality. This repository has both "favorites" and "search" handled.

### Think ahead

Let's pull it all together... and think about the future.

In this repository, the solutions for part 3a and part 3b have been merged. They were meant to operate in parallel, but they still managed to step on each other's toes. Fortunately, Git can help us manage merge conflicts.

Git is _tough_. Take a look at the two commits in this repository that start with "merge". What do you think happened there?

It takes some practice to handle a complicated merge. For now, understand that part 3a (the "favorites" goal) and part 3b (the "search" goal) happened at the _same time_, as far as Git is concerned -- they both started from the same commit, so merging them back together is tricky but do-able. The key was looking at the files that _both_ commits altered, and then reconciling them manually.

## Step 2: Talk to a pal

Rather than wrangling a merge conflict, a better idea might be to talk to a friend. If you completed part 3a, find a classmate who completed part 3b. Work together, and try to walk each other through completing both!

## Step 3: Build from there

You could also pull down the code in this repository and try more moves:

- Should there be an option to add a favorite from an individual profile after searching? Where would you have to pass props, and what else would you need to add to make that happen?

- We skipped allowing the user to "block" other users. Could you use logic similar to "favorites" to make that happen?

- There's nothing in this code to handle errors or weird URLs. What happens if someone navigates to `http://localhost:3000/profiles/djklasdlka`? What _should_ happen?

- Connect to an Express/Mongo back end instead of using `fakeFetch`. You'd have to build it from scratch, which would be a pain -- but what other capabilities would that enable? Could you save "favorites" and "blocks"? How would that be represented in the database?

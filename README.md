# SynchedIn

>This README describes part 3 of the activity. For earlier steps, see [part 1](https://github.com/jeremyrrose/synched-in) and [part2](https://github.com/jeremyrrose/synched-in-part-2).

_OMG what if there were an app that let you connect with other professionals in your field?_

_Like, a social network, but with less disinformation and fewer selfies and more of, like, people just kinda boasting about their professional achievements!_

Let's build a proof of concept!

## Current status

This repository was created with `create-react-app` and includes all the accoutrements thereof.

The packages `react-bootstrap` and `react-router-dom` have also been pre-installed.

`package-lock.json` has been removed because it is a pain for learning. (Very useful in the future, though!)

There are some interesting things in the `utils` and `assets` directories, which we'll address as we need to.

The app currently fetches the data and displays a card for each user, and we can filter by dev level, company name, and favorite music genre.

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
- Enable the user to add "favorites." These users can be shown in a special list.
- Enable the user to "block" users if they, for instance, have the temerity to list "Non Music" as their favorite music genre. That's insane. (Reasonable people call it "post-music," obviously.)

### Think ahead

Now we need to find a way to let the user choose favorites. There will need to be a button on each card that determines whether the person is a favorite or not, and we'll need to store that information in state.

We'll also need a way to display the favorites if the user navigates to `/favorites`, so we'll probably use React Router.

>NOTE: In a production app, the user's "favorites" information would need to be stored in our back-end database so that user preferences could be preserved! We likely wouldn't do the filtering for this in the front end, either. It's likely that our application would simply make another call to the API to retrieve favorites.
>
>But we'll still mimic it here, because it's good practice, and it's fun.

## Step 2: Think about identity

Sure, each of our users has a spectacular `fullName`, but what's the _easiest_ way to identify an individual person? How about the `id`?

For now, edit the `Person` component to display each user's ID on their card. We'll use this value later.

## Step 3: Make a place to store the IDs

We'll need this to live in `App.js` so that we can pass it down to various child components:

```js
  const [ favorites, setFavorites ] = useState([1])
```

>For now, we've pre-set our friend Kathy Fahey onto our favorites list so we can test some things.

And we'll need our `Person` cards to be able to access and change this value. Pass `favorites` and `setFavorites` as props for `Person`.

## Step 4: Display whether a person is a favorite

Each person card now has three props:
- `person`: the person's entry in the data
- `favorites`: an array of IDs
- `setFavorites`: a way to change that array.

Let's use Bootstrap's `Badge` component to show the status. In `Person.jsx`:

```js
import Badge from 'react-bootstrap/Badge';
```

And, nested in _the same element_ where you're currently displaying the `fullName`, let's add the badge:

```js
            <Badge bg="danger" className="ms-2">♥</Badge>
```

If you look now in your browser, you'll see that _everyone_ looks like a favorite. We don't even know these people! They can't all be our favorites!!!

Fortunately we can use some wild React moves to set a condition under which the badge will appear. Change the `Badge` line to this:

```js
    { props.favorites.includes(props.person.id) && <Badge bg="danger" className="ms-2">♥</Badge> }
```

>**_What's going on here?_** It depends a lot upon the return values of `&&` and `includes()`.
>
>`.includes` is the easiest to explain. If the `favorites` array _includes_ the `person.id`, it will return `true`, otherwise `false`.
> 
> What's wild is that `&&` actually returns values too. If the first condition (the part before `&&`) is falsy, this returns `false` -- which, conveniently, React ignores in the render. No problem! But if all the conditions are truthy, `&&` returns the final truthy element.
>
>In other words, if the first part is truthy, React will plug in the second part. It's weird but you'll get used to it!

Now _only_ our friend Kathy Fahey should have a badge.

## Step 5: Add a person to the favorites

Adding to an array in React state is a _little_ tricky. Just like we can't reset state variables directly, we also can't just `.push` and `.pop`. Instead, we have to set state to a _new_ value.

Let's set up a new function inside `Person.jsx` that can use props to update the favorites array:

```js
    const addToFavorites = () => {
        // create a shallow copy of the current array
        const newFavorites = [...props.favorites]
        // add the current person's ID to the array
        newFavorites.push(props.person.id)
        // change the value in state
        props.setFavorites(newFavorites)
    }
```

>NOTE: There are ways to do all of this on one line. You may see something like `setFavorites(prev=>[...prev, person.id])` in the wild, so don't be alarmed. For now, the above is much easier to understand.

We could attach this new function to a button, but instead let's use the badge directly. You can change our `&&` move to a ternary statement that displays a different, clickable badge for non-faves. It might look like this:

```js
                { props.favorites.includes(props.person.id) ? 
                    <Badge bg="danger" className="ms-2">♥</Badge> :
                    <Badge bg="light" text="secondary" className="ms-2" onClick={addToFavorites}>♥</Badge>
                }
```

>NOTE: This is actually abusing Bootstrap -- `Badge` elements aren't meant to be clickable, and this could cause accessibility issues.

## Step 6: Removing a person from favorites

Removing a value from an array in React is also tricky, but in this case, we actually already know a few methods that return a new array. We can use `.filter`. Remember that `favorites` is actually an array of IDs, and think about this code:

```js
    favorites.filter(fave => fave !== person.id)
```

This would give us a new array with everything _except_ the current ID, right? We can actually plug something like this right in:

```js
    props.setFavorites(props.favorites.filter(fave => fave !== props.person.id))
```

Whoa. While we could plug that in inline somewhere, let's stick with our pattern and make a new function in `Person.jsx`:

```js
    const removeFromFavorites = () => {
        // create a new array with everything from current faves except current id
        const newFavorites = props.favorites.filter(fave => fave !== props.person.id)
        // change the value in state
        props.setFavorites(newFavorites)
    }
```

Now use this function as the `onClick` callback for the original version of the badge. Now you can turn friendships on and off at will, just like in real life!

## BONUS: Displaying favorites

If we want to display _just_ the favorites at `/favorites`, we'll need to use React Router.

Start by importing BrowserRouter in `index.js` and wrapping your `App` component with it.

Then, in `App.js`, we can import `Routes` and `Route` from `'react-router-dom'`. You _could_ set up a simple routing situation by replacing your current "people list" in the render with something like this:

```js
      <Routes>
        <Route path="/favorites" element={(
            <div className="people-div d-flex flex-wrap justify-content-center">
                { people
                    .filter(person => favorites.includes(person.id))
                    .map(person => <Person key={person.id} person={person} favorites={favorites} setFavorites={setFavorites} />) }
            </div>
          )} />
        <Route path="/" element={(
            <div className="people-div d-flex flex-wrap justify-content-center">
                { people
                    .filter(filterFunction)
                    .map(person => <Person key={person.id} person={person} favorites={favorites} setFavorites={setFavorites} />) }
            </div>
          )} />
      </Routes>
```

>NOTE: It would make more sense to refactor the people list into a separate component! Unfortunately that is out of scope for us at the moment.

OK, that works, but our `Filter` only works on the home page. Fortunately, we can include more that one `Routes` component:

```js
      <div className="position-sticky top-0 bg-body pb-2" style={{zIndex:10}}>
        <Header />
        <Routes>
          <Route path="/" element={<Filter 
            setDevLevelFilter={setDevLevelFilter}
            setCompanyFilter={setCompanyFilter}
            setGenreFilter={setGenreFilter}
            />} />
        </Routes>
      </div>
```

Last, you'll import the `Link` component from React Router into your `Header` component. You might end up with something like this:

```js
import { Link } from 'react-router-dom'

export default function Header (props) {
    return (
        <div className="container-fluid d-flex justify-content-start align-items-center p-2 m-2 bg-primary" style={{color: "white"}}>
            <div className="logo">
                <Link 
                    style={{fontWeight: "bold", fontSize: "24px", color:"white", textDecoration: "none"}}
                    to="/" 
                    >SynchedIn</Link>
            </div>
            <Link 
                className="ms-4" 
                style={{color:"white", textDecoration: "none"}} 
                to="/favorites"
                >My Favorites</Link>
        </div>
    )
}
```

## BONUS: Undo bad UI practices

The badge on each card really should be a button. Refactor `Person.jsx` to use the `Button` component instead of `Badge`, and style it how you like.

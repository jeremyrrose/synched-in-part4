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
- **NEW** Enable users to search other users by name, then follow a link to display the found user's profile.

### Think ahead

See that **NEW** tag above? It turns out our client didn't give us appropriate acceptance criteria for this app. It turns out they want to prioritize a user search function. Let's see what we can do!

Fortunately, our back-end engineers are awesome. They've already built two endpoints for us to use:

- `/search?term={searchTerm}`: Based on the value you provide for `{searchTerm}` the endpoint will return a list of users whose _names_ match the query. The schema for searched users (note that this is different from our normal user data) is:

    ```json
    { 
        "id": "number", 
        "fullName": "string",
        "company": "string" 
    }
    ```

- `/users/{userId}`: Based on the value you provide for `{userId}` a single user will be returned. The user will have the same schema as users in our user data array, but note that the user will _not_ be nested in an array.

Amazing. Nice work, crew! We'll use these.

## Step 2: Layout

We'll follow standard practice and place our search bar in the header, on the right side. First, let's create a new component for it in `components/Search.jsx`:

```js
export default function Search (props) {

    return (
        <div className="search mx-2">
            SEEEEARCH
        </div>
    )
}
```

We'll build this out bigtime later, but for now, let's just `import` this component into `Header.jsx` and plug `<Search />` in right below the `div` with className "logo". Test it out!

Right now, it's on the left. :/ Change `justify-content-start` in the main header `div` to `justify-content-between`. Wow, thanks Bootstrap!

>NOTE: The `mx-2` class in the code sample above adds "level 2" padding on the left and right.

## Step 3: Make it a controlled form

In React, a "controlled form" is one that is hooked up to state -- in both directions! What's in state can change what's on the form, and what the user puts in the form can change what's in state. We love state. So first let's create some state for our search term:

```js
    const [ searchTerm, setSearchTerm ] = useState("")
```

Instead of `SEEEEARCH`, let's put a _controlled_ Bootstrap form inside that `div`. First, `import Form from 'react-bootstrap/Form'`, then place this inside the `div`:

```js
    <Form.Control type="search" placeholder="Search a name" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} />
```

>NOTE: The `value` property will track `searchTerm` in state... and the `onChange` property will change `searchTerm` when the user creates input.

Test this out by opening React dev tools, selecting the `Search` component, then typing in the search bar. Does state change?

## Step 4: Get some data

We know that we can grab the value of `searchTerm` and plug it into the search endpoint that our back-end engineers built. Let's try it.

First, we'll need a place to store our search results. Add:

```js
    const [ searchResults, setSearchResults ] = useState([])
```

> ### User-centered design
>
> We want a fancy, modern search, because we don't want our lazy Gen Z users to have to hit "Enter." They can't even pay off their own student loans, jeez! How could we update the results with each keystroke?
>
> Well, we know we'll use `useEffect` to fetch our data... if we add `searchTerm` to the dependency array, then our `useEffect` will run every time `searchTerm` changes. Perfect!

Now we need to set up a `useEffect` to grab search data, using a similar pattern to what we've used before. The main difference is that now we need to provide a fake "URL" to `fakeFetch`, and it should match the pattern our back-end engineers designed:

```js
    useEffect(()=>{
        const getSearchResults = async () => {
            const res = await fakeFetch(`/search?term=${searchTerm}`) // interpolate searchTerm from state into query
            setSearchResults(await res.json()) // set results in searchResults
        }
        getSearchResults()
    },[searchTerm]) // adding searchTerm to the dependency array means this refreshes with every keystroke
```

Now we should be able to type in the search bar and, in React dev tools, watch `searchResults` change in state!

>NOTE: Even if this is working for you, ask your instructor to talk about it if there's anything you don't understand.

## Step 5: Show the search results

React Bootstrap has some great built-in components that can help us show these results crisply: `<ListGroup>` and `<ListGroup.Item>`.

>Take a moment to peek at the `<ListGroup>` [documentation](https://react-bootstrap.github.io/components/list-group/).

We pretty easily show our results using these components and our best friend `.map`. Add this right below the `<Form.Control>` (inside the main `div`) in `Search.jsx`:

```js
            <ListGroup className="position-fixed">
                {searchResults.map(result => (
                    <ListGroup.Item>
                        {result.fullName}
                    </ListGroup.Item>
                ))}
            </ListGroup>
```

Holy wow. `position-fixed` here is a Bootstrap class that locks our results list underneath our search input. Then we just have to use `.map` to create a `<ListGroup.Item>` for each result, and show the `fullName`.

## Step 6: Pause

Great, we have search results, but... what are they supposed to, like, do?

We _could_ set something up to filter our main page for a certain user... But instead, let's set up an individual profile page using React Router and our other back-end endpoint.

## Step 7: Create the profile view

Bootstrap could _probably_ do something cool for us here, but we've got time constraints. Let's just create a new component, `Profile.jsx` that returns a `div`:

```js
export default function Profile (props) {
    return (
        <div className="profile">
            PROFILE
        </div>
    )
}
```

Now import it into `App.js` and try plugging it in to your list of people. You'll have to scroll to the bottom, but you should see `PROFILE`.

## Step 8: Add routing

Our homepage filtering is already great, so we _only_ want the profile to show up if users go to `/profiles/{userId}` in our app. We can use React Router (which is already installed) to control this.

First, set up React Router by adding `import { BrowserRouter as Router } from 'react-router-dom'` to `index.js` and then wrapping your `<App>` component in a `<Router>`. (This is tricky and specific; ask your instructor for help.)

In `App.js`, add `import { Routes, Route } from 'react-router-dom'` and set up routes to do the following:
- Only show the filters at `/`.
- Show the `<Profile>` component at `/profiles/{userId}`

Try it on your own, but it will be _really_ tough. You might end up with something like this:

```js
  return (
    <div className="app">
      <div className="position-sticky top-0 bg-body pb-2" style={{zIndex:10}}>
        <Header />
        <Routes>
          <Route path="/" element={(
            <Filter 
              setDevLevelFilter={setDevLevelFilter}
              setCompanyFilter={setCompanyFilter}
              setGenreFilter={setGenreFilter}
              />)} />
        </Routes>
      </div>
      <Routes>
        <Route path="/" element={(
          <div className="people-div d-flex flex-wrap justify-content-center">
            { people
              .filter(filterFunction)
              .map(person => <Person key={person.id} person={person} />) }
          </div>)} />
        <Route path="/profiles/:id" element={(<Profile />)} />
      </Routes>
    </div>
  );
```

> ### UUUUGH, that's awful: Let's break this down.
> 
> - `<Header />` is outside any `<Routes>` component, so it always shows up.
> - There are _two_ `<Routes>` components:
>     - Inside the header div, the route just shows `<Filter>` if the URL is "/" and otherwise hides it.
>     - In the second `<Routes>` component, path "/" shows our normal list, and path "/profiles/:id" shows our `<Profile>` component. We'll use `:id` in a moment.
>
> It would make sense to refactor our homepage list into a new `<People>` component, but that's out of scope for our current goals. There might be other smart ways to refactor it, too... Food for thought later!

## Step 9: Use the `:id` slug

Just like we learned with Express routes, React Router lets us use a "slug", or a route parameter, to grab information we need from the URL. With React Router, we use a hook called `useParams`. In `Profile.jsx`:

```js
import { useParams } from 'react-router-dom'
```

Now, let's... _use_ it. Add this inside your function in `Profile.jsx`:

```js
    const params = useParams()
    console.log(params)
```

Navigate to `http://localhost:3000/profiles/2` in your browser and open your browser console. You should see `{id: '2'}`. We can use this.

## Step 10: Grab an individual user

For the next stage, we'll need our core React moves. In `Profile.jsx` add:

```js
import { useEffect, useState } from 'react'
```

...and set up a value in state to hold our individual user:

```js
    const [user, setUser] = useState({})
```

Similar to what we have in `Search.jsx`, we'll set up a `useEffect` to hit our individual user endpoint:

```js
    useEffect(()=>{
        const getUser = async () => {
            const res = await fakeFetch(`/users/${params.id}`)
            setUser(await res.json())
        }
        getUser()
    },[params.id])
```

>NOTE: In production applications, we might need to set up more complex logic here to handle what happens when things _don't_ go well. For right now, let's look at what we can do when we nail it!

Now, replace the test "PROFILE" with `{user.fullName}`.

## Step 11: Fill out the profile

This could be fun to come back to later and style it more carefully. For right now, fill our profile with a few `<h1>`, `<h2>`, and `<p>`s that display things like `user.fullName`, `user.company`, `user.devLevel`, and `user.bio`.

>NOTE: If you've already completed [part 3A](https://github.com/jeremyrrose/synched-in-part-3a), you could incorporate your "favorites" logic here, too. Take a look at this later!

## Step 12: Add links to search

Now that we've set up a place to go to to see an individual person, we can have our search direct users to an individual profile!

We'll need to grab the `<Link>` component from React Router in `Search.jsx`:

```js
import { Link } from 'react-router-dom'
```

Now all we have to do is wrap each `<ListGroup.Item>` in a `<Link>` to the right location:

```js
                    <Link to={`profiles/${result.id}`}>
                        <ListGroup.Item>
                            {result.fullName}
                        </ListGroup.Item>
                    </Link>
```

>Break it down: What is `result.id`?

Search a string and click on a name! Or use keyboard controls (`TAB` and `ENTER`) to navigate -- Bootstrap is relentlessly accessible.

## BONUS: Have the SynchedIn logo link back to "/"

That's expected behavior. You may have to style you `<Link>` with something like `{{color: "white", textDecoration: "none" }}`.

## BONUS: Flesh out and style the search results

Right now we just display the `fullName` for each search result. We also get the `company` for each result. If we `import Badge from 'react-bootstrap/Badge'`, we could do something like this:

```js
    <Link to={`profiles/${result.id}`} style={{textDecoration: "none"}}>
        <ListGroup.Item>
            <h5>{result.fullName}<Badge bg="light" text="secondary">{result.company}</Badge></h5>
        </ListGroup.Item>
    </Link>
```

## BONUS: Finish the `<Profile>` component

Use Bootstrap or CSS to make it look like you want it to!

## MEGABONUS: Consider step 4

[SynchedIn step 4](https://github.com/jeremyrrose/synched-in-part4)

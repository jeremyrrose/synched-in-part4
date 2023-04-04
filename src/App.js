import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import fakeFetch from './utils/fakeFetch'

import Header from './components/Header';
import Filter from './components/Filter'
import Person from './components/Person';
import Profile from './components/Profile'

function App() {

  const [ people, setPeople ] = useState([])
  const [ devLevelFilter, setDevLevelFilter ] = useState("")
  const [ companyFilter, setCompanyFilter ] = useState("")
  const [ genreFilter, setGenreFilter ] = useState("")
  const [ favorites, setFavorites ] = useState([1,5])

  useEffect(()=> {
    const getPeople = async () => {
      const res = await fakeFetch() // get data from "fetch"
      setPeople(await res.json()) // store the result of .json() in state
    }
    getPeople()
  },[])

  const filterFunction = (person) => {
    // don't forget that .filter is kind of "expensive"
    // our program has to go through every element in the loop every time!
    // so while we /could/ chain two .filters, it makes more sense to set up a 
    // single function that can check each person once against the criteria
    if (devLevelFilter && devLevelFilter != person.devLevel) {
      return false
    }
    if (companyFilter && companyFilter != person.company) {
      return false
    }
    if (genreFilter && genreFilter != person.favoriteMusicGenre) {
      return false
    }
    return true
  }

  return (
    <div className="app">
      <div className="position-sticky top-0 bg-body pb-2" style={{zIndex:10}}>
        <Header />
        <Routes>
          <Route path="/" element={<Filter 
            devLevelFilter={devLevelFilter}
            setDevLevelFilter={setDevLevelFilter}
            companyFilter={companyFilter}
            setCompanyFilter={setCompanyFilter}
            genreFilter={genreFilter}
            setGenreFilter={setGenreFilter}
            />} />
        </Routes>
      </div>
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
        <Route path="profiles/:id" element={(<Profile />)} />
      </Routes>
    </div>
  );
}

export default App;

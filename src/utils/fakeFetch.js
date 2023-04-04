import people from '../assets/data.json'

const fakeFetch = async (url) => {
    console.log(`faking fetch! URL: ${url ? url : "GET all users"}`)

    // /search?term={searchTerm} endpoint
    if (url && url.includes('?term=')) {
        const [stem, query] = url.split("?")
        const [param, val] = query.split("=")
        if (!val) {
            return new Promise((resolve) => resolve({
                status: 200,
                data: new ReadableStream(""),
                json: async ()=> []
            }))
        }
        return new Promise((resolve) => resolve({
            status: 200,
            data: new ReadableStream(""),
            json: async ()=> people
                            .filter(person => person.fullName.toLowerCase().includes(val.toLowerCase()))
                            .map(person => ({ id: person.id, fullName: person.fullName, company: person.company }))
        }))
    // /users/{userId} endpoint
    } else if (url && url.includes('users')) {
        const urlSplit = url.split("/")
        const id = Number(urlSplit.pop())
        const foundUser = people.find(person => person.id == id)

        if (foundUser) {
            return new Promise((resolve) => resolve({
                status: 200,
                data: new ReadableStream(""),
                json: async ()=> foundUser
            }))
        } else {
            return new Promise((resolve) => resolve({
                status: 404,
                message: "Not found."
            }))
        }

    // default "GET users" endpoint
    } else {
        return new Promise((resolve) => resolve({
            status: 200,
            data: new ReadableStream(""),
            json: async ()=> people
        }))
    }
}

export default fakeFetch
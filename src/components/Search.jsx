import {useState, useEffect} from 'react'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import Badge from 'react-bootstrap/Badge'
import {Link} from 'react-router-dom'
import fakeFetch from '../utils/fakeFetch'

export default function Search (props) {

    const [ searchTerm, setSearchTerm ] = useState("")
    const [ searchResults, setSearchResults ] = useState([])

    useEffect(()=>{
        const getSearchResults = async () => {
            const res = await fakeFetch(`/search?term=${searchTerm}`)
            setSearchResults(await res.json())
        }
        getSearchResults()
    },[searchTerm])

    return (
        <div className="search mx-2">
            <Form.Control type="search" placeholder="Search a name" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} />
            <ListGroup className="position-fixed">
                {searchResults.map(result => (
                    <Link to={`profiles/${result.id}`} style={{textDecoration: "none"}}>
                        <ListGroup.Item>
                            <h5>{result.fullName}<Badge bg="light" text="secondary">{result.company}</Badge></h5>
                        </ListGroup.Item>
                    </Link>
                ))}
            </ListGroup>
        </div>
    )
}
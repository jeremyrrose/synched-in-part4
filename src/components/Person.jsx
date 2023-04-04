import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button'

export default function Person (props) {

    const addToFavorites = () => {
        // create a shallow copy of the current array
        const newFavorites = [...props.favorites]
        // add the current person's ID to the array
        newFavorites.push(props.person.id)
        // change the value in state
        props.setFavorites(newFavorites)
    }
    
    const removeFromFavorites = () => {
        // create a new array with everything from current faves except current id
        const newFavorites = props.favorites.filter(fave => fave !== props.person.id)
        // change the value in state
        props.setFavorites(newFavorites)
    }

    return (
        <Card className="col-2 m-2 text-sm p-3">

            <Card.Subtitle style={{borderBottom: "1px solid black"}}>{props.person.devLevel}</Card.Subtitle>
            <Card.Title
                className="mb-3 mt-3"
                style={{ color: props.person.favoriteColor }} 
            >
                {props.person.fullName}
                { props.favorites.includes(props.person.id) ? 
                    <Badge bg="danger" className="ms-2" onClick={removeFromFavorites}>♥</Badge> :
                    <Badge bg="light" text="secondary" className="ms-2" onClick={addToFavorites}>♥</Badge>
                }
            </Card.Title>
            <Card.Subtitle>{props.person.company}</Card.Subtitle>
            <Card.Text>
                {props.person.bio}
            </Card.Text>
        </Card>
    )

}
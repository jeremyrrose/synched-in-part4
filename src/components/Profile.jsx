import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import fakeFetch from '../utils/fakeFetch.js'

export default function Profile (props) {

    const [user, setUser] = useState({})
    
    const params = useParams()

    useEffect(()=>{
        const getUser = async () => {
                const res = await fakeFetch(`/users/${params.id}`)
                setUser(await res.json())
        }
        getUser()
    },[params.id])

    return (
        <div className="profile mx-3">
            <h1>{user.fullName}</h1>
            <h2>{user.company}</h2>
            <h3>{user.devLevel}</h3>
            <p style={{color: user.favoriteColor}}>{user.bio}</p>
            <p><strong>Favorite music genre:</strong> {user.favoriteMusicGenre}</p>
        </div>
    )
}
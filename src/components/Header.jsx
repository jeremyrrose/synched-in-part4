import Search from './Search'
import { Link } from 'react-router-dom'

export default function Header (props) {
    return (

        <div className="container-fluid d-flex justify-content-between p-3 my-2 bg-primary" style={{color: "white"}}>
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
            <Search />
        </div>
    )
}
import Search from './Search'
import { Link } from 'react-router-dom'

export default function Header (props) {
    return (
        <div className="container-fluid d-flex justify-content-between p-3 my-2 bg-primary" style={{color: "white"}}>
            <div className="logo" style={{fontWeight: "bold", fontSize: "24px"}}><Link style={{color: "white", textDecoration: "none" }} to="/">SynchedIn</Link></div>
            <Search />
        </div>
    )
}
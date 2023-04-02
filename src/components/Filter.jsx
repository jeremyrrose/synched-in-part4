import Form from 'react-bootstrap/Form'
import { 
    DEV_LEVELS as devLevels, 
    MUSIC_GENRES as genres, 
    COMPANIES as companies 
    } from '../utils/constants'

export default function Filter (props) {

    return (
        <Form className="d-flex justify-content-center mb-4">
            <p className="mx-3">FILTER BY</p>
            <div className="mx-3">
                <Form.Label htmlFor="devLevel-select">Dev level: </Form.Label>
                <Form.Select id="devLevel-select" onChange={(e)=>props.setDevLevelFilter(e.target.value)}>
                <option value="">No filter</option>
                {devLevels.map(level => <option key={level} value={level}>{level}</option>)}
                </Form.Select>
            </div>
            <div className="mx-3">
                <Form.Label htmlFor="company-select">Company: </Form.Label>
                <Form.Select id="company-select" onChange={(e)=>props.setCompanyFilter(e.target.value)}>
                <option value="">No filter</option>
                {companies.map(level => <option key={level} value={level}>{level}</option>)}
                </Form.Select>
            </div>
            <div className="mx-3">
                <Form.Label htmlFor="genre-select">Music taste: </Form.Label>
                <Form.Select id="genre-select" onChange={(e)=>props.setGenreFilter(e.target.value)}>
                <option value="">No filter</option>
                {genres.map(level => <option key={level} value={level}>{level}</option>)}
                </Form.Select>
            </div>
        </Form>
    )
}
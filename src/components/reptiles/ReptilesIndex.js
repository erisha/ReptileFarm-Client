import { 
    useState, 
    useEffect 
} from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

import LoadingScreen from '../shared/LoadingScreen'
import { getAllReptiles } from '../../api/reptiles'
import messages from '../shared/AutoDismissAlert/messages'

// ReptilesIndex should make a request to the api
// To get all reptiles
// Then display them when it gets them

// style for our card container
const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const ReptilesIndex = (props) => {
    const [reptiles, setReptiles] = useState(null)
    const [error, setError] = useState(false)

    const { msgAlert } = props

    console.log('Props in ReptilesIndex', props)

    useEffect(() => {
        console.log(props)
        getAllReptiles()
            .then(res => setReptiles(res.data.reptiles))
            .catch(err => {
                msgAlert({
                    heading: 'Error Getting Reptiles',
                    message: messages.getReptilesFailure,
                    variant: 'danger',
                })
                setError(true)
            })
    }, [])

    if (error) {
        return <p>Error!</p>
    }

    // If reptiles haven't been loaded yet, show a loading message
    if (!reptiles) {
        return <LoadingScreen />
    } else if (reptiles.length === 0) {
        return <p>No reptiles yet. Better add some.</p>
    }

    const reptileCards = reptiles.map(reptile => (
        <Card style={{ width: '30%', margin: 5}} key={ reptile.id }>
            <Card.Header>{ reptile.fullTitle }</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/reptiles/${reptile.id}`}>View { reptile.name }</Link>
                </Card.Text>
            </Card.Body>
        </Card>
    ))

    return (
        <div style={ cardContainerStyle }>
            { reptileCards }
        </div>
    )
}

export default ReptilesIndex
import { useState, useEffect } from 'react'

import { useParams, useNavigate } from 'react-router-dom'
// useParams will allow us to see our parameters
// useNavigate will allow us to navigate to a specific page

import { Container, Card, Button } from 'react-bootstrap'

import LoadingScreen from '../shared/LoadingScreen'
import { getOneReptile, updateReptile, removeReptile } from '../../api/reptiles'
import messages from '../shared/AutoDismissAlert/messages'
import EditReptilesModal from './EditReptileModal'
import NewSnackModal from '../snacks/NewSnackModal'
import ShowSnack from '../snacks/ShowSnack'

// We need to get the reptile's id from the parameters
// Then we need to make a request to the api
// Then we need to display the results in this component

// we'll use a style object to lay out the snack cards
const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const ShowReptile = (props) => {
    const [reptile, setReptile] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [snackModalShow, setSnackModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()
    // useNavigate returns a function
    // we can call that function to redirect the user wherever we want to

    const { user, msgAlert } = props
    console.log('user in props', user)
    console.log('the reptile in showReptile', reptile)
    // destructuring to get the id value from our route parameters

    useEffect(() => {
        getOneReptile(id)
            .then(res => setReptile(res.data.reptile))
            .catch(err => {                   
                msgAlert({
                    heading: 'Error getting reptile',
                    message: messages.getReptilesFailure,
                    variant: 'danger'
                })
                navigate('/')
                //navigate back to the home page if there's an error fetching
            })
    }, [updated])

    // here we'll declare a function that runs which will remove the reptile
    // this function's promise chain should send a message, and then go somewhere
    const removeTheReptile = () => {
        removeReptile(user, reptile.id)
            // on success send a success message
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.removeReptileSuccess,
                    variant: 'success'
                })
            })
            // then navigate to index
            .then(() => {navigate('/')})
            // on failure send a failure message
            .catch(err => {                   
                msgAlert({
                    heading: 'Error removing reptile',
                    message: messages.removeReptileFailure,
                    variant: 'danger'
                })
            })
    }
    let snackCards
    if (reptile) {
        if (reptile.snacks.length > 0) {
            snackCards = reptile.snacks.map(snack => (
                <ShowSnack 
                    key={snack._id}
                    snack={snack}
                    reptile={reptile}
                    user={user}
                    msgAlert={msgAlert}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                />
            ))
        }
    }

    if (!reptile) {
        return <LoadingScreen />
    }

    return (
        <>
            <Container className="fluid">
                <Card>
                    <Card.Header>{ reptile.fullTitle }</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div><small>Age: { reptile.age }</small></div>
                            <div><small>Type: { reptile.type }</small></div>
                            <div><small>
                                Adoptable: { reptile.adoptable ? 'yes' : 'no'}
                            </small></div>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button onClick={() => setSnackModalShow(true)}
                            className="m-2" variant="info"
                        >
                            Give {reptile.name} a snack!
                        </Button>
                        {
                            reptile.owner && user && reptile.owner._id === user._id 
                            ?
                            <>
                                <Button onClick={() => setEditModalShow(true)} 
                                    className="m-2" 
                                    variant="warning"
                                >
                                    Edit Reptile
                                </Button>
                                <Button onClick={() => removeTheReptile()}
                                    className="m-2"
                                    variant="danger"
                                >
                                    Set {reptile.name} Free
                                </Button>
                            </>
                            :
                            null
                        }
                    </Card.Footer>
                </Card>
            </Container>
            <Container style={cardContainerLayout}>
                {snackCards}
            </Container>
            <EditReptileModal 
                user={user}
                reptile={reptile} 
                show={editModalShow} 
                updateReptile={updateReptile}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setEditModalShow(false)} 
            />
            <NewSnackModal 
                reptile={reptile}
                show={snackModalShow}
                user={user}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setSnackModalShow(false)} 
            />
        </>
    )
}

export default ShowReptile
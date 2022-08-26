import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import EditSnackModal from './EditSnackModal'
import { deleteSnack } from '../../api/snacks'

const ShowSnack = (props) => {
    // destructure some props
    const { snack, reptile, user, msgAlert, triggerRefresh } = props

    // here's where we'll put a hook to open the edit snack modal when we get there
    const [editModalShow, setEditModalShow] = useState(false)

    // this will set a color depending on the snack's condition
    const setBgCondition = (cond) => {
        if (cond === 'new') {
            return({width: '18rem', backgroundColor:'#b5ead7'})
        } else if (cond === 'used') {
            return({width: '18rem', backgroundColor:'#ffdac1'})
        } else {
            return({width: '18rem', backgroundColor:'#ff9aa2'})
        }
    }

    // calls this to destroy a snack
    const destroySnack = () => {
        deleteSnack(user, reptile._id, snack._id)
            .then(() => 
                msgAlert({
                    heading: 'Snack Deleted',
                    message: 'Poof! The snack is gone!',
                    variant: 'success'
                }))
            .then(() => triggerRefresh())
            .catch(() => 
                msgAlert({
                    heading: 'Oh no!',
                    message: 'Something went wrong!',
                    variant: 'danger'
                }))
    }

    return (
        <>
            <Card className="m-2" style={setBgCondition(snack.condition)}>
                <Card.Header>{snack.name}</Card.Header>
                <Card.Body>
                    <small>{snack.description}</small><br/>
                    <small>
                        {snack.isSqueaky ? 'squeak squeak' : 'stoic silence'}
                    </small>
                </Card.Body>
                <Card.Footer>
                    <small>Condition: {snack.condition}</small><br/>
                    {
                        user && user._id === reptile.owner._id
                        ?
                        <>
                            <Button 
                                variant="warning"
                                onClick={() => setEditModalShow(true)}
                            >
                                Edit Snack
                            </Button>
                            <Button 
                                onClick={() => destroySnack()} 
                                variant="danger"
                            >
                                Delete snack
                            </Button>
                        </>
                        :
                        null
                    }
                </Card.Footer>
            </Card>
            <EditSnackModal
                user={user}
                reptile={reptile}
                snack={snack}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
            />
        </>
    )
}

export default ShowSnack
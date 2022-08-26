import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import SnackForm from '../shared/SnackForm'
import { createSnack } from '../../api/snacks'


const NewSnackModal = (props) => {
    const { 
        user, reptile, show, handleClose, msgAlert, triggerRefresh
    } = props

    const [snack, setSnack] = useState({})

    console.log('reptile in edit modal', reptile)

    const handleChange = (e) => {
        setSnack(prevSnack => {
            let value = e.target.value
            const name = e.target.name

            console.log('this is the input type', e.target.type)

            // this handles the checkbox, changing on to true etc
            if (name === "isSqueaky" && e.target.checked) {
                value = true
            } else if (name === "isSqueaky" && !e.target.checked) {
                value = false
            }

            const updatedSnack = {
                [name]: value
            }
            return {
                ...prevSnack,
                ...updatedSnack
            }
        })
    }

    const handleSubmit = (e) => {
        // e equals the event
        e.preventDefault()

        createSnack(user, reptile._id, snack)
            // if we're successful in the modal, we want the modal to close
            .then(() => handleClose())
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: 'Great! The reptile loves it!',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => 
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Something went wrong, please try again',
                    variant: 'danger'
                })
            )
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <SnackForm 
                    snack={snack}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Give the reptile a snack!"
                />
            </Modal.Body>
        </Modal>
    )
}

export default NewSnackModal
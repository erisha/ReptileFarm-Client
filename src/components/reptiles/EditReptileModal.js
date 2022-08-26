import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import ReptileForm from '../shared/ReptileForm'
import { updateReptileSuccess, updateReptileFailure } from '../shared/AutoDismissAlert/messages'

const EditReptileModal = (props) => {
    const { 
        user, show, handleClose, 
        updateReptile, msgAlert, triggerRefresh
    } = props

    const [reptile, setReptile] = useState(props.reptile)

    console.log('reptile in edit modal', reptile)

    const handleChange = (e) => {
        setReptile(prevReptile => {
            let updatedValue = e.target.value
            const updatedName = e.target.name

            console.log('this is the input type', e.target.type)

            if (e.target.type === 'number') {
                // this is looking at the input type, and changing it from the default, which is a string, into an actual number
                updatedValue = parseInt(e.target.value)
            }

            // this handles the checkbox, changing on to true etc
            if (updatedName === "adoptable" && e.target.checked) {
                updatedValue = true
            } else if (updatedName === "adoptable" && !e.target.checked) {
                updatedValue = false
            }

            const updatedReptile = {
                [updatedName]: updatedValue
            }
            return {
                ...prevReptile,
                ...updatedReptile
            }
        })
    }

    const handleSubmit = (e) => {
        // e equals the event
        e.preventDefault()

        updateReptile(user, reptile)
            // if we're successful in the modal, we want the modal to close
            .then(() => handleClose())
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: updateReptileSuccess,
                    variant: 'success'
                })
            })
            // if everything is successful, we need to trigger our refresh for the show page
            // this is that setUpdated function in showReptile component
            // updated is in ShowReptile's useEffect's dependency array
            // changes to the updated boolean cause ShowReptile's useEffect to run again.
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => 
                msgAlert({
                    heading: 'Oh No!',
                    message: updateReptileFailure,
                    variant: 'danger'
                })
            )
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <ReptileForm 
                    reptile={reptile}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Update Reptile"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditReptileModal
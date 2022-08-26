import { useState } from 'react'
import { createReptile } from '../../api/reptiles'
import { useNavigate } from 'react-router-dom'
import { createReptileSuccess, createReptileFailure } from '../shared/AutoDismissAlert/messages'
import ReptileForm from '../shared/ReptileForm'

const CreateReptile = (props) => {
    console.log('these are the props in createReptile', props)
    const { user, msgAlert } = props

    const navigate = useNavigate()

    const [reptile, setReptile] = useState({
        name: '',
        type: '',
        age: '',
        adoptable: false
    })

    console.log('this is reptile in createReptile', reptile)

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

    // We'll add a handleSubmit here that makes an api request, then handles the response
    const handleSubmit = (e) => {
        // e equals the event
        e.preventDefault()

        createReptile(user, reptile)
            // if we're successful, navigate to the show page for the new reptile
            .then(res => { navigate(`/reptiles/${res.data.reptile.id}`)})
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: createReptileSuccess,
                    variant: 'success'
                })
            })
            // if there is an error, tell the user about it
            .catch(() => 
                msgAlert({
                    heading: 'Oh No!',
                    message: createReptileFailure,
                    variant: 'danger'
                })
            )
    }

    return (
        <ReptileForm 
        reptile={ reptile } 
            handleChange={ handleChange }
            handleSubmit={ handleSubmit }
            heading="Add a new reptile!"
        />
    )
}

export default CreateReptile
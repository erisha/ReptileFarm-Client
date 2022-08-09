import apiUrl from '../apiConfig'
import axios from 'axios'

// READ => INDEX
export const getAllReptiles = () => {
    return axios(`${apiUrl}/reptiles`)
}

// READ => SHOW
export const getOneReptile = (id) => {
    return axios(`${apiUrl}/reptiles/${id}`)
}

// CREATE
export const createReptile = (user, newReptile) => {
    // console.log('createReptile in api was hit')
    
    // console.log('this is user', user)
    // console.log('this is newReptile', newReptile)
	return axios({
		url: apiUrl + '/reptiles',
		method: 'POST',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { reptile: newReptile }
	})
}

// UPDATE
export const updateReptile = (user, updatedReptile) => {
    // console.log('createReptile in api was hit')

    // console.log('this is user', user)
    console.log('this is updatedReptile', updatedReptile)
	return axios({
		url: `${apiUrl}/reptiles/${updatedReptile.id}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { reptile: updatedReptile }
	})
}

// DELETE
export const removeReptile = (user, reptileId) => {
    return axios({
        url: `${apiUrl}/reptiles/${reptileId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`,
        }
    })
}
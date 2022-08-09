import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE
export const createSnack = (user, reptileId, newSnack) => {
    console.log('the user in createSnack', user)
    console.log('the newSnack in createSnack', newSnack)
	return axios({
		url: `${apiUrl}/snacks/${reptileId}`,
		method: 'POST',
		data: { snack: newSnack }
	})
}

// UPDATE snack
export const updateSnack = (user, reptileId, updatedSnack) => {
    console.log('this is updatedSnack', updatedSnack)
	return axios({
		url: `${apiUrl}/snacks/${reptileId}/${updatedSnack._id}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { snack: updatedSnack }
	})
}

// DELETE snack
export const deleteSnack = (user, reptileId, snackId) => {
	return axios({
		url: `${apiUrl}/snacks/${reptileId}/${snackId}`,
		method: 'DELETE',
		headers: {
			Authorization: `Token token=${user.token}`,
		}
	})
}
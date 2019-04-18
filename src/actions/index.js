import axios from 'axios';
export const GET_CARDS = 'GET_CARDS';
export const ADD_CARD = 'ADD_CARD';
export const DELETE_CARD = 'DELETE_CARD';
export const EDIT_CARD = 'EDIT_CARD';

export const getCards = () => {
    return dispatch => {
        axios.get('/api/kanban')
            .then(response => {
                dispatch({ type: GET_CARDS, payload: response.data })
            })
            .catch(err => {
                dispatch({ type: 'DISPLAY_ERROR_NOTIF' })
            })
    }
}

export const addCard = (card) => {
    console.log('ACTION: addCard', card)
    return dispatch => {
        // axios.post('/kanban', card)
        const headers = { 'Content-Type': 'application/json' };
        return fetch('/api/kanban', { method: 'POST', body: JSON.stringify(card), headers })
            .then(response => {
                console.log('reponse', response.data)
                return dispatch({ type: ADD_CARD, payload: response.data })
            })
            .catch(err => {
                console.log('err in addCard')
            })
    }
}

export const deleteCard = (cardId) => {
    return (dispatch) => {
        return fetch(`/kanban/${cardId.id}`, { method: 'DELETE' })
            .then(response => { return response.json() })
            .then(() => {
                return dispatch({
                    type: DELETE_CARD,
                    payload: cardId
                })
            })
    }
}

export const editCard = (cardId) => {
    return (dispatch) => {
        return fetch(`kanban/${cardId.id}`, { method: 'POST' })
            .then(response => { return response.json() })
            .then((resCard) => {
                return dispatch({
                    type: EDIT_CARD,
                    payload: resCard
                })
            })
    }
}
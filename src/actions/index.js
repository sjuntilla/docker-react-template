import axios from 'axios';

export const GET_CARDS = 'GET_CARDS';
export const ADD_CARD = 'ADD_CARD';

export const getCards = () => {
    return dispatch => {
        axios.get('api/kanban')
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
        axios.post('/kanban', card)
            .then(response => {
                console.log('reponse', response.data)
                dispatch({ type: ADD_CARD, payload: response.data })
            })
            .catch(err => {
                console.log('err in addCard')
            })
    }
}
const ADD_CARD = 'ADD_CARD';
const GET_CARDS = 'GET_CARD'

const boardReducer = (state = [], action) => {
    console.log('reducer:', action);
    console.log('state:', state);
    switch (action.type) {
        case GET_CARDS:
            console.log('action.payload in GET_CARDS reducer', action.payload);
            return action.payload
        case ADD_CARD:
            return [...state, action.payload];
        default:
            return state
    }
}

export default boardReducer;
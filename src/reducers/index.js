const ADD_CARD = 'ADD_CARD';
const GET_CARDS = 'GET_CARD';
const DELETE_CARD = 'DELETE_CARD';
const EDIT_CARD = 'EDIT_CARD';

let initState = {
    cards: []
}
const boardReducer = (state = initState, action) => {
    console.log('reducer:', action);
    console.log('state:', state);
    switch (action.type) {
        case GET_CARDS:
            console.log('action.payload in GET_CARDS reducer', action.payload);
            return action.payload
        case ADD_CARD:
            console.log('added state', state);
            return [...state, action.payload];
        case DELETE_CARD:
            let deleted = state.cards.filter((card) => {
                return card.id !== action.payload.id;
            })
            console.log('deleted', state)
            return Object.assign({}, state, { cards: deleted })
        default:
            return state
    }
}

export default boardReducer;
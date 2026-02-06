import { CREATE_maincategory_RED, DELETE_maincategory_RED, GET_maincategory_RED, UPDATE_maincategory_RED } from "../Constants"
export default function maincategoryReducer(state = [], action) {
    switch (action.type) {
        case CREATE_maincategory_RED:
            return [...state, action.payload]

        case GET_maincategory_RED:
            return action.payload

        case UPDATE_maincategory_RED:
            let index = state.findIndex(x => x.id === action.payload.id)
            state[index].name = action.payload.name
            state[index].pic = action.payload.pic
            state[index].active = action.payload.active
            return state


        case DELETE_maincategory_RED:
            return state.filter(x => x.id !== action.id)

        default:
            return state

    }

}

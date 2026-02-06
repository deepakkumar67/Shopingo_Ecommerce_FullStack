import { CREATE_SETTING_RED, DELETE_SETTING_RED, GET_SETTING_RED, UPDATE_SETTING_RED } from "../Constants"
export default function SettingReducer(state = [], action) {
    switch (action.type) {
        case CREATE_SETTING_RED:
            return [...state, action.payload]

        case GET_SETTING_RED:
            return action.payload

        case UPDATE_SETTING_RED:
            let index = state.findIndex(x => x.id === action.payload.id)
            state[index].map1 = action.payload.map1
            state[index].map2 = action.payload.map2
            state[index].address = action.payload.address
            state[index].siteName = action.payload.siteName
            state[index].email = action.payload.email
            state[index].phone = action.payload.phone
            state[index].whatsapp = action.payload.whatsapp
            state[index].facebook = action.payload.facebook
            state[index].twitter = action.payload.twitter
            state[index].youtube = action.payload.youtube
            state[index].instagram = action.payload.instagram
            state[index].linkedin = action.payload.linkedin
            return state


        case DELETE_SETTING_RED:
            return state.filter(x => x.id !== action.id)

        default:
            return state

    }

}

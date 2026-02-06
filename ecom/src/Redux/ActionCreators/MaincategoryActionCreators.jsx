import { CREATE_maincategory, DELETE_maincategory, GET_maincategory, UPDATE_maincategory } from "../Constants"
export function createmaincategory(data) {
    return {
        type: CREATE_maincategory,
        payload: data
    }
}
export function getmaincategory() {
    return {
        type: GET_maincategory,
    }
}
export function updatemaincategory(data) {
    return {
        type: UPDATE_maincategory,
        payload: data
    }
}
export function deletemaincategory(data) {
    return {
        type: DELETE_maincategory,
        payload: data
    }
}
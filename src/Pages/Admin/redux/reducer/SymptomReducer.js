import {
    GET_SYMPTOM,
} from "../constants";
const initialState = {
    arrSymptom: [],
};
export const SymptomReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SYMPTOM:
            return { ...state, arrSymptom: action.arrSymptom };
        default:
            return state;
    }
};
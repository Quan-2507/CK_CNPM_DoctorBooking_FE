import { GET_APPOINTMENTS } from "../constants";

const initialState = {
    arrAppointments: [],
};

export const AppointmentReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_APPOINTMENTS:
            return { ...state, arrAppointments: action.payload };
        default:
            return state;
    }
};

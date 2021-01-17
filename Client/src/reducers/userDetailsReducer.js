//STATE MANAGEMENT : STORE

//data : state to store and update user details
export const UserDetailsState = null;

//reducer to perform actions on the data(initial state)
export function UserDetailsReducer(state,action) {
    //switch the function/action to perform on data
    switch(action.type){
        case "SET_USER_DETAILS":
            //return the payload as the new state to the provider value
            return action.payload
        case "DEL_USER_DETAILS":
            localStorage.removeItem("user");
            return null;
        default:
            return state
    }
}

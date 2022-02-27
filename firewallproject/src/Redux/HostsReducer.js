const defaultState = {

    HostsList: null
}

const HostsReducer = ( state = defaultState, action) => {
    switch (action.type) {
        case "SET-HOSTS":
            return({
                ...state,
                HostsList: action.hosts

            })

        case "SET-ALLOW":

            return({
                ...state,
                HostsList: [...state.HostsList].map( el => {
                    if (el.ip == action.ip){
                        el.allowed = action.allowed
                        return el
                    }
                    else{
                        return el
                    }
                })
            })
    
        default:
            return state;
    }
}

export default HostsReducer;
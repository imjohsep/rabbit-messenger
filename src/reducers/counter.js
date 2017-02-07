import * as data from 'data/counter'

const initState = {
    count: 0
}

export default (state = initState, action) => {
    switch (action.type) {
        case data.TYPE_INCREASE:
            return { ...state, count: state.count + 1 }
    }
    return state
}

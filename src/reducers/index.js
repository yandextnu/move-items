import consts from '../utils/const'

const initialState = {
    _isDataLoaded: false
}

const moveItems = (payload, state) => {
    const { ids, from, to } = payload
    const { [from]: dataFrom, [to]: dataTo } = state
    return {
        ...state,
        [from]:     [ ...dataFrom.filter(el => !ids.includes(el.id)) ],
        [to]:       [ ...dataTo, ...dataFrom.filter(el => ids.includes(el.id)) ]
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case consts.data_loaded:
            return {
                ...Object.keys(action.payload).reduce((obj, key) => { obj[key] = action.payload[key] instanceof Array ? action.payload[key] : []; return obj}, {}),
                _isDataLoaded: true
            }
        case consts.move_items:
            return moveItems(action.payload, state)
        default :
            return state
    }
}

export default reducer
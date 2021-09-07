const initialState = {
    _isDataLoaded: false
}

const moveItems = (payload, state) => {
    const { ids, from, to } = payload
    const { [from]: dataFrom, [to]: dataTo } = state
    return {
        ...state,
        [from]:     [ ...(dataFrom.map(el => { if(!ids.includes(el.id)) return el } )).filter(el => el) ],
        [to]:       [...dataTo, ...(dataFrom.map(el => { if(ids.includes(el.id)) return el } )).filter(el => el) ]
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'DATA_LOADED':
            return {
                ...Object.keys(action.payload).reduce((obj, key) => { obj[key] = action.payload[key] instanceof Array ? action.payload[key] : []; return obj}, {}),
                _isDataLoaded: true
            }
        case 'MOVE_ITEMS':
            return moveItems(action.payload, state)
        default :
            return state
    }
}

export default reducer
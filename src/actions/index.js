const _dataLoaded = (payload) => ({
    type: 'DATA_LOADED',
    payload
})

const _moveItems = (payload) => ({
    type: 'MOVE_ITEMS',
    payload
})

export {
    _dataLoaded,
    _moveItems
}
import consts from '../utils/const'

const _dataLoaded = payload => ({
    type: consts.data_loaded,
    payload
})

const _moveItems = payload => ({
    type: consts.move_items,
    payload
})

export {
    _dataLoaded,
    _moveItems
}
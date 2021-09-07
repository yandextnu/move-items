import React, { Component }     from 'react'
import { connect }              from 'react-redux';
import { _moveItems }           from '../../actions';
import Row                      from '../row'
import ButtonsView              from '../buttons-view'
import                          './panel.css'

class Panel extends Component {

    state = {
        unique: null,
        selected: []
    }

    getUniqeKey = () => (`${Math.floor(Math.random() * 1000)}${Math.floor(Math.random() * 1000)}`)

    componentDidMount() {
        this.setState( ({ unique }) => ( { unique: unique ?? this.getUniqeKey() } ) )
    }

    onCheckItem = id => {
        console.log(id)
        this.setState(({ selected }) => {

            if(id === -1) {
                const itemsIds = this.getItems().map(el => el.id)
                return {
                    selected: selected.length === itemsIds.length ? [] : itemsIds
                }
            }
            else {
                const idx = selected.findIndex(el => el === id)
                return {
                    selected: idx === -1 ? [...selected, id] : [...selected.slice(0, idx), ...selected.slice(idx + 1)]
                }
            }
        })
    }
    onButtonClick = data => {
        const { onMoveItems }   = this.props
        const { ids }           = data
        const { selected }      = this.state
        if(selected.includes(ids[0])) this.onCheckItem(ids[0])
        onMoveItems(data)
    }
    onHeaderButtonClick = data => {
        const { onMoveItems } = this.props
        onMoveItems(data)
        this.setState({ selected: [] })
    }
    getItems() {
        const { panelData: { items } } = this.props
        return items
    }

    render() {
        const { panelData: { source, routes, items } }  = this.props
        const { unique, selected }                      = this.state
        const indeterminate                             = selected.length < items.length && selected.length > 0

        return (
            <div className="page container panel">
                <div className="d-flex panel-header align-items-center me-3">
                    <div className="align-items-center form-check panel-control w-100">
                        <input className="form-check-input"
                                type="checkbox"
                                id={ `selectAll${source}_${unique}` }
                                onChange={ ({ target }) => this.onCheckItem(-1) }
                                ref={ ch => ch ? ch.indeterminate = indeterminate : null }
                                checked={ items.length === selected.length && items.length > 0 }
                                />
                        <label className="form-check-label"
                                htmlFor={ `selectAll${source}_${unique}` } >
                                <h4>{ source } page</h4>
                                </label>
                    </div>
                    <div className="d-flex justify-content-end panel-actions">
                        <div>
                            <ButtonsView data={{
                                onButtonClick: this.onHeaderButtonClick,
                                ids: selected,
                                source,
                                routes
                            }} />
                        </div>
                    </div>
                </div>
                <ul className="list-group list-group-numbered">
                    { items.map(item => (
                                <Row key={ item.id }
                                    item={ item }
                                    unique={ unique }
                                    source={ source }
                                    checked={ selected.includes(item.id) }
                                    onCheckItem={ this.onCheckItem } >
                                        <ButtonsView data={{
                                            onButtonClick: this.onButtonClick,
                                            ids: [ item.id ],
                                            source,
                                            routes
                                        }} />
                                </Row>
                                )) }
                </ul>
            </div>
        )
    }
}
   
const mapDispatchToProps = dispatch => ({
    onMoveItems: data => dispatch(_moveItems(data))
})

export default connect(() => ({}), mapDispatchToProps)(Panel)
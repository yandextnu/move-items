import React, { Component }                                     from 'react'
import Spinner                                                  from '../spinner'
import Panel                                                    from '../panel'
import { BrowserRouter as Router, Route, Switch, Redirect }     from 'react-router-dom'
import Tabs                                                     from '../tabs'
import Button                                                   from '../button'
import                                                          './app.css'

export default class App extends Component {

    state = {}

    componentDidMount(){
        const data = this.getData();
        this.setState({ ...Object.keys(data).reduce((obj, key) => { obj[key] = data[key] instanceof Array ? data[key] : []; return obj}, {}), _isDataLoaded: true})
    }

    getData() {
        return {
            left: [
                {id: 0, label: 'Left 0'},
                {id: 1, label: 'Left 1'},
                {id: 2, label: 'Left 2'},
            ],
            middle: [
                {id: 3, label: 'Middle 0'},
                {id: 4, label: 'Middle 1'},
                {id: 5, label: 'Middle 2'},
            ],
            right: [
                {id: 6, label: 'Right 0'},
                {id: 7, label: 'Right 1'},
                {id: 8, label: 'Right 2'},
            ]
        }
    }

    onMove(id, from, to) {
        this.setState(({ [from]: dataFrom, [to]: dataTo }) => {
            const itemIdx           = dataFrom.findIndex(el => el.id === id)
            return {
                [from]: [...dataFrom.slice(0, itemIdx), ...dataFrom.slice(itemIdx + 1)],
                [to]:   [...dataTo, { ...dataFrom[itemIdx] }]
            }
        })
    }
    getDataKeys = () => Object.keys(this.state).filter(key => key.indexOf('_') !== 0)
    getKeySiblings = (key) => {
        const   dataKeys                = this.getDataKeys(),
                idx                     = dataKeys.findIndex(k => k === key)
        return  { left: dataKeys[idx - 1], right: dataKeys[idx + 1] }
    }
    getPanelData = (source) => {
        const siblings                  = this.getKeySiblings(source)
        return {    source,
                    data:               this.state[source],
                    btnLeft:            siblings.left   ? this.drawButton(source, siblings.left)    : undefined,
                    btnRight:           siblings.right  ? this.drawButton(source, siblings.right)   : undefined
                }
    }

    drawButton = (from, to) => (id, label) => <Button label={ label }  fn={ () => this.onMove(id, from, to) }/>

    render () {
        const { _isDataLoaded = false }     = this.state
        if(!_isDataLoaded)                  return <Spinner />
        const dataKeys                      = this.getDataKeys()
        const panels                        = dataKeys.map(source => <Panel panelData={ this.getPanelData(source) }/>)

        return (
            <div className="container">
                <h1 className="header">Move it! Move it!</h1>
                <div className="d-flex m-xl-2">
                    { panels }
                </div>
                <div className="m-xl-2">
                    <Router>
                        <Tabs keys={ dataKeys }/>
                        <div className="tab-content" id="nav-tabContent">
                            <Switch>
                                <Route path="/:source" render={({ match: { params: { source } } }) => <Panel panelData={ this.getPanelData(source) }/> } />
                                <Redirect to={`/${dataKeys[0]}`} />
                            </Switch>
                        </div>
                    </Router>
                </div>
            </div>
        )
    }
}
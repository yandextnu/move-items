import React, { Component }             from 'react'
import { Route, Switch, Redirect }      from 'react-router-dom'
import { connect }                      from 'react-redux'
import { withDataService }              from '../hoc'
import { _dataLoaded }                  from '../../actions'
import Spinner                          from '../spinner'
import Panel                            from '../panel'
import Tabs                             from '../tabs'
import                                  './app.css'

class App extends Component {

    componentDidMount() {
        const { _dataLoaded, _dataService } = this.props
        _dataService.getData().then(_dataLoaded)
    }

    getDataKeys = () => Object.keys(this.props).filter(key => key[0] !== '_')

    getKeySiblings = key => {
        const   dataKeys    = this.getDataKeys(),
                idx         = dataKeys.findIndex(k => k === key)
        return  {
                    left:   dataKeys[idx - 1],
                    right:  dataKeys[idx + 1]
                }
    }
    getPanelData = source => ({
                                source,
                                items:              this.props[source],
                                routes:             this.getKeySiblings(source)
                            })

    render () {
        const { _isDataLoaded = false }     = this.props
        if(!_isDataLoaded)                  return <Spinner />
        const dataKeys                      = this.getDataKeys()
        const panels                        = dataKeys.map(source => <Panel key={ source } panelData={ this.getPanelData(source) }/>)

        return (
            <div className="container">
                <h1 className="header">Move it! Move it!</h1>
                <div className="d-flex m-xl-2">
                    { panels }
                </div>
                <div className="m-xl-2">
                    <Tabs keys={ dataKeys }/>
                    <div className="tab-content" id="nav-tabContent">
                        <Switch>
                            <Route path="/:source" render={({ match: { params: { source } } }) => <Panel panelData={ this.getPanelData(source) }/> } />
                            <Redirect to={`/${dataKeys[0]}`} />
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {...state}
  };

const mapDispatchToProps = {
    _dataLoaded
};

export default withDataService(connect(mapStateToProps, mapDispatchToProps)(App))
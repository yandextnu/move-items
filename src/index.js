import { Provider }                 from 'react-redux'
import React                        from 'react'
import ReactDOM                     from 'react-dom'
import { BrowserRouter as Router }  from 'react-router-dom'
import store                        from './store'
import App                          from './components/app'
import { DataServiceProvider }      from './components/data-service-context'
import DataService                  from './services/data-service'

const dataService = new DataService()

ReactDOM.render(
    <Provider store={ store }>
        <DataServiceProvider value={ dataService }>
            <Router>
                <App />
            </Router>
        </DataServiceProvider>
    </Provider>,
    document.getElementById('root') );


    /*
    <Provider store={ store }>
        <DataServiceProvider value={ dataService }>
            <Router>
                <App />
            </Router>
        </DataServiceProvider>
    </Provider>,
    */
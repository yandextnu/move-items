import React                    from 'react'
import { DataServiceConsumer }  from '../data-service-context'

const withDataService = Wrapped => {

  return (props) => {
    return (
        <DataServiceConsumer>
            { dataService => {
                return (<Wrapped {...props}
                            _dataService={ dataService }/>)
            }}
        </DataServiceConsumer>
    )
  }
}

export default withDataService

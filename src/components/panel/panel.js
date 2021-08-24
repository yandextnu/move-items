import React    from 'react'
import Row      from '../row'
import          './panel.css'

const Panel = ({ panelData }) => {
    const { source, data, ...funcs } = panelData
    return (
        <div className="page container">
            <h4>{ source } page</h4>
            <ul className="list-group list-group-numbered" key={ source }>
                { data.map(item => (
                            <Row key={ item.id }
                                item={ item }
                                { ...funcs } />
                            )) }
            </ul>
        </div>
    )
}

export default Panel
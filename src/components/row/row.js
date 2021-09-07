import React    from 'react'
import          './row.css'

const Row = (props) => {
    const { item: { id, label }, unique, source, checked, onCheckItem } = props
    return (
        <li key={ id }
            className="list-group-item d-flex align-items-center" >
            <span
                className="d-flex justify-content-between align-items-center w-100 ps-2">
                <div className="form-check panel-control">
                    <input className="form-check-input"
                            type="checkbox"
                            id={ `select${source}_${id}_${unique}` }
                            itemkey={ id }
                            onChange={ e => { onCheckItem(e.target.getAttribute("itemkey")*1) } }
                            checked={ checked } />
                    <label className="form-check-label"
                            htmlFor={ `select${source}_${id}_${unique}` } >
                            { label }</label>
                </div>
                <span>
                    { props.children }
                </span>
            </span>
        </li>
    )
}

export default Row

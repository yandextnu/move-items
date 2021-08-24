import React    from 'react'
import          './row.css'

const Row = (props) => {
    const { item: { id, label }, btnLeft, btnRight  } = props
    return (
        <li key={ id }
            className="list-group-item d-flex align-items-center" >
            <span
                className="d-flex justify-content-between align-items-center w-100 ps-2">
                { label }
                <span>
                    { btnLeft(id, "left") }
                    { btnRight(id, "right") }
                </span>
            </span>
        </li>
    )
}

Row.defaultProps = {
   btnLeft: (id, label) => {},
   btnRight: (id, label) => {}
}

export default Row

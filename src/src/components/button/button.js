import React    from 'react'
import          './button.css'

const Button = ({ label, fn }) => {
    return ( <button className="btn btn-primary btn-sm m-xl-1"
                    onClick={ fn }>
                Move {label}
            </button> )
}

export default Button
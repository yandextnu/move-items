import React    from 'react'
import          './buttons-view.css'

const Button = ({ label, fn }) => {
    return ( <button className="btn btn-primary btn-sm m-xl-1"
                    onClick={ fn }>
                Move {label}
            </button> )
}

const ButtonsView = ({ data: { onButtonClick, ids, source, routes } }) => {
    if(!routes || routes.length === 0) return null
    return (<React.Fragment>
                { Object.keys(routes).map(key => (routes[key]
                                                    ? <Button key={ `${source}${key}` } label={ key }
                                                                fn={ () => onButtonClick({ids, from: source, to: routes[key]}) }
                                                        />
                                                    : null)) }
            </React.Fragment>)
}
export default ButtonsView
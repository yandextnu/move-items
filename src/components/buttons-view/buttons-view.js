import React    from 'react'
import          './buttons-view.css'

const clickLeftDefault = () => {}
const clickRightDefault = () => {}

const ButtonsView = ({ onClickLeft, onClickRight }) => {
    return (<React.Fragment>
                { onClickLeft !== clickLeftDefault ? ( <button className="btn btn-primary btn-sm m-xl-1"
                                                                onClick={ onClickLeft }>
                                                                Move left
                                                            </button> )
                                                        : null }
                { onClickRight !== clickRightDefault ? ( <button className="btn btn-primary btn-sm m-xl-1"
                                                            onClick={ onClickRight }>
                                                            Move right
                                                        </button> )
                                                    : null }
            </React.Fragment>)
}

ButtonsView.defaultProps = {
    onClickLeft: clickLeftDefault,
    onClickRight: clickRightDefault
}

export default ButtonsView
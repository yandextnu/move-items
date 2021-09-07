import React                    from 'react'
import { Link, withRouter }     from 'react-router-dom'
import                          './tabs.css'

const Tabs = ({ keys, location }) => {
    const { pathname } = location
    const tabItems = keys.map(key => (
                            <li className="nav-item"
                                key={ `tab-key-${key}` } >
                                <Link
                                    className={ `nav-link ${ pathname.replace('/', '') === key ? ' active' : '' }` }
                                    to={`/${key}`}>
                                    { key }
                                </Link>
                            </li>
                        ))
    return ( <ul className="nav nav-tabs">
                { tabItems }
            </ul> )
}

export default withRouter(Tabs)
import React from 'react'
import PropTypes from 'prop-types'

function SidebarItem(props) {
    return (
        <>
            <li className="nav-item">
				<a className={`nav-link ${props.type}`} href={props.link}>
					<i className={`fas fa-fw fa-${props.icon}`}></i>
                    <span>{props.name}</span>
				</a>
			</li>
        </>
    )
}

SidebarItem.defaultProps = {
    link: '#',
    icon: 'plus',
    name: 'Others',
    type: ''
}
  
SidebarItem.propTypes = {
    name: PropTypes.string
}

export default SidebarItem
import React from 'react'
import SidebarItem from './SidebarItem'

function Sidebar() {
    return (
        <div>
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

                <a className="sidebar-brand d-flex align-items-center justify-content-start" href="/">
                    <div className="sidebar-brand-icon">
                        <i className="fas fa-chart-line"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">Admin</div>
                </a>

                <hr className="sidebar-divider my-0" />

                <li className="nav-item active">
                    <a className="nav-link" href="#wrapper">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                    </a>
                </li>

                {/* <!-- Divider --> */}
                <hr className="sidebar-divider" />

                {/* <!-- Heading --> */}
                <div className="sidebar-heading">Actions</div>

                {/* <!--Sidebar Item - Charts --> */}
                <SidebarItem icon="chart-area" name="Statistics" link="#content-row" />

                {/* <!--Sidebar Item - Last product --> */}
                <SidebarItem icon="history" name="Last product" type="collapsed" link="#last-product" />
                
                {/* <!--Sidebar Item - Categories --> */}
                <SidebarItem icon="clipboard-list" name="Categories" type="collapsed" link="#categories" />

                {/* <!--Sidebar Item - Tables --> */}
                <SidebarItem icon="table" name="Products" link="#table" />

                {/* <!--Sidebar Item --> */}
                <SidebarItem />

                {/* <!-- Divider --> */}
                <hr className="sidebar-divider d-none d-md-block" />
            </ul>
        </div>
    )
}

export default Sidebar
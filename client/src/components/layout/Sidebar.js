import React, { Component } from 'react'
import logo from './../images/logo.png';
import { Link } from "react-router-dom";
class Sidebar extends Component {
    render() {
        return (
            <>
                <aside className="main-sidebar sidebar-dark-primary elevation-4" style={{ backgroundColor: "#111111" }}>
                    {/* Brand Logo */}
                    <a href="index3.html" className="brand-link">
                        <img src={logo} alt="AdminLTE Logo" className="brand-image" style={{ opacity: '.8' }} />
                        <span className="brand-text font-weight-light">Intranet</span>
                    </a>
                    {/* Sidebar */}
                    <div className="sidebar">
                        {/* Sidebar user panel (optional) */}
                        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                            <div className="image">
                                <img src={`/assets/dist/img/user2-160x160.jpg`} className="img-circle elevation-2" alt="userImage" />
                            </div>
                            <div className="info">
                                <a href="#/" className="d-block">Parvesh Mishra</a>
                                <small>ADMIN</small>
                            </div>
                        </div>
                        {/* SidebarSearch Form */}

                        {/* Sidebar Menu */}
                        <nav className="mt-2">
                            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                                {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
                                <li className="nav-item menu-open">
                                    <a href="#/" className="nav-link active">
                                        <i className="nav-icon fas fa-tachometer-alt" />
                                        <p>
                                            Dashboard

                                        </p>
                                    </a>

                                </li>
                                <li className="nav-item">
                                    <a href="#/" className="nav-link">
                                        <i className="nav-icon fas fa-chart-pie" />
                                        <p>
                                            Masters
                                            <i className="right fas fa-angle-left" />
                                        </p>
                                    </a>
                                    <ul className="nav nav-treeview">

                                        <li className="nav-item">
                                            <Link
                                                to="/admin/centre-name"
                                                className="nav-link"
                                            >
                                                <i className="far fa-circle nav-icon" /> Centre Name
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link
                                                to="/admin/funding-agency"
                                                className="nav-link"
                                            >
                                                <i className="far fa-circle nav-icon" /> Funding Agency
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link
                                                to="/admin/project-detail"
                                                className="nav-link"
                                            >
                                                <i className="far fa-circle nav-icon" /> Project Detail
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link
                                                to="/admin/team-leader"
                                                className="nav-link"
                                            >
                                                <i className="nav-icon far fa-image" /> Team Leader
                                            </Link>
                                        </li>

                                    </ul>
                                </li>
                                <li class="nav-item">
                                    <Link to="/admin/project-plan" class="nav-link">
                                    <i className="nav-icon far fa-image" />
                                        <p>
                                            Add Project 
                                        </p>
                                    </Link>
                                </li>
                                <li class="nav-item">
                                    <Link to="/admin/project-plan-list" class="nav-link">
                                    <i className="nav-icon far fa-image" />
                                        <p>
                                            Project Plan List
                                        </p>
                                    </Link>
                                </li>
                                {/* <li className="nav-item">
                                    <a href="#/" className="nav-link">
                                        <i className="nav-icon fas fa-copy" />
                                        <p>
                                            Layout Options
                                            <i className="fas fa-angle-left right" />
                                            <span className="badge badge-info right">6</span>
                                        </p>
                                    </a>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <a href="pages/layout/top-nav.html" className="nav-link">
                                                <i className="far fa-circle nav-icon" />
                                                <p>Top Navigation</p>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="pages/layout/top-nav-sidebar.html" className="nav-link">
                                                <i className="far fa-circle nav-icon" />
                                                <p>Top Navigation + Sidebar</p>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="pages/layout/boxed.html" className="nav-link">
                                                <i className="far fa-circle nav-icon" />
                                                <p>Boxed</p>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="pages/layout/fixed-sidebar.html" className="nav-link">
                                                <i className="far fa-circle nav-icon" />
                                                <p>Fixed Sidebar</p>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="pages/layout/fixed-sidebar-custom.html" className="nav-link">
                                                <i className="far fa-circle nav-icon" />
                                                <p>Fixed Sidebar <small>+ Custom Area</small></p>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="pages/layout/fixed-topnav.html" className="nav-link">
                                                <i className="far fa-circle nav-icon" />
                                                <p>Fixed Navbar</p>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="pages/layout/fixed-footer.html" className="nav-link">
                                                <i className="far fa-circle nav-icon" />
                                                <p>Fixed Footer</p>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="pages/layout/collapsed-sidebar.html" className="nav-link">
                                                <i className="far fa-circle nav-icon" />
                                                <p>Collapsed Sidebar</p>
                                            </a>
                                        </li>
                                    </ul>
                                </li> */}
                            </ul>
                        </nav>
                        {/* /.sidebar-menu */}
                    </div>
                    {/* /.sidebar */}
                </aside>

            </>
        )
    }
}

export default Sidebar
import React, { Component } from 'react'
import logo from './../images/logo.png';
import { Link } from "react-router-dom";
class Sidebar extends Component {
    render() {
        return (
            <>
                <aside className="main-sidebar sidebar-dark-primary elevation-4" style={{ backgroundColor: "#111111" }}>
                    {/* Brand Logo */}
                   
                    
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <img src={logo} alt="AdminLTE Logo" className="brand-image" style={{ opacity: '.8', width:"130px", marginLeft:"20px" }} />
                        </div>
                    {/* Sidebar */}
                    <div className="sidebar">
                        {/* Sidebar user panel (optional) */}
                        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                            <div className="image">
                                <img src={`/assets/dist/img/user2-160x160.jpg`} className="img-circle elevation-2" alt="userImage" />
                            </div>
                            <div className="info">
                                <a href="#/" className="d-block">Hitesh Vaidya</a>
                                <small className='text-white'>Super Admin</small>
                            </div>
                        </div>
                        {/* SidebarSearch Form */}

                        {/* Sidebar Menu */}
                        <nav className="mt-2">
                            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                                {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
                                <li className="nav-item menu-open">
                                    <Link to="/" className="nav-link active">
                                        <i className="nav-icon fas fa-tachometer-alt" />
                                        <p>
                                            Dashboard
                                        </p>
                                    </Link>


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
                                                to="/admin/centre"
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
                                <li className="nav-item">
                                    <Link to="/admin/project-plan" className="nav-link">
                                        <i className="nav-icon far fa-image" />
                                        <p>
                                            Add Project
                                        </p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/admin/project-plan-list" className="nav-link">
                                        <i className="nav-icon far fa-image" />
                                        <p>
                                            Project Plan List
                                        </p>
                                    </Link>
                                </li>
                                
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
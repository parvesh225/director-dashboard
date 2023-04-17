import React, { Component } from 'react'
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import { Link } from "react-router-dom";
const axios = require("axios").default;

class ProjectList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectList: []
        };

    }

    componentDidMount() {
        axios.get(process.env.REACT_APP_BASE_URL + "/api/admin/project-plan-list")
            .then(response => {
                this.setState({
                    projectList: response.data
                });
            })
    }



    render() {
        const { projectList = [] } = this.state;
        return (
            <>
                <Header />
                <Sidebar />
                <div className="content-wrapper">
                    {/* Content Header (Page header) */}
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row">

                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h3 className="card-title">Project Plan List</h3>
                                        </div>
                                        <div className="card-body">
                                            <table className="table table-bordered">
                                                <thead>

                                                    <tr>
                                                        <th style={{ width: 10 }}>S.no</th>
                                                        <th>Centre Name</th>
                                                        <th>Project Name</th>
                                                        <th>Project Head </th>
                                                        <th>Funding Agency </th>
                                                        <th style={{ width: 100 }}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {projectList.length ?
                                                        projectList.map((project, idx) => (
                                                            <tr>
                                                                <td>{idx + 1}</td>
                                                                <td>{project.centre_name}</td>
                                                                <td>{project.project_name}</td>
                                                                <td>{project.project_head}</td>
                                                                <td>{project.funding_agency}</td>
                                                                <td>
                                                                   
                                                                    <Link to="/admin/project-plan-edit/23" class="nav-link">
                                                                        <i class="fa fa-trash text-danger mr-2" aria-hidden="true" ></i>
                                                                    </Link>
                                                                    <Link to={`/admin/project-plan-edit/${project.id}`} class="nav-link">
                                                                    <i class="fa fa-pencil-square-o text-primary" aria-hidden="true" ></i>
                                                                    </Link>
                                                                    
                                                                </td>
                                                            </tr>
                                                        ))
                                                        :
                                                        (<tr>
                                                            <td>-</td>
                                                            <td>-</td>
                                                            <td>-</td>
                                                            <td>-</td>
                                                            <td>-</td>
                                                            <td>-</td>

                                                        </tr>)
                                                    }
                                                </tbody>
                                            </table>
                                        </div>

                                    </div>

                                </div>

                            </div>

                            {/* ------ */}
                            {/* /.row */}
                        </div>
                        {/* /.container-fluid */}
                    </div>

                </div>
                <aside className="control-sidebar control-sidebar-dark">
                    {/* Control sidebar content goes here */}
                </aside>

                <Footer />
            </>
        );
    }
}

export default ProjectList
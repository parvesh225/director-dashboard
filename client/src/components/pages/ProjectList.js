import React, { Component } from 'react'
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import { Link } from "react-router-dom";
import  './ProjectPlan2.css';
const axios = require("axios").default;

class ProjectList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectList: [],
            centre: [],
            project: [],
            project_head: [],
            funding_agency: []
        };

    }

    componentDidMount() {
        axios.get(process.env.REACT_APP_BASE_URL + "/api/admin/project-plan-list")
            .then(response => {
                this.setState({
                    projectList: response.data.data,
                    centre: response.data.centres,
                    project: response.data.projects,
                    project_head: response.data.teams,
                    funding_agency: response.data.agencys
                });
            })
    }



    render() {
        const { projectList = [] } = this.state;

        let centre = this.state.centre.map(function (center, index) {

            return <option key={center.id} value={center.centre_code} >{center.centre_name}</option>;
        })
        let projects = this.state.project.map(function (project, index) {
            return <option key={project.id} value={project.project_code}> {project.project_name} </option>;

        })

        let team = this.state.project_head.map(function (team, index) {
            return <option key={team.id} value={team.employee_code}> {team.employee_name} </option>
        })

        let agency = this.state.funding_agency.map(function (agency, index) {
            return <option key={agency.id} value={agency.funding_agency_code}>  {agency.funding_agency_name} </option>
        })
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
                                        <div className="card-body mystyle">
                                        <div class="hack1">
                                            <div class="hack2 scroll">
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
                                                                <td>
                                                                    <select
                                                                        class="form-control"
                                                                        value={project.centre_name}
                                                                        readOnly
                                                                    >
                                                                        <option> select </option>
                                                                        {centre}
                                                                    </select>
                                                                </td>
                                                                <td>
                                                                    <select
                                                                        class="form-control"
                                                                        value={project.project_name}
                                                                        readOnly
                                                                    >
                                                                        <option> select </option>
                                                                        {projects}
                                                                    </select>
                                                                </td>

                                                                <td>
                                                                    <select
                                                                        class="form-control "
                                                                        value={project.project_head}
                                                                        readOnly
                                                                    >
                                                                        <option> select </option>
                                                                        {team}
                                                                    </select>
                                                                </td>
                                                                <td>
                                                                    <select
                                                                        class="form-control "
                                                                        value={project.funding_agency}
                                                                        readOnly
                                                                    >
                                                                        <option> select </option>
                                                                        {agency}
                                                                    </select>
                                                                </td>
                                                                
                                                                <td>

                                                                    <Link to="/admin/project-plan-edit/23" >
                                                                        <i class="fa fa-trash text-danger mr-2" aria-hidden="true" ></i>
                                                                    </Link>
                                                                    <Link to={`/admin/project-plan-edit/${project.id}`} >
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
import React, { Component } from 'react'
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
const axios = require("axios").default;

class ProjectDetail extends Component {
 constructor(props) {
        super(props);
        this.state = {
            Project: {
                project_code: "",
                project_name: "",short_name :"",
            },
            resStatus: {
                isError: false,
                messages: "",
            },
            projectList: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }
    handleChange(e) {
        let project = this.state.Project;
        project[e.target.name] = e.target.value;
        this.setState({ Project: project });
    }

    componentDidMount() {
        axios.get(process.env.REACT_APP_BASE_URL + "/api/admin/project")
            .then(response => {
                this.setState({
                    projectList: response.data
                });
            })
    }

    //Submit Form
    submitForm() {

        var thizz = this;
        // Send login request
        axios({
            method: "post",
            url: process.env.REACT_APP_BASE_URL + "/api/admin/project",
            data: thizz.state.Project,

        }).then(function (response) {
            var data = response.data
            if (data.status === true && data) {
                var resStatus = thizz.state.resStatus;
                resStatus.isError = true;
                resStatus.messages = data.message;
                thizz.setState({ resStatus: resStatus });

                // New table row insert
                thizz.setState({
                    projectList: [...thizz.state.projectList, data.row]
                })

                var project = thizz.state.Project
                project = {
                    project_code :'',
                    project_name :''
                }
                thizz.setState({
                    Project:project
                })

            }

        }).catch(function (error) {
            console.log(error.response.data.status);
            var data = error.response.data;
            if (error.response.data.status === false) {
                var resStatus = thizz.state.resStatus;
                resStatus.messages = data.message;
                thizz.setState({ resStatus: resStatus });
            }
        });
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
                                <div className="col-md-5">

                                    <div className="card card-info">
                                        <div className="card-header">
                                            <h3 className="card-title">Project Detail</h3>
                                        </div>
                                        <form>
                                            <div className="card-body">
                                                <div className="form-group">
                                                    <label htmlFor="project_code">Project Code</label>
                                                    <input type="text" className="form-control" name="project_code" id="project_code"  value={this.state.Project.project_code} onChange={this.handleChange}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="project_name">Project Name</label>
                                                    <input type="text" name="project_name" className="form-control" id="project_name"  value={this.state.Project.project_name} onChange={this.handleChange}/>
                                                </div>
                                               
                                            </div>
                                            <div className="card-footer">
                                            <button type="button" onClick={this.submitForm} className="btn btn-primary">Submit</button>
                                            </div>
                                        </form>
                                    </div>
                                    {this.state.resStatus.messages !== '' ?
                                        (<div className={"alert " + (this.state.resStatus.isError ? "alert-success" : "alert-danger")}> {this.state.resStatus.messages} </div>)
                                        : ""}
                                </div>
                                <div className="col-md-7">
                                    <div className="card">
                                        <div className="card-header">
                                            <h3 className="card-title">Project Detail List</h3>
                                        </div>
                                        <div className="card-body">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th style={{ width: 10 }}>S.no</th>
                                                        <th>Project Code</th>
                                                        <th>Project Name</th>
                                                        <th style={{ width: 40 }}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {projectList.length ?
                                                        projectList.map((project,idx) => (
                                                            <tr>
                                                                <td>{idx +1}</td>
                                                                <td>{project.project_code}</td>
                                                                <td>{project.project_name}</td>
                                                                
                                                                <td><i className="fa fa-trash text-danger mr-2" aria-hidden="true"></i> <i className="fa fa-pencil-square-o text-primary" aria-hidden="true" ></i></td>
                                                            </tr>
                                                        ))
                                                        :
                                                        (<tr>
                                                            <td>-</td>
                                                            <td>-</td>
                                                            <td>-</td>
                                                           
                                                        </tr>)
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="card-footer clearfix">
                                            <ul className="pagination pagination-sm m-0 float-right">
                                                <li className="page-item"><a className="page-link" href="#/">«</a></li>
                                                <li className="page-item"><a className="page-link" href="#/">1</a></li>
                                                <li className="page-item"><a className="page-link" href="#/">2</a></li>
                                                <li className="page-item"><a className="page-link" href="#/">3</a></li>
                                                <li className="page-item"><a className="page-link" href="#/">»</a></li>
                                            </ul>
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
    )
  }
}

export default ProjectDetail
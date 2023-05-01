import React, { Component } from 'react'
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
const axios = require("axios").default;

class TeamLeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Employee: {
                employee_code: "",
                employee_name: "",
            },
            resStatus: {
                isError: false,
                messages: "",
            },
            employeeList: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }
    handleChange(e) {
        let employee = this.state.Employee;
        employee[e.target.name] = e.target.value;
        this.setState({ Employee: employee });
    }

    componentDidMount() {
        axios.get(process.env.REACT_APP_BASE_URL + "/api/admin/teamleader")
            .then(response => {
                this.setState({
                    employeeList: response.data
                });
            })
    }

    //Submit Form
    submitForm() {

        var thizz = this;
        // Send login request
        axios({
            method: "post",
            url: process.env.REACT_APP_BASE_URL + "/api/admin/teamleader",
            data: thizz.state.Employee,

        }).then(function (response) {
            var data = response.data
            if (data.status === true && data) {
                var resStatus = thizz.state.resStatus;
                resStatus.isError = true;
                resStatus.messages = data.message;
                thizz.setState({ resStatus: resStatus });

                // New table row insert
                thizz.setState({
                    employeeList: [...thizz.state.employeeList, data.row]
                })

                var employee = thizz.state.Employee
                employee = {
                    employee_code :'',
                    employee_name :'',
                }
                thizz.setState({
                    Employee:employee
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
    const { employeeList = [] } = this.state;
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

                                    <div className="card card-warning">
                                        <div className="card-header">
                                            <h3 className="card-title text-white">Team Leader Detail</h3>
                                        </div>
                                        <form>
                                            <div className="card-body">
                                                <div className="form-group">
                                                    <label htmlFor="employee_code">Employee Code </label>
                                                    <input type="text" className="form-control" name="employee_code" id="employee_code" value={this.state.Employee.employee_code} onChange={this.handleChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="employee_name">Employee Name </label>
                                                    <input type="text" className="form-control" name="employee_name" id="employee_name" value={this.state.Employee.employee_name} onChange={this.handleChange} />
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
                                            <h3 className="card-title">Team Leader List</h3>
                                        </div>
                                        <div className="card-body">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th style={{ width: 10 }}>S.no</th>
                                                        <th>Employee Code</th>
                                                        <th>Employee Name</th>
                                                        <th style={{ width: 40 }}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {employeeList.length ?
                                                        employeeList.map((employee,idx) => (
                                                            <tr>
                                                                <td>{idx +1}</td>
                                                                <td>{employee.employee_code}</td>
                                                                <td>{employee.employee_name}</td>
                                                               
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
                                                <li className="page-item"><a className="page-link" href="/#">«</a></li>
                                                <li className="page-item"><a className="page-link" href="/#">1</a></li>
                                                <li className="page-item"><a className="page-link" href="/#">2</a></li>
                                                <li className="page-item"><a className="page-link" href="/#">3</a></li>
                                                <li className="page-item"><a className="page-link" href="/#">»</a></li>
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

export default TeamLeader
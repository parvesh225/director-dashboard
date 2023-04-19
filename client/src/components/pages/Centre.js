import React, { Component } from 'react'
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
const axios = require("axios").default;

class Centre extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Centre: {
                centre_code: "",
                centre_name: "",
                short_name :"",
            },
            resStatus: {
                isError: false,
                messages: "",
            },
            centreList: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }
    handleChange(e) {
        let centre = this.state.Centre;
        centre[e.target.name] = e.target.value;
        this.setState({ Centre: centre });
    }

    componentDidMount() {
        axios.get(process.env.REACT_APP_BASE_URL + "/api/admin/centre")
            .then(response => {
                this.setState({
                    centreList: response.data
                });
            })
    }

    //Submit Form
    submitForm() {

        var thizz = this;
        // Send login request
        axios({
            method: "post",
            url: process.env.REACT_APP_BASE_URL + "/api/admin/centre",
            data: thizz.state.Centre,

        }).then(function (response) {
            var data = response.data
            console.log(data)
            if (data.status === true && data) {
                var resStatus = thizz.state.resStatus;
                resStatus.isError = true;
                resStatus.messages = data.message;
                thizz.setState({ resStatus: resStatus });

                // New table row insert
                thizz.setState({
                    centreList: [...thizz.state.centreList, data.row]
                })

                var centre = thizz.state.Centre
                centre = {
                    centre_code :'',
                    centre_name :'',
                    short_name  :""
                }
                thizz.setState({
                    Centre:centre
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
        const { centreList = [] } = this.state;
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

                                    <div className="card card-primary">
                                        <div className="card-header">
                                            <h3 className="card-title">Centre Name </h3>
                                        </div>
                                        <form>
                                            <div className="card-body">
                                                <div className="form-group">
                                                    <label htmlFor="centre_code">Centre Code</label>
                                                    <input type="text" className="form-control" value={this.state.Centre.centre_code} onChange={this.handleChange} name="centre_code" id="centre_code" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="centre_name">Centre Name</label>
                                                    <input type="text" name="centre_name" value={this.state.Centre.centre_name} onChange={this.handleChange} className="form-control" id="centre_name" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="short_name">Short Name</label>
                                                    <input type="text" name="short_name" value={this.state.Centre.short_name} onChange={this.handleChange} className="form-control" id="centre_name" />
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
                                            <h3 className="card-title">Centre List</h3>
                                        </div>
                                        <div className="card-body">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th style={{ width: 10 }}>S.no</th>
                                                        <th>Center Code</th>
                                                        <th>Centre Name</th>
                                                        <th>Short Name</th>
                                                        <th style={{ width: 40 }}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {centreList.length ?
                                                        centreList.map((centre,idx) => (
                                                            <tr>
                                                                <td>{idx +1}</td>
                                                                <td>{centre.centre_code}</td>
                                                                <td>{centre.centre_name}</td>
                                                                <td>{centre.short_name}</td>
                                                                <td><i className="fa fa-trash text-danger mr-2" aria-hidden="true"></i> <i class="fa fa-pencil-square-o text-primary" aria-hidden="true" ></i></td>
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
                                        {/* <div className="card-footer clearfix">
                                            <ul className="pagination pagination-sm m-0 float-right">
                                                <li className="page-item"><a className="page-link" href="#/">«</a></li>
                                                <li className="page-item"><a className="page-link" href="#/">1</a></li>
                                                <li className="page-item"><a className="page-link" href="#/">2</a></li>
                                                <li className="page-item"><a className="page-link" href="#/">3</a></li>
                                                <li className="page-item"><a className="page-link" href="#/">»</a></li>
                                            </ul>
                                        </div> */}
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

export default Centre
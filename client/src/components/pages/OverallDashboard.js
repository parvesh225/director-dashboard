import React, { Component } from "react";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import { Link } from "react-router-dom";
import './OverallDashboard.css';
import withRouter from "../withRouter";

const axios = require("axios").default;



class OverallDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allocatedBudget: 0.00,
            recivedAmt: 0.00,
            utilizeAmt: 0.00,
            balanceAmt: 0.00
        }
        this.formattedNumber = this.formattedNumber.bind(this);
    }

    formattedNumber(val) {
        const formattedValue = parseInt(val).toLocaleString();
        return formattedValue;
    }
    componentDidMount() {
        console.log('Props:', this.props.params.id);


        axios.get(process.env.REACT_APP_BASE_URL + "/api/admin/overall-dashboard/" + this.props.params.id)
            .then((response) => {
                console.log(response.data)
                var actualResp = response.data
                if (actualResp.totalfund) {
                    this.setState({ allocatedBudget: actualResp.totalfund })
                }

                if (actualResp.receivedAmt) {
                    this.setState({ recivedAmt: actualResp.receivedAmt[0].amount_recieved })

                }

                if (actualResp.utilizedAmt) {
                    this.setState({ utilizeAmt: actualResp.utilizedAmt[0].expenditure })
                }

                this.setState({ balanceAmt: actualResp.balance })

            }).catch((error) => {
                console.log(error.response);
            })

    }
    render() {
        return (
            <>
                <Header />
                <Sidebar />

                <div className="content-wrapper">

                    <section className="content dashboardImg2 p-2">
                        <div className="container-fluid">
                            {/* Small boxes (Stat box) */}
                            <h3 className="text-center text-white mt-3"> Centre for Digital Governance (CDG) </h3>
                            <Link to="/">
                                <button style={{ float: "right" }} className="btn btn-primary"> <i className="fa fa-arrow-left font-weight-bold" />   </button>
                            </Link>
                            <p className="p-2 text-white lead text">Funding Information</p>
                            <div className="row">
                                <div className="col-md-3 col-6">
                                    {/* small box */}
                                    <Link to="/fund-wise-project-list">
                                        <div className="small-box card customcolor">
                                            <div className="icon">
                                                <i className="fa fa-globe text-primary" style={{
                                                    fontSize: "30px",
                                                    top: "15px", right: "20px"
                                                }} />
                                            </div>
                                            <p className="text-dark"> Sanctioned Fund(INR) </p>
                                            <h5 className="small-box-footer"> {this.formattedNumber(this.state.allocatedBudget)} </h5>
                                        </div>
                                    </Link>
                                </div>

                                <div className="col-md-3 col-6">
                                    {/* small box */}
                                    <div className="small-box card">
                                        <div className="icon">
                                            <i className="fa fa-area-chart text-success" style={{
                                                color: '#6bd098!important', fontSize: "30px",
                                                top: "15px", right: "20px"
                                            }} />
                                        </div>
                                        <p> Fund Released(INR) </p>
                                        <h5 className="small-box-footer"> {this.formattedNumber(this.state.recivedAmt)} </h5>
                                    </div>
                                </div>

                                <div className="col-md-3 col-6">
                                    {/* small box */}
                                    <div className="small-box card">
                                        <div className="icon">
                                            <i className="fa fa-window-maximize text-warning" style={{
                                                fontSize: "30px",
                                                top: "15px", right: "20px"
                                            }} />
                                        </div>
                                        <p> Fund Utilized(INR) </p>
                                        <h5 className="small-box-footer"> {this.formattedNumber(this.state.utilizeAmt)} </h5>
                                    </div>
                                </div>

                                <div className="col-md-3 col-6">
                                    {/* small box */}
                                    <div className="small-box card">
                                        <div className="icon">
                                            <i className="fa fa fa-adjust  text-info" style={{
                                                fontSize: "30px",
                                                top: "15px", right: "20px"
                                            }} />
                                        </div>
                                        <p> Fund Surplus/ Deficit(INR) </p>
                                        <h5 className="small-box-footer text-danger"> {this.formattedNumber(this.state.balanceAmt)} </h5>
                                    </div>
                                </div>

                            </div>
                            <p className="p-2 mt-2 text-white lead">Project Information</p>
                            <div className="row">
                                <div className="col-md-3 col-6">
                                    {/* small box */}
                                    <Link to="/bar-chart">
                                        <div className="small-box card">
                                            <div className="icon">
                                                <i className="fa fa-refresh" style={{
                                                    fontSize: "30px",
                                                    top: "15px", right: "20px"
                                                }} />
                                            </div>
                                            <p> Total Projects </p>
                                            <h5 className="small-box-footer"> 1 </h5>
                                        </div>
                                    </Link>
                                </div>

                                <div className="col-md-3 col-6">
                                    {/* small box */}
                                    <div className="small-box card">
                                        <div className="icon">
                                            <i className="fa fa-th-list text-success" style={{
                                                fontSize: "30px",
                                                top: "15px", right: "20px",
                                            }} />
                                        </div>
                                        <p> Complete Projects(INR) </p>
                                        <h5 className="small-box-footer"> 0 </h5>
                                    </div>
                                </div>

                                <div className="col-md-3 col-6">
                                    {/* small box */}
                                    <div className="small-box card">
                                        <div className="icon">
                                            <i className="fa fa-files-o text-warning" style={{
                                                fontSize: "30px",
                                                top: "15px", right: "20px"
                                            }} />
                                        </div>
                                        <p> Running Projects </p>
                                        <h5 className="small-box-footer"> 1 </h5>
                                    </div>
                                </div>



                            </div>
                            <p className="p-2 mt-2 text-white lead"> Employee Details </p>
                            <div className="row">
                                <div className="col-md-3 col-6">
                                    {/* small box */}
                                    <div className="small-box card">
                                        <div className="icon">
                                            <i className="fa fa-user-secret text-primary" style={{
                                                fontSize: "30px",
                                                top: "15px", right: "20px"
                                            }} />
                                        </div>
                                        <p> Total Employee </p>
                                        <h5 className="small-box-footer"> 27 </h5>
                                    </div>
                                </div>

                                <div className="col-md-3 col-6">
                                    {/* small box */}
                                    <div className="small-box card">
                                        <div className="icon">
                                            <i className="fa fa-user text-success" style={{
                                                color: '#6bd098!important', fontSize: "30px",
                                                top: "15px", right: "20px"
                                            }} />
                                        </div>
                                        <p> NIUA Role </p>
                                        <h5 className="small-box-footer"> 13 </h5>
                                    </div>
                                </div>

                                <div className="col-md-3 col-6">
                                    {/* small box */}
                                    <div className="small-box card">
                                        <div className="icon">
                                            <i className="fa fa-users text-warning" style={{
                                                fontSize: "30px",
                                                top: "15px", right: "20px"
                                            }} />
                                        </div>
                                        <p> Third Party Roles </p>
                                        <h5 className="small-box-footer"> 14 </h5>
                                    </div>
                                </div>


                            </div>
                        </div>
                        {/* /.container-fluid */}
                    </section>
                    {/* /.content */}
                </div>


                <Footer />
            </>
        );
    }
}

export default withRouter(OverallDashboard);

import React, { Component } from "react";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import './Dashboard.css';



class Dashboard extends Component {
    render() {
        return (
            <>
                <Header />
                <Sidebar />

                <div className="content-wrapper">
                    {/* Content Header (Page header) */}

                    {/* /.content-header */}
                    {/* Main content */}
                    <section className="content dashboardImg">
                        <div className="container-fluid ">
                            {/* Small boxes (Stat box) */}
                            <div className="row p-5">
                                <div className="col-md-4 col-6 p-3 mt-3">
                                    {/* small box */}
                                    <div className="small-box card">
                                        <div className="icon">
                                            <i className="fa fa-globe" style={{
                                                color: '#6bd098!important', fontSize: "40px",
                                                top: "20px", right: "20px"
                                            }} />
                                        </div>
                                        <div className="inner">
                                            {/* <p>Director</p> */}
                                            <h4> C-Cube </h4>
                                        </div>
                                        <a href="#/" className="small-box-footer"><i className="bi bi-arrow-clockwise" /> Details More... </a>
                                    </div>
                                </div>

                                <div className="col-md-4 col-6 p-3 mt-3">
                                    {/* small box */}
                                    <div className="small-box card">
                                        <div className="icon">
                                            <i className="fa fa-window-maximize" aria-hidden="true" style={{
                                                color: '#6bd098!important', fontSize: "40px",
                                                top: "20px", right: "20px"
                                            }} />
                                        </div>
                                        <div className="inner">
                                            {/* <p>Director</p> */}
                                            <h4> CDG </h4>
                                        </div>
                                        <a href="#/" className="small-box-footer"><i className="bi bi-stopwatch" />Details More...</a>
                                    </div>
                                </div>
                                <div className="col-md-4 col-6 p-3 mt-3">
                                    {/* small box */}
                                    <div className="small-box card">
                                        <div className="icon">
                                            <i className="fa fa-area-chart" style={{
                                                color: '#6bd098!important', fontSize: "40px",
                                                top: "20px", right: "20px"
                                            }} />
                                        </div>
                                        <div className="inner">
                                            {/* <p>Director</p> */}
                                            <h4>CUEG</h4>
                                        </div>
                                        <a href="#/" className="small-box-footer"><i className="bi bi-stopwatch" />Details More...</a>
                                    </div>
                                </div>

                                <div className="col-md-4 col-6 p-3 ">
                                    {/* small box */}
                                    <div className="small-box card">
                                        <div className="icon">
                                            <i className="fa fa-adjust " style={{
                                                color: '#6bd098!important', fontSize: "40px",
                                                top: "20px", right: "20px"
                                            }} />
                                        </div>
                                        <div className="inner">
                                            {/* <p>Director</p> */}
                                            <h4>CMFG</h4>
                                        </div>
                                        <a href="#/" className="small-box-footer"><i className="bi bi-stopwatch" />Details More...</a>
                                    </div>
                                </div>
                                <div className="col-md-4 col-6 p-3">
                                    {/* small box */}
                                    <div className="small-box card">
                                        <div className="icon">
                                            <i className="fa fa-clone " style={{
                                                color: '#6bd098!important', fontSize: "40px",
                                                top: "20px", right: "20px"
                                            }} />
                                        </div>
                                        <div className="inner">
                                            {/* <p>Director</p> */}
                                            <h4>ICC</h4>
                                        </div>
                                        <a href="#/" className="small-box-footer"><i className="bi bi-stopwatch" />Details More...</a>
                                    </div>
                                </div>
                                <div className="col-md-4 col-6 p-3">
                                    {/* small box */}
                                    <div className="small-box card">
                                        <div className="icon">
                                            <i className="fa fa-tree" style={{
                                                color: '#6bd098!important', fontSize: "40px",
                                                top: "20px", right: "20px"
                                            }} />
                                        </div>
                                        <div className="inner">
                                            {/* <p>Director</p> */}
                                            <h4>CSSD</h4>
                                        </div>
                                        <a href="#/" className="small-box-footer"><i className="bi bi-stopwatch" />Details More...</a>
                                    </div>
                                </div>



                            </div>


                            {/* /.row */}
                            
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

export default Dashboard;

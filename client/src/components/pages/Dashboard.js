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
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1 className="m-0">Director Dashboard</h1>
                                </div>
                                {/* /.col */}
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item">
                                            <a href="#/">Home</a>
                                        </li>
                                        <li className="breadcrumb-item active">Dashboard v1</li>

                                    </ol>
                                </div>
                                {/* /.col */}
                            </div>
                            {/* /.row */}
                        </div>
                        {/* /.container-fluid */}
                    </div>
                    {/* /.content-header */}
                    {/* Main content */}
                    <section className="content">
                        <div className="container-fluid">
                            {/* Small boxes (Stat box) */}
                            <div className="row">
                                <div className="col-lg-3 col-6 ">
                                    {/* small box */}
                                    <div className="small-box card">
                                        <div className="icon">
                                            <i className="fa fa-globe" style={{
                                                color: '#6bd098!important', fontSize: "40px",
                                                top: "20px", right: "20px"
                                            }} />
                                        </div>
                                        <div className="inner">
                                            <p>Director</p>
                                            <h4>Dashboard</h4>
                                        </div>
                                        <a href="#/" className="small-box-footer"><i className="bi bi-arrow-clockwise" />Update Now</a>
                                    </div>
                                </div>

                                <div className="col-lg-3 col-6 ">
                                    {/* small box */}
                                    <div className="small-box card">
                                        <div className="icon">
                                            <i className="fa fa-area-chart" style={{
                                                color: '#6bd098!important', fontSize: "40px",
                                                top: "20px", right: "20px"
                                            }} />
                                        </div>
                                        <div className="inner">
                                            <p>Director</p>
                                            <h4>Dashboard</h4>
                                        </div>
                                        <a href="#/" className="small-box-footer"><i className="bi bi-stopwatch" />In The Last Hour</a>
                                    </div>
                                </div>



                            </div>


                            {/* /.row */}

                        </div>
                        {/* /.container-fluid */}
                    </section>
                    {/* /.content */}
                </div>
                <aside className="control-sidebar control-sidebar-dark">
                    {/* Control sidebar content goes here */}
                </aside>

                <Footer />
            </>
        );
    }
}

export default Dashboard;

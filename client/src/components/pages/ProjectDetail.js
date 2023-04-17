import React, { Component } from 'react'
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";

class ProjectDetail extends Component {
  render() {
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
                                                    <label htmlFor="centreCode">Project Code</label>
                                                    <input type="text" className="form-control" name="centreCode" id="centreCode"  />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="centreName">Project Name</label>
                                                    <input type="text" name="centreName" className="form-control" id="centreName"  />
                                                </div>
                                               
                                            </div>
                                            <div className="card-footer">
                                                <button type="submit" className="btn btn-primary">Submit</button>
                                            </div>
                                        </form>
                                    </div>

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
                                                    <tr>
                                                        <td>1.</td>
                                                        <td>Update software</td>
                                                        <td>
                                                            <div className="progress progress-xs">
                                                                <div className="progress-bar progress-bar-danger" style={{ width: '55%' }} />
                                                            </div>
                                                        </td>
                                                        <td><i className="fa fa-trash text-danger mr-2" aria-hidden="true"></i> <i class="fa fa-pencil-square-o text-primary" aria-hidden="true" ></i></td>
                                                    </tr>
                                                    <tr>
                                                        <td>2.</td>
                                                        <td>Clean database</td>
                                                        <td>
                                                            <div className="progress progress-xs">
                                                                <div className="progress-bar bg-warning" style={{ width: '70%' }} />
                                                            </div>
                                                        </td>
                                                        <td><i className="fa fa-trash text-danger mr-2" aria-hidden="true"></i> <i class="fa fa-pencil-square-o text-primary" aria-hidden="true" ></i></td>
                                                    </tr>
                                                    <tr>
                                                        <td>3.</td>
                                                        <td>Cron job running</td>
                                                        <td>
                                                            <div className="progress progress-xs progress-striped active">
                                                                <div className="progress-bar bg-primary" style={{ width: '30%' }} />
                                                            </div>
                                                        </td>
                                                        <td><i className="fa fa-trash text-danger mr-2" aria-hidden="true"></i> <i class="fa fa-pencil-square-o text-primary" aria-hidden="true" ></i></td>
                                                    </tr>
                                                    <tr>
                                                        <td>4.</td>
                                                        <td>Fix and squish bugs</td>
                                                        <td>
                                                            <div className="progress progress-xs progress-striped active">
                                                                <div className="progress-bar bg-success" style={{ width: '90%' }} />
                                                            </div>
                                                        </td>
                                                        <td><i className="fa fa-trash text-danger mr-2" aria-hidden="true"></i> <i class="fa fa-pencil-square-o text-primary" aria-hidden="true" ></i></td>
                                                    </tr>
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
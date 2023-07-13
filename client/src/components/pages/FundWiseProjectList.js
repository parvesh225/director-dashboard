import React, { Component } from "react";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import { Link } from "react-router-dom";
class FundWiseProjectList extends Component {

  constructor(props) {
    super(props);

    this.formattedNumber = this.formattedNumber.bind(this);
  }
  formattedNumber(val) {
    const formattedValue = parseInt(val).toLocaleString();
    return formattedValue;
  }
  render() {

    return (
      <>
        <Header />
        <Sidebar />
        <div className="content-wrapper">

          {/* Content Header (Page header) */}
          <div className="content-header">
            <div className="container-fluid">
              <Link to="/overall-dashboard/12">
                <button style={{ float: "right" }} className="btn btn-primary "> <i className="fa fa-arrow-left font-weight-bold" />   </button>
              </Link>
              <div className="row">
                <div className="col-md-12">

                  <div className="card">
                    <div className="card-header" style={{ backgroundColor: "#d8479c" }}>
                      <h5 className="text-center text-white text-primary"> CDG Project Funding List </h5>
                    </div>

                    <div className="card-body">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">Project Name</th>
                            <th scope="col"> Agency </th>
                            <th scope="col">Allocated Budget</th>
                            <th scope="col">Fund Released</th>
                            <th scope="col">Fund Utilized</th>
                            <th scope="col" style={{ width: "110px" }}>Start Date</th>
                            <th scope="col" style={{ width: "110px" }}>End Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>

                            <td>
                              <Link to="/admin/project-finance-detail/60">
                                National Urban Digital Mission (NUDM)
                              </Link>
                            </td>
                            <td>MOHUA</td>
                            <td>{this.formattedNumber(964840186)}</td>
                            <td> {this.formattedNumber(251617150)}</td>
                            <td>{this.formattedNumber(259627143)}</td>
                            <td>23-12-2020</td>
                            <td>31-12-2025</td>
                          </tr>


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

export default FundWiseProjectList;

import React, { Component } from "react";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";

class FundWiseProjectDetail extends Component {


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
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header" style={{ backgroundColor: "#d8479c" }}>
                      <h5 className="text-center text-white text-primary"> CDG Project Funding Details </h5>
                    </div>
                    <div className="card-body">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">Budget Head</th>
                            <th scope="col"> Allocated Budget </th>
                            <th scope="col">Expenditure</th>
                            <th scope="col">Fund Released</th>
                            <th scope="col"> Balance </th>

                          </tr>
                        </thead>
                        <tbody>
                          <tr>

                            <td>National Urban Digital Mission (NUDM)</td>
                            <td>MOHUA</td>
                            <td>964840000</td>
                            <td>251617170</td>
                            <td>259627143</td>

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

export default FundWiseProjectDetail;

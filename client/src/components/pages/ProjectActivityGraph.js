import React, { Component } from "react";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
const axios = require("axios").default;

class ProjectActivityGraph extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      years: [],
      selectedYear: "",
    }
    
    this.onChangeYearProjectActivity = this.onChangeYearProjectActivity.bind(this);
  }

  onChangeYearProjectActivity (e) {
    let year = e.target.value;
    let projectId = 60;
    axios.get(process.env.REACT_APP_BASE_URL + "/api/project-activity-graph/" + projectId+ '/'+year)
      .then((response) => {
        this.setState({
          years: response.data.years,
          data : response.data.projectActivity
        })
      }).catch((error)=> {
        console.log(error.response.data)
      })

  }

  componentDidMount() {
    var thizz = this;
    let projectId = 60

    axios.get(process.env.REACT_APP_BASE_URL + "/api/project-activity-graph/" + projectId)
      .then((response) => {
        this.setState({
          years: response.data.years,
          data : response.data.projectActivity
        })
      }).catch((error)=> {
        console.log(error.response.data)
      })

  }


  render() {

    var yearsSelectOption = this.state.years.map(function (year, index) {
      return <option key={year} value={year}>{year}</option>;
    })

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

                      <div className="form-group row">
                        <label className="col-md-12" >Select year</label>
                        <select
                          className="form-control col-md-6"
                          name="yearOfProjectActivity"
                          id="yearOfProjectActivity"
                          value={this.state.selectedYearProjectActivity}
                          onChange={this.onChangeYearProjectActivity}

                        >
                          <option selected=""> All </option>
                          {yearsSelectOption}
                        </select>
                      </div>



                      <BarChart
                        width={900}
                        height={400}
                        data={this.state.data}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" style={{fontSize:"8px"}} interval={0}/>
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="totalActivities" fill="#8884d8" />
                        <Bar dataKey="currentActivities" fill="#82ca9d" />
                      </BarChart>
                    </div>

                  </div>
                </div>

              </div>


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

export default ProjectActivityGraph;

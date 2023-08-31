import React, { Component } from "react";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import { Link } from "react-router-dom";
import Chart from "react-apexcharts";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import './styles.css';
const axios = require("axios").default;

class ProjectActivityGraph extends Component {

  constructor(props) {
    super(props);
    this.state = {
      years: [],
      selectedYear: "",
      data: [],
      data2: [],
      data3: [],
      data4: [],
      data5: [],

      options: {
        plotOptions: {
          radialBar: {
            track: {
              background: "#f2f2f2",
              strokeWidth: "90%"
            },
            dataLabels: {
              show: true,
              value: {
                show: true,
                fontSize: "16px"
              },
              total: {
                show: true,
                fontSize: "10px",
                label: "",
                color: "#373d3f"
              }
            }
          }
        },
        colors: ['#FFA556'],

      },
      series: [],
      catagoryName: '',
      activity: "",

      options2: {
        plotOptions: {
          radialBar: {
            track: {
              background: "#f2f2f2",
              strokeWidth: "90%"
            },
            dataLabels: {
              show: true,
              value: {
                show: true,
                fontSize: "16px"
              },
              total: {
                show: true,
                fontSize: "10px",
                label: "",
                color: "#373d3f"
              }
            }
          }
        },
        colors: ['#AC86D1'],

      },
      series2: [],
      catagoryName2: '',
      activity2: "",

      options3: {
        plotOptions: {
          radialBar: {
            track: {
              background: "#f2f2f2",
              strokeWidth: "90%"
            },
            dataLabels: {
              show: true,
              value: {
                show: true,
                fontSize: "16px"
              },
              total: {
                show: true,
                fontSize: "10px",
                label: "",
                color: "#373d3f"
              }
            }
          }
        },
        colors: ['#9BEA81'],

      },
      series3: [],
      catagoryName3: '',
      activity3: "",

      options4: {
        plotOptions: {
          radialBar: {
            track: {
              background: "#f2f2f2",
              strokeWidth: "90%"
            },
            dataLabels: {
              show: true,
              value: {
                show: true,
                fontSize: "16px"
              },
              total: {
                show: true,
                fontSize: "10px",
                label: "",
                color: "#373d3f"
              }
            }
          }
        },
        colors: ['#208293'],
      },
      series4: [],
      catagoryName4: '',
      activity4: "",

      options5: {
        plotOptions: {
          radialBar: {
            track: {
              background: "#f2f2f2",
              strokeWidth: "90%"
            },
            dataLabels: {
              show: true,
              value: {
                show: true,
                fontSize: "16px"
              },
              total: {
                show: true,
                fontSize: "10px",
                label: "",
                color: "#373d3f"
              }
            }
          }
        },

      },
      series5: [],
      catagoryName5: '',
      activity5: "",

    };


  }

  componentDidMount() {
    var thizz = this;
    let projectId = 60

    axios.get(process.env.REACT_APP_BASE_URL + "/api/project-activity-graph/" + projectId)
      .then((response) => {

        var options = thizz.state.options;
        options.plotOptions.radialBar.dataLabels.total.label = response.data.projectActivity[0].label;

        var series = thizz.state.series;
        series = response.data.projectActivity[0].series;

        var catagoryName = thizz.state.catagoryName;
        catagoryName = response.data.projectActivity[0].name;

        var activity = thizz.state.activity;
        activity = response.data.projectActivity[0].label

        var series2 = thizz.state.series2;
        series2 = response.data.projectActivity2[0].series;
        var catagoryName2 = thizz.state.catagoryName2;
        catagoryName2 = response.data.projectActivity2[0].name;
        var activity2 = thizz.state.activity2;
        activity2 = response.data.projectActivity2[0].label

        var series3 = thizz.state.series3;
        series3 = response.data.projectActivity3[0].series;
        var catagoryName3 = thizz.state.catagoryName3;
        catagoryName3 = response.data.projectActivity3[0].name;
        var activity3 = thizz.state.activity3;
        activity3 = response.data.projectActivity3[0].label

        var series4 = thizz.state.series4;
        series4 = response.data.projectActivity4[0].series;
        var catagoryName4 = thizz.state.catagoryName4;
        catagoryName4 = response.data.projectActivity4[0].name;
        var activity4 = thizz.state.activity4;
        activity4 = response.data.projectActivity4[0].label

        var series5 = thizz.state.series5;
        series5 = response.data.projectActivity5[0].series;
        var catagoryName5 = thizz.state.catagoryName5;
        catagoryName5 = response.data.projectActivity5[0].name;
        var activity5 = thizz.state.activity5;
        activity5 = response.data.projectActivity5[0].label

        thizz.setState({
          years: response.data.years,
          options: options,
          series: series,
          catagoryName: catagoryName,
          activity: activity,
          series2: series2,
          catagoryName2: catagoryName2,
          activity2: activity2,
          series3: series3,
          catagoryName3: catagoryName3,
          activity3: activity3,
          series4: series4,
          catagoryName4: catagoryName4,
          activity4: activity4,
          series5: series5,
          catagoryName5: catagoryName5,
          activity5: activity5,
          data: response.data.projectActivity,
          data2: response.data.projectActivity2,
          data3: response.data.projectActivity3,
          data4: response.data.projectActivity4,
          data5: response.data.projectActivity5,

        })
      }).catch((error) => {
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
                      <h5 className="text-center text-white text-primary"> CDG project activity graph </h5>
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


                    </div>
                    <div className="row text-center p-2">
                      <div className="col-md-2 card bg-primary">

                        <p style={{ marginTop: "70px" }}> Progress </p>
                        <p style={{ marginTop: "100px" }}> Activity </p>
                      </div>

                      <div className="col-md-2 card">
                        <Chart
                          options={this.state.options}
                          series={this.state.series}
                          type="radialBar"
                          width="250"
                          className="setGraph"
                        />
                        <p> {this.state.catagoryName} </p>
                        <br />
                        <br />
                        <p className="bg-secondary p-1"> {this.state.activity}</p>
                      </div>
                      <div className="col-md-2 card" style={{ backgroundColor: "#F4F6F9" }}>
                        <Chart
                          options={this.state.options2}
                          series={this.state.series2}
                          type="radialBar"
                          width="250"
                          className="setGraph"
                        />
                        <p> {this.state.catagoryName2} </p>
                        <br />
                        <p className="bg-secondary p-1"> {this.state.activity2}</p>
                      </div>

                      <div className="col-md-2 card" >
                        <Chart
                          options={this.state.options3}
                          series={this.state.series3}
                          type="radialBar"
                          width="250"
                          className="setGraph"
                        />
                        <p> {this.state.catagoryName3} </p>
                        <br />
                        <p className="bg-secondary p-1"> {this.state.activity3}</p>
                      </div>

                      <div className="col-md-2 card" style={{ backgroundColor: "#F4F6F9" }}>
                        <Chart
                          options={this.state.options4}
                          series={this.state.series4}
                          type="radialBar"
                          width="250"
                          className="setGraph"
                        />
                        <p> {this.state.catagoryName4} </p>
                        <br />
                        <p className="bg-secondary p-1"> {this.state.activity4}</p>
                      </div>

                      <div className="col-md-2 card">
                        <Chart
                          options={this.state.options5}
                          series={this.state.series5}
                          type="radialBar"
                          width="250"
                          className="setGraph"
                        />
                        <p className=""> {this.state.catagoryName5} </p>
                        <p className="bg-secondary p-1"> {this.state.activity5}</p>
                      </div>


                    </div>

                    <div className="row text-center">
                      <div className="col-md-2 card bg-primary">

                        <p style={{ marginTop: "70px" }}> Progress </p>
                        <p style={{ marginTop: "100px" }}> Activity </p>
                      </div>
                      <div className="col-md-2 card">
                        <BarChart
                          width={200}
                          height={300}
                          data={this.state.data}
                          className="setGraph"
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" style={{ fontSize: "18px" }} interval={0} />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="totalActivities" fill="#8884d8" />
                          <Bar dataKey="currentActivities" fill="#82ca9d" />
                        </BarChart>
                      </div>
                      <div className="col-md-2">
                        <BarChart
                          width={200}
                          height={300}
                          data={this.state.data2}
                        // margin={{
                        //   top: 20,
                        //   right: 30,
                        //   left: 20,
                        //   bottom: 5
                        // }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" style={{ fontSize: "18px" }} interval={0} />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="totalActivities" fill="#8884d8" />
                          <Bar dataKey="currentActivities" fill="#82ca9d" />
                        </BarChart>
                      </div>
                      <div className="col-md-2">
                        <BarChart
                          width={200}
                          height={300}
                          data={this.state.data3}
                        // margin={{
                        //   top: 20,
                        //   right: 30,
                        //   left: 20,
                        //   bottom: 5
                        // }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" style={{ fontSize: "18px" }} interval={0} />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="totalActivities" fill="#8884d8" />
                          <Bar dataKey="currentActivities" fill="#82ca9d" />
                        </BarChart>
                      </div>
                      <div className="col-md-2">
                        <BarChart
                          width={200}
                          height={300}
                          data={this.state.data4}
                        // margin={{
                        //   top: 20,
                        //   right: 30,
                        //   left: 20,
                        //   bottom: 5
                        // }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" style={{ fontSize: "18px" }} interval={0} />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="totalActivities" fill="#8884d8" />
                          <Bar dataKey="currentActivities" fill="#82ca9d" />
                        </BarChart>
                      </div>
                      <div className="col-md-2">
                        <BarChart
                          width={200}
                          height={300}
                          data={this.state.data5}
                        // margin={{
                        //   top: 20,
                        //   right: 30,
                        //   left: 20,
                        //   bottom: 5
                        // }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" style={{ fontSize: "16px" }} interval={0} />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="totalActivities" fill="#8884d8" />
                          <Bar dataKey="currentActivities" fill="#82ca9d" style={{ marginBottom: "18px" }} />
                        </BarChart>
                      </div>
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



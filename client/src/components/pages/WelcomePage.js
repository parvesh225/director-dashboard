import React, { Component } from "react";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import './WelcomePage.css';
import Chart from "react-apexcharts";
import moment from 'moment';
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


class WelcomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      centre: [],
      project: [],
      filterData: {
        centre_name: "",
        project_name: "",
        year:"",
      },
      isCheckedProjectWiseFund:false,
      totalFunding: 0,
      totalProject: 0,
      totalEmployee: 0,
      knowledgeProduct: 0,
      totalMou: 0,

      financeList: [],
      lastAmtDate: "",
      lastAmtReceived: "",
      totalReceivedAmt: "",
      balanceAmt: "",
      amountAllocatedTillDate: 0,
      expenditureTillDate: 0,

      //series: [44, 55, 13, 43, 22],
      series: [],
      options: {},

      series1: [],
      options1: {},

      // for second row graph
      series2Row: [],
      options2Row: {
        chart: {
          height: 350,
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: '70%',
            }
          },
        },
        labels: ['MOU'],
        colors: ['#FFA556'],
      },

      series22Row: [],
      options22Row: {
        chart: {
          height: 350,
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: '70%',
            }
          },
        },
        labels: ['Geographic'],
        colors: ['#AC86D1'],
      },

      series23Row: [],
      options23Row: {
        chart: {
          height: 350,
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: '70%',
            }
          },
        },
        labels: ['Advocacy'],
        colors: ['#9BEA81'],

      },

      series24Row: [],
      options24Row: {
        chart: {
          height: 350,
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: '70%',
            }
          },
        },
        labels: ['Knowledge'],
        colors: ['#208293']
      },

      series25Row: [],
      options25Row: {
        chart: {
          height: 350,
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: '70%',
            }
          },
        },
        labels: ['Other'],
      },

      series3Row: [{
        data: [21, 22, 10, 28, 16, 5, 8]
      }],
      options3Row: {
        chart: {
          height: 350,
          type: 'bar',
          events: {
            click: function(chart, w, e) {
              // console.log(chart, w, e)
            }
          }
        },
        // colors: colors,
        plotOptions: {
          bar: {
            columnWidth: '45%',
            distributed: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        },
        xaxis: {
          categories: [
            ['Account', 'Department'],
            ['Information', 'Technology'],
            ['Marketing', 'Department'],
            ['Customer', 'Success'],
            'Finance',
            'R&D',
            'Sales',
          ],
          labels: {
            style: {
              // colors: colors,
              fontSize: '12px'
            }
          }
        }
      },

    };
    this.handleChange = this.handleChange.bind(this);
    this.reloadDashboard = this.reloadDashboard.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.formattedNumber = this.formattedNumber.bind(this);
    this.myfunction = this.myfunction.bind(this);
  }

   // set state year, all center, all Project
   handleChange(e) {
    let filterData = this.state.filterData;
    filterData[e.target.name] = e.target.value;
    this.setState({ filterData: filterData });
  }

   handleCheckboxChange = async() => {
    let thizz = this;
   await this.setState((prevState) => ({
      isCheckedProjectWiseFund: !prevState.isCheckedProjectWiseFund, // Toggle the checkbox state
    }));
    let myObj ={
      isChecked: thizz.state.isCheckedProjectWiseFund
    }
    axios({
      method: "post",
      url: process.env.REACT_APP_BASE_URL + "/api/landing-page/project-wise-funding",
      data: myObj
    }).then((response)=> {
      var actualResp = response.data;
      if (actualResp.FundingAgency) {
        let newOptions = {
          chart: {
            width: 380,
            type: 'pie',
          },
          labels: actualResp.FundingAgency,
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        }
        thizz.setState({ options: newOptions })
      }
      if (actualResp.FundingAmt) {
        thizz.setState({ series: actualResp.FundingAmt })
      }
    }).catch((err)=> {
      console.log(err);
    })


  };


  reloadDashboard() {
  
    if(!this.state.filterData.year && !this.state.filterData.centre_name && !this.state.filterData.project_name) {
      alert("One of the filter parameter is required");
      return
    }

    this.dashboard(this);

  }
  // get api 
  componentDidMount() {
    var thizz = this;
    this.dashboard(thizz);

  }

  myfunction() {
    let allocatedFund = 0;
    for (var i = 0; i < this.state.financeList.length; i++) {
      allocatedFund += parseInt(this.state.financeList[i].allocated_fund);
      console.log(allocatedFund)
    }
    // return allocatedFund
    let remaningFund = (this.state.balanceAmt / allocatedFund) * 100
    remaningFund = (Math.round(remaningFund * 100) / 100).toFixed(2);
    // return remaningFund
    if (5 < remaningFund) {
      return "Invoice due within 3 month"
    } else if (2 < remaningFund && 5 > remaningFund) {
      return "Invoice due next month"
    } else if (0.5 <= remaningFund && 2 > remaningFund) {
      return "Invoice due next week"
    } else if (0.5 > remaningFund) {
      return "Invoice due next day"
    }

  }


  dashboard(thizz) {
    // axios.post(process.env.REACT_APP_BASE_URL + "/api/landing-page")
    axios({
      method: "post",
      url: process.env.REACT_APP_BASE_URL + "/api/landing-page",
      data: thizz.state.filterData
    })
    .then((response) => {
      console.log(response.data);

      var centre = response.data.centres
      var project = response.data.projects

      this.setState({
        centre: centre,
        project: project,
        financeList: response.data.budgetList,
        totalReceivedAmt: response.data.totalReceivedAmt,
        lastAmtReceived: response.data.lastAmtReceived,
        lastAmtDate: response.data.lastAmtDate,
        balanceAmt: response.data.balanceAmt,
        amountAllocatedTillDate: response.data.amountTillDate,
        expenditureTillDate: response.data.utilizedAmt
      })

      var actualResp = response.data;
      if (actualResp.totalFund !== null) {
        thizz.setState({ totalFunding: actualResp.totalFund })
      }
      if (actualResp.totalProject !== null) {
        thizz.setState({ totalProject: actualResp.totalProject })
      }
      if (actualResp.totalEmployee !== null) {
        thizz.setState({ totalEmployee: actualResp.totalEmployee })
      }
      if (actualResp.totalKnowledgeProducts !== null) {
        thizz.setState({ knowledgeProduct: actualResp.totalKnowledgeProducts })
      }
      if (actualResp.totalMou !== null) {
        thizz.setState({ totalMou: actualResp.totalMou })
      }
      if (actualResp.FundingAgency) {
        let newOptions = {
          chart: {
            width: 380,
            type: 'pie',
          },
          labels: actualResp.FundingAgency,
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        }
        thizz.setState({ options: newOptions })
      }
      if (actualResp.FundingAmt) {
        thizz.setState({ series: actualResp.FundingAmt })
      }

      if (actualResp.sanctionFund && actualResp.releasedFund && actualResp.utilizationFund) {
        let newSeries = [{
          name: 'Sanction Fund',
          data: actualResp.sanctionFund
        }, {
          name: 'Released Fund',
          data: actualResp.releasedFund
        }, {
          name: 'Utilization Fund',
          data: actualResp.utilizationFund
        }];
        thizz.setState({ series1: newSeries })
      }

      if (actualResp.projectList) {
        let secondOpt = {
          chart: {
            type: 'bar',
            height: 350
          },
          plotOptions: {
            bar: {
              horizontal: true,
              columnWidth: '55%',
              endingShape: 'rounded'
            },
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
          },
          xaxis: {
            categories: actualResp.projectList,
          },
          yaxis: {
            title: {
              text: "In crores"
            }
          },
          fill: {
            opacity: 1
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return "&#x20B9; " + val + " crores"
              }
            }
          }
        }
        thizz.setState({ options1: secondOpt })
      }

      var series2Row = thizz.state.series2Row;
      series2Row = response.data.projectActivity[0].series;

      var catagoryName2Row = thizz.state.catagoryName2Row;
      catagoryName2Row = response.data.projectActivity[0].name;
      var activity2Row = thizz.state.activity2Row;
      activity2Row = response.data.projectActivity[0].label

      var series22Row = thizz.state.series22Row;
      series22Row = response.data.projectActivity2[0].series;
      var catagoryName22Row = thizz.state.catagoryName22Row;
      catagoryName22Row = response.data.projectActivity2[0].name;
      var activity22Row = thizz.state.activity22Row;
      activity22Row = response.data.projectActivity2[0].label

      var series23Row = thizz.state.series23Row;
      series23Row = response.data.projectActivity3[0].series;
      var catagoryName23Row = thizz.state.catagoryName23Row;
      catagoryName23Row = response.data.projectActivity3[0].name;
      var activity23Row = thizz.state.activity23Row;
      activity23Row = response.data.projectActivity3[0].label

      var series24Row = thizz.state.series24Row;
      series24Row = response.data.projectActivity4[0].series;
      var catagoryName24Row = thizz.state.catagoryName24Row;
      catagoryName24Row = response.data.projectActivity4[0].name;
      var activity24Row = thizz.state.activity24Row;
      activity24Row = response.data.projectActivity4[0].label

      var series25Row = thizz.state.series25Row;
      series25Row = response.data.projectActivity5[0].series;
      var catagoryName25Row = thizz.state.catagoryName25Row;
      catagoryName25Row = response.data.projectActivity5[0].name;
      var activity25Row = thizz.state.activity25Row;
      activity25Row = response.data.projectActivity5[0].label

      thizz.setState({
        series2Row: series2Row,
        catagoryName2Row: catagoryName2Row,
        activity2Row: activity2Row,
        series22Row: series22Row,
        catagoryName22Row: catagoryName22Row,
        activity22Row: activity22Row,
        series23Row: series23Row,
        catagoryName23Row: catagoryName23Row,
        activity23Row: activity23Row,
        series24Row: series24Row,
        catagoryName24Row: catagoryName24Row,
        activity24Row: activity24Row,
        series25Row: series25Row,
        catagoryName25Row: catagoryName25Row,
        activity25Row: activity25Row,

      });


    }).catch((error) => {
      console.log(error.response.data)
    })
  }
 formattedNumber(val) {
    const formattedValue =  parseInt(val).toLocaleString(); 
    return formattedValue;
  }

  
  render() {

    let centre = this.state.centre.map(function (center, index) {

      return <option key={center.id} value={center.centre_code}>{center.centre_name}</option>;
    })
    let project = this.state.project.map(function (project, index) {
      return <option key={project.id} value={project.project_code}>{project.project_name}</option>;

    })
    

    return (
      <>
        <Header />
        <Sidebar />
        <div className="content-wrapper">
          <section className="content">
            <div className="heading">
              <span className="headingLine"> DIRECTOR NIUA DASHBOARD  </span>
              <span className="filterButton">
                <div className="myContainer">

                  <select
                    className="form-control select-box"
                    name="year"
                    id="year"
                    onChange={this.handleChange}
                  >
                    <option> Year </option>
                    <option> All Year</option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2030">2030</option>
                  </select>

                  <select
                    className="form-control select-box"
                    name="centre_name"
                    id="centre_name"
                    value={this.state.centre_name}
                    onChange={this.handleChange}
                  >
                    <option> All Centers </option>
                    {centre}
                  </select>

                  <select
                    className="form-control select-box"
                    name="project_name"
                    id="project_name"
                    value={this.state.project_name}
                  onChange={this.handleChange}
                  >
                    <option> All Projects </option>
                    {project}
                  </select>
                  <button className="btn btn-sm btn-primary" onClick={this.reloadDashboard}>
                  <i className="fa fa-refresh" aria-hidden="true"></i>

                  </button>
                </div>
              </span>
            </div>
            {/* <div className="container-fluid"> */}
            <div className="header-container card">
              <div className="icon">
                <i className="fa fa-bar-chart faChart" aria-hidden="true"></i>
              </div>
              <h4 className="header">Overview</h4>
              <div className="row text-center mt-4">
                <div className="col-md-2">
                  <p className="p1">Total Fund</p>
                  <p className="p2"> {this.state.totalFunding} </p>
                </div>
                <div className="col-md-2">
                  <p className="p1">Total Project</p>
                  <p className="p2"> {this.state.totalProject} </p>
                </div>
                <div className="col-md-2">
                  <p className="p1">Total Employee</p>
                  <p className="p2"> {this.state.totalEmployee} </p>
                </div>
                <div className="col-md-2">
                  <p className="p1">Knowledge Products</p>
                  <p className="p2"> {this.state.knowledgeProduct} </p>
                </div>
                <div className="col-md-2">
                  <p className="p1">Total MOU</p>
                  <p className="p2"> {this.state.totalMou} </p>
                </div>
              </div>
            </div>

           
              <div className="col-md-12 mb-1">
                <button className="btn btn-dark border-dark ml-4  mr-2 p-2"> Summary </button>
                <button className="btn border-dark mr-2 p-2"> Budget Head
                </button>
                <button className="btn border-dark mr-2 p-2"> Invoice </button>
                <button className="btn border-dark mr-2 p-2"> Deficits </button>
              </div>
              {/* Summary */}
             
              <div className="row ">
              <div className="col-md-6">
                <div className="header-container card">
                  <div className="icon">
                    <i className="fa fa-bar-chart faChart" aria-hidden="true"></i>
                  </div>
                  <h4 className="header"> Overall Fund</h4>
                   <span style={{ float: "right", marginTop: "10px" }}> 
                    <input type="checkbox" checked={this.state.isCheckedProjectWiseFund} onChange={this.handleCheckboxChange}
/> 
                    <lable> Project Wise Funding</lable>
                   </span>
                  <Chart options={this.state.options} series={this.state.series} type="pie" style={{ height: "315px" }} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="header-container card">
                  <div className="icon">
                    <i className="fa fa-bar-chart faChart" aria-hidden="true"></i>
                  </div>
                  <h4 className="header">Fund Utilization</h4>
                  <Chart options={this.state.options1} series={this.state.series1} type="bar" height={300} />
                </div>
              </div>
            </div>
             {/* End Summary */}
            {/* Budget Head */}
            <div className="row">
                <div className="col-md-12 card">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col"> S.no </th>
                        <th scope="col"> Budget Head </th>
                        <th scope="col"> Total Fund Allocated </th>
                        <th scope="col"> Total Amout Received </th>
                        <th scope="col"> Total Expenditure </th>
                        <th scope="col"> Utilization(%) </th>

                      </tr>
                    </thead>
                    <tbody>
                      {this.state.financeList.map((item, index) => (
                        <tr key={index}>
                          <th scope="row"> {index + 1}</th>
                          <td>{item.budget_head.toUpperCase()}</td>
                          <td>{this.formattedNumber(item.allocated_fund)}</td>
                          <td> {this.formattedNumber((index === 2) ? this.state.totalReceivedAmt : '')} </td>
                          <td>{this.formattedNumber(item.expenditure ? item.expenditure : 0)}</td>
                          <td> {Math.round((item.expenditure / item.allocated_fund) * 100)}% </td>
                        </tr>
                      ))}

                    </tbody>
                  </table>
                </div>
              </div>
            {/* End Budget Head */}

            {/* Invoice */}
            <div className="row">
                <div className="col-sm-3">
                  <div className="card bg-primary">
                  <div className="card-header">
                    
                    <small className="font-weight-bold"> Amount Allocated Till Date </small>
                  </div>
                    <div className="card-body">
                      <h5 className="card-title"> {this.formattedNumber(this.state.amountAllocatedTillDate)} </h5>
                    </div>
                  </div>
                </div>

                <div className="col-sm-3">
                  <div className="card bg-success">
                  <div className="card-header">
                  
                  <small className="font-weight-bold"> Amount Received Till Date </small>
                  </div>
                    <div className="card-body">
                      <h5 className="card-title"> {this.formattedNumber(this.state.totalReceivedAmt)} </h5>
                    </div>
                  </div>
                </div>


                <div className="col-sm-3">
                  <div className="card bg-orange">
                  <div className="card-header">
                  <small className="font-weight-bold text-white">
                    Amount Yet To Be Received
                    </small>
                  </div>
                    <div className="card-body">
                      <h5 className="card-title text-white"> {this.formattedNumber(this.state.amountAllocatedTillDate - this.state.totalReceivedAmt)} </h5>
                    </div>
                  </div>
                </div>

                <div className="col-sm-3">
                  <div className="card bg-warning">
                  <div className="card-header">
                  <small className="font-weight-bold text-white"> Expenditure Till Date </small> 
                  </div>
                    <div className="card-body">
                      <h5 className="card-title text-white"> {this.formattedNumber(this.state.expenditureTillDate)} </h5>
                    </div>
                  </div>
                </div>
                  
                <div className="col-sm-3">
                  <div className="card bg-danger">
                  <div className="card-header">
                  <small className="font-weight-bold"> Fund Surplus/ Deficit </small>
                  </div>
                    <div className="card-body">
                      <h5 className="card-title"> {this.formattedNumber(this.state.balanceAmt)} </h5>
                    </div>
                  </div>
                </div>
               
                <div className="col-sm-3">
                  <div className="card bg-olive">
                  <div className="card-header">
                  <small className="font-weight-bold"> Last Received Amount </small>
                  </div>
                    <div className="card-body">
                      <h5 className="card-title"> {this.formattedNumber(this.state.lastAmtReceived)} </h5>
                    </div>
                  </div>
                </div>

                <div className="col-sm-3">
                  <div className="card bg-gradient-purple">
                  <div className="card-header">
                  <small className="font-weight-bold"> Last Received Amount Date </small>
                  </div>
                    <div className="card-body">
                      <h5 className="card-title"> {moment(this.state.lastAmtDate).format("DD-MM-YYYY")} </h5>
                    </div>
                  </div>
                </div>

                <div className="col-sm-3">
                  <div className="card bg-danger">
                  <div className="card-header">
                  <small className="font-weight-bold"> Status / Invoice Date </small>
                  </div>
                    <div className="card-body">
                      <h5 className="card-title"> {this.myfunction()} </h5>
                    </div>
                  </div>
                </div>
              
               
              </div>
            {/* End Invoice */}

            <h2 className="bg-info mb-3" style={{ textAlign: "center" }}> Finances </h2>



            <div className="row p-2">
            <div className="col-md-12 mb-1">
                <button className="btn  border-dark ml-4  mr-2 p-2"> Summary </button>
                <button className="btn border-dark  btn-dark mr-2 p-2"> Sector wise

                </button>
                <button className="btn border-dark mr-2 p-2"> MoUs </button>
              </div>

              <div className="col-md-2 card bg-primary text-center ">

                <p style={{ marginTop: "70px" }}> Progress </p>
                <p style={{ marginTop: "100px" }}> Activity </p>
              </div>

              <div className="col-md-2 card">
                <Chart
                  options={this.state.options2Row} series={this.state.series2Row}
                  type="radialBar"
                  height={200}
                />
                <p className="mb-5">  {this.state.catagoryName2Row} </p>
                <br />
                <p className="p-1" style={{ backgroundColor: "#FFA556", color: "white" }}> {this.state.activity2Row}</p>
              </div>

              <div className="col-md-2 card">
                <Chart
                  options={this.state.options22Row} series={this.state.series22Row}
                  type="radialBar"
                  height={200}
                />
                <p className="mb-4">  {this.state.catagoryName22Row} </p>
                <br />
                <p className="p-1" style={{ backgroundColor: "#AC86D1", color: "white" }}> {this.state.activity22Row}</p>
              </div>
              <div className="col-md-2 card">
                <Chart
                  options={this.state.options23Row} series={this.state.series23Row}
                  type="radialBar"
                  height={200}
                />
                <p className="mb-4"> {this.state.catagoryName23Row} </p>
                <br />
                <p className="p-1" style={{ backgroundColor: "#9BEA81", color: "white" }}> {this.state.activity23Row}</p>
              </div>
              <div className="col-md-2 card">
                <Chart
                  options={this.state.options24Row} series={this.state.series24Row}
                  type="radialBar"
                  height={200}
                />
                <p className="mb-4">  {this.state.catagoryName24Row}  </p>
                <br />
                <p className="p-1" style={{ backgroundColor: "#208293", color: "white" }}> {this.state.activity24Row}</p>
              </div>
              <div className="col-md-2 card">
                <Chart
                  options={this.state.options25Row} series={this.state.series25Row}
                  type="radialBar"
                  height={200}
                />
                <p className="mb-4">   {this.state.catagoryName25Row}  </p>
                <p className="p-1 bg-primary"> {this.state.activity25Row}</p>
              </div>
            </div>
            <h2 className="bg-info  mb-5" style={{ textAlign: "center" }}> Project Activity </h2>

          <div className="row">
            <div className="col-md-12">
            <div className="row card text-center">
          <Chart options={this.state.options3Row} series={this.state.series3Row} type="bar" width={800} height={300}/>
          </div>
            </div>
          </div>
            <h2 className="bg-info" style={{ textAlign: "center" }}> HR </h2>


            {/* </div> */}
          </section>
          
        </div>
        <Footer />
      </>
    );
  }
}

export default WelcomePage;

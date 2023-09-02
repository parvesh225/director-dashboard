import React, { Component } from "react";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import './WelcomePage.css';
import Chart from "react-apexcharts";
const axios = require("axios").default;


class WelcomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalFunding: 0,
      totalProject: 0,
      totalEmployee: 0,
      knowledgeProduct: 0,
      totalMou: 0,

      //series: [44, 55, 13, 43, 22],
      series:[],
      options: {},
    
      series1: [{
        name: 'Net Profit',
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
      }, {
        name: 'Revenue',
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
      }, {
        name: 'Free Cash Flow',
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
      }],
      options1: {
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
          categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        },
        yaxis: {
          title: {
            text: '$ (thousands)'
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "$ " + val + " thousands"
            }
          }
        }
      },
    };
  }

  // get api 
  componentDidMount() {
    var thizz = this;

    axios.get(process.env.REACT_APP_BASE_URL + "/api/landing-page" )
      .then((response) => {
        console.log(response.data);
        var actualResp = response.data;
        if (actualResp.totalFund) {
          thizz.setState({ totalFunding: actualResp.totalFund })
      }
        if (actualResp.totalProject) {
          thizz.setState({ totalProject: actualResp.totalProject })
      }
        if (actualResp.totalEmployee) {
          thizz.setState({ totalEmployee: actualResp.totalEmployee })
      }
        if (actualResp.totalKnowledgeProducts) {
          thizz.setState({ knowledgeProduct: actualResp.totalKnowledgeProducts })
      }
        if (actualResp.totalMou) {
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
                  width: 200
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

      
      }).catch((error) => {
        console.log(error.response.data)
      })
      
  }

  render() {
    return (
      <>
        <Header />
        <Sidebar />
        <div className="content-wrapper">
          <section className="content">
            <div className="heading">
              <p className="headingLine"> DIRECTOR NIUA DASHBOARD</p>
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
                  <p className="p2"> { this.state.totalFunding } </p>
                </div>
                <div className="col-md-2">
                  <p className="p1">Total Project</p>
                  <p className="p2"> { this.state.totalProject } </p>
                </div>
                <div className="col-md-2">
                  <p className="p1">Total Employee</p>
                  <p className="p2"> { this.state.totalEmployee } </p>
                </div>
                <div className="col-md-2">
                  <p className="p1">Knowledge Products</p>
                  <p className="p2"> { this.state.knowledgeProduct } </p>
                </div>
                <div className="col-md-2">
                  <p className="p1">Total MOU</p>
                  <p className="p2"> { this.state.totalMou } </p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
              <div className="header-container card">
              <div className="icon">
                <i className="fa fa-bar-chart faChart" aria-hidden="true"></i>
              </div>
              <h4 className="header"> Overall Fund</h4>
                <Chart options={this.state.options} series={this.state.series} type="pie" width={500} />
            </div>
              </div>
              <div className="col-md-6">
              <div className="header-container card">
              <div className="icon">
                <i className="fa fa-bar-chart faChart" aria-hidden="true"></i>
              </div>
              <h4 className="header">Fund Utilization</h4>
                <Chart options={this.state.options1} series={this.state.series1} type="bar" height={355} />
            </div>
              </div>
            </div>

            {/* </div> */}
          </section>
        </div>
        <Footer />
      </>
    );
  }
}

export default WelcomePage;

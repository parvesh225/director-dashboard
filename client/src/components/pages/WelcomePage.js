import React, { Component } from "react";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import './WelcomePage.css';
import Chart from "react-apexcharts";

class WelcomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
    
      series: [44, 55, 13, 43, 22],
      options: {
        chart: {
          width: 380,
          type: 'pie',
        },
        labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
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
      },
    
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
                  <p className="p2">10</p>
                </div>
                <div className="col-md-2">
                  <p className="p1">Total Project</p>
                  <p className="p2">10</p>
                </div>
                <div className="col-md-2">
                  <p className="p1">Total Employee</p>
                  <p className="p2">10</p>
                </div>
                <div className="col-md-2">
                  <p className="p1">Knowledge Products</p>
                  <p className="p2">10</p>
                </div>
                <div className="col-md-2">
                  <p className="p1">Total MOU</p>
                  <p className="p2">10</p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
              <div className="header-container card">
              <div className="icon">
                <i className="fa fa-bar-chart faChart" aria-hidden="true"></i>
              </div>
              <h4 className="header">Project Wise Funding</h4>
                <Chart options={this.state.options} series={this.state.series} type="pie" width={500} />
            </div>
              </div>
              <div className="col-md-6">
              <div className="header-container card">
              <div className="icon">
                <i className="fa fa-bar-chart faChart" aria-hidden="true"></i>
              </div>
              <h4 className="header">Fund Details</h4>
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
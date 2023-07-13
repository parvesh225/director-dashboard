import React, { Component } from "react";
// import { useParams } from "react-router-dom";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import withRouter from '../withRouter';
import moment from 'moment';
const axios = require("axios").default;


class ProjectFinance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      financeList: [],
      lastAmtDate: "",
      lastAmtReceived: "",
      totalReceivedAmt: "",
      balanceAmt: "",
      amountAllocatedTillDate: 0,
      expenditureTillDate: 0
    }
    this.myfunction = this.myfunction.bind(this);
    this.formattedNumber = this.formattedNumber.bind(this);
    
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

  componentDidMount() {
    console.log('Props:', this.props.params.id);

    axios.get(process.env.REACT_APP_BASE_URL + "/api/admin/project-finance-details/" + this.props.params.id)
      .then((response) => {
        if (response.data.status) {
          let fundList = response.data;
          var financeList = this.state.financeList;
          financeList = response.data.financeList;
          this.setState({
            financeList: financeList,
            totalReceivedAmt: response.data.totalReceivedAmt,
            lastAmtReceived: response.data.lastAmtReceived,
            lastAmtDate: response.data.lastAmtDate,
            balanceAmt: response.data.balanceAmt,
            amountAllocatedTillDate: response.data.amountTillDate,
            expenditureTillDate: response.data.utilizedAmt
          })
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
      })

  }

   formattedNumber(val) {
    const formattedValue =  parseInt(val).toLocaleString(); 
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
                          <td> {this.formattedNumber((index == 2) ? this.state.totalReceivedAmt : '')} </td>
                          <td>{this.formattedNumber(item.expenditure ? item.expenditure : 0)}</td>
                          <td> {Math.round((item.expenditure / item.allocated_fund) * 100)}% </td>
                        </tr>
                      ))}

                    </tbody>
                  </table>
                </div>
              </div>
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

// export default ProjectFinance;
export default withRouter(ProjectFinance);

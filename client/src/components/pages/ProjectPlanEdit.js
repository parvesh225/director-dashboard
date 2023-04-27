import React, { Component } from "react";
// import { useParams } from "react-router-dom";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import withRouter from '../withRouter';
import moment from 'moment';
const axios = require("axios").default;


class ProjectPlanEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      centre: [],
      project: [],
      project_head: [],
      funding_agency: [],

      singleFields: {
        id: "",
        centre_name: "",
        project_name: "",
        project_head: "",
        project_code: "",
        project_brief: "",
        work_order: "",
        funding_agency: "",
        nodal_officer: "",
        contact_no: "",
        allocated_budget: "",
        start_date: "",
        end_date: "",
        overall_progress: "",
      },
      years: [],
      selectedYear: "",
      selectedQuarter: "",
      team_strength: [
        {
          team: "",
          position: "",
          experience: "",
          qualification: "",
          salary_slab: "",
          employee_code: "",
          employee_name: ""
        },
      ],
      finances: [],
      project_activities: [],

      other_activities: [
        {
          other_activity: "",
          other_date: "",
        },
      ],
      resStatus: {
        isError: false,
        messages: "",
      },
      resStatusFinanceReceived: {
        isError: false,
        messages: "",
      },
      finance_recieved: [
        {
          amount_recieved: "",
          amount_recieved_date: "",
          amount_remark: "",
          project_plan_id:"",
          year:""
        },
      ],
    }
    this.onChangeYear = this.onChangeYear.bind(this);
    this.handleChangeQuarter = this.handleChangeQuarter.bind(this);
    this.saveRows = this.saveRows.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.handleChangeMul = this.handleChangeMul.bind(this);
    this.handleAddRow = this.handleAddRow.bind(this);
    this.handleRemoveSpecificRow = this.handleRemoveSpecificRow.bind(this);
    this.saveAmount = this.saveAmount.bind(this);
  }

  saveAmount() {
    var thizz = this;
    if(!this.state.selectedYear) {
      alert("Please select year to save")
      return
    }
    var myObj = {
      finance_recieved: thizz.state.finance_recieved,
      }
      axios({
        method: "post",
        url: process.env.REACT_APP_BASE_URL + "/api/admin/finance-recieved",
        data: myObj
      }).then((response) => {
        var data = response.data
        if (data.status === true ) {
          var resStatusFinanceReceived = thizz.state.resStatusFinanceReceived;
          resStatusFinanceReceived.isError = true;
          resStatusFinanceReceived.messages = data.message;
          thizz.setState({ resStatusFinanceReceived: resStatusFinanceReceived });
        }
      
      }).catch((error)=> {
        var data = error.response.data;
        if (error.response.data.status === false) {
          var resStatusFinanceReceived = thizz.state.resStatusFinanceReceived;
          resStatusFinanceReceived.messages = data.message;
          thizz.setState({ resStatusFinanceReceived: resStatusFinanceReceived });
        }
      }) 
  }

  // For simple fields
  handleChangeQuarter(e) {
    this.setState({ selectedQuarter: e.target.value });
  }

  saveRows() {
    if (!this.state.selectedQuarter || !this.state.selectedYear) {
      alert("Please select year and quarter to save")
      return
    }
    var thizz = this
    for (let i = 0; i < this.state.finances.length; i++) {
      axios({
        method: "post",
        url: process.env.REACT_APP_BASE_URL + "/api/admin/fetch-finances-by-year-project",
        data: thizz.state.finances[i]
      }).then((response) => {
        console.log(response.data)
        var resp = response.data
        var msg = ""
        if (resp.status === 'true' || resp.status === true) {
          msg = "Successfully Save"
        } else {
          msg = resp.message
        }
        const finances = this.state.finances;
        finances[i]['errorMsg'] = msg;
        console.log(finances)
        this.setState({
          finances: finances,
        });
      }).catch((error) => {
        console.log(error.response.data);
        var resp = error.response.data
        var msg = ""
        msg = resp.message

        const finances = this.state.finances;
        finances[i]['errorMsg'] = msg;
        console.log(finances)
        this.setState({
          finances: finances,
        });
      })
    }
  }

  handleChangeMul(idx, e, type) {
    console.log(idx, e.target.name, type);
    if (type === "teamStrength") {
      const { name, value } = e.target;
      const team_strength = this.state.team_strength;
      team_strength[idx][name] = value;
      this.setState({
        team_strength: team_strength,
      });
    } else if (type === "finances") {
      const { name, value } = e.target;
      const finances = this.state.finances;
      finances[idx][name] = value;
      this.setState({
        finances: finances,
      });
    } else if (type === "project_activities") {
      const { name, value } = e.target;
      const project_activities = this.state.project_activities;
      project_activities[idx][name] = value;
      this.setState({
        project_activities: project_activities,
      });
    } else if (type === "other_activities") {
      const { name, value } = e.target;
      const other_activities = this.state.other_activities;
      other_activities[idx][name] = value;
      this.setState({
        other_activities: other_activities,
      });
    }
  }

  onChangeYear(e) {
    var thizz = this
    this.setState({ selectedYear: e.target.value })

    // for received amount 
    if(e.target.value) {
      var finance_recieved = this.state.finance_recieved;
      finance_recieved.year = e.target.value;
      this.setState({
        finance_recieved: finance_recieved
      })
    }
    

    if (!e.target.value) {
      this.setState({
        finances: []
      })
    }
    axios.get(process.env.REACT_APP_BASE_URL + "/api" +
      "/admin/fetch-finances-by-year-project/" + e.target.value + "/" + this.state.singleFields.id)
      .then((response) => {
        console.log(response.data.finances)
        var financeesList = [];
        for (let i = 0; i < response.data.finances.length; i++) {
          var item = response.data.finances[i]
          financeesList.push({
            year: item.year,
            project_plan_id: item.project_plan_id,
            budget_head: item.budget_head,
            allocated_fund: item.allocated_fund,
            milestone: item.milestone,
            quarter: thizz.state.selectedQuarter,
            received_amt: "",
            date: "",
            expenditure: "",
            balance: "",
            finance_id: item.id,
            utilization: "",
            errorMsg: ""
          })
        }

        this.setState({
          finances: financeesList
        })

      }).catch((error) => {
        console.log(error.response.data);
      })
  }

  //Submit Form
  submitForm() {
    var thizz = this;
    var myObj = {
      FormData: thizz.state.singleFields,
      team_strength: thizz.state.team_strength,
      finances: thizz.state.finances,
      project_activities: thizz.state.project_activities,
      other_activities: thizz.state.other_activities
    }
    //Send request to backend
    axios({
      method: "put",
      url: process.env.REACT_APP_BASE_URL + "/api/admin/project-plan",
      data: myObj
    }).then(function (response) {
      var data = response.data
      if (data.status === true && data) {
        var resStatus = thizz.state.resStatus;
        resStatus.isError = true;
        resStatus.messages = data.message;
        thizz.setState({ resStatus: resStatus });
      }

    }).catch(function (error) {
      console.log(error.response.data)
      var data = error.response.data;
      if (error.response.data.status === false) {
        var resStatus = thizz.state.resStatus;
        resStatus.messages = data.message;
        thizz.setState({ resStatus: resStatus });
      }
    })

  }

  componentDidMount() {
    console.log('Props:', this.props.params.id);
    var finance_recieved = this.state.finance_recieved
    finance_recieved.project_plan_id = this.props.params.id
    
    this.setState({
      finance_recieved:finance_recieved
    })

    axios.get(process.env.REACT_APP_BASE_URL + "/api/admin/project-plan/" + this.props.params.id)
      .then((response) => {
        this.setState({
          singleFields: response.data.data,
          years: response.data.years,
          centre: response.data.centres,
          project: response.data.projects,
          project_head: response.data.team_leader,
          funding_agency: response.data.agencys,

        })


        var financeesList = [];
        for (let i = 0; i < response.data.teams.length; i++) {
          var item = response.data.teams[i]
          financeesList.push({
            id: item.id,
            project_plan_id: item.project_plan_id,
            team: item.team,
            position: item.position,
            experience: item.experience,
            qualification: item.qualification,
            salary_slab: item.salary_slab,
            employee_code: item.employee_code,
            employee_name: item.employee_name,

          })
        }
        this.setState({ team_strength: financeesList })
        financeesList = [];
        for (let i = 0; i < response.data.projectActivity.length; i++) {
          var item = response.data.projectActivity[i]
          financeesList.push({
            id: item.id,
            type: item.type,
            start_date: item.start_date,
            end_date: item.end_date,
            duration: item.duration,
            activities: item.activities,
            remarks: item.remarks,
            status: item.status,
            progress: item.progress

          })
        }
        this.setState({ project_activities: financeesList })
        financeesList = [];
        for (let i = 0; i < response.data.otherActivity.length; i++) {
          var item = response.data.otherActivity[i]
          financeesList.push({
            id: item.id,
            other_activity: item.activities,
            other_date: item.date,
            status: item.status
          })
        }
        this.setState({ other_activities: financeesList })
      }).catch((error) => {
        console.log(error.response.data);
      })

  }

  // For simple fields
  handleChange(e) {
    let singleField = this.state.singleFields;
    singleField[e.target.name] = e.target.value;
    this.setState({ singleFields: singleField });
  }


  // SET MULTIPLE ROW
  handleChangeMul(idx, e, type) {
   
    if (type === "amountRecieved" && this.state.selectedYear) {
      const { name, value } = e.target;
      const finance_recieved = this.state.finance_recieved;
      finance_recieved[idx][name] = value;
      finance_recieved[idx]['project_plan_id'] = this.props.params.id
      finance_recieved[idx]['year'] = this.state.selectedYear
      this.setState({
        finance_recieved: finance_recieved,
      });
    }else {
      alert("Please select year")
      return
    }
  }

  handleRemoveSpecificRow(idx, type) {
    if (this.state.finance_recieved.length > 1 && type === "amountRecieved") {
      const finance_recieved = this.state.finance_recieved;
      finance_recieved.splice(idx, 1);
      this.setState({ finance_recieved: finance_recieved });

    }
  }

  handleAddRow(type) {
    if (type === "amountRecieved") {
      const item = {
        amount_recieved: "",
        amount_recieved_date: "",
        amount_remark: "",
        project_plan_id: this.state.finance_recieved.project_plan_id,
        year: "",
      };
      this.setState({
        finance_recieved: [...this.state.finance_recieved, item],
      });
    }
  }



  render() {
    var yearsSelectOption = this.state.years.map(function (year, index) {
      return <option key={year} value={year}>{year}</option>;
    })

    let centre = this.state.centre.map(function (center, index) {

      return <option key={center.id} value={center.centre_code} >{center.centre_name}</option>;
    })
    let project = this.state.project.map(function (project, index) {
      return <option key={project.id} value={project.project_code}> {project.project_name} </option>;

    })

    let team = this.state.project_head.map(function (team, index) {
      return <option key={team.id} value={team.employee_code}> {team.employee_name} </option>
    })

    let agency = this.state.funding_agency.map(function (agency, index) {
      return <option key={agency.id} value={agency.agency_code}>  {agency.agency_name} </option>
    })
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
                  <div className="card card-primary">
                    <div className="card-header">
                      <h3 className="card-title"> Project Form-II </h3>
                    </div>
                    <form>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="centreName">Centre Name </label>

                              <select
                                class="form-control "
                                name="centre_name"
                                id="centre_name"
                                value={this.state.singleFields.centre_name}
                                readOnly
                              >
                                <option> select </option>
                                {centre}
                              </select>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="projectName">Project Name</label>

                              <select
                                class="form-control "
                                name="project_name"
                                id="project_name"
                                value={this.state.singleFields.project_name}
                                readOnly
                              >
                                <option selected="selected"> select </option>
                                {project}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="projectHeadName">
                                Project Head Name
                              </label>

                              <select
                                class="form-control "
                                name="team_head"
                                id="team_head"
                                value={this.state.singleFields.project_head}
                                readOnly
                              >
                                <option selected="selected"> select </option>
                                {team}
                              </select>
                            </div>
                          </div>

                          <div className="form-group col-md-6">
                            <label for="fundingMinistry/Agency/Dept">
                              Funding Ministry/Agency/Dept.
                            </label>

                            <select
                              class="form-control "
                              name="funding_ministry"
                              id="funding_ministry"
                              value={this.state.singleFields.funding_agency}
                              readOnly
                            >
                              <option selected="selected"> select </option>
                              {agency}
                            </select>
                          </div>
                        </div>
                        <div className="row ">
                          <div className="form-group col-md-6">
                            <label for="projectBrief" className="p">
                              Project Brief
                            </label>
                            <textarea
                              className="form-control "
                              id="project_brief"
                              readOnly
                              name="project_brief"
                              placeholder="Project Brief"
                              value={this.state.singleFields.project_brief}
                            ></textarea>
                          </div>

                          <div className="form-group col-md-6">
                            <label for="workOrderNo" className="p">
                              Work Order No
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="work_order"
                              readOnly
                              name="work_order"
                              placeholder="Work Order No"
                              value={this.state.singleFields.work_order}
                            />
                          </div>
                        </div>

                        <div className="row ">


                          <div className="form-group col-md-6">
                            <label for="nodalOfficerName" className="p">
                              Nodal Officer Name
                            </label>
                            <input
                              type="text"
                              className="form-control "
                              id="nodal_officer"
                              readOnly
                              name="nodal_officer"
                              placeholder="Nodal Officer Name"
                              value={this.state.singleFields.nodal_officer}
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <label for="contactNo">Contact no.</label>
                            <input
                              className="form-control"
                              id="contact_no"
                              name="contact_no"
                              readOnly
                              placeholder="Contact No"
                              value={this.state.singleFields.contact_no}
                            />
                          </div>
                        </div>
                        <div className="row ">
                          <div className="form-group col-md-6">
                            <label for="allocated_budget">
                              Allocated Budget
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              readOnly
                              id="allocated_budget"
                              name="allocated_budget"
                              placeholder="Allocated Budget"
                              value={this.state.singleFields.allocated_budget}
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <label for="overall_progress">
                              Overall Progress
                            </label>
                            <input
                              className="form-control"
                              id="overall_progress"
                              name="overall_progress"
                              placeholder="Overall Progress"
                              value={this.state.singleFields.overall_progress}
                              onChange={this.handleChange}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group col-md-6">
                            <label for="startDate">Start Date</label>
                            <input
                              type="text"
                              name="start_date"
                              id="start_date"
                              readOnly
                              class="form-control"
                              value={moment(this.state.singleFields.start_date).format("DD-MM-YYYY")}
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <label for="endDate">End Date</label>
                            <input
                              type="text"
                              name="end_date"
                              id="end_date"
                              readOnly
                              class="form-control"
                              value={moment(this.state.singleFields.end_date).format("DD-MM-YYYY")}
                            />
                          </div>
                        </div>

                        <p className="lead"> Team Strength </p>
                        <div class="hack1">
                          <div class="hack2 scroll">

                            <table className="table">
                              <thead className="thead-dark">
                                <tr>
                                  <th>S.No</th>
                                  <th>Position</th>
                                  <th>Qualification</th>
                                  <th>Emp Code</th>
                                  <th>Emp Name</th>
                                  <th>Remark</th>
                                </tr>
                              </thead>
                              <tbody id="tbl">
                                {this.state.team_strength.map((item, idx) => (
                                  <tr key={"ts-" + idx}>
                                    <td> {idx + 1} </td>

                                    <td>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="position"
                                        readOnly
                                        placeholder="Position"
                                        name="position"
                                        onChange={(evnt) => this.handleChangeMul(idx, evnt, "teamStrength")}
                                        value={item.position}
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="qualification"
                                        placeholder="Qualification"
                                        name="qualification"
                                        onChange={(evnt) => this.handleChangeMul(idx, evnt, "teamStrength")}
                                        value={item.qualification}
                                        readOnly
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="employee_code"
                                        placeholder="Emp Code"
                                        name="employee_code"
                                        onChange={(evnt) => this.handleChangeMul(idx, evnt, "teamStrength")}
                                        value={item.employee_code}
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="employee_name"
                                        placeholder="Emp Name"
                                        name="employee_name"
                                        onChange={(evnt) => this.handleChangeMul(idx, evnt, "teamStrength")}
                                        value={item.employee_name}
                                      />
                                    </td>

                                    <td>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="team"
                                        placeholder="Remark"
                                        name="team"
                                        onChange={(evnt) => this.handleChangeMul(idx, evnt, "teamStrength")}
                                        value={item.team}
                                      />
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>

                          </div>
                        </div>

                        <p className="lead"> Finances </p>
                        {/* Choose Year & Quarter */}
                        <div className="row">
                          <div className="col-md-4">
                            <div className="form-group">
                              <label htmlFor="centreName">Choose Year </label>
                              <select
                                class="form-control "
                                name="year"
                                id="year"
                                value={this.state.selectedYear}
                                onChange={this.onChangeYear}
                              >
                                <option selected=""> select </option>
                                {yearsSelectOption}
                              </select>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label htmlFor="projectName">Choose activities</label>
                              <select
                                class="form-control "
                                name="project_name"
                                id="project_name"
                                value={this.state.selectedQuarter}
                                onChange={this.handleChangeQuarter}
                              >
                                <option selected=""> select </option>
                                <option value="Q1"> Q1 </option>
                                <option value="Q2"> Q2 </option>
                                <option value="Q3"> Q3 </option>
                                <option value="Q4"> Q4 </option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label htmlFor="projectName">Save Below Rows</label>
                              <button
                                className="form-control btn btn-primary"
                                type="button"
                                onClick={() => this.saveRows()}
                              >
                                Button
                              </button>
                            </div>
                          </div>

                        </div>

                        {/* Received Payment */}
                        <p>Received Amount</p>
                        <div className="card">
                          <table class="table">
                            <thead class="thead-light card-header">
                              <th scope="col"> S.no </th>
                              <th scope="col"> Received Amount </th>
                              <th scope="col"> Date </th>
                              <th scope="col"> Remarks  </th>
                              <th style={{ width: "100px" }}>Action  </th> 
                            </thead>
                            <tbody className="card-body">
                              {this.state.finance_recieved.map((amt, idx) => (
                                <tr key={"ra-" + idx}>
                                  <td> {idx + 1} </td>
                                  <th> <input
                                    type="text"
                                    className="form-control"
                                    id="amount_recieved"
                                    placeholder="Amount Recieved"
                                    name="amount_recieved"
                                    onChange={(evnt) => this.handleChangeMul(idx, evnt, "amountRecieved")}
                                    value={amt.amount_recieved}
                                  /> </th>
                                  <th> <input
                                    type="date"
                                    className="form-control"
                                    id="amount_recieved_date"
                                    name="amount_recieved_date"
                                    onChange={(evnt) => this.handleChangeMul(idx, evnt, "amountRecieved")}
                                    value={amt.amount_recieved_date}
                                  /> </th>
                                  <th>
                                    <textarea
                                      className="form-control "
                                      id="amount_remark"
                                      name="amount_remark"
                                      placeholder="Remarks..."
                                      onChange={(evnt) =>  this.handleChangeMul(idx, evnt, "amountRecieved")}
                                      value={amt.amount_remark}
                                    ></textarea>
                                  </th>
                                  <input
                                    type="hidden"
                                    className="form-control"
                                    name="project_plan_id"
                                    id="project_plan_id"
                                    readOnly
                                    onChange={(evnt) => this.handleChangeMul(idx, evnt, "amountRecieved")}
                                    value={amt.project_plan_id}
                                  />
                                  <input
                                    type="hidden"
                                    className="form-control"
                                    name="year"
                                   readOnly
                                    onChange={(evnt) => this.handleChangeMul(idx, evnt, "amountRecieved")}
                                    value={amt.year}
                                  />
                                  <td>
                                    <button
                                      className="btn btn-danger btn-sm m-1"
                                      type="button"
                                      onClick={() => this.handleAddRow("amountRecieved")}
                                    >
                                      +
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-success btn-sm"
                                      onClick={() => this.handleRemoveSpecificRow(idx, "amountRecieved")}
                                    >
                                      -
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                            
                          </table>
                          <div class="card-footer row">
                          {this.state.resStatusFinanceReceived.messages !== '' ?
                            (<div className={ "p-2 form-control col-md-8 text-center "+(this.state.resStatusFinanceReceived.isError ? "alert-success" : "alert-danger")}> 
                              {this.state.resStatusFinanceReceived.messages} 
                            </div>)
                            : ""}
                              <button type="button" className="btn btn-primary col-md-2  ml-auto" onClick={this.saveAmount} > Save </button>

                            </div>
                        </div>
                        {/* Calculation field  */}
                        <div className="card">
                          <table class="table">
                            <thead class="thead-light card-header">
                              <th scope="col"> Allocated Budget </th>
                              <th scope="col"> Received Amount </th>
                              <th scope="col"> Expenditure </th>
                              <th scope="col"> Balance  </th>
                              <th scope="col"> Utilization </th>
                            </thead>
                            <tbody className="card-body">
                              <tr>
                                <th> 73684980 </th>
                                <th> -- </th>
                                <th> -- </th>
                                <th> -- </th>
                                <th> -- </th>
                              </tr>

                            </tbody>
                          </table>
                        </div>

                        {/*  Expenditure Details */}
                        <div class="hack1">
                          <div class="hack2 scroll">
                            <table className="table">
                              <thead className="thead-dark">
                                <tr>
                                  <th>Year</th>
                                  <th>Budget Head</th>
                                  <th>Allocated Fund</th>
                                  <th>Milestone</th>
                                  <th>Recieved Amount</th>
                                  <th>Date</th>
                                  <th>Expenditure</th>
                                  <th>Balance</th>
                                  <th>Utilization(%)</th>
                                </tr>
                              </thead>
                              <tbody id="tbl2">
                                {this.state.finances.map((item, idx) => (
                                  <tr key={"fin-" + idx}>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="year"
                                        placeholder="Year"
                                        name="year"
                                        readOnly
                                        onChange={(evnt) => this.handleChangeMul(idx, evnt, "finances")}
                                        value={item.year}
                                        style={{ width: "115px" }}
                                      />
                                      {item.errorMsg !== '' ? <strong>{item.errorMsg}</strong> : ''}
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="budget_head"
                                        placeholder="Budget Head"
                                        name="budget_head"
                                        readOnly
                                        onChange={(evnt) => this.handleChangeMul(idx, evnt, "finances")}
                                        value={item.budget_head}
                                        style={{ width: "150px" }}
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="allocated_fund"
                                        readOnly
                                        placeholder="Allocated Fund"
                                        name="allocated_fund"
                                        onChange={(evnt) => this.handleChangeMul(idx, evnt, "finances")}
                                        value={item.allocated_fund}
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="allocated_fund"
                                        readOnly
                                        placeholder="Allocated Fund"
                                        name="allocated_fund"
                                        onChange={(evnt) => this.handleChangeMul(idx, evnt, "finances")}
                                        value={item.milestone}
                                        style={{ width: "350px" }}
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="received_amt"
                                        placeholder="Received amt"
                                        name="received_amt"
                                        onChange={(evnt) => this.handleChangeMul(idx, evnt, "finances")}
                                        value={item.received_amt}
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="date"
                                        className="form-control"
                                        id="date"

                                        placeholder="Date"
                                        name="date"
                                        onChange={(evnt) => this.handleChangeMul(idx, evnt, "finances")}
                                        value={item.date}
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="expenditure"

                                        placeholder="Expenditure"
                                        name="expenditure"
                                        onChange={(evnt) => this.handleChangeMul(idx, evnt, "finances")}
                                        value={item.expenditure}
                                        style={{ width: "350px" }}
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="balance"

                                        placeholder="Balance"
                                        name="balance"
                                        onChange={(evnt) => this.handleChangeMul(idx, evnt, "finances")}
                                        value={item.balance}
                                        style={{ width: "150px" }}
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="utilization"

                                        placeholder="Utilization"
                                        name="utilization"
                                        onChange={(evnt) => this.handleChangeMul(idx, evnt, "finances")}
                                        value={item.utilization}
                                      />
                                    </td>



                                  </tr>
                                ))}

                              </tbody>
                            </table>
                          </div>
                        </div>


                        <p className="lead"> Project Activities </p>
                        <div class="hack1">
                          <div class="hack2 scroll">

                            <table className="table">
                              <thead className="thead-dark">
                                <tr>
                                  <th style={{ width: "230px" }}>Type</th>
                                  <th style={{ width: "200px" }}>Start Date</th>
                                  <th style={{ width: "200px" }}>End Date</th>
                                  <th> Duration <small>in days</small> </th>
                                  <th style={{ width: "200px" }}>Status</th>
                                  <th style={{ width: "200px" }}> Progress</th>
                                </tr>
                              </thead>
                              <tbody id="tbl3">
                                {this.state.project_activities.map((item, idx) => (
                                  <tr key={"pa-" + idx}>
                                    <td>
                                      <select
                                        class="form-control select2 select2-hidden-accessible"
                                        name="type"
                                        id="type"
                                        readOnly
                                        onChange={(evnt) => this.handleChangeMul(idx, evnt, "project_activities")}
                                        value={item.type}
                                      >
                                        <option selected="selected">select</option>
                                        <option value="major">Major</option>
                                        <option value="critical">Critical</option>
                                        <option value="remaining">Remaining</option>
                                      </select>
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="start_date"
                                        readOnly
                                        name="start_date"
                                        onChange={(evnt) => this.handleChangeMul(idx, evnt, "project_activities")}
                                        value={moment(item.start_date).format("DD-MM-YYYY")}
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="end_date"
                                        readOnly
                                        name="end_date"
                                        onChange={(evnt) => this.handleChangeMul(idx, evnt, "project_activities")}
                                        value={moment(item.end_date).format("DD-MM-YYYY")}
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control"
                                        name="duration"
                                        readOnly
                                        id="duration"
                                        onChange={(evnt) => this.handleChangeMul(idx, evnt, "project_activities")}
                                        value={item.duration}
                                      />
                                    </td>
                                    <td>
                                      <textarea
                                        className="form-control "
                                        id="status"
                                        name="status"
                                        placeholder="Status"
                                        onChange={(evnt) => this.handleChangeMul(idx, evnt, "project_activities")}
                                        value={item.status}
                                      ></textarea>
                                    </td>
                                    <td>
                                      <textarea
                                        className="form-control "
                                        id="progress"
                                        name="progress"
                                        placeholder="progress"
                                        onChange={(evnt) => this.handleChangeMul(idx, evnt, "project_activities")}
                                        value={item.progress}
                                      ></textarea>
                                    </td>

                                  </tr>
                                ))}
                              </tbody>
                            </table>

                          </div>
                        </div>

                        <p className="lead"> Other Activities </p>
                        <div class="hack1">
                          <div class="hack2 scroll">

                            <table className="table">
                              <thead className="thead-dark">
                                <tr>
                                  <th> Activities </th>
                                  <th>Date</th>

                                  <th>Status</th>
                                </tr>
                              </thead>
                              <tbody id="tbl4">
                                {this.state.other_activities.map((item, idx) => (
                                  <tr key={"oa-" + idx}>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="other_activity"
                                        readOnly
                                        placeholder="Team strength"
                                        name="other_activity"
                                        onChange={(evnt) => this.handleChangeMul(idx, evnt, "other_activities")}
                                        value={item.other_activity}
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="other_date"
                                        placeholder="Date"
                                        name="other_date"
                                        onChange={(evnt) => this.handleChangeMul(idx, evnt, "other_activities")}

                                        value={moment(item.other_date).format("DD-MM-YYYY")}
                                      />
                                    </td>

                                    <td>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="status"
                                        placeholder="Status"
                                        name="status"
                                        onChange={(evnt) => this.handleChangeMul(idx, evnt, "other_activities")}
                                        value={item.status}
                                      />
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>

                          </div>
                        </div>

                      </div>
                      <div className="card-footer">
                        <button type="button" className="btn btn-primary" onClick={this.submitForm}>
                          Update
                        </button>
                      </div>
                      <div className="col-md-9">
                        {this.state.resStatus.messages !== '' ?
                          (<div className={"alert " + (this.state.resStatus.isError ? "alert-success" : "alert-danger")}> {this.state.resStatus.messages} </div>)
                          : ""}
                      </div>

                    </form>
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

// export default ProjectPlanEdit;
export default withRouter(ProjectPlanEdit);

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
          project_plan_id: "",
          year: ""
        },
      ],
      external_agency: [
        {
          agency_name: "",
          agency_specification: "",
          type: "",
          amount: "",
        },
      ],
      totalAllocatedFund: 0.00,
      totalActualRecievedFund: 0.00,
      totalExpenditureFund: 0.00
    }
    this.onChangeYear = this.onChangeYear.bind(this);
    this.handleChangeQuarter = this.handleChangeQuarter.bind(this);
    // this.saveRows = this.saveRows.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.handleChangeMul = this.handleChangeMul.bind(this);
    this.handleAddRow = this.handleAddRow.bind(this);
    this.handleRemoveSpecificRow = this.handleRemoveSpecificRow.bind(this);
    // this.saveAmount = this.saveAmount.bind(this);
  }



  // For simple fields
  handleChangeQuarter(e) {
    this.setState({ selectedQuarter: e.target.value });
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
      let total = 0.00
      finances.forEach(element => {
        if (element.expenditure && !isNaN(element.expenditure)) {
          total += parseFloat(element.expenditure)
        }
      })
      // if (name === 'expenditure' && total > this.state.totalActualRecievedFund) {
      //   alert("Expenditure cannot be more than recieved amounts")
      //   return
      // }

      this.setState({
        finances: finances,
        totalExpenditureFund: total
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
    } else if (type === "externalAgency") {
      const { name, value } = e.target;
      const external_agency = this.state.external_agency;
      external_agency[idx][name] = value;
      this.setState({
        external_agency: external_agency,
      });
    }
  }

  onChangeYear(e) {
    var thizz = this
    this.setState({ selectedYear: e.target.value })

    // for received amount 
    if (e.target.value) {
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
        // console.log(response.data.finances)
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
            expenditure: item.expenditure,
            finance_id: item.id
          })
        }
        let total = 0.00
        financeesList.forEach(element => {
          if (element.expenditure && !isNaN(element.expenditure)) {
            total += parseFloat(element.expenditure)
          }
        })

        let total2 = 0.00
        response.data.finance_received.forEach(element => {
          if (element.amount_recieved && !isNaN(element.amount_recieved)) {
            total2 += parseFloat(element.amount_recieved)
          }
        })
        this.setState({
          finances: financeesList,
          totalAllocatedFund: response.data.total,
          totalExpenditureFund: total,
          totalActualRecievedFund: total2,
          finance_recieved: response.data.finance_received.length > 0 ? response.data.finance_received : finance_recieved
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
      other_activities: thizz.state.other_activities,
      finance_recieved: thizz.state.finance_recieved
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
      finance_recieved: finance_recieved
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
        for (let i = 0; i < response.data.teamStrength.length; i++) {
          var eachItem = response.data.teamStrength[i]
          var teamLength = eachItem.team
          var teamByTeamStrength = response.data.teams.filter(
            function (x) { return x.team_strength_id === eachItem.id }
          )
          var totalLength = teamByTeamStrength.length
          for (let j = 0; j < totalLength; j++) {
            var item = teamByTeamStrength[j]
            financeesList.push({
              id: item.id,
              project_plan_id: item.project_plan_id,
              remark: item.remark,
              team_strength_id: eachItem.id,
              position: item.position,
              experience: item.experience,
              qualification: item.qualification,
              salary_slab: item.salary_slab,
              employee_code: item.employee_code,
              employee_name: item.employee_name,
            })
          }

          var pendingTeamCount = teamLength - totalLength;
          if (pendingTeamCount > 0) {
            for (let j = 0; j < pendingTeamCount; j++) {

              financeesList.push({
                team_strength_id: eachItem.id,
                project_plan_id: eachItem.project_plan_id,
                remark: "",
                position: eachItem.position,
                experience: eachItem.experience,
                qualification: eachItem.qualification,
                salary_slab: eachItem.salary_slab,
                employee_code: '',
                employee_name: '',
              })
            }
          }
        }
        //var totalTeamStren
        this.setState({ team_strength: financeesList })
        financeesList = [];
        for (let i = 0; i < response.data.projectActivity.length; i++) {
          var item2 = response.data.projectActivity[i]
          financeesList.push({
            id: item2.id,
            type: item2.type,
            start_date: item2.start_date,
            end_date: item2.end_date,
            duration: item2.duration,
            activities: item2.activities,
            remarks: item2.remarks,
            status: item2.status,
            progress: item2.progress

          })
        }
        this.setState({ project_activities: financeesList })
        financeesList = [];
        for (let i = 0; i < response.data.otherActivity.length; i++) {
          var item3 = response.data.otherActivity[i]
          financeesList.push({
            id: item3.id,
            other_activity: item3.activities,
            other_date: item3.date,
            status: item3.status
          })
        }
        this.setState({ other_activities: financeesList })
      }).catch((error) => {
        console.log(error);
      })

  }

  // For simple fields
  handleChange(e) {
    let singleField = this.state.singleFields;
    singleField[e.target.name] = e.target.value;
    this.setState({ singleFields: singleField });
  }


  // SET MULTIPLE ROW
  // handleChangeMul2(idx, e, type) {

  //   if (type === "amountRecieved" && this.state.selectedYear && this.state.selectedQuarter) {
  //     const { name, value } = e.target;
  //     const finance_recieved = this.state.finance_recieved;
  //     if('checked' in e.target) {
  //       console.log(e.target.checked)
  //       finance_recieved[idx][name] = e.target.checked === true ? true : false ;
  //   }else{
  //     finance_recieved[idx][name] = value;

  //   }


  //     finance_recieved[idx]['project_plan_id'] = this.props.params.id
  //     finance_recieved[idx]['year'] = this.state.selectedYear
  //     let recievedAmountTotal = 0.00
  //     finance_recieved.forEach(element => {
  //       if (element.amount_recieved && !isNaN(element.amount_recieved)) {
  //         recievedAmountTotal += parseFloat(element.amount_recieved)
  //       }
  //     })

  //     if (name === 'amount_recieved' && recievedAmountTotal > this.state.totalAllocatedFund) {
  //       alert("Received amount cannot be more than allocated fund")
  //       return
  //     }
  //     this.setState({
  //       finance_recieved: finance_recieved,
  //       totalActualRecievedFund: recievedAmountTotal
  //     });
  //   } else if (type === "amountRecieved") {
  //     alert("Please select year & quarter")
  //     return
  //   }
  // }

  handleRemoveSpecificRow(idx, type) {
    if (this.state.finance_recieved.length > 1 && type === "amountRecieved") {
      const finance_recieved = this.state.finance_recieved;
      finance_recieved.splice(idx, 1);
      let total = 0.00
      finance_recieved.forEach(element => {
        if (element.amount_recieved && !isNaN(element.amount_recieved)) {
          total += parseFloat(element.amount_recieved)
        }
      })
      this.setState({
        totalActualRecievedFund: total
      });
      this.setState({ finance_recieved: finance_recieved });

    }
    if (this.state.external_agency.length > 1 && type === "externalAgency") {
      const external_agency = this.state.external_agency;
      external_agency.splice(idx, 1);


      this.setState({ external_agency: external_agency });

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
    if (type === "externalAgency") {
      const item = {
        agency_name: "",
        agency_specification: "",
        type: "",
        amount: "",
      };
      this.setState({
        external_agency: [...this.state.external_agency, item],
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

    const mystyle = {
      float: "center",
      margin: 0
    };
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
                    <div className="card-header bg-gradient-orange text-center text-white">
                      <h5 className="mystyle"> Project Finance Details </h5>
                    </div>
                    <div className="card">
                    <div className="row pl-5 ml-5">
                      <div className="col-md-3">
                        <div
                          className="card text-white bg-primary"
                         
                        >
                          <div className="card-header">Allocated Budget(Cr.)</div>
                          <div className="card-body">
                            <p>964840000</p>
                          </div>
                        </div>
                        

                      </div>
                      <div className="col-md-3">
                        <div
                          className="card text-white bg-success"
                         
                        >
                          <div className="card-header">Fund Released(Cr.)</div>
                          <div className="card-body">
                            <p>251617150</p>
                          </div>
                        </div>
                        

                      </div>
                      <div className="col-md-3">
                        <div
                          className="card text-white bg-warning"
                         
                        >
                          <div className="card-header" style={{color:"white"}}> Fund Utilized(Cr.)</div>
                          <div className="card-body">
                            <p style={{color:"white"}}>251617150</p>
                          </div>
                        </div>
                        

                      </div>
                    </div>
                    </div>
                    <form>
                      <div className="card-body">
                        <div className="row">

                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="centreName">Centre Name </label>

                              <select
                                className="form-control "
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
                                className="form-control "
                                name="project_name"
                                id="project_name"
                                value={this.state.singleFields.project_name}
                                readOnly
                              >
                                <option value=''> select </option>
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
                                className="form-control "
                                name="team_head"
                                id="team_head"
                                value={this.state.singleFields.project_head}
                                readOnly
                              >
                                <option value=''> select </option>
                                {team}
                              </select>
                            </div>
                          </div>

                          <div className="form-group col-md-6">
                            <label for="fundingMinistry/Agency/Dept">
                              Funding Ministry/Agency/Dept.
                            </label>

                            <select
                              className="form-control "
                              name="funding_ministry"
                              id="funding_ministry"
                              value={this.state.singleFields.funding_agency}
                              readOnly
                            >
                              <option value=''> select </option>
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
                            <label for="startDate">Start Date</label>
                            <input
                              type="text"
                              name="start_date"
                              id="start_date"
                              readOnly
                              className="form-control"
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
                              className="form-control"
                              value={moment(this.state.singleFields.end_date).format("DD-MM-YYYY")}
                            />
                          </div>
                        </div>

                        {/* <p className="lead"> Team Strength </p>
                        <div className="hack1">
                          <div className="hack2 scroll">

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
                                        id="remark"
                                        placeholder="Remark"
                                        name="remark"
                                        onChange={(evnt) => this.handleChangeMul(idx, evnt, "teamStrength")}
                                        value={item.remark}
                                      />
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>

                          </div>
                        </div> */}
                        <p className="bg-gradient-olive form-control text-center">Finances</p>

                        {/* Choose Year & Quarter */}
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="centreName">Choose Year </label>
                              <select
                                className="form-control "
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
                        </div>

                        {/* Received Payment */}
                        <p className="text-custome-color">Received Amount</p>
                        <div className="card">
                          <table className="table">
                            <thead className="thead-light card-header">
                              <th scope="col"> Adjustment? </th>
                              <th scope="col"> Received Amount </th>
                              <th scope="col"> Date </th>
                              <th scope="col"> Remarks  </th>
                              {/* <th style={{ width: "100px" }}>Action  </th> */}
                            </thead>
                            <tbody className="card-body">
                              {this.state.finance_recieved.map((amt, idx) => (
                                <tr key={"ra-" + idx}>
                                  <td>
                                    <div class="form-check ml-5">
                                      <label class="form-check-label">
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          id="is_adjustment"
                                          name="is_adjustment"
                                          readOnly
                                          checked={amt.is_adjustment}
                                          value={amt.is_adjustment}
                                        />
                                      </label>
                                    </div>
                                  </td>
                                  <th> <input
                                    type="number"
                                    className="form-control"
                                    id="amount_recieved"
                                    placeholder="Amount Recieved"
                                    name="amount_recieved"
                                    readOnly
                                    value={amt.amount_recieved}
                                  /> </th>
                                  <th> <input
                                    type="date"
                                    className="form-control"
                                    id="amount_recieved_date"
                                    name="amount_recieved_date"
                                    readOnly
                                    value={moment(amt.amount_recieved_date).format('YYYY-MM-DD')}
                                  /> </th>
                                  <th>
                                    <textarea
                                      className="form-control "
                                      id="amount_remark"
                                      name="amount_remark"
                                      placeholder="Remarks..."
                                      readOnly
                                      value={amt.amount_remark}
                                    ></textarea>
                                  </th>
                                  <input
                                    type="hidden"
                                    className="form-control"
                                    name="project_plan_id"
                                    id="project_plan_id"
                                    readOnly
                                    onChange={(evnt) => this.handleChangeMul2(idx, evnt, "amountRecieved")}
                                    value={amt.project_plan_id}
                                  />
                                  <input
                                    type="hidden"
                                    className="form-control"
                                    name="year"
                                    readOnly
                                    onChange={(evnt) => this.handleChangeMul2(idx, evnt, "amountRecieved")}
                                    value={amt.year}
                                  />
                                  <td>
                                    {/* <button
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
                                    </button> */}
                                  </td>
                                </tr>
                              ))}
                            </tbody>

                          </table>
                          {/* <div className="card-footer row">
                            {this.state.resStatusFinanceReceived.messages !== '' ?
                              (<div className={"p-2 form-control col-md-8 text-center " + (this.state.resStatusFinanceReceived.isError ? "alert-success" : "alert-danger")}>
                                {this.state.resStatusFinanceReceived.messages}
                              </div>)
                              : ""}
                            <button type="button" className="btn btn-primary col-md-2  ml-auto" onClick={this.saveAmount} > Save </button>

                          </div> */}
                        </div>
                        {/* Calculation field  */}
                        <div className="card">
                          <table className="table">
                            <thead className="thead-light card-header">
                              <th scope="col"> Allocated Budget </th>
                              <th scope="col"> Received Amount </th>
                              <th scope="col"> Expenditure </th>
                              <th scope="col"> Balance  </th>
                            </thead>
                            <tbody className="card-body">
                              <tr>
                                <th> {this.state.totalAllocatedFund} </th>
                                <th> {this.state.totalActualRecievedFund} </th>
                                <th> {this.state.totalExpenditureFund} </th>
                                <th> {this.state.totalActualRecievedFund - this.state.totalExpenditureFund} </th>
                              </tr>

                            </tbody>
                          </table>
                        </div>

                        {/*  Expenditure Details */}
                        <div className="hack1">
                          <div className="hack2 scroll">
                            <table className="table">
                              <thead className="thead-dark">
                                <tr>
                                  <th>Year</th>
                                  <th>Budget Head</th>
                                  <th>Allocated Fund</th>
                                  <th>Expenditure</th>
                                  <th>Milestone</th>
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

                                        value={item.year}
                                        style={{ width: "115px" }}
                                      />

                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="budget_head"
                                        placeholder="Budget Head"
                                        name="budget_head"
                                        readOnly

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

                                        value={item.allocated_fund}
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="expenditure"

                                        placeholder="Expenditure"
                                        name="expenditure"
                                        readOnly
                                        value={item.expenditure}

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

                                        value={item.milestone}
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
                        <button type="button" className="btn bg-gradient-orange text-white" >
                          Back
                        </button>
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

// export default ProjectFinance;
export default withRouter(ProjectFinance);

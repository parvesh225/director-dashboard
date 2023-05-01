import React, { Component, useState } from "react";
// import { useParams } from "react-router-dom";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import withRouter from '../withRouter';
const axios = require("axios").default;


function EmployeeRow(props) {
  
  const [emp_code, set_emp_code] = useState(""); 
  const [emp_name, set_emp_name] = useState(""); 


  return <>
    <tr>
              <td> {props.index} </td>  
        
              <td>
                <input
                  type="text"
                  className="form-control"
                  id="position"
                  readOnly
                  placeholder="Position"
                  name="position"
                  value={props.values.position}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  id="qualification"
                  placeholder="Qualification"
                  name="qualification"
                  value={props.values.qualification}
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
                  onChange={ (evnt) => {set_emp_code(evnt.target.value)} }
                  value={emp_code}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  id="employee_name"
                  placeholder="Emp Name"
                  name="employee_name"
                  onChange={ (evnt) => {set_emp_name(evnt.target.value)} }
                  value={emp_name}
                />
              </td>
              
              <td>
                <input
                  type="text"
                  className="form-control"
                  id="team"
                  placeholder="Remark"
                  name="team"
                  value={props.values.team}
                />
              </td>
            </tr>
  </>

}

class ProjectPlanEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      centre: [],
      project: [], 
      project_head: [],
      funding_agency: [],

      singleFields: {
        id:"",
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
      years:[],
      selectedYear:"",
      selectedQuarter:"",
      team_strength: [
        {
          team: "",
          position: "",
          experience: "",
          qualification: "",
          salary_slab: "",
          employee_code:"",
          employee_name:""
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
      }
    }
    this.onChangeYear = this.onChangeYear.bind(this);
    this.handleChangeQuarter = this.handleChangeQuarter.bind(this);
    this.saveRows = this.saveRows.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.renderTeamRows = this.renderTeamRows.bind(this)
  }

  // For simple fields
  handleChangeQuarter(e) {
    this.setState({ selectedQuarter: e.target.value });
  }

  saveRows(){
    if(!this.state.selectedQuarter || !this.state.selectedYear){
      alert("Please select year and quarter to save")
      return
    }
    var thizz= this
    for (let i = 0; i < this.state.finances.length; i++) {
      axios({
        method: "post",
        url: process.env.REACT_APP_BASE_URL + "/api/admin/fetch-finances-by-year-project",
        data: thizz.state.finances[i]
    }).then((response)=> {
      console.log(response.data)
      var resp  = response.data
      var msg = ""
      if(resp.status === 'true' ||  resp.status === true){
        msg = "Successfully Save"
      }else{
        msg = resp.message
      }
      const finances = this.state.finances;
      finances[i]['errorMsg'] = msg;
      console.log(finances)
        this.setState({
          finances: finances,
        });
    }).catch((error)=> {
      console.log(error.response.data);
      var resp  = error.response.data
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
    } else if(type === "finances") {
      const { name, value } = e.target;
      const finances = this.state.finances;
      finances[idx][name] = value;
      this.setState({
        finances: finances,
      });
    } else if(type === "project_activities") {
      const { name, value } = e.target;
      const project_activities = this.state.project_activities;
      project_activities[idx][name] = value;
      this.setState({
        project_activities: project_activities,
      });
    } else if(type === "other_activities") {
      const { name, value } = e.target;
      const other_activities = this.state.other_activities;
      other_activities[idx][name] = value;
      this.setState({
        other_activities: other_activities,
      });
    }
  }

  onChangeYear(e){
    var thizz = this
    this.setState({selectedYear:e.target.value})
    if(!e.target.value){
      this.setState({
        finances: []
      })
    }
    axios.get(process.env.REACT_APP_BASE_URL + "/api"+
    "/admin/fetch-finances-by-year-project/"+e.target.value+"/"+this.state.singleFields.id)
    .then((response)=> {
    console.log(response.data.finances)
    var financeesList = [];
    for (let i = 0; i < response.data.finances.length; i++) {
      var item = response.data.finances[i]
      financeesList.push({
        year:   item.year,
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
    
    }).catch((error)=> {
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
    other_activities:thizz.state.other_activities
  }
  //Send request to backend
  axios({
    method:"put",
    url:process.env.REACT_APP_BASE_URL +"/api/admin/project-plan",
    data: myObj
  }).then(function(response) {
    var data = response.data
    if (data.status === true && data) {
      var resStatus = thizz.state.resStatus;
      resStatus.isError = true;
      resStatus.messages = data.message;
      thizz.setState({ resStatus: resStatus });
    }

  }).catch(function(error) {
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
    // console.log('Props:', this.props.params.id);
    axios.get(process.env.REACT_APP_BASE_URL + "/api/admin/project-plan/"+this.props.params.id)
    .then((response)=> {
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
    this.setState({team_strength: financeesList})
    financeesList = [];
    for (let i = 0; i < response.data.projectActivity.length; i++) {
      var item = response.data.projectActivity[i]
      financeesList.push({
        id:   item.id,
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
    this.setState({project_activities: financeesList})
    financeesList = [];
    for (let i = 0; i < response.data.otherActivity.length; i++) {
      var item = response.data.otherActivity[i]
      financeesList.push({
        id:   item.id,
        other_activity: item.activities,
        other_date: item.date,
        status: item.status
      })
    }
    this.setState({other_activities: financeesList})
    }).catch((error)=> {
      console.log(error.response.data);
    })
        
}

  // For simple fields
  handleChange(e) {
    let singleField = this.state.singleFields;
    singleField[e.target.name] = e.target.value;
    this.setState({ singleFields: singleField });
  }


  renderTeamRows() {
    let res = []
    let cnt = 0;
    this.state.team_strength.forEach((item, idx) => {
      let teamSize = parseInt(item.team)

      for(let i=0; i<teamSize; i++) {
        res.push(
          <tr key={"ts-" + cnt }>
              <td> {cnt+1} </td>  
        
              <td>
                <input
                  type="text"
                  className="form-control"
                  id="position"
                  readOnly
                  placeholder="Position"
                  name="position"
                  onChange={ (evnt) =>this.handleChangeMul(idx,evnt,"teamStrength") }
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
                  onChange={ (evnt) =>this.handleChangeMul(idx,evnt,"teamStrength") }
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
                  onChange={ (evnt) =>this.handleChangeMul(idx,evnt,"teamStrength") }
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
                  onChange={ (evnt) =>this.handleChangeMul(idx,evnt,"teamStrength") }
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
                  onChange={(evnt) =>this.handleChangeMul(idx,evnt,"teamStrength")}
                  value={item.team}
                />
              </td>
            </tr>
        )
        cnt += 1
      }
    })

    return res
  }




  render() {
    var yearsSelectOption = this.state.years.map(function (year, index) {
      return <option   key={year} value={year}>{year}</option>;
  })

  let centre = this.state.centre.map(function (center, index) {
      
    return <option   key={center.id} value={center.centre_code} >{center.centre_name}</option>;
})
  let project = this.state.project.map(function (project, index) {
    return <option key={project.id}  value={project.project_code}> {project.project_name} </option>;

})

  let team = this.state.project_head.map(function(team, index) {
    return <option key={team.id} value={team.employee_code}> {team.employee_name} </option>
  })

  let agency = this.state.funding_agency.map(function(agency, index) {
    return <option key={agency.id} value={agency.agency_code}>  {agency.agency_name	} </option>
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
                                className="form-control "
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
                            <label htmlFor="fundingMinistry/Agency/Dept">
                              Funding Ministry/Agency/Dept.
                            </label>
                           
                             <select
                              className="form-control "
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
                              className="form-control"
                              value={this.state.singleFields.start_date}
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
                              value={this.state.singleFields.end_date}
                            />
                          </div>
                        </div>

                        <p className="lead"> Team Strength </p>
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
                          {/* {this.renderTeamRows()} */}
                          {this.state.team_strength.map((item, index) => (
                            <EmployeeRow values={item} index={index}/>
                          ))}
                          </tbody>
                        </table>

                          </div>
                        </div>

                        <p className="lead"> Finances </p>
                        <div className="row">
                          <div className="col-md-4">
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
                          <div className="col-md-4">
                            <div className="form-group">
                              <label htmlFor="projectName">Choose activities</label>
                              <select
                                className="form-control "
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
                        <div className="hack1">
                          <div className="hack2 scroll">
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
                                  {item.errorMsg !== '' ? <strong>{item.errorMsg}</strong>: ''}
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
                        <div className="hack1">
                          <div className="hack2 scroll">

                          <table className="table">
                          <thead className="thead-dark">
                            <tr>
                              <th style={{ width: "230px" }}>Type</th>
                              <th>Start Date</th>
                              <th>End Date</th>
                              <th> Duration <small>in days</small> </th>
                              <th style={{ width: "200px" }}>Status</th>
                              <th style={{ width: "200px" }}> Progress</th>
                            </tr>
                          </thead>
                          <tbody id="tbl3">
                            {this.state.project_activities.map((item, idx)=> (
                               <tr key={"pa-" + idx}>
                              <td>
                                <select
                                  className="form-control select2 select2-hidden-accessible"
                                  name="type"
                                  id="type"
                                  readOnly
                                  onChange={ (evnt) =>this.handleChangeMul(idx,evnt,"project_activities") }
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
                                  onChange={ (evnt) =>this.handleChangeMul(idx,evnt,"project_activities") }
                                  value={item.start_date}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="end_date"
                                  readOnly
                                  name="end_date"
                                  onChange={ (evnt) =>this.handleChangeMul(idx,evnt,"project_activities") }
                                  value={item.end_date}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="duration"
                                  readOnly
                                  id="duration"
                                  onChange={ (evnt) =>this.handleChangeMul(idx,evnt,"project_activities") }
                                  value={item.duration}
                                />
                              </td>
                              <td>
                                <textarea
                                  className="form-control "
                                  id="status"
                                  name="status"
                                  placeholder="Status"
                                  onChange={ (evnt) =>this.handleChangeMul(idx,evnt,"project_activities") }
                                  value={item.status}
                                ></textarea>
                              </td>
                              <td>
                                <textarea
                                  className="form-control "
                                  id="progress"
                                  name="progress"
                                  placeholder="progress"
                                  onChange={ (evnt) =>this.handleChangeMul(idx,evnt,"project_activities") }
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
                        <div className="hack1">
                          <div className="hack2 scroll">

                          <table className="table">
                          <thead className="thead-dark">
                            <tr>
                              <th> Activities </th>
                              <th>Date</th>

                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody id="tbl4">
                            {this.state.other_activities.map((item, idx)=> (
                               <tr key={"oa-" + idx}>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="other_activity"
                                  readOnly
                                  placeholder="Team strength"
                                  name="other_activity"
                                  onChange={ (evnt) =>this.handleChangeMul(idx,evnt,"other_activities") }
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
                                  onChange={ (evnt) =>this.handleChangeMul(idx,evnt,"other_activities") }
                                  value={item.other_date}
                                />
                              </td>

                              <td>
                              <input
                                  type="text"
                                  className="form-control"
                                  id="status"
                                  placeholder="Status"
                                  name="status"
                                  onChange={ (evnt) =>this.handleChangeMul(idx,evnt,"other_activities") }
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

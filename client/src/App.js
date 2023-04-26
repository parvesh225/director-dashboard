import React, { Component } from 'react'
import { Routes, Route } from 'react-router-dom';
// import Login from './components/auth/Login';
// import Register from './components/auth/Register';
import Centre from './components/pages/Centre';
import Dashboard from './components/pages/Dashboard';
import FundingAgancy from './components/pages/FundingAgency';
import ProjectDetail from './components/pages/ProjectDetail';
import ProjectPlan from './components/pages/ProjectPlan';
import ProjectPlanEdit from './components/pages/ProjectPlanEdit';
import TeamLeader from './components/pages/TeamLeader';
import ProjectList from './components/pages/ProjectList';

class App extends Component {
  render() {
    return <>
    <Routes>
      {/* <Route path={""}  element={<Login/>} ></Route>
      <Route path={"/"}  element={<Login/>} ></Route>
      <Route path={"/register"}  element={<Register/>} ></Route> */}
      <Route path={"/admin/dashboard"}  element={<Dashboard/>} ></Route>
      <Route path={"/admin/centre"}  element={<Centre/>} ></Route>
      <Route path={"/admin/centre-edit/:id"}  element={<Centre/>} ></Route>
      <Route path={"/admin/funding-agency"}  element={<FundingAgancy/>} ></Route>
      <Route path={"/admin/project-detail"}  element={<ProjectDetail/>} ></Route>
      <Route path={"/admin/team-leader"}  element={<TeamLeader/>} ></Route>
      <Route path={"/admin/project-plan"}  element={<ProjectPlan/>} ></Route>
      <Route path={"/admin/project-plan-edit/:id"}  element={<ProjectPlanEdit/>} ></Route>
      <Route path={"/admin/project-plan-list"}  element={<ProjectList/>} ></Route>
      
     
    </Routes>
    
    </>
  }
}

export default App

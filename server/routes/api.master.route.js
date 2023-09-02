const express = require('express');
const router = express.Router();
const centreController = require('../controllers/api/centre.controller');
const fundingController = require('../controllers/api/funding.controller');
const projectController = require('../controllers/api/project.controller');
const teamleaderController = require('../controllers/api/teamleader.controller');
const projectPlanController = require('../controllers/api/projectPlan.controller');
const overallDashboardController = require('../controllers/api/viewProjectPlan.controller');
const welcomePageController = require('../controllers/api/welcome.controller');

// Centre Route
router.post('/admin/centre', centreController.insert);
router.put('/admin/centre/:id', centreController.update);
router.get('/admin/centre/:id', centreController.getCentreById);
router.get('/admin/centre/', centreController.getCentreList);
router.delete('/admin/centre/:id', centreController.deleteCentre);
// End Centre Route

// Funding Agency Route
router.post('/admin/funding', fundingController.insert);
router.put('/admin/funding/:id', fundingController.update);
router.get('/admin/funding/:id', fundingController.getFundingById);
router.get('/admin/funding/', fundingController.getFundingAgencyList);
router.delete('/admin/funding/:id', fundingController.deleteFundingAgency);
// End Funding Agency Route Route

// Project Route
router.post('/admin/project', projectController.insert);
router.put('/admin/project/:id', projectController.update);
router.get('/admin/project/:id', projectController.getProjectById);
router.get('/admin/project/', projectController.getProjectList);
router.delete('/admin/project/:id', projectController.deleteProject);

// End Project Route

// teamleader Route
router.post('/admin/teamleader', teamleaderController.insert);
router.put('/admin/teamleader/:id', teamleaderController.update);
router.get('/admin/teamleader/:id', teamleaderController.getTeamLeaderById);
router.get('/admin/teamleader/', teamleaderController.getTeamLeaderList);
router.delete('/admin/teamleader/:id', teamleaderController.deleteTeamLeader);
// End teamleader Route


//Project Plan
router.get('/admin/fetch-master-data',projectPlanController.fetchMasterData);
router.get('/admin/project-plan-list',projectPlanController.projectPlanList);
router.post('/admin/project-plan',projectPlanController.insert);
// router.post('/admin/finance-recieved',projectPlanController.financeRecieved);

router.put('/admin/project-plan',projectPlanController.edit);
router.get('/admin/project-plan/:id',projectPlanController.fetchProjectPlan);
router.get('/admin/subactivity/:activityMasterId',projectPlanController.readSubCategory);
router.get('/admin/fetch-finances-by-year-project/:year/:projectPlanId',projectPlanController.fetchProjectPlanFinances);
router.post('/admin/save-finances-by-year-project/:year/:projectPlanId',projectPlanController.saveProjectActivitywithTask);
router.get('/admin/fetch-project-activity/:year/:projectPlanId',projectPlanController.readProjectActivity);
router.post('/admin/fetch-finances-by-year-project',projectPlanController.saveProjectPlanFinancesBudget);
//End Project Plan


//Frontend
router.get('/landing-page', welcomePageController.overView);
router.get('/admin/overall-dashboard/:id',overallDashboardController.overallDashboard);
router.get('/project-activity-graph/:id/:year?',overallDashboardController.projectActivityGraph);
router.get('/admin/project-finance-details/:id',overallDashboardController.fundingDetail);
module.exports = router;
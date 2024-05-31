const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000/api";
const ai_baseURL = process.env.NEXT_PUBLIC_AI_BACKEND_URL

export const BACKEND_AI_ROUTES = {
  uniqueIdeaDetection: `${ai_baseURL}/unique-idea-detection`,
  automatedProjectAssessment: `${ai_baseURL}/automated-project-assessment`,
}

export const BACKEND_ROUTES = {
  login: `${baseURL}/auth/login`,
  logout: `${baseURL}/auth/logout`,
  refresh: `${baseURL}/auth/refresh`,
  sendOTP: `${baseURL}/auth/otp/send`,
  verifyOTP: `${baseURL}/auth/otp/verify`,
  sendRequest: 'http://localhost:3000/api/student/request/send',
  getProfile: `${baseURL}/user/account/get`,
  newPassword: `${baseURL}/user/account/password/new`,
  getAllCompanies: `${baseURL}/user/company/get/all`, // (user) companies

  getMentorDashboardDetails: `${baseURL}/mentor/dashboard`,
  updateProfileMentor: `${baseURL}/mentor/account/update`,
  updateProposalLinkMentor: `${baseURL}/mentor/proposal/updateLink`,
  deleteProposalMentor: `${baseURL}/mentor/proposal/delete`,
  getProposalsMentor: `${baseURL}/mentor/proposal/get`,
  createProposalMentor: `${baseURL}/mentor/proposal/create`,
  getMentorGroups: `${baseURL}/mentor/group/get/all`,
  getMentorGroupDetails: `${baseURL}/mentor/group/get/`,
  approveOrRejectProposalMentor: `${baseURL}/mentor/proposal/approve-reject/`,
  getAllMentorProjects: `${baseURL}/mentor/project/get/all`,
  getMentorProjectDetails: `${baseURL}/mentor/project/get/`,
  postMentorMilestoneMarks: `${baseURL}/mentor/project/mark`,
  getMentorPastProjects: `${baseURL}/mentor/project/get/past`,

  getGroupSelectedProposal: `${baseURL}/user/group/selected-proposal/get-all`,
  getMilestoneDetails: `${baseURL}/user/project/assigned-milestone`,
  getReceivedRequest: `${baseURL}/user/request/get/received`,
  getGroupDetails: `${baseURL}/user/group/get`,
  deleteRequest: `${baseURL}/user/request/decline`,
  acceptRequest: `${baseURL}/user/request/accept`,

  getAllMilestones: `${baseURL}/admin/milestone/get-all`, // (admin) milestones
  createMilestone: `${baseURL}/admin/milestone/create`, // (admin) milestones
  updateMilestone: `${baseURL}/admin/milestone/update/`, // (admin) milestones
  assignMilestone: `${baseURL}/admin/milestone/assign/`, // (admin) milestones

  createUser: `${baseURL}/admin/account/create`, // (admin) users
  getUsers: `${baseURL}/admin/user/get/`, // (admin) users

  getAllProjects: `${baseURL}/admin/project/get-all`, // (admin) projects
  markProjectFinished: `${baseURL}/admin/project/mark-finished/`, // (admin) projects

  getFYPGroups: `${baseURL}/admin/group/get/all`, // (admin) fyp groups
  finalizeAllFYPGroups: `${baseURL}/admin/group/finalize/all`, // (admin) fyp groups
  finalizeGroup: `${baseURL}/admin/group/finalize?`, // (admin) fyp groups
  unfinalizeGroup: `${baseURL}/admin/group/unfinalize?`, // (admin) fyp groups

  getAnnouncements: `${baseURL}/admin/notification/get/`, // (admin) announcements
  postAnnouncement: `${baseURL}/admin/notification/post`, // (admin) announcements
  updateAnnouncement: `${baseURL}/admin/notification/update`, // (admin) announcements
  deleteAnnouncement: `${baseURL}/admin/notification/delete`, // (admin) announcements

  createCompany: `${baseURL}/admin/company/create`, // (admin) companies
  deleteCompany: `${baseURL}/admin/company/delete?`, // (admin) companies
  updateCompany: `${baseURL}/admin/company/update?`, // (admin) companies

  getStudentDashboardDetails: `${baseURL}/student/dashboard`,
  studentRequestProposal: `${baseURL}/student/group/proposal/select-deselect`, // (student) proposals
  studentSubmitMilestone: `${baseURL}/student/project/`, // (student) milestones
  getStudentProjects: `${baseURL}/student/project/get`, // (student) projects
  studentGetAllProposals: `${baseURL}/student/proposal/get/all`, // (student) proposals
  
  updateProfileStudent: `${baseURL}/student/account/update`,
  
  getSearchAllMentors: `${baseURL}/user/mentor/get/all`,
  getSearchAllStudents: `${baseURL}/user/student/get/all`,

};

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  personal: {
    fullname: "",
    phone: "",
    email: "",
    website: "",
    linkedin_name: "",
    linkedin_url: "",
    github_name: "",
    github_url: "",
    address: "",
  },
  education: { educations: [] },
  experience: { experiences: [] },
  projects: { projects: [] },
  skills: { categories: [] },
  certifications: { certifications: [] }
};

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    updatePersonal(state, action) {
      state.personal = {
        ...state.personal,
        ...action.payload
      };
    },
    addEducation(state, action) {
      state.education.educations.push(action.payload);
    },
    addExperience(state, action) {
      state.experience.experiences.push(action.payload);
    },
    addProject(state, action) {
      state.projects.projects.push(action.payload);
    },
    addSkillCategory(state, action) {
      state.skills.categories.push(action.payload);
    },
    addCertification(state, action) {
      state.certifications.certifications.push(action.payload);
    }
  }
});

export const {
  updatePersonal,
  addEducation,
  addExperience,
  addProject,
  addSkillCategory,
  addCertification
} = resumeSlice.actions;

export default resumeSlice.reducer;

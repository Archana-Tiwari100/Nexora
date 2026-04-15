export type PersonalInfo = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
};

export type Education = {
  id: number;
  school: string;
  degree: string;
  fieldOfStudy: string;
  marks: string;
  startYear: string;
  endYear: string;
};

export type EducationFormValues = {
  school: string;
  degree: string;
  fieldOfStudy: string;
  marks: string;
  startYear: string;
  endYear: string;
};

export type Experience = {
  id: number;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type ExperienceFormValues = {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type Project = {
  id: number;
  title: string;
  techStack: string;
  description: string;
  link: string;
};

export type ProjectFormValues = {
  title: string;
  techStack: string;
  description: string;
  link: string;
};
export type ResumeTemplate = "classic" | "modern" | "minimal";
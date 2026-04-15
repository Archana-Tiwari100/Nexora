import { useEffect, useState } from "react";
import type {
  PersonalInfo,
  Education,
  Experience,
  Project,
} from "../types/types";

type ResumeState = {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: string[];
  projects: Project[];
};

const defaultData: ResumeState = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
  },
  education: [],
  experience: [],
  skills: [],
  projects: [],
};

function useResumeStorage() {
  const [data, setData] = useState<ResumeState>(() => {
    const saved = localStorage.getItem("resumeData");
    return saved ? JSON.parse(saved) : defaultData;
  });

  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(data));
  }, [data]);

  return { data, setData };
}

export default useResumeStorage;
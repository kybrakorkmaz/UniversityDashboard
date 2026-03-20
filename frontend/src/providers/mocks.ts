import {Subject} from "../types";

export const MOCK_SUBJECTS: Subject[] = [
  {
    id: 1,
    name: "Data Structures and Algorithms",
    code: "CS101",
    department: "CS",
    description: "Fundamental concepts of data organization and algorithm analysis.",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Calculus I",
    code: "MATH101",
    department: "Math",
    description: "Introduction to differential and integral calculus.",
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: "English Composition",
    code: "ENG101",
    department: "English",
    description: "Developing critical thinking and writing skills through academic essays.",
    createdAt: new Date().toISOString(),
  },
];

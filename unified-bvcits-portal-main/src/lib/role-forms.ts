import { DEPARTMENTS, type RoleId } from "@/lib/campus-data";

export type FieldType = "text" | "email" | "tel" | "select";

export type RoleField = {
  name: string;
  label: string;
  type: FieldType;
  options?: string[];
  placeholder?: string;
  /** Field used as the display name of the account. */
  primary?: boolean;
};

const DEPARTMENT_OPTIONS = DEPARTMENTS.map((d) => d.name);
const PROGRAM_OPTIONS = ["B.Tech", "B.Tech (Lateral Entry)", "M.Tech", "MBA"];
const YEAR_OPTIONS = ["I", "II", "III", "IV"];
const SEMESTER_OPTIONS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

export const ROLE_FIELDS: Record<RoleId, RoleField[]> = {
  student: [
    { name: "fullName", label: "Full Name", type: "text", primary: true, placeholder: "As per college records" },
    { name: "roll", label: "Roll Number", type: "text", placeholder: "e.g. 21B81A0501" },
    { name: "email", label: "Email", type: "email", placeholder: "you@example.com" },
    { name: "mobile", label: "Mobile Number", type: "tel", placeholder: "10-digit mobile number" },
    { name: "college", label: "College", type: "text", placeholder: "BVC Institute of Technology & Science" },
    { name: "department", label: "Department", type: "select", options: DEPARTMENT_OPTIONS },
    { name: "program", label: "Program", type: "select", options: PROGRAM_OPTIONS },
    { name: "year", label: "Year", type: "select", options: YEAR_OPTIONS },
    { name: "semester", label: "Semester", type: "select", options: SEMESTER_OPTIONS },
  ],
  faculty: [
    { name: "fullName", label: "Full Name", type: "text", primary: true },
    { name: "employeeId", label: "Employee ID", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "mobile", label: "Mobile Number", type: "tel" },
    { name: "department", label: "Department", type: "select", options: DEPARTMENT_OPTIONS },
    {
      name: "designation",
      label: "Designation",
      type: "select",
      options: ["Professor", "Associate Professor", "Assistant Professor", "Lab Instructor", "Administrative Staff"],
    },
  ],
  parent: [
    { name: "fullName", label: "Parent Name", type: "text", primary: true },
    { name: "mobile", label: "Mobile Number", type: "tel" },
    { name: "email", label: "Email", type: "email" },
    { name: "studentRoll", label: "Student Roll Number", type: "text", placeholder: "e.g. 21B81A0501" },
    { name: "studentName", label: "Student Name", type: "text" },
    {
      name: "relationship",
      label: "Relationship",
      type: "select",
      options: ["Father", "Mother", "Guardian"],
    },
  ],
  management: [
    { name: "fullName", label: "Name", type: "text", primary: true },
    { name: "employeeId", label: "Employee ID", type: "text" },
    { name: "email", label: "Official Email", type: "email" },
    { name: "mobile", label: "Mobile Number", type: "tel" },
    { name: "designation", label: "Designation", type: "text", placeholder: "e.g. Director, Dean, Administrative Officer" },
  ],
  recruiter: [
    { name: "fullName", label: "Recruiter Name", type: "text", primary: true },
    { name: "company", label: "Company Name", type: "text" },
    { name: "email", label: "Official Email", type: "email" },
    { name: "mobile", label: "Mobile Number", type: "tel" },
    { name: "designation", label: "Designation", type: "text", placeholder: "e.g. Talent Acquisition Manager" },
    { name: "website", label: "Company Website", type: "text", placeholder: "https://company.com" },
  ],
  trainer: [
    { name: "fullName", label: "Trainer Name", type: "text", primary: true },
    { name: "organization", label: "Organization", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "mobile", label: "Mobile Number", type: "tel" },
    {
      name: "trainingArea",
      label: "Training Area",
      type: "select",
      options: [
        "Programming & Data Structures",
        "Full Stack Development",
        "Cloud & DevOps",
        "Aptitude & Reasoning",
        "Communication & Interview Skills",
        "Core Engineering Skills",
      ],
    },
  ],
  government: [
    { name: "fullName", label: "Officer Name", type: "text", primary: true },
    { name: "authority", label: "Department / Authority", type: "text", placeholder: "e.g. Department of Technical Education" },
    { name: "officialId", label: "Official ID", type: "text" },
    { name: "email", label: "Official Email", type: "email" },
    { name: "mobile", label: "Mobile Number", type: "tel" },
  ],
  jntuk: [
    { name: "fullName", label: "Officer Name", type: "text", primary: true },
    { name: "officialId", label: "Official ID", type: "text" },
    { name: "email", label: "Official Email", type: "email" },
    { name: "department", label: "Department", type: "text", placeholder: "e.g. Directorate of Evaluation" },
    { name: "mobile", label: "Mobile Number", type: "tel" },
  ],
  authority: [
    { name: "fullName", label: "Officer Name", type: "text", primary: true },
    { name: "authority", label: "Authority", type: "text" },
    { name: "email", label: "Official Email", type: "email" },
    { name: "mobile", label: "Mobile Number", type: "tel" },
  ],
  admin: [
    { name: "fullName", label: "Name", type: "text", primary: true },
    { name: "employeeId", label: "Employee ID", type: "text" },
    { name: "email", label: "Official Email", type: "email" },
    { name: "mobile", label: "Mobile Number", type: "tel" },
  ],
};

export const REGISTER_ROLES: RoleId[] = [
  "student",
  "faculty",
  "parent",
  "management",
  "recruiter",
  "trainer",
  "government",
  "jntuk",
  "admin",
];

export const ROLE_BLURB: Record<RoleId, string> = {
  student:
    "Access academic performance, attendance, examinations, placements and campus services.",
  faculty:
    "Manage classes, attendance, internal marks, timetable and student performance reports.",
  parent:
    "Follow your linked student's attendance, academic performance, examinations and notices.",
  management:
    "Institution-wide analytics across departments, academics, placements and accreditation.",
  recruiter:
    "Post opportunities, manage drives and review recruitment-related information only.",
  trainer:
    "Run training programs, batches and assessments, and track skill progress.",
  government:
    "Authorised institutional information — statistics, academics, placements, research and reports.",
  jntuk:
    "Authorised examination, academic and institutional information for university reporting.",
  authority: "Authorised read-only institutional reporting access.",
  admin: "Full authorised administration of users, academics, content and system settings.",
};

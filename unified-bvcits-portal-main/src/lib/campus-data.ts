/**
 * Campus content for the BVCITS Integrated Digital Campus portal.
 * Institutional figures follow published BVCITS information.
 * Shapes here mirror the future database entities so a backend can replace them 1:1.
 */

import {
  GraduationCap,
  Users,
  Presentation,
  Building2,
  Briefcase,
  Code2,
  Landmark,
  ScrollText,
  type LucideIcon,
} from "lucide-react";


export const BRAND = {
  name: "BVCITS",
  subtitle: "Integrated Digital Campus",
  tagline: "Connecting Every Stakeholder. Empowering Every Journey.",
  concept: "One Campus. Every Stakeholder. One Digital Platform.",
};

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Academics", to: "/academics" },
  { label: "Admissions", to: "/admissions" },
  { label: "Services", to: "/services" },
  { label: "Placements", to: "/placements" },
  { label: "Research", to: "/research" },
  { label: "Campus Life", to: "/campus-life" },
  { label: "Notices", to: "/notices" },
  { label: "Contact", to: "/contact" },
] as const;

export type RoleId =
  | "student"
  | "parent"
  | "faculty"
  | "management"
  | "recruiter"
  | "trainer"
  | "government"
  | "jntuk"
  | "authority"
  | "admin";


export type Portal = {
  id: RoleId;
  emoji: string;
  icon: LucideIcon;
  title: string;
  description: string;
  capabilities: string[];
};

export const PORTALS: Portal[] = [
  {
    id: "student",
    emoji: "🎓",
    icon: GraduationCap,
    title: "Student Portal",
    description:
      "Academics, attendance, results, exams, library, placements, certificates and grievances in one place.",
    capabilities: [
      "Academic performance & CGPA",
      "Attendance and timetable",
      "Results & examination services",
      "Assignments and digital library",
      "Placements, internships, training",
      "Certificates, scholarships, grievances",
    ],
  },
  {
    id: "parent",
    emoji: "👨‍👩‍👧",
    icon: Users,
    title: "Parent Portal",
    description:
      "Follow your linked student's attendance, performance, results and college communication.",
    capabilities: [
      "Linked student attendance",
      "Academic performance & results",
      "Examination information",
      "Attendance & fee alerts",
      "Notices and circulars",
      "Parent–teacher communication",
    ],
  },
  {
    id: "faculty",
    emoji: "👨‍🏫",
    icon: Presentation,
    title: "Faculty Portal",
    description:
      "Manage classes, attendance, internal marks, timetable and student performance reports.",
    capabilities: [
      "Assigned classes & timetable",
      "Attendance management",
      "Internal marks entry",
      "Student performance analytics",
      "Leave management",
      "Academic reports & notices",
    ],
  },
  {
    id: "management",
    emoji: "🏢",
    icon: Building2,
    title: "Management Portal",
    description:
      "Institution-wide analytics across departments, academics, placements and accreditation.",
    capabilities: [
      "Institution analytics",
      "Student & faculty statistics",
      "Department performance",
      "Academic & placement analytics",
      "Accreditation readiness",
      "Exportable reports",
    ],
  },
  {
    id: "recruiter",
    emoji: "💼",
    icon: Briefcase,
    title: "Recruiter Portal",
    description:
      "Register your company, post jobs, search candidates and run end-to-end placement drives.",
    capabilities: [
      "Company registration & profile",
      "Job posting & eligibility criteria",
      "Candidate search & shortlisting",
      "Placement drive management",
      "Interview scheduling",
      "Selection results",
    ],
  },
  {
    id: "trainer",
    emoji: "👨‍💻",
    icon: Code2,
    title: "Trainer Portal",
    description:
      "Run training programs, batches, assessments and track skill progress of learners.",
    capabilities: [
      "Training programs & batches",
      "Schedules and attendance",
      "Assessments & scores",
      "Student progress tracking",
      "Skill analytics",
      "Training reports",
    ],
  },
  {
    id: "government",
    emoji: "🏛️",
    icon: Landmark,
    title: "Government Authority",
    description:
      "Authorised institutional information — profile, statistics, academics, placements, research and compliance records.",
    capabilities: [
      "Institution profile & affiliation",
      "Student & faculty statistics",
      "Academic and programme information",
      "Placement statistics",
      "Research, patents and innovation",
      "Reports & compliance documents",
    ],
  },
  {
    id: "jntuk",
    emoji: "🎓",
    icon: ScrollText,
    title: "JNTUK Authority",
    description:
      "University-side view of examinations, regulations, curriculum, academic calendar and institutional reports.",
    capabilities: [
      "Examination notifications & schedules",
      "Results and internal examination information",
      "Regulations & academic calendar",
      "Curriculum and syllabus",
      "College, faculty and student information",
      "Examination & academic reports",
    ],
  },
];

export const ROLE_LABEL: Record<RoleId, string> = {
  student: "Student",
  parent: "Parent",
  faculty: "Faculty / Staff",
  management: "Management",
  recruiter: "Recruiter",
  trainer: "Trainer",
  government: "Government Authority",
  jntuk: "JNTUK Authority",
  authority: "Institutional Authority",
  admin: "Administrator",
};

/** Roles whose accounts require institutional authorisation before sensitive access. */
export const AUTHORISED_ROLES: RoleId[] = ["management", "government", "jntuk", "admin"];


export const AUTHORITY_BODIES = ["JNTUK", "Government of A.P.", "Jnana Bhoomi", "AICTE", "UGC"];

export const DEPARTMENTS = [
  { code: "CSE", name: "Computer Science & Engineering", students: 720, faculty: 42, avgCgpa: 8.4 },
  { code: "AI&ML", name: "Artificial Intelligence & Machine Learning", students: 240, faculty: 14, avgCgpa: 8.6 },
  { code: "ECE", name: "Electronics & Communication Engineering", students: 480, faculty: 30, avgCgpa: 8.1 },
  { code: "EEE", name: "Electrical & Electronics Engineering", students: 300, faculty: 21, avgCgpa: 7.9 },
  { code: "MECH", name: "Mechanical Engineering", students: 260, faculty: 19, avgCgpa: 7.6 },
  { code: "CIVIL", name: "Civil Engineering", students: 220, faculty: 17, avgCgpa: 7.5 },
  { code: "MBA", name: "Business Administration", students: 180, faculty: 12, avgCgpa: 8.0 },
];

export const PROGRAMS = [
  { name: "B.Tech", duration: "4 years", intake: "As per sanction", mode: "Regular", entry: "AP EAPCET / ECET" },
  { name: "B.Tech (Lateral Entry)", duration: "3 years", intake: "As per sanction", mode: "Regular", entry: "AP ECET" },
  { name: "M.Tech", duration: "2 years", intake: "As per sanction", mode: "Regular", entry: "AP PGECET / GATE" },
  { name: "MBA", duration: "2 years", intake: "As per sanction", mode: "Regular", entry: "AP ICET" },
];

export type NoticeCategory =
  | "Academic"
  | "Examination"
  | "Placement"
  | "Admissions"
  | "Scholarships"
  | "Events"
  | "General";

export const NOTICE_CATEGORIES: NoticeCategory[] = [
  "Academic",
  "Examination",
  "Placement",
  "Admissions",
  "Scholarships",
  "Events",
  "General",
];

export type Notice = {
  id: string;
  title: string;
  category: NoticeCategory;
  date: string;
  audience: string;
  department: string;
  summary: string;
  content: string;
  importantDates?: { label: string; value: string }[];
  attachment?: { name: string; type: string; size: string };
  pinned?: boolean;
};

const PENDING_DETAIL =
  "Information will be updated by the respective department. Official dates and instructions are announced through the authorised BVCITS portal.";

export const NOTICES: Notice[] = [
  {
    id: "NTC-2401",
    title: "Semester examination notification",
    category: "Examination",
    date: "2026-08-10",
    audience: "All B.Tech students",
    department: "Examination Cell",
    summary:
      "Students are advised to check the examination schedule, instructions and important deadlines in the Examination section.",
    content:
      "Students are advised to check the examination schedule, examination instructions and important deadlines through the official examination section. Hall tickets are released through the Examination module and must be carried to every examination along with the college identity card. Any discrepancy in subject registration should be reported to the examination cell before the last date shown in the Examination module.",
    importantDates: [
      { label: "Schedule publication", value: "Announced in the Examination module" },
      { label: "Hall ticket release", value: "3 days before the first examination" },
      { label: "Discrepancy reporting", value: PENDING_DETAIL },
    ],
    attachment: { name: "Examination notification", type: "PDF", size: "Published by the examination cell" },
    pinned: true,
  },
  {
    id: "NTC-2402",
    title: "Campus recruitment drive announcement",
    category: "Placement",
    date: "2026-08-09",
    audience: "Final year — CSE, AI&ML, ECE",
    department: "Training & Placement Cell",
    summary: "Registration is open in the Placement module. Eligibility: 7.0 CGPA, no active backlogs.",
    content:
      "Eligible final-year students may register for the upcoming campus recruitment drive through the Placement module. Eligibility is 7.0 CGPA with no active backlogs at the time of the drive. Shortlisted students will be informed through the Placement module along with the assessment pattern, reporting time and venue. Registered students must attend the pre-placement talk.",
    importantDates: [
      { label: "Registration", value: "Open in the Placement module" },
      { label: "Drive date", value: "Confirmed by the placement cell" },
    ],
    pinned: true,
  },
  {
    id: "NTC-2403",
    title: "Academic calendar for A.Y. 2026-27",
    category: "Academic",
    date: "2026-08-06",
    audience: "Students & faculty",
    department: "Academic Cell",
    summary: "Working days, mid-term windows and holidays are listed in the academic calendar.",
    content:
      "The academic calendar for the academic year 2026-27 lists instruction days, mid-term assessment windows, practical examination windows, semester-end examination windows and institutional holidays. Departments plan unit tests and laboratory schedules within these windows. The final version is confirmed by the academic cell.",
    attachment: { name: "Academic calendar 2026-27", type: "PDF", size: "Published by the academic cell" },
  },
  {
    id: "NTC-2404",
    title: "Post-matric scholarship document verification",
    category: "Scholarships",
    date: "2026-08-04",
    audience: "Eligible students",
    department: "Scholarship Section",
    summary: "Upload income and caste certificates in the Scholarship module before the notified deadline.",
    content:
      "Students eligible for the post-matric scholarship must upload the income certificate, caste certificate, Aadhaar and bank passbook copy in the Scholarship module. Physical verification of original documents is carried out at the scholarship section. Applications with incomplete documents are returned for correction.",
    importantDates: [{ label: "Document upload deadline", value: PENDING_DETAIL }],
  },
  {
    id: "NTC-2405",
    title: "Admissions counselling — reporting information",
    category: "Admissions",
    date: "2026-08-02",
    audience: "Applicants",
    department: "Admissions Cell",
    summary: "Reporting slots and required documents are listed in the Admissions section.",
    content:
      "Candidates allotted a seat through the state counselling process must report to the admissions cell with the allotment order, counselling documents, transfer certificate, marks memos, Aadhaar and caste/income certificates where applicable. Reporting slots and the official schedule are confirmed by the admissions cell.",
    importantDates: [{ label: "Reporting schedule", value: "Announced through the official BVCITS portal" }],
  },
  {
    id: "NTC-2406",
    title: "Student clubs — activity registrations open",
    category: "Events",
    date: "2026-07-30",
    audience: "All students",
    department: "Student Affairs",
    summary: "Coding, robotics, cultural and sports activities. Register through Campus Life → Clubs.",
    content:
      "Registrations are open for coding, robotics, cultural and sports activities conducted by the student clubs. Students may join through Campus Life → Clubs and will receive the activity schedule from the respective club coordinator. Participation certificates are issued by the student affairs office.",
  },
  {
    id: "NTC-2407",
    title: "Library digital resource access renewed",
    category: "General",
    date: "2026-07-28",
    audience: "Students & faculty",
    department: "Central Library",
    summary: "E-journals and previous question papers are accessible from the Digital Library module.",
    content:
      "Access to e-journals, e-books, previous question papers and project reports has been renewed for the current academic year. Resources are available from the Digital Library module using institutional credentials. Library timings and lending rules are displayed at the central library counter.",
  },
  {
    id: "NTC-2408",
    title: "Revaluation window for regular examinations",
    category: "Examination",
    date: "2026-07-25",
    audience: "All students",
    department: "Examination Cell",
    summary: "Apply through Examination → Revaluation. Fee is as per university regulations.",
    content:
      "Students who wish to apply for revaluation of answer scripts may do so through Examination → Revaluation within the notified window. The revaluation fee is as per university regulations and is payable through the prescribed mode. Revaluation results are published in the Examination module.",
    importantDates: [{ label: "Application window", value: PENDING_DETAIL }],
  },
];

export type CompanyStatus = "Completed" | "Ongoing" | "Upcoming" | "Recruiter / Details Not Published";

export const COMPANIES: {
  name: string;
  sector: string;
  offers: string;
  ctc: string;
  status: CompanyStatus;
}[] = [
  { name: "TCS (Tata Consultancy Services)", sector: "IT Services", offers: "3", ctc: "\u20B93.36–7.00 LPA", status: "Completed" },
  { name: "Infosys", sector: "IT Services", offers: "9", ctc: "\u20B93.60–9.50 LPA", status: "Completed" },
  { name: "Accenture", sector: "IT Services & Consulting", offers: "—", ctc: "—", status: "Recruiter / Details Not Published" },
  { name: "Wipro", sector: "IT Services", offers: "3", ctc: "\u20B93.50–4.20 LPA", status: "Completed" },
  { name: "Cognizant", sector: "IT Services & Consulting", offers: "20", ctc: "\u20B92.80–5.40 LPA", status: "Completed" },
  { name: "Capgemini", sector: "IT Services & Consulting", offers: "2", ctc: "\u20B94.00 LPA", status: "Completed" },
  { name: "HCLTech", sector: "IT Services & Technology", offers: "5", ctc: "\u20B96.00 LPA", status: "Completed" },
  { name: "Virtusa", sector: "IT Services", offers: "—", ctc: "—", status: "Recruiter / Details Not Published" },
  { name: "Tech Mahindra", sector: "IT Services", offers: "—", ctc: "—", status: "Recruiter / Details Not Published" },
  { name: "DXC Technology", sector: "IT Services", offers: "—", ctc: "—", status: "Recruiter / Details Not Published" },
];

export const PLACEMENT_FACTS = [
  { label: "Placements in 2026", value: "1256+" },
  { label: "Top MNC Recruiters", value: "58+" },
  { label: "Highest Package", value: "\u20B938 Lakhs" },
  { label: "Average Package", value: "\u20B94 Lakhs" },
];

export const RESEARCH_FACTS = [
  { label: "Publications", value: "1000+" },
  { label: "Patents", value: "230+" },
  { label: "Industry MOUs", value: "30+" },
];

export const ACADEMIC_FACTS = [
  { label: "UG Programmes", value: "09" },
  { label: "PG Programmes", value: "05" },
  { label: "Experienced Faculty", value: "195+" },
  { label: "Green Campus", value: "40 Acre" },
];

export const PLACEMENT_TREND = [
  { year: "2021", offers: 312, companies: 48, highest: 8 },
  { year: "2022", offers: 388, companies: 56, highest: 11 },
  { year: "2023", offers: 441, companies: 63, highest: 14 },
  { year: "2024", offers: 502, companies: 71, highest: 18 },
  { year: "2025", offers: 566, companies: 78, highest: 21 },
];

export const ATTENDANCE_TREND = [
  { month: "Mar", attendance: 88 },
  { month: "Apr", attendance: 91 },
  { month: "May", attendance: 86 },
  { month: "Jun", attendance: 89 },
  { month: "Jul", attendance: 93 },
  { month: "Aug", attendance: 90 },
];

export const PERFORMANCE_TREND = [
  { sem: "S1", cgpa: 7.8 },
  { sem: "S2", cgpa: 8.0 },
  { sem: "S3", cgpa: 8.2 },
  { sem: "S4", cgpa: 8.1 },
  { sem: "S5", cgpa: 8.5 },
  { sem: "S6", cgpa: 8.6 },
];

export const TIMETABLE_TODAY = [
  { time: "09:00 – 09:55", subject: "Design & Analysis of Algorithms", room: "B-204", faculty: "Dr. A. Rao" },
  { time: "10:00 – 10:55", subject: "Operating Systems", room: "B-204", faculty: "Prof. S. Iyer" },
  { time: "11:10 – 12:05", subject: "Database Systems Lab", room: "Lab-3", faculty: "Mr. K. Varma" },
  { time: "13:00 – 13:55", subject: "Machine Learning", room: "C-101", faculty: "Dr. N. Sharma" },
  { time: "14:00 – 14:55", subject: "Soft Skills & Training", room: "Seminar Hall", faculty: "Trainer Team" },
];

export const SUBJECT_MARKS = [
  { subject: "DAA", internal: 26, max: 30, attendance: 92 },
  { subject: "Operating Systems", internal: 24, max: 30, attendance: 88 },
  { subject: "DBMS", internal: 28, max: 30, attendance: 95 },
  { subject: "Machine Learning", internal: 25, max: 30, attendance: 84 },
  { subject: "Web Technologies", internal: 27, max: 30, attendance: 90 },
];

export const UPCOMING_EVENTS = [
  { title: "Industry talk: Cloud careers", date: "18 Aug", place: "Seminar Hall" },
  { title: "Mock placement drive", date: "22 Aug", place: "Training Block" },
  { title: "NSS blood donation camp", date: "27 Aug", place: "Campus Ground" },
];

export const RECRUITER_PIPELINE = [
  { stage: "Registration", count: 420 },
  { stage: "Eligibility", count: 356 },
  { stage: "Shortlisting", count: 210 },
  { stage: "Test", count: 168 },
  { stage: "Interview", count: 96 },
  { stage: "Selection", count: 46 },
];

export const TRAINING_BATCHES = [
  { batch: "FSD-A", program: "Full Stack Development", learners: 62, progress: 74, next: "React Router lab" },
  { batch: "DSA-B", program: "Data Structures & Aptitude", learners: 88, progress: 58, next: "Graphs assessment" },
  { batch: "CLD-C", program: "Cloud Foundations", learners: 45, progress: 41, next: "IAM workshop" },
  { batch: "COM-D", program: "Communication & Interview Skills", learners: 120, progress: 66, next: "Group discussion" },
];

export const SKILL_ANALYTICS = [
  { skill: "Programming", score: 78 },
  { skill: "Aptitude", score: 71 },
  { skill: "Communication", score: 64 },
  { skill: "Projects", score: 69 },
  { skill: "Interview", score: 58 },
];

export const LIBRARY_BOOKS = [
  { title: "Introduction to Algorithms", author: "Cormen et al.", category: "Computer Science", available: 4, total: 12 },
  { title: "Operating System Concepts", author: "Silberschatz", category: "Computer Science", available: 0, total: 8 },
  { title: "Engineering Mechanics", author: "Beer & Johnston", category: "Mechanical", available: 6, total: 10 },
  { title: "Power Systems Analysis", author: "Bergen", category: "Electrical", available: 2, total: 6 },
  { title: "Principles of Management", author: "Koontz", category: "Management", available: 5, total: 9 },
  { title: "Digital Signal Processing", author: "Proakis", category: "Electronics", available: 3, total: 7 },
];

export const GRIEVANCE_CATEGORIES = ["Academic", "Examination", "Infrastructure", "Hostel", "IT", "Other"];
export const GRIEVANCE_STAGES = ["Submitted", "Under Review", "In Progress", "Resolved"];

export const CERTIFICATE_TYPES = [
  "Bonafide Certificate",
  "Study Certificate",
  "Course Completion Certificate",
  "Transfer Certificate",
  "Custom Request",
];
export const CERTIFICATE_STAGES = ["Request", "Department Verification", "Approval", "Generated"];

export const SCHOLARSHIPS = [
  {
    name: "Post-Matric Scholarship (Government)",
    eligibility: "As per state government norms — verify with the office",
    deadline: "Will be updated",
    documents: ["Income certificate", "Caste certificate", "Aadhaar", "Bank passbook"],
    status: "Open",
  },
  {
    name: "Merit Scholarship (Institution)",
    eligibility: "CGPA 9.0 and above, no backlogs",
    deadline: "Will be updated",
    documents: ["Latest marks memo", "Student ID"],
    status: "Open",
  },
  {
    name: "Jnana Bhoomi Fee Reimbursement",
    eligibility: "Government notified categories",
    deadline: "Will be updated",
    documents: ["Application ID", "Income certificate"],
    status: "Verification",
  },
];

export const DOCUMENT_CENTER = [
  { name: "Academic Regulations R23", category: "Academic", type: "PDF", size: "1.2 MB", date: "2026-06-11" },
  { name: "Examination Manual", category: "Examination", type: "PDF", size: "820 KB", date: "2026-05-28" },
  { name: "AICTE Approval Document", category: "AICTE", type: "PDF", size: "2.4 MB", date: "2026-04-02" },
  { name: "UGC Compliance Report", category: "UGC", type: "PDF", size: "1.7 MB", date: "2026-03-19" },
  { name: "JNTUK Affiliation Letter", category: "JNTUK", type: "PDF", size: "980 KB", date: "2026-03-05" },
  { name: "Government Circular", category: "Government", type: "PDF", size: "460 KB", date: "2026-02-22" },
  { name: "Accreditation Self Study Report", category: "Accreditation", type: "PDF", size: "5.1 MB", date: "2026-01-30" },
  { name: "Annual Report 2025-26", category: "Reports", type: "PDF", size: "3.3 MB", date: "2026-01-12" },
  { name: "Holiday Circular", category: "Circulars", type: "PDF", size: "210 KB", date: "2026-01-08" },
];

export const DOCUMENT_CATEGORIES = [
  "Academic",
  "Examination",
  "AICTE",
  "UGC",
  "JNTUK",
  "Government",
  "Accreditation",
  "Circulars",
  "Reports",
];

export const RESEARCH = {
  publications: [
    { title: "Edge-assisted federated learning for campus IoT", venue: "Journal of Computing, 2025", authors: "Faculty team" },
    { title: "Low-cost soil health sensing for delta agriculture", venue: "International Conference on Sensors, 2025", authors: "Faculty team" },
    { title: "Retrofitting techniques for coastal RCC structures", venue: "Civil Engineering Review, 2024", authors: "Faculty team" },
  ],
  projects: [
    { title: "Smart campus energy monitoring", funding: "Will be updated", status: "Ongoing" },
    { title: "Assistive vision for visually impaired", funding: "Will be updated", status: "Ongoing" },
    { title: "Flood early-warning dashboard", funding: "Will be updated", status: "Completed" },
  ],
  patents: [
    { title: "Modular solar dryer assembly", number: "Will be updated", year: "2025" },
    { title: "Adaptive irrigation controller", number: "Will be updated", year: "2024" },
  ],
  startups: [
    { name: "AgriSense (student startup)", focus: "Precision farming kits", stage: "Incubation" },
    { name: "CampusLoop (student startup)", focus: "Peer learning platform", stage: "Pilot" },
  ],
};

export const CLUBS = [
  { name: "Coding Club", focus: "Competitive programming & hackathons", members: 240 },
  { name: "Robotics Club", focus: "Embedded systems and automation", members: 130 },
  { name: "Cultural Club", focus: "Music, dance and drama", members: 310 },
  { name: "Sports Council", focus: "Inter-college tournaments", members: 280 },
  { name: "NSS Unit", focus: "Community and social service", members: 195 },
  { name: "Entrepreneurship Cell", focus: "Startups and innovation", members: 120 },
];

export const FAQS = [
  {
    q: "How do I apply for admission?",
    a: "Admissions follow the state counselling process. Use Admissions → Apply Now to submit an enquiry; the office will confirm the official procedure and dates.",
  },
  {
    q: "Where can I see my results?",
    a: "Sign in to the Student Portal and open Examination → Results. Parents can view the same information from the Parent Portal.",
  },
  {
    q: "How long does a certificate request take?",
    a: "Requests move through Department Verification and Approval before generation. Track live status in Services → Certificates.",
  },
  {
    q: "Is this portal the official BVCITS website?",
    a: "This is the BVCITS Integrated Digital Campus portal. Official announcements are published by the respective offices.",
  },
];

export const AI_SUGGESTIONS = [
  "How do I apply for a certificate?",
  "When is my exam?",
  "Where can I find the syllabus?",
  "How can I apply for a scholarship?",
  "What companies are coming for placements?",
  "How do I contact the examination cell?",
];

export const AI_ANSWERS: { match: string[]; answer: string }[] = [
  {
    match: ["certificate", "bonafide", "study certificate"],
    answer:
      "Open Services → Certificate Services in the Student Portal, choose the certificate type, attach documents and submit. The request flows through Department Verification → Approval → Generated, and you can track it live.",
  },
  {
    match: ["exam", "hall ticket", "examination", "revaluation"],
    answer:
      "The Examination module holds notifications, timetable, hall tickets, internal marks, results, previous papers and revaluation. Your current schedule appears on the Student Dashboard once published.",
  },
  {
    match: ["syllabus", "curriculum", "regulation", "calendar"],
    answer:
      "Academics → Curriculum & Syllabus lists program-wise syllabus, regulations and the academic calendar. Documents are also mirrored in the Document Center.",
  },
  {
    match: ["scholarship", "fee reimbursement", "jnana"],
    answer:
      "Services → Scholarships lists available schemes, eligibility, required documents and deadlines. Upload documents there and track application status.",
  },
  {
    match: ["placement", "company", "drive", "recruiter", "job"],
    answer:
      "Placements shows registered companies, upcoming drives and statistics. In the Student Portal you can register for drives and check your placement readiness score.",
  },
  {
    match: ["contact", "cell", "office", "phone", "email"],
    answer:
      "Use the Contact page for department and cell contacts, including the examination cell. Reach the office during working hours for official confirmation.",
  },
  {
    match: ["attendance"],
    answer:
      "Attendance is available subject-wise in the Student Portal, and parents see the same data with alerts when it drops below the required percentage.",
  },
  {
    match: ["grievance", "complaint"],
    answer:
      "Services → Grievance Management lets you submit a grievance under Academic, Examination, Infrastructure, Hostel, IT or Other. You get a grievance ID and can follow it from Submitted to Resolved.",
  },
  {
    match: ["library", "book"],
    answer:
      "The Digital Library module supports book search with author/category filters, availability, issued books, due dates, e-resources, previous papers and project reports.",
  },
];

export const SEARCH_INDEX: { title: string; category: string; to: string; hint?: string }[] = [
  ...DEPARTMENTS.map((d) => ({ title: d.name, category: "Departments", to: "/academics", hint: d.code })),
  ...PROGRAMS.map((p) => ({ title: p.name, category: "Courses", to: "/academics", hint: p.duration })),
  ...NOTICES.map((n) => ({ title: n.title, category: "Notices", to: "/notices", hint: n.category })),
  ...COMPANIES.map((c) => ({ title: c.name, category: "Companies", to: "/placements", hint: c.sector })),
  ...UPCOMING_EVENTS.map((e) => ({ title: e.title, category: "Events", to: "/campus-life", hint: e.date })),
  ...CLUBS.map((c) => ({ title: c.name, category: "Events", to: "/campus-life", hint: "Club" })),
  ...DOCUMENT_CENTER.map((d) => ({ title: d.name, category: "Documents", to: "/services", hint: d.category })),
  { title: "Attendance", category: "Services", to: "/services" },
  { title: "Results", category: "Services", to: "/services" },
  { title: "Examination", category: "Services", to: "/services" },
  { title: "Digital Library", category: "Services", to: "/services" },
  { title: "Certificate Services", category: "Services", to: "/services" },
  { title: "Scholarships", category: "Services", to: "/services" },
  { title: "Grievance Management", category: "Services", to: "/services" },
  { title: "Placement Readiness", category: "Services", to: "/placements" },
  { title: "Dr. A. Rao", category: "Faculty", to: "/academics", hint: "CSE" },
  { title: "Prof. S. Iyer", category: "Faculty", to: "/academics", hint: "CSE" },
  { title: "Dr. N. Sharma", category: "Faculty", to: "/academics", hint: "AI&ML" },
  { title: "Mr. K. Varma", category: "Faculty", to: "/academics", hint: "ECE" },
];

export const ENTITIES = [
  "Users", "Profiles", "Students", "Parents", "Faculty", "Staff", "Departments", "Programs",
  "Courses", "Attendance", "Marks", "Examinations", "Results", "Timetable", "Notifications",
  "Events", "Companies", "Jobs", "Placement Drives", "Applications", "Training Programs",
  "Trainers", "Grievances", "Certificates", "Scholarships", "Library Books",
  "Library Transactions", "Documents", "Research Projects", "Audit Logs",
];

/* ------------------------------------------------------------------ *
 * Institution profile (authority / JNTUK views)
 * ------------------------------------------------------------------ */

export const INSTITUTION = {
  name: "BVC Institute of Technology & Science",
  shortName: "BVCITS",
  location: "Amalapuram, Dr. B. R. Ambedkar Konaseema District, Andhra Pradesh",
  about:
    "BVC Institute of Technology & Science (BVCITS) is an engineering institution offering undergraduate and postgraduate programmes across engineering and management disciplines, supported by a 40 acre green campus, experienced faculty and an active training and placement ecosystem.",
  vision:
    "To emerge as a centre of excellence in technical education by nurturing competent, ethical and industry-ready professionals.",
  mission: [
    "Deliver quality technical education with strong academic and laboratory practice.",
    "Strengthen industry interaction, training and employability of every student.",
    "Encourage research, innovation and entrepreneurship among students and faculty.",
    "Serve the region through community-oriented and sustainable initiatives.",
  ],
  principal: { name: "Dr. J.V.G. Rama Rao", designation: "Principal" },
  affiliation:
    "Affiliated to Jawaharlal Nehru Technological University Kakinada (JNTUK) and approved by AICTE, New Delhi.",
  campus: [
    { label: "Green campus", value: "40 Acre" },
    { label: "Experienced faculty", value: "195+" },
    { label: "Graduates produced", value: "12K+" },
    { label: "Students placed annually", value: "1000+" },
  ],
  infrastructure: [
    "Academic blocks and smart classrooms",
    "Departmental and central laboratories",
    "Central library and digital resources",
    "Seminar halls and auditorium",
    "Training and placement block",
    "Hostels, transport and sports facilities",
  ],
};

export const RESTRICTED_NOTE =
  "Individual student records (attendance, marks, results and personal details) are restricted and are not part of this authority view.";

export const JNTUK_PENDING =
  "Information will be updated through the authorized JNTUK/BVCITS system.";

export const JNTUK_EXAM_ITEMS = [
  { title: "Examination notifications", detail: JNTUK_PENDING },
  { title: "Examination schedules", detail: JNTUK_PENDING },
  { title: "Timetables", detail: JNTUK_PENDING },
  { title: "Results", detail: JNTUK_PENDING },
  { title: "Internal examination information", detail: JNTUK_PENDING },
  { title: "Regulations", detail: "Academic regulations are maintained in the Document Centre." },
  { title: "Academic calendar", detail: "Published by the academic cell for each academic year." },
];

export const JNTUK_ACADEMIC_ITEMS = [
  { title: "Curriculum", detail: "Programme-wise curriculum is available in Academics → Curriculum." },
  { title: "Syllabus", detail: "Subject-wise syllabus is published department-wise." },
  { title: "Regulations", detail: "Regulations as adopted by the affiliating university." },
  { title: "Academic calendar", detail: "Instruction days, assessment and examination windows." },
];

export const JNTUK_REPORTS = [
  "Examination reports",
  "Academic reports",
  "Institutional reports",
];

/* ------------------------------------------------------------------ *
 * Parent portal — linked student records (role-scoped access only)
 * ------------------------------------------------------------------ */

export type LinkedStudent = {
  roll: string;
  name: string;
  department: string;
  program: string;
  year: string;
  semester: string;
  cgpa: number;
  attendance: number;
  requiredAttendance: number;
  semesterCgpa: { sem: string; cgpa: number }[];
  attendanceTrend: { month: string; attendance: number }[];
  subjects: { subject: string; internal: number; max: number; attendance: number }[];
  upcomingExams: string[];
  timetable: { time: string; subject: string; room: string }[];
  placementReadiness: number;
  training: string;
};

export const LINKED_STUDENTS: LinkedStudent[] = [
  {
    roll: "21B81A0501",
    name: "A. Harika",
    department: "Computer Science & Engineering",
    program: "B.Tech",
    year: "III",
    semester: "VI",
    cgpa: 8.6,
    attendance: 90,
    requiredAttendance: 75,
    semesterCgpa: [
      { sem: "S1", cgpa: 7.8 },
      { sem: "S2", cgpa: 8.0 },
      { sem: "S3", cgpa: 8.2 },
      { sem: "S4", cgpa: 8.1 },
      { sem: "S5", cgpa: 8.5 },
      { sem: "S6", cgpa: 8.6 },
    ],
    attendanceTrend: [
      { month: "Mar", attendance: 88 },
      { month: "Apr", attendance: 91 },
      { month: "May", attendance: 86 },
      { month: "Jun", attendance: 89 },
      { month: "Jul", attendance: 93 },
      { month: "Aug", attendance: 90 },
    ],
    subjects: [
      { subject: "Design & Analysis of Algorithms", internal: 26, max: 30, attendance: 92 },
      { subject: "Operating Systems", internal: 24, max: 30, attendance: 88 },
      { subject: "Database Systems", internal: 28, max: 30, attendance: 95 },
      { subject: "Machine Learning", internal: 25, max: 30, attendance: 84 },
      { subject: "Web Technologies", internal: 27, max: 30, attendance: 90 },
    ],
    upcomingExams: [
      "Internal assessment II — schedule published in the Examination module",
      "Practical examinations — announced by the department",
      "Semester-end examinations — as per the academic calendar",
    ],
    timetable: [
      { time: "09:00 – 09:55", subject: "Design & Analysis of Algorithms", room: "B-204" },
      { time: "10:00 – 10:55", subject: "Operating Systems", room: "B-204" },
      { time: "11:10 – 12:05", subject: "Database Systems Lab", room: "Lab-3" },
      { time: "13:00 – 13:55", subject: "Machine Learning", room: "C-101" },
    ],
    placementReadiness: 72,
    training: "Full Stack Development batch FSD-A · 74% complete",
  },
  {
    roll: "22B81A0432",
    name: "K. Manoj",
    department: "Electronics & Communication Engineering",
    program: "B.Tech",
    year: "II",
    semester: "IV",
    cgpa: 7.4,
    attendance: 71,
    requiredAttendance: 75,
    semesterCgpa: [
      { sem: "S1", cgpa: 7.1 },
      { sem: "S2", cgpa: 7.3 },
      { sem: "S3", cgpa: 7.2 },
      { sem: "S4", cgpa: 7.4 },
    ],
    attendanceTrend: [
      { month: "Mar", attendance: 78 },
      { month: "Apr", attendance: 74 },
      { month: "May", attendance: 69 },
      { month: "Jun", attendance: 72 },
      { month: "Jul", attendance: 70 },
      { month: "Aug", attendance: 71 },
    ],
    subjects: [
      { subject: "Signals & Systems", internal: 21, max: 30, attendance: 68 },
      { subject: "Analog Circuits", internal: 23, max: 30, attendance: 74 },
      { subject: "Digital Electronics", internal: 25, max: 30, attendance: 79 },
      { subject: "Electromagnetic Fields", internal: 20, max: 30, attendance: 66 },
    ],
    upcomingExams: [
      "Internal assessment II — schedule published in the Examination module",
      "Laboratory examinations — announced by the department",
    ],
    timetable: [
      { time: "09:00 – 09:55", subject: "Signals & Systems", room: "A-108" },
      { time: "10:00 – 10:55", subject: "Digital Electronics", room: "A-108" },
      { time: "11:10 – 12:05", subject: "Analog Circuits Lab", room: "Lab-1" },
    ],
    placementReadiness: 48,
    training: "Communication & Interview Skills batch COM-D · 66% complete",
  },
];

/* ------------------------------------------------------------------ *
 * Official contact directory
 * ------------------------------------------------------------------ */

export const CONTACT_DIRECTORY = [
  { role: "Office", name: "General enquiries", phone: "+91 88562 35416", email: "bvts@bvcgroup.in" },
  { role: "Principal", name: "Dr. J.V.G. Rama Rao", phone: "+91 93967 35489", email: "principal.bvts@bvcgroup.in" },
  { role: "Admissions", name: "Mr. J.V. Krishna Rao", phone: "+91 99854 22678", email: "ao.bvts@bvcgroup.in" },
  { role: "Head – Corporate Relations", name: "Dr. M. Srinivasa Rao", phone: "+91 93469 44089", email: "head_cra@bvcgroup.in" },
  { role: "Training and Placement Officer", name: "Mr. A P V D L Kumar", phone: "+91 84990 67423", email: "tpo.bvts@bvcgroup.in" },
];

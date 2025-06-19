import React, { useState } from "react";
import {
  Github,
  Linkedin,
  UserCheck,
  Activity,
  MessageCircle,
  Mail,
  Phone,
  Download,
  BarChart2,
  Database,
  Brain,
  Code,
  Award,
  BookOpen,
  LineChart,
  PieChart,
  Table,
  ExternalLink,
  PenTool,
  Layout,
  Network,
  Server,
  FileSpreadsheet,
  User,
  Briefcase,
  FolderKanban,
  Medal,
  Menu,
  X,
  BookOpenCheck,
  Clock,
  Target,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Types
type Project = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  previewImages: string[];
};

type View = "profile" | "projects" | "certificates" | "learning" | "contact";

type LearningProgress = {
  topic: string;
  progress: number;
  icon: React.ReactNode;
  skills: string[];
};

// Learning data
const learningData = [
  {
    topic: "SQL",
    progress: 100,
    icon: <Database size={24} className="text-blue-400" />,
    skills: [
      "Beginner: SELECT, WHERE, GROUP BY, ORDER BY, HAVING, LIMIT, Aliasing",
      "Intermediate: JOINs, UNIONs, String Functions, CASE, Subqueries, Window Functions",
      "Advanced: CTEs, Temp Tables, Stored Procedures, Triggers & Events",
    ],
  },
  {
    topic: "Excel",
    progress: 100,
    icon: <FileSpreadsheet size={24} className="text-blue-400" />,
    skills: [
      "Pivot Tables",
      "Advanced Formulas",
      "XLOOKUP and VLOOKUP",
      "Conditional Formatting",
      "Charts and Visualizations",
      "Data Cleaning Techniques",
    ],
  },
  {
    topic: "Tableau",
    progress: 100,
    icon: <BarChart2 size={24} className="text-blue-400" />,
    skills: [
      "Create Visualizations",
      "Calculated Fields and Bins",
      "Joins",
    ],
  },
  {
    topic: "Power BI",
    progress: 100,
    icon: <LineChart size={24} className="text-blue-400" />,
    skills: [
      "Power Query",
      "Create and Manage Relationships",
      "DAX",
      "Drill Down",
      "Conditional Formatting",
      "Bins and Lists",
      "Proper Visualization",
    ],
  },
  {
    topic: "Machine Learning",
    progress: 100,
    icon: <Brain size={24} className="text-blue-400" />,
    skills: [
      "Fundamental Classification Concepts",
      "Supervised & Unsupervised Learning",
      "Deep Learning",
      "Statistical Analysis",
      "Optimization Techniques",
      "Natural Language Processing",
    ],
  },
];

// Study hours data for chart
const studyHoursData = [
  { date: "Week 1", hours: 12 },
  { date: "Week 2", hours: 15 },
  { date: "Week 3", hours: 10 },
  { date: "Week 4", hours: 18 },
  { date: "Week 5", hours: 14 },
  { date: "Week 6", hours: 20 },
  { date: "Week 7", hours: 16 },
  { date: "Week 8", hours: 22 },
];

// Project Modal Component
function ProjectModal({
  project,
  isOpen,
  onClose,
}: {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen || !project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-800 rounded-lg p-6 max-w-sm w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-semibold mb-4 text-white">
          {project.title}
        </h3>
        <div className="space-y-4">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 w-full p-3 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors"
          >
            <Github size={20} />
            <span>View on GitHub</span>
          </a>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 w-full p-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            <ExternalLink size={20} />
            <span>Visit Live Site</span>
          </a>
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full p-2 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors text-white"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
}

// Learning Progress Card Component
function LearningProgressCard({ data }: { data: LearningProgress }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 rounded-lg p-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {data.icon}
          <h3 className="text-xl font-semibold text-white">{data.topic}</h3>
        </div>
        <span className="text-2xl font-bold text-blue-400">
          {data.progress}%
        </span>
      </div>

      <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4">
        <div
          className="bg-blue-400 h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${data.progress}%` }}
        ></div>
      </div>

      <div className="mt-4">
        <ul className="space-y-2 text-gray-300">
          {data.skills.map((skill, index) => (
            <li key={index} className="flex items-center gap-2">
              {skill.includes("✓") ? (
                <span className="text-green-400">●</span>
              ) : skill.includes("In Progress") ? (
                <span className="text-yellow-400">●</span>
              ) : (
                <span className="text-blue-400">●</span>
              )}
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

// Certificate Modal Component
function CertificateModal({
  certificate,
  isOpen,
  onClose,
}: {
  certificate: {
    title: string;
    issuer: string;
    period: string;
    image: string;
    description?: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen || !certificate) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={certificate.image}
          alt={certificate.title}
          className="w-full h-auto rounded-lg mb-4"
        />
        <h3 className="text-xl font-semibold mb-2 text-white">
          {certificate.title}
        </h3>
        <p className="text-gray-400 mb-2">
          {certificate.issuer} | {certificate.period}
        </p>
        {certificate.description && (
          <p className="text-gray-300">{certificate.description}</p>
        )}
        <button
          onClick={onClose}
          className="mt-4 w-full p-2 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors text-white"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
}

// Tambahkan komponen ImageModal
function ImageModal({ image, isOpen, onClose }: { image: string | null; isOpen: boolean; onClose: () => void }) {
  if (!isOpen || !image) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[100]"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-transparent p-0 max-w-3xl w-full flex flex-col items-center"
        onClick={e => e.stopPropagation()}
      >
        <img src={image} alt="Preview" className="rounded-xl max-h-[80vh] w-auto shadow-2xl border-4 border-white" />
        <button
          onClick={onClose}
          className="mt-6 px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-lg"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
}

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<{
    title: string;
    issuer: string;
    period: string;
    image: string;
    description?: string;
  } | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<View>("profile");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const projects: Project[] = [
    {
      id: "world-layoffs",
      title: "World Layoffs Data Analysis",
      description:
        "Processed and analyzed global layoffs dataset using SQL to explore workforce reduction trends across industries and regions. Identified surge in layoffs during 2022, primarily in tech, retail, and consumer goods sectors, with the US and Europe as major hotspots. Uncovered recurring layoff patterns among large tech companies, offering insight for HR forecasting, talent retention, and risk mitigation planning.",
      icon: <Database className="text-blue-400" size={24} />,
      tags: ["SQL", "Data Cleaning", "EDA", "Data Analysis"],
      githubUrl: "https://github.com/dizzy505/world-layoffs",
      liveUrl: "porto-irsyad.netlify.app",
      previewImages: ["/images/world-layoffs.png", "/images/world-layoffs2.png"],
    },
    {
      id: "bike-sales",
      title: "Bike Sales Analysis",
      description:
        "Cleaned and analyzed bike sales data from over 1,000 transactions to uncover customer trends using demographic segmentation. Built scoring model and interactive dashboard for stakeholder use, focusing on age, income, marital status, and commuting habits. Identified high-value customer segment: married, middle-aged professionals in North America; insights used to recommend targeted marketing and sales initiatives.",
      icon: <BarChart2 className="text-blue-400" size={24} />,
      tags: ["Data Cleaning", "EDA", "Dashboard", "Analytics"],
      githubUrl: "https://github.com/dizzy505/bikes-sales",
      liveUrl:
        "https://public.tableau.com/views/BikeSalesDashboard_17460906746870/Dashboard1?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link",
      previewImages: ["/images/bike-sales.png", "/images/bike-sales2.png", "/images/bike-sales3.png"],
    },
    {
      id: "career-guide",
      title: "Expert System CareerGuide.id",
      description:
        "Built a backward chaining rule-based expert system in Python with Streamlit interface for personalized career recommendations. Mapped user interests and education background to career domains using logical inference and visualized recommendation path. Aimed to assist students and early professionals in decision-making by offering transparent, reasoned suggestions with career descriptions and insights.",
      icon: <UserCheck className="text-blue-400" size={24} />,
      tags: ["Python", "Streamlit", "Expert System", "Career Recommendation"],
      githubUrl: "https://github.com/dizzy505/Career-Guide",
      liveUrl: "https://app-career-guide.streamlit.app/",
      previewImages: [
        "/images/career-guide.jpg",
        "/images/career-guide2.jpg",
        "/images/career-guide3.jpg",
        "/images/career-guide4.jpg",
        "/images/career-guide5.jpg"
      ],
    },
    {
      id: "ckd-prediction",
      title: "Chronic Kidney Disease Prediction",
      description:
        "Explored and visualized 25+ clinical variables (both categorical & numerical) from CKD dataset to uncover early indicators of kidney issues. Identified patterns like elevated serum creatinine, low hemoglobin, and abnormal red blood cells as key differentiators between CKD-positive and negative cases. Noted imbalanced features such as high presence of hypertension and diabetes among CKD patients, with majority class skewed towards non-CKD. Developed a machine learning classification model with Streamlit interface to predict CKD risk and visualize contributing factors. Dashboard enables healthcare professionals and patients to monitor health parameters and act proactively for early intervention.",
      icon: <Activity className="text-blue-400" size={24} />,
      tags: ["Python", "Streamlit", "Machine Learning", "Healthcare"],
      githubUrl: "https://github.com/dizzy505/kidney-disease",
      liveUrl: "https://kidney-predictor.streamlit.app/",
      previewImages: [
        "/images/ckd-prediction.jpg",
        "/images/ckd-prediction2.png",
        "/images/ckd-prediction3.png"
      ],
    },
    {
      id: "jkn-sentiment",
      title: "Mobile JKN Sentiment Analysis",
      description:
        "Scraped and preprocessed 10,000+ Google Play reviews of Mobile JKN app using Python and NLP techniques. Performed sentiment labeling and keyword analysis to detect user frustration patterns and app usage satisfaction. Discovered key complaints (login errors, OTP failures, data mismatch) and highlights (simple registration, helpful UI), providing actionable feedback for product development teams. Deployed analysis as a Streamlit dashboard with visual insights and sentiment prediction tool.",
      icon: <MessageCircle className="text-blue-400" size={24} />,
      tags: ["Python", "Sentiment Analysis", "NLP"],
      githubUrl: "https://github.com/dizzy505/SentimentAnalysisJKN",
      liveUrl: "https://sentiment-jkn.streamlit.app/",
      previewImages: [
        "/images/jkn-sentiment.jpg",
        "/images/jkn-sentiment2.jpg",
        "/images/jkn-sentiment3.jpg",
        "/images/jkn-sentiment4.jpg",
        "/images/jkn-sentiment5.jpg",
        "/images/jkn-sentiment6.png",
        "/images/jkn-sentiment7.png"
      ],
    },
  ];

  const menuItems = [
    { id: "profile", label: "Profile", icon: <User size={20} /> },
    { id: "projects", label: "Projects", icon: <FolderKanban size={20} /> },
    { id: "certificates", label: "Certificates", icon: <Medal size={20} /> },
    { id: "learning", label: "Learning", icon: <BookOpenCheck size={20} /> },
    { id: "contact", label: "Contact", icon: <MessageCircle size={20} /> },
  ];

  const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="min-h-screen bg-gray-900 md:flex block">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex flex-col w-80 bg-gray-800 border-r border-gray-700 fixed h-screen overflow-y-auto">
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="p-6 border-b border-gray-700"
        >
          <img
            src="/images/icad3.jpg"
            alt="Irsyad Faruq Ardiansyah"
            className="w-32 h-32 rounded-full mx-auto object-cover border-2 border-blue-400 shadow-lg mb-4 hover:scale-105 transition-transform duration-300"
          />
          <h1 className="text-2xl font-bold text-center text-white">
            Irsyad Faruq Ardiansyah
          </h1>
          <div className="flex justify-center space-x-4 mt-4">
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="mailto:irsyad3254@gmail.com"
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              <Mail size={32} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="http://linkedin.com/in/IrsyadArdiansyah"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              <Linkedin size={32} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="https://wa.me/6287775439677"
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              <Phone size={32} />
            </motion.a>
          </div>
        </motion.div>
        <nav className="flex-1 p-4">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setCurrentView(item.id as View)}
              className={`w-full flex items-center gap-3 px-6 py-4 rounded-lg mb-3 transition-all duration-300 ${
                currentView === item.id
                  ? "bg-blue-600 text-white scale-105"
                  : "text-gray-400 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {item.icon}
              <span className="text-lg">{item.label}</span>
            </motion.button>
          ))}
        </nav>
      </aside>

      {/* Mobile layout */}
      <div className="md:hidden">
        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="fixed top-4 right-4 z-50 p-2 bg-gray-800 rounded-lg text-white"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Profile section for mobile - only show when profile is selected */}
        {currentView === "profile" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900 p-6 rounded-lg"
          >
            <img
              src="/images/icad3.jpg"
              alt="Irsyad Faruq Ardiansyah"
              className="w-32 h-32 rounded-full mx-auto object-cover border-2 border-blue-400 shadow-lg mb-4"
            />
            <h1 className="text-2xl font-bold text-center text-white mb-4">
              Irsyad Faruq Ardiansyah
            </h1>
            <div className="flex justify-center space-x-6">
              <motion.a
                whileHover={{ scale: 1.2 }}
                href="mailto:irsyad3254@gmail.com"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Mail size={28} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2 }}
                href="http://linkedin.com/in/IrsyadArdiansyah"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Linkedin size={28} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2 }}
                href="https://wa.me/6287775439677"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Phone size={28} />
              </motion.a>
            </div>
          </motion.div>
        )}

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 bg-gray-900 z-40 pt-20"
            >
              <div className="p-4 space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentView(item.id as View);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      currentView === item.id
                        ? "bg-blue-600 text-white"
                        : "text-gray-400 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main content */}
      <main className="flex-1 p-8 md:ml-80">
        <AnimatePresence mode="wait">
          {currentView === "profile" && (
            <motion.div
              key="profile"
              {...pageTransition}
              className="max-w-4xl mx-auto space-y-8"
            >
              {/* About Me */}
              <section>
                <h2 className="text-3xl font-bold mb-8 text-white">About Me</h2>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-lg transition-shadow"
                >
                  <p className="text-lg text-gray-300 leading-relaxed">
                    As a final semester student in Computer Science at
                    Indraprasta PGRI University, I have developed strong
                    analytical and technical capabilities. My expertise lies in
                    data analysis and processing, allowing me to design
                    effective strategies and create predictive models based on
                    complex datasets. I pride myself on being adaptable, working
                    well in team environments, and maintaining a constant
                    eagerness to learn and master new technologies and
                    methodologies in the ever-evolving field of computer
                    science.
                  </p>
                </motion.div>
              </section>

              {/* Skills */}
              <section>
                <h2 className="text-3xl font-bold mb-8 text-white">Skills</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Programming",
                      icon: <Code className="text-blue-400" size={24} />,
                      skills: ["Python", "SQL"],
                    },
                    {
                      title: "Data Analysis",
                      icon: <Database className="text-blue-400" size={24} />,
                      skills: [
                        "Data Cleaning",
                        "EDA",
                        "Data Mining",
                        "Machine Learning",
                        "NLP",
                      ],
                    },
                    {
                      title: "Tools",
                      icon: (
                        <FileSpreadsheet className="text-blue-400" size={24} />
                      ),
                      skills: [
                        "Jupyter Notebook",
                        "Excel",
                        "Workbench",
                        "Power BI",
                        "Tableau",
                      ],
                    },
                    {
                      title: "Soft Skills",
                      icon: <Brain className="text-blue-400" size={24} />,
                      skills: [
                        "Analytical Thinking",
                        "Problem Solving",
                        "Team Collaboration",
                      ],
                    },
                  ].map((skillGroup, index) => (
                    <motion.div
                      key={skillGroup.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        {skillGroup.icon}
                        <h3 className="text-xl font-semibold text-white">
                          {skillGroup.title}
                        </h3>
                      </div>
                      <ul className="space-y-2 text-gray-300">
                        {skillGroup.skills.map((skill, skillIndex) => (
                          <motion.li
                            key={skillIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: index * 0.1 + skillIndex * 0.1,
                            }}
                          >
                            {skill}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Experience */}
              <section>
                <h2 className="text-3xl font-bold mb-8 text-white">
                  Work Experience
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      company: "KOPINDOSAT",
                      period: "2024-2025",
                      role: "Freelance Drafter",
                      duties: [
                        "Created detailed railway blueprints and track layouts",
                        "Developed precise technical drawings for railway infrastructure",
                      ],
                    },
                    {
                      company: "Ministry of Agriculture",
                      period: "Nov 2019 - Jan 2020",
                      role: "Internship",
                      duties: [
                        "Conducting the input process for ministerial correspondence into the system",
                        "Ensuring efficient management of data inputted into Excel",
                        "Adhering to meticulous archiving procedures",
                      ],
                    },
                    {
                      company: "KORPOLAIRUD BAHARKAM POLRI",
                      period: "Aug 2019 - Oct 2019",
                      role: "Internship",
                      duties: [
                        "Contributing to server maintenance activities",
                        "Engaging in analysis and planning for ship plotting",
                        "Providing IT support and solutions",
                      ],
                    },
                  ].map((exp, index) => (
                    <motion.div
                      key={exp.company}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="bg-gray-800 p-6 rounded-lg shadow-sm border-l-4 border-blue-400 hover:shadow-lg transition-all hover:-translate-x-2"
                    >
                      <h4 className="text-xl font-semibold text-white">
                        {exp.company}
                      </h4>
                      <p className="text-gray-400">
                        {exp.period} | {exp.role}
                      </p>
                      <ul className="list-disc list-inside text-gray-300 mt-2">
                        {exp.duties.map((duty, dutyIndex) => (
                          <motion.li
                            key={dutyIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                              delay: index * 0.2 + dutyIndex * 0.1,
                            }}
                          >
                            {duty}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Contact section for mobile only */}
              <section className="md:hidden">
                <h2 className="text-3xl font-bold mb-8 text-white">Contact</h2>
                <div className="grid grid-cols-1 gap-6">
                  <motion.a
                    href="https://github.com/dizzy505"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 flex items-center gap-4"
                  >
                    <Github size={32} className="text-blue-400" />
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        GitHub
                      </h3>
                      <p className="text-gray-400">@dizzy505</p>
                    </div>
                  </motion.a>

                  <motion.a
                    href="http://linkedin.com/in/IrsyadArdiansyah"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 flex items-center gap-4"
                  >
                    <Linkedin size={32} className="text-blue-400" />
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        LinkedIn
                      </h3>
                      <p className="text-gray-400">Irsyad Ardiansyah</p>
                    </div>
                  </motion.a>

                  <motion.a
                    href="mailto:irsyad3254@gmail.com"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 flex items-center gap-4"
                  >
                    <Mail size={32} className="text-blue-400" />
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        Email
                      </h3>
                      <p className="text-gray-400">irsyad3254@gmail.com</p>
                    </div>
                  </motion.a>

                  <motion.a
                    href="https://wa.me/6287775439677"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 flex items-center gap-4"
                  >
                    <Phone size={32} className="text-blue-400" />
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        WhatsApp
                      </h3>
                      <p className="text-gray-400">+62 877-7543-9677</p>
                    </div>
                  </motion.a>
                </div>
              </section>
            </motion.div>
          )}

          {currentView === "projects" && (
            <motion.div
              key="projects"
              {...pageTransition}
              className="max-w-6xl mx-auto"
            >
              <h2 className="text-3xl font-bold mb-8 text-white">Projects</h2>
              <div className="grid grid-cols-1 gap-8">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-800 rounded-lg shadow-sm hover:shadow-lg transition-all hover:-translate-y-2"
                  >
                    <div className="relative">
                      <div className="overflow-x-auto rounded-t-lg scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
                        <div className="flex gap-3 w-full p-3">
                          {project.previewImages.map((img, i) => (
                            <div key={i} className="relative flex-shrink-0 group cursor-pointer">
                              <img
                                src={img}
                                alt={`${project.title} ${i + 1}`}
                                className="h-56 w-auto object-cover rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300 border-2 border-gray-700 group-hover:border-blue-400"
                                onClick={() => setSelectedImage(img)}
                              />
                              <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs">
                                {i + 1}/{project.previewImages.length}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="flex items-center gap-4 mb-6">
                        {project.icon}
                        <h3 className="text-2xl font-semibold text-white">
                          {project.title}
                        </h3>
                      </div>
                      <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-3 mb-8">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-4 py-2 bg-gray-700 text-blue-400 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-4">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-3 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-lg"
                        >
                          <Github size={24} />
                          <span>GitHub</span>
                        </a>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-3 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg"
                        >
                          <ExternalLink size={24} />
                          <span>Live Demo</span>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {currentView === "certificates" && (
            <motion.div
              key="certificates"
              {...pageTransition}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl font-bold mb-8 text-white">
                Certificates
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() =>
                    setSelectedCertificate({
                      title: "Certificate of Competence",
                      issuer: "BNSP",
                      period: "2022 - 2025",
                      image: "/images/sertif bnsp.jpg",
                      description:
                        "Computer Network Engineering Qualification Level 2",
                    })
                  }
                  className="bg-gray-800 rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-all hover:-translate-y-2 cursor-pointer"
                >
                  <img
                    src="/images/sertif bnsp.jpg"
                    alt="BNSP Certificate"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Award className="text-blue-400" size={24} />
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          Certificate of Competence
                        </h3>
                        <p className="text-gray-400">BNSP | 2022 - 2025</p>
                      </div>
                    </div>
                    <p className="text-gray-300">
                      Computer Network Engineering Qualification Level 2
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  onClick={() =>
                    setSelectedCertificate({
                      title: "MikroTik Certified Network Associate",
                      issuer: "MikroTik",
                      period: "2021 - 2024",
                      image: "/images/sertif mtcna.jpg",
                      description: "MTCNA Certification",
                    })
                  }
                  className="bg-gray-800 rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-all hover:-translate-y-2 cursor-pointer"
                >
                  <img
                    src="/images/sertif mtcna.jpg"
                    alt="MikroTik Certificate"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Award className="text-blue-400" size={24} />
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          MikroTik Certified Network Associate
                        </h3>
                        <p className="text-gray-400">MikroTik | 2021 - 2024</p>
                      </div>
                    </div>
                    <p className="text-gray-300">MTCNA Certification</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  onClick={() =>
                    setSelectedCertificate({
                      title: "DQLab Bootcamp Certificates",
                      issuer: "DQLab",
                      period: "2023",
                      image: "/images/sertif dqlab.jpg",
                      description:
                        "Python Fundamental for Data Science, R Fundamental for Data Science, Fundamental SQL Using SELECT Statement",
                    })
                  }
                  className="bg-gray-800 rounded-lg shadow-sm overflow-hidden col-span-1 md:col-span-2 hover:shadow-lg transition-all hover:-translate-y-2 cursor-pointer"
                >
                  <img
                    src="/images/sertif dqlab.jpg"
                    alt="DQLab Certificates"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Award className="text-blue-400" size={24} />
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          DQLab Bootcamp Certificates
                        </h3>
                      </div>
                    </div>
                    <ul className="list-disc list-inside text-gray-300">
                      <li>Python Fundamental for Data Science</li>
                      <li>R Fundamental for Data Science</li>
                      <li>Fundamental SQL Using SELECT Statement</li>
                    </ul>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  onClick={() =>
                    setSelectedCertificate({
                      title: "Udemy Courses Certificates",
                      issuer: "Udemy",
                      period: "2025",
                      image: "/images/sertif udemy.jpg",
                      description:
                        "Microsoft Excel and Google Sheets for Data Analysis",
                    })
                  }
                  className="bg-gray-800 rounded-lg shadow-sm overflow-hidden col-span-1 md:col-span-2 hover:shadow-lg transition-all hover:-translate-y-2 cursor-pointer"
                >
                  <img
                    src="/images/sertif udemy.jpg"
                    alt="Udemy Certificates"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Award className="text-blue-400" size={24} />
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          Udemy Courses Certificates
                        </h3>
                      </div>
                    </div>
                    <ul className="list-disc list-inside text-gray-300">
                      <li>
                        Microsoft Excel and Google Sheets for Data Analysis
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {currentView === "learning" && (
            <motion.div
              key="learning"
              {...pageTransition}
              className="max-w-4xl mx-auto space-y-8"
            >
              <h2 className="text-3xl font-bold mb-8 text-white">
                Learning Progress
              </h2>

              {/* Study Hours Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800 p-6 rounded-lg shadow-lg"
              >
                <h3 className="text-xl font-semibold text-white mb-6">
                  Weekly Study Hours
                </h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={studyHoursData}>
                      <defs>
                        <linearGradient
                          id="colorHours"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#60A5FA"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#60A5FA"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="date" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          border: "none",
                          borderRadius: "0.5rem",
                          color: "#fff",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="hours"
                        stroke="#60A5FA"
                        fillOpacity={1}
                        fill="url(#colorHours)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* Learning Progress Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {learningData.map((data, index) => (
                  <LearningProgressCard key={data.topic} data={data} />
                ))}
              </div>
            </motion.div>
          )}

          {currentView === "contact" && (
            <motion.div
              key="contact"
              {...pageTransition}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl font-bold mb-8 text-white">Contact Me</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.a
                  href="https://github.com/dizzy505"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 flex items-center gap-4"
                >
                  <Github size={32} className="text-blue-400" />
                  <div>
                    <h3 className="text-xl font-semibold text-white">GitHub</h3>
                    <p className="text-gray-400">@dizzy505</p>
                  </div>
                </motion.a>

                <motion.a
                  href="http://linkedin.com/in/IrsyadArdiansyah"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 flex items-center gap-4"
                >
                  <Linkedin size={32} className="text-blue-400" />
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      LinkedIn
                    </h3>
                    <p className="text-gray-400">Irsyad Ardiansyah</p>
                  </div>
                </motion.a>

                <motion.a
                  href="mailto:irsyad3254@gmail.com"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 flex items-center gap-4"
                >
                  <Mail size={32} className="text-blue-400" />
                  <div>
                    <h3 className="text-xl font-semibold text-white">Email</h3>
                    <p className="text-gray-400">irsyad3254@gmail.com</p>
                  </div>
                </motion.a>

                <motion.a
                  href="https://wa.me/6287775439677"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 flex items-center gap-4"
                >
                  <Phone size={32} className="text-blue-400" />
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      WhatsApp
                    </h3>
                    <p className="text-gray-400">+62 877-7543-9677</p>
                  </div>
                </motion.a>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 bg-gray-800 p-6 rounded-lg shadow-sm"
              >
                <h3 className="text-xl font-semibold text-white mb-4">
                  Let's Connect!
                </h3>
                <p className="text-gray-300">
                  I'm always open to discussing new projects, creative ideas, or
                  opportunities to be part of your visions. Feel free to reach
                  out through any of the platforms above or send me a message
                  directly.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            isOpen={!!selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCertificate && (
          <CertificateModal
            certificate={selectedCertificate}
            isOpen={!!selectedCertificate}
            onClose={() => setSelectedCertificate(null)}
          />
        )}
      </AnimatePresence>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <ImageModal
            image={selectedImage}
            isOpen={!!selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

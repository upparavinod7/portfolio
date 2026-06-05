export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'ai-ml' | 'full-stack' | 'sde';
  problem: string;
  solution: string;
  features: string[];
  techStack: string[];
  architecture: string;
  challenges: string;
  metrics: string;
  githubLink: string;
  liveLink: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  technologies: string[];
  outcomes: string[];
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level: number }[]; // level out of 100 for visual progress bars
}

export interface Certification {
  title: string;
  issuer: string;
  type: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  score: string;
  coursework: string[];
}

export const personalInfo = {
  name: "Uppara Vinod",
  email: "upparavinod7@gmail.com",
  phone: "+91 7680841759",
  location: "Pattikonda, Andhra Pradesh",
  github: "https://github.com/upparavinod7",
  linkedin: "https://www.linkedin.com/in/uppara-vinod-2259b728b/", // Placeholder or standard search URL
  portfolio: "https://github.com/upparavinod7",
  personas: {
    'ai-ml': {
      title: "AI/ML Engineer",
      tagline: "AI/ML Engineer | Machine Learning | Deep Learning | Python",
      brandStatement: "I design and deploy end-to-end machine learning models and deep learning pipelines. Proficient in PyTorch, TensorFlow, and computer vision, I bridge the gap between heavy AI inference models and production web endpoints.",
      bio: "I am a high-achieving Computer Science & Engineering student (CGPA: 9.45/10) specializing in Artificial Intelligence and Machine Learning at Joy University. My journey centers on developing robust algorithms, preprocessing complex datasets, and deploying models using Flask/FastAPI. From facial emotion recognition with CNNs to advanced pricing prediction engines, I strive to build high-performance systems that make smart decisions in real time.",
      stats: [
        { label: "CGPA (Joy University)", value: "9.45/10" },
        { label: "AI Models Deployed", value: "5+" },
        { label: "ML Internships Completed", value: "2" },
        { label: "ACM Chapter Leadership", value: "Vice Chair" }
      ]
    },
    'full-stack': {
      title: "Full Stack Developer",
      tagline: "Full Stack Developer | React | Node.js | MongoDB | TypeScript",
      brandStatement: "I build production-grade web applications using the MERN stack and TypeScript. From responsive user interfaces to secure JWT-authenticated REST APIs and optimized database schemas, I deliver end-to-end value.",
      bio: "I am a motivated Full Stack Developer with active industry experience building full-stack platforms. During my internship at Hyperready, I've developed core features using React, Node.js, Express, and MongoDB, designing RESTful APIs and optimizing schemas for faster response times. I enjoy crafting beautiful user interfaces using Tailwind CSS while maintaining standard security protocols and clean architectures on the backend.",
      stats: [
        { label: "Next.js & React Apps", value: "5+" },
        { label: "REST APIs Built", value: "15+" },
        { label: "MongoDB / SQL Queries", value: "Optimized" },
        { label: "B.Tech CSE GPA", value: "9.45/10" }
      ]
    },
    'sde': {
      title: "Software Engineer",
      tagline: "Software Development Engineer | DSA | Java | Python | System Design",
      brandStatement: "I solve algorithmic problems and build highly scalable software systems. Backed by solid foundations in Data Structures, Algorithms, OOP, and SOLID design principles, I focus on clean, maintainable, and highly efficient code.",
      bio: "I am a Software Development Engineer with a strong passion for computational theory, algorithmic problem-solving, and clean software architecture. With an academic background focused heavily on DSA, Operating Systems, Computer Networks, and DBMS, I write code that is modular and testable. Whether implementing design patterns in Java/C++ or scripting automation in Python, I apply software engineering best practices to build systems that scale.",
      stats: [
        { label: "DSA Problems Solved", value: "200+" },
        { label: "Object-Oriented Languages", value: "Java, C++, Python" },
        { label: "System Design Foundations", value: "Solid" },
        { label: "Joy University CGPA", value: "9.45/10" }
      ]
    }
  }
};

export const skillsData: Record<'ai-ml' | 'full-stack' | 'sde', SkillCategory[]> = {
  'ai-ml': [
    {
      title: "AI & Machine Learning",
      skills: [
        { name: "Supervised/Unsupervised Learning", level: 92 },
        { name: "CNNs (Convolutional Networks)", level: 88 },
        { name: "RNNs & LSTMs", level: 80 },
        { name: "Computer Vision (OpenCV)", level: 85 },
        { name: "Natural Language Processing (NLP)", level: 82 },
        { name: "Feature Engineering & Tuning", level: 90 }
      ]
    },
    {
      title: "ML/DL Frameworks & Libraries",
      skills: [
        { name: "TensorFlow & Keras", level: 85 },
        { name: "PyTorch", level: 80 },
        { name: "Scikit-Learn", level: 90 },
        { name: "NumPy & Pandas", level: 95 },
        { name: "Matplotlib & Seaborn", level: 90 },
        { name: "SciPy", level: 80 }
      ]
    },
    {
      title: "Languages & Deployment",
      skills: [
        { name: "Python", level: 95 },
        { name: "SQL", level: 88 },
        { name: "JavaScript", level: 80 },
        { name: "Flask & REST APIs", level: 88 },
        { name: "Docker (Basic)", level: 65 },
        { name: "Git & GitHub", level: 90 }
      ]
    },
    {
      title: "Core Computer Science",
      skills: [
        { name: "Data Structures & Algorithms", level: 88 },
        { name: "Object Oriented Programming (OOP)", level: 90 },
        { name: "Database Management (DBMS)", level: 85 },
        { name: "Probability & Statistics", level: 88 }
      ]
    }
  ],
  'full-stack': [
    {
      title: "Frontend Technologies",
      skills: [
        { name: "React.js & Hooks", level: 92 },
        { name: "TypeScript", level: 85 },
        { name: "JavaScript (ES6+)", level: 90 },
        { name: "Tailwind CSS", level: 95 },
        { name: "HTML5 & CSS3", level: 95 },
        { name: "Responsive & Mobile-First Design", level: 90 }
      ]
    },
    {
      title: "Backend & Databases",
      skills: [
        { name: "Node.js & Express.js", level: 88 },
        { name: "MongoDB & Mongoose ODM", level: 88 },
        { name: "REST API Design", level: 92 },
        { name: "JWT Authentication", level: 85 },
        { name: "MySQL", level: 82 },
        { name: "Flask", level: 75 }
      ]
    },
    {
      title: "Languages & Tools",
      skills: [
        { name: "JavaScript", level: 90 },
        { name: "TypeScript", level: 85 },
        { name: "Python", level: 85 },
        { name: "SQL", level: 82 },
        { name: "Git / GitHub", level: 90 },
        { name: "Postman & API Testing", level: 88 }
      ]
    },
    {
      title: "Core CS & DevOps",
      skills: [
        { name: "Data Structures & Algorithms", level: 85 },
        { name: "Database Design & Optimization", level: 84 },
        { name: "Software Engineering Lifecycles", level: 88 },
        { name: "Webpack & npm", level: 80 }
      ]
    }
  ],
  'sde': [
    {
      title: "Languages & DSA",
      skills: [
        { name: "Python", level: 92 },
        { name: "Java", level: 88 },
        { name: "C++", level: 85 },
        { name: "TypeScript / JavaScript", level: 88 },
        { name: "Data Structures & Algorithms", level: 90 },
        { name: "SQL", level: 85 }
      ]
    },
    {
      title: "Software Design & OOP",
      skills: [
        { name: "SOLID Design Principles", level: 88 },
        { name: "Object Oriented Programming (OOP)", level: 92 },
        { name: "Design Patterns (MVC, Singleton, etc.)", level: 82 },
        { name: "Modular Software Architecture", level: 86 }
      ]
    },
    {
      title: "Backend & Frontend Systems",
      skills: [
        { name: "Node.js & Express.js", level: 85 },
        { name: "Flask & REST API Design", level: 82 },
        { name: "JWT & Request Validation", level: 85 },
        { name: "React.js & CSS Flexbox/Grid", level: 85 },
        { name: "MongoDB & MySQL", level: 84 },
        { name: "Database Schema Design & Indexing", level: 86 }
      ]
    },
    {
      title: "Tools & Core Science",
      skills: [
        { name: "Git & Version Control Workflows", level: 90 },
        { name: "IntelliJ IDEA & VS Code", level: 88 },
        { name: "Operating Systems (OS)", level: 80 },
        { name: "Computer Networks (CN)", level: 80 }
      ]
    }
  ]
};

export const projectsData: Project[] = [
  {
    id: "career-os",
    title: "CareerOS AI",
    subtitle: "Intelligent Job & Career Intelligence Platform",
    category: "full-stack",
    problem: "Job seekers struggle with matching their skills to job specs, evaluating fit scores, and understanding specific technical gaps preventing them from getting interviews.",
    solution: "Built a complete MERN + TypeScript SaaS application incorporating an AI-based matching engine that evaluates fit scoring, maps out skill-gap analysis, and automatically generates personalized career roadmaps utilizing LLM APIs.",
    features: [
      "AI skill-matching engine with NLP-driven job-fit scoring",
      "Dynamic dashboard showing real-time skill analytics and job application outcomes",
      "Secure JWT authentication with role-based access control and session management",
      "Optimized MongoDB schemas with indexing and query pagination for large datasets"
    ],
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "TypeScript", "Tailwind CSS", "LLM APIs"],
    architecture: "Separated modular micro-services: an authentication service, job search integration service, analytics manager, and the core AI job-matching API built with Node.js/Express.",
    challenges: "Handling response latency from third-party LLM APIs and mapping complex nested database schemas for users' job matches without sacrificing UI response speed.",
    metrics: "Successfully handled sub-second page rendering for nested charts, implementing cache mechanisms that decreased database query load by 40%.",
    githubLink: "https://github.com/upparavinod7/CareerOS-AI-fe",
    liveLink: "#"
  },
  {
    id: "mood-music",
    title: "Smart Music Player",
    subtitle: "Real-time Emotion-Based Playlist Recommendation",
    category: "ai-ml",
    problem: "Conventional music recommendation platforms rely purely on listening histories, ignoring a user's current emotional state which changes dynamically throughout the day.",
    solution: "Designed and built an end-to-end computer vision application that captures facial emotion via the webcam, processes the frames using a deep CNN model, and triggers real-time music recommendations.",
    features: [
      "Real-time webcam video feed capture and image processing with OpenCV",
      "Convolutional Neural Network (CNN) classifying facial features into 7 distinct emotion states",
      "Dynamic playlist selector integrating predictions with music player playback",
      "Modular backend exposing model predictions via REST APIs to a responsive frontend UI"
    ],
    techStack: ["Python", "OpenCV", "TensorFlow", "Keras", "Flask", "React.js", "Tailwind CSS"],
    architecture: "A dual-layer software system comprising a high-throughput Python OpenCV frame processor, a Flask backend serving model inferences, and a React web client managing media controls.",
    challenges: "Achieving high validation accuracy in low-light facial captures and ensuring low-latency inference pipelines from the camera frame feed to the browser playlist updates.",
    metrics: "Achieved over 90% validation accuracy on emotion classification models and a sub-200ms roundtrip delay for frame-to-playlist adjustments.",
    githubLink: "https://github.com/upparavinod7/Smart-Music-Player",
    liveLink: "#"
  },
  {
    id: "price-prediction",
    title: "Price Prediction Web Applications",
    subtitle: "ML-Powered Vehicle & Mobile Valuation Platform",
    category: "sde",
    problem: "Accurate secondhand market valuations are hard to compute due to non-linear correlations between parameters like model wear, usage, brand tier, and local market trends.",
    solution: "Trained multiple regression models on real-world datasets, optimized model hyperparameters using cross-validation, and deployed the final weights to an interactive web platform with a Flask backend.",
    features: [
      "Exploratory Data Analysis (EDA) and robust feature engineering pipelines",
      "Ensemble learning utilizing Random Forest and Gradient Boosting (XGBoost) regressors",
      "Interactive, mobile-responsive web dashboard for input parameters and instant output display",
      "Automated feature scaling and encoding utilities integrated directly into deployment code"
    ],
    techStack: ["Python", "Scikit-Learn", "XGBoost", "Flask", "HTML5/CSS3", "JavaScript", "Pandas"],
    architecture: "Clean separation between the ML inference backend (Flask API) and a lightweight vanilla JS client, maximizing execution speed and minimizing asset sizes.",
    challenges: "Handling multicollinearity in dataset features and preventing model overfitting on thin historical datasets.",
    metrics: "Reduced Mean Absolute Error (MAE) by 15% through strategic hyperparameter tuning, delivering sub-100ms local inference response times.",
    githubLink: "https://github.com/upparavinod7/price-prediction-platform",
    liveLink: "#"
  }
];

export const experienceData: Experience[] = [
  {
    id: "hyperready",
    role: "Junior Developer Intern",
    company: "Hyperready",
    period: "Jan 2026 – Apr 2026",
    description: [
      "Integrated AI-driven features into full-stack SaaS applications, serving ML model predictions directly to React-based analytics dashboards.",
      "Built over 10+ RESTful API endpoints in Node.js/Express with input validation, request sanitization, and structured error handling.",
      "Optimized MongoDB data schemas and implemented indexed query structures, improving page load and rendering performance.",
      "Collaborated using Git, Agile workflows, and participating in peer code reviews to maintain code quality standards."
    ],
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "TypeScript", "REST APIs", "Tailwind CSS"],
    outcomes: [
      "Decreased component re-rendering times by optimizing React context usages.",
      "Constructed reliable backend authentication flows resulting in zero session-related vulnerabilities during testing."
    ]
  },
  {
    id: "unified-mentor",
    role: "Machine Learning Intern",
    company: "Unified Mentor",
    period: "Aug 2025 – Sept 2025",
    description: [
      "Developed and optimized supervised Machine Learning models for vehicle and mobile valuation pipelines using Python and Scikit-Learn.",
      "Performed exhaustive exploratory data analysis (EDA), data scrubbing, feature selection, and hyperparameter tuning.",
      "Deployed predictive model pipelines via lightweight Flask micro-backends exposing endpoints to client-facing websites."
    ],
    technologies: ["Python", "Scikit-Learn", "Flask", "Pandas", "Random Forest", "Regression Models"],
    outcomes: [
      "Achieved high accuracy and low RMSE metrics across dynamic price prediction ranges.",
      "Delivered fully documented end-to-end ML code libraries from data preprocessing to Flask setup."
    ]
  },
  {
    id: "acm-student",
    role: "Vice Chairperson",
    company: "ACM Student Chapter",
    period: "2024 - 2026",
    description: [
      "Organized technical workshops, hackathons, and AI/ML knowledge-sharing sessions for student cohorts.",
      "Mentored junior student developer teams in building software projects and understanding Git workflows.",
      "Led and coordinated a management committee of 10+ student members to drive club engagement."
    ],
    technologies: ["Leadership", "Git Workflows", "Software Engineering Workshops", "Mentorship"],
    outcomes: [
      "Expanded student participation in monthly coding events, engaging 100+ active student participants.",
      "Fostered collaborative student project work, resulting in multiple award-winning internal campus projects."
    ]
  }
];

export const educationData: Education[] = [
  {
    degree: "B.Tech CSE (Artificial Intelligence & Machine Learning)",
    institution: "Joy University",
    period: "2023 – 2027",
    score: "CGPA: 9.45/10",
    coursework: ["Machine Learning", "Deep Learning", "Computer Vision", "Natural Language Processing (NLP)", "Data Structures & Algorithms", "DBMS", "Operating Systems", "Computer Networks", "System Design"]
  },
  {
    degree: "Narayana Junior College (MPC)",
    institution: "MPC Board",
    period: "2021 – 2023",
    score: "Percentage: 96.1%",
    coursework: ["Mathematics", "Physics", "Chemistry"]
  },
  {
    degree: "Narayana School (SSC)",
    institution: "Secondary School Certificate",
    period: "2021",
    score: "GPA: 10/10",
    coursework: ["General Sciences", "Mathematics", "Languages"]
  }
];

export const certificationsData: Certification[] = [
  {
    title: "AWS Solutions Architecture Job Simulation",
    issuer: "Forage",
    type: "Cloud & Solutions Architecture"
  },
  {
    title: "Data Analytics Job Simulation",
    issuer: "Forage",
    type: "Data Engineering & Analytics"
  },
  {
    title: "Technology Job Simulation",
    issuer: "Forage",
    type: "Software Engineering & Lifecycle"
  }
];

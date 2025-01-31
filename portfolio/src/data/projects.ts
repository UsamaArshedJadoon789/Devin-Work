import { Project } from '../types';

// AI & ML Projects
export const aiProjects: Project[] = [
  {
    title: "AI-Powered Healthcare Platform",
    description: "A comprehensive healthcare platform leveraging AI for patient diagnosis and treatment recommendations.",
    tech: ["React", "TypeScript", "Python", "TensorFlow", "FastAPI", "PostgreSQL"],
    features: [
      "Real-time patient monitoring",
      "AI-driven diagnosis assistance",
      "Secure medical records management",
      "Telemedicine integration"
    ],
    implementation: {
      frontend: "React with TypeScript, TailwindCSS for styling",
      backend: "FastAPI with PostgreSQL database",
      ml: "TensorFlow for diagnostic models",
      deployment: "AWS with containerized microservices"
    },
    demoUrl: "https://healthcare-ai.demo.com",
    githubUrl: "https://github.com/portfolio/healthcare-ai",
    imageUrl: "/images/management.png"
  },
  {
    title: "AI Image Recognition API",
    description: "Advanced image recognition system using deep learning for object detection and classification.",
    tech: ["Python", "TensorFlow", "FastAPI", "Docker", "Redis", "AWS"],
    features: [
      "Real-time object detection",
      "Multi-model inference",
      "Batch processing capabilities",
      "API rate limiting"
    ],
    implementation: {
      frontend: "React dashboard for API monitoring",
      backend: "FastAPI with Redis caching",
      ml: "Custom TensorFlow models",
      deployment: "AWS Lambda with container support"
    },
    demoUrl: "https://image-recognition.demo.com",
    githubUrl: "https://github.com/portfolio/image-recognition",
    imageUrl: "/images/blockchain.png"
  },
  {
    title: "AI Chat Assistant",
    description: "Intelligent chatbot platform with natural language processing capabilities.",
    tech: ["Python", "PyTorch", "FastAPI", "React", "MongoDB", "Docker"],
    features: [
      "Natural language understanding",
      "Multi-language support",
      "Context awareness",
      "Custom training pipeline"
    ],
    implementation: {
      frontend: "React with WebSocket integration",
      backend: "FastAPI with MongoDB",
      ml: "Custom PyTorch models",
      deployment: "Docker containers on GCP"
    },
    demoUrl: "https://chat-assistant.demo.com",
    githubUrl: "https://github.com/portfolio/chat-assistant",
    imageUrl: "/images/chat-assistant.png"
  }
];

// Blockchain Projects
export const blockchainProjects: Project[] = [
  {
    title: "Blockchain Supply Chain System",
    description: "Decentralized supply chain management system using blockchain for transparency.",
    tech: ["Solidity", "Web3.js", "React", "Node.js", "MongoDB", "IPFS"],
    features: [
      "Smart contract automation",
      "Real-time tracking",
      "Decentralized verification",
      "Supply chain analytics"
    ],
    implementation: {
      frontend: "React with Web3 integration",
      backend: "Node.js with Express",
      blockchain: "Ethereum smart contracts",
      deployment: "IPFS and Ethereum mainnet"
    },
    demoUrl: "https://supply-chain.demo.com",
    githubUrl: "https://github.com/portfolio/supply-chain",
    imageUrl: "/images/supply-chain.png"
  },
  {
    title: "Cryptocurrency Trading Bot",
    description: "Automated trading system for cryptocurrency markets with advanced algorithms.",
    tech: ["Python", "FastAPI", "PostgreSQL", "Redis", "WebSocket", "Docker"],
    features: [
      "Real-time market analysis",
      "Automated trading strategies",
      "Risk management",
      "Performance analytics"
    ],
    implementation: {
      frontend: "React with real-time charts",
      backend: "FastAPI with WebSocket",
      deployment: "Docker on Digital Ocean"
    },
    demoUrl: "https://trading-bot.demo.com",
    githubUrl: "https://github.com/portfolio/trading-bot",
    imageUrl: "/images/trading-bot.png"
  }
];

// IoT Projects
export const iotProjects: Project[] = [
  {
    title: "IoT Smart Home Dashboard",
    description: "Comprehensive IoT dashboard for managing and monitoring smart home devices.",
    tech: ["React", "Node.js", "MQTT", "InfluxDB", "WebSocket", "Docker"],
    features: [
      "Real-time device monitoring",
      "Automated device control",
      "Energy consumption analytics",
      "Custom automation rules"
    ],
    implementation: {
      frontend: "React with WebSocket",
      backend: "Node.js with MQTT broker",
      deployment: "Docker on GCP"
    },
    demoUrl: "https://smart-home.demo.com",
    githubUrl: "https://github.com/portfolio/smart-home",
    imageUrl: "/images/iot.png"
  }
];

// Management Systems
export const managementProjects: Project[] = [
  {
    title: "Project Management Tool",
    description: "Comprehensive project management platform with real-time collaboration features.",
    tech: ["React", "TypeScript", "Node.js", "MongoDB", "Socket.io", "Docker"],
    features: [
      "Real-time task tracking",
      "Team collaboration",
      "Resource management",
      "Gantt chart visualization",
      "Time tracking integration",
      "Automated reporting"
    ],
    implementation: {
      frontend: "React with TypeScript and Material-UI",
      backend: "Node.js with Express",
      deployment: "Docker on AWS"
    },
    demoUrl: "https://project-manager.demo.com",
    githubUrl: "https://github.com/portfolio/project-manager",
    imageUrl: "/images/project-mgmt.png"
  },
  {
    title: "Warehouse Management System",
    description: "Enterprise-grade warehouse and inventory management system with real-time tracking.",
    tech: ["React", "TypeScript", "Node.js", "PostgreSQL", "Redis", "Docker"],
    features: [
      "Real-time inventory tracking",
      "Barcode and QR code scanning",
      "Order fulfillment automation",
      "Warehouse space optimization",
      "Supply chain integration",
      "Advanced reporting and analytics"
    ],
    implementation: {
      frontend: "React with TypeScript and Material-UI",
      backend: "Node.js with Express",
      deployment: "Docker on AWS"
    },
    demoUrl: "https://warehouse-manager.demo.com",
    githubUrl: "https://github.com/portfolio/warehouse-manager",
    imageUrl: "/images/smart-home.png"
  },
  {
    title: "Time Tracking System",
    description: "Advanced time tracking and productivity analytics platform for teams and individuals.",
    tech: ["React", "TypeScript", "Node.js", "MongoDB", "Redis", "Docker"],
    features: [
      "Real-time activity tracking",
      "Project time allocation",
      "Automated timesheet generation",
      "Productivity analytics",
      "Team performance insights",
      "Integration with project management tools"
    ],
    implementation: {
      frontend: "React with TypeScript and Chakra UI",
      backend: "Node.js with Express",
      deployment: "Docker on GCP"
    },
    demoUrl: "https://time-tracker.demo.com",
    githubUrl: "https://github.com/portfolio/time-tracker",
    imageUrl: "/images/time-tracker.png"
  },
  {
    title: "Subscription Management System",
    description: "Comprehensive subscription billing and management platform with analytics.",
    tech: ["React", "Node.js", "PostgreSQL", "Redis", "Stripe", "Docker"],
    features: [
      "Recurring billing automation",
      "Plan management",
      "Usage tracking",
      "Revenue analytics",
      "Customer portal",
      "Payment gateway integration"
    ],
    implementation: {
      frontend: "React with Redux",
      backend: "Node.js with Express",
      deployment: "Docker on AWS"
    },
    demoUrl: "https://subscription-manager.demo.com",
    githubUrl: "https://github.com/portfolio/subscription-manager",
    imageUrl: "/images/subscription-manager.png"
  },
  {
    title: "Survey Management Platform",
    description: "Advanced survey creation and analytics platform with real-time response tracking.",
    tech: ["React", "TypeScript", "Node.js", "MongoDB", "Redis", "Docker"],
    features: [
      "Dynamic form builder",
      "Real-time response analytics",
      "Advanced reporting",
      "Response validation",
      "Multi-language support",
      "Custom branding options"
    ],
    implementation: {
      frontend: "React with TypeScript and Material-UI",
      backend: "Node.js with Express",
      deployment: "Docker on AWS"
    },
    demoUrl: "https://survey-platform.demo.com",
    githubUrl: "https://github.com/portfolio/survey-platform",
    imageUrl: "/images/survey-platform.png"
  },
  {
    title: "Asset Management System",
    description: "Enterprise asset tracking and management platform with real-time monitoring.",
    tech: ["React", "TypeScript", "Node.js", "PostgreSQL", "Redis", "Docker"],
    features: [
      "Real-time asset tracking",
      "Maintenance scheduling",
      "Depreciation calculation",
      "Asset lifecycle management",
      "Inventory forecasting",
      "Audit trail logging"
    ],
    implementation: {
      frontend: "React with TypeScript and Chakra UI",
      backend: "Node.js with Express",
      deployment: "Docker on Azure"
    },
    demoUrl: "https://asset-management.demo.com",
    githubUrl: "https://github.com/portfolio/asset-management",
    imageUrl: "/images/asset-management.png"
  },
  {
    title: "Customer Support Platform",
    description: "Comprehensive customer service platform with real-time ticket management and analytics.",
    tech: ["React", "Node.js", "MongoDB", "Redis", "Socket.io", "Docker"],
    features: [
      "Real-time ticket tracking",
      "Live chat integration",
      "Knowledge base management",
      "Performance analytics",
      "SLA monitoring",
      "Multi-channel support"
    ],
    implementation: {
      frontend: "React with Material-UI",
      backend: "Node.js with Express",
      deployment: "Docker on GCP"
    },
    demoUrl: "https://customer-support.demo.com",
    githubUrl: "https://github.com/portfolio/customer-support",
    imageUrl: "/images/hrms.png"
  },
  {
    title: "Appointment Scheduling System",
    description: "Smart scheduling platform for businesses with real-time availability management.",
    tech: ["React", "Node.js", "PostgreSQL", "Redis", "Socket.io", "Docker"],
    features: [
      "Real-time calendar management",
      "Automated reminders",
      "Multi-timezone support",
      "Resource allocation",
      "Integration with popular calendars",
      "Custom scheduling rules"
    ],
    implementation: {
      frontend: "React with TailwindCSS",
      backend: "Node.js with Express",
      deployment: "Docker on AWS"
    },
    demoUrl: "https://appointment-scheduler.demo.com",
    githubUrl: "https://github.com/portfolio/appointment-scheduler",
    imageUrl: "/images/realestate-mgmt.png"
  },
  {
    title: "Library Management System",
    description: "Digital library management platform with inventory tracking and member services.",
    tech: ["React", "Node.js", "MongoDB", "Redis", "ElasticSearch", "Docker"],
    features: [
      "Book catalog management",
      "Member management",
      "Borrowing and returns tracking",
      "Fine calculation system",
      "Digital resource access",
      "Advanced search functionality"
    ],
    implementation: {
      frontend: "React with Chakra UI",
      backend: "Node.js with Express",
      deployment: "Docker on Digital Ocean"
    },
    demoUrl: "https://library-management.demo.com",
    githubUrl: "https://github.com/portfolio/library-management",
    imageUrl: "/images/project-manager.png"
  },
  {
    title: "HR Management System",
    description: "Comprehensive HR platform for employee management, payroll, and performance tracking.",
    tech: ["React", "Node.js", "PostgreSQL", "Redis", "GraphQL", "Docker"],
    features: [
      "Employee onboarding workflow",
      "Performance evaluation system",
      "Leave management",
      "Payroll processing",
      "Benefits administration",
      "Time and attendance tracking"
    ],
    implementation: {
      frontend: "React with Material-UI",
      backend: "Node.js with GraphQL",
      deployment: "Docker on Azure"
    },
    demoUrl: "https://hr-management.demo.com",
    githubUrl: "https://github.com/portfolio/hr-management",
    imageUrl: "/images/hr-management.png"
  },
  {
    title: "Content Management System",
    description: "Enterprise-grade CMS platform with advanced content workflow and publishing capabilities.",
    tech: ["React", "Node.js", "PostgreSQL", "Redis", "GraphQL", "Docker"],
    features: [
      "Content versioning",
      "Role-based access control",
      "Multi-language support",
      "Dynamic content types",
      "Workflow automation",
      "SEO optimization tools"
    ],
    implementation: {
      frontend: "React with Apollo Client",
      backend: "Node.js with GraphQL",
      deployment: "Docker on GCP"
    },
    demoUrl: "https://cms-platform.demo.com",
    githubUrl: "https://github.com/portfolio/cms-platform",
    imageUrl: "/images/ai.png"
  },
  {
    title: "Hotel Booking System",
    description: "Advanced hotel reservation and management platform with real-time availability tracking.",
    tech: ["React", "Node.js", "MongoDB", "Redis", "Socket.io", "Docker"],
    features: [
      "Real-time room availability",
      "Dynamic pricing",
      "Online payments",
      "Booking management",
      "Guest profiles",
      "Analytics dashboard"
    ],
    implementation: {
      frontend: "React with Material-UI",
      backend: "Node.js with Express",
      deployment: "Docker on AWS ECS"
    },
    demoUrl: "https://hotel-booking.demo.com",
    githubUrl: "https://github.com/portfolio/hotel-booking",
    imageUrl: "/images/hotel-booking.png"
  },
  {
    title: "Expense Management Tool",
    description: "Comprehensive expense tracking and management system with advanced reporting capabilities.",
    tech: ["React", "TypeScript", "Node.js", "PostgreSQL", "Redis", "Docker"],
    features: [
      "Receipt scanning and OCR",
      "Expense categorization",
      "Budget tracking",
      "Approval workflows",
      "Real-time reporting",
      "Multi-currency support"
    ],
    implementation: {
      frontend: "React with TypeScript",
      backend: "Node.js with Express",
      deployment: "Docker on AWS ECS"
    },
    demoUrl: "https://expense-mgmt.demo.com",
    githubUrl: "https://github.com/portfolio/expense-mgmt",
    imageUrl: "/images/expense-mgmt.png"
  },
  {
    title: "Fleet Management System",
    description: "Comprehensive fleet management solution with real-time vehicle tracking and maintenance scheduling.",
    tech: ["React", "Node.js", "PostgreSQL", "Redis", "Socket.io", "Docker"],
    features: [
      "Real-time GPS tracking",
      "Fuel consumption monitoring",
      "Maintenance scheduling",
      "Driver performance analytics",
      "Route optimization",
      "Vehicle diagnostics"
    ],
    implementation: {
      frontend: "React with Redux",
      backend: "Node.js with Express",
      deployment: "Docker on Azure"
    },
    demoUrl: "https://fleet-mgmt.demo.com",
    githubUrl: "https://github.com/portfolio/fleet-mgmt",
    imageUrl: "/images/fleet-mgmt.png"
  },
  {
    title: "Restaurant Management System",
    description: "Comprehensive restaurant management platform with real-time order tracking and inventory management.",
    tech: ["React", "Node.js", "PostgreSQL", "Redis", "Socket.io", "Docker"],
    features: [
      "Real-time order tracking",
      "Table reservation system",
      "Inventory management",
      "Staff scheduling",
      "Kitchen display system",
      "Customer loyalty program"
    ],
    implementation: {
      frontend: "React with TailwindCSS",
      backend: "Node.js with Express",
      deployment: "Docker containers on GCP"
    },
    demoUrl: "https://restaurant-mgmt.demo.com",
    githubUrl: "https://github.com/portfolio/restaurant-mgmt",
    imageUrl: "/images/restaurant-mgmt.png"
  },



  {
    title: "Real Estate Management System",
    description: "Comprehensive platform for real estate property management and analytics.",
    tech: ["React", "Node.js", "PostgreSQL", "Redis", "ElasticSearch", "AWS"],
    features: [
      "Property listing management",
      "Tenant portal",
      "Maintenance tracking",
      "Financial reporting",
      "Real-time availability updates"
    ],
    implementation: {
      frontend: "React with Material-UI",
      backend: "Node.js with Express",
      deployment: "AWS ECS with CloudFront"
    },
    demoUrl: "https://realestate-mgmt.demo.com",
    githubUrl: "https://github.com/portfolio/realestate-mgmt",
    imageUrl: "/images/realestate.png"
  },
  {
    title: "Inventory Management System",
    description: "Real-time inventory tracking and management system with advanced analytics.",
    tech: ["React", "Node.js", "MongoDB", "Redis", "Docker", "Kubernetes"],
    features: [
      "Real-time stock tracking",
      "Barcode/QR code scanning",
      "Automated reordering",
      "Supplier management",
      "Analytics dashboard"
    ],
    implementation: {
      frontend: "React with Chakra UI",
      backend: "Node.js with Express",
      deployment: "Kubernetes on GCP"
    },
    demoUrl: "https://inventory-mgmt.demo.com",
    githubUrl: "https://github.com/portfolio/inventory-mgmt",
    imageUrl: "/images/inventory-mgmt.png"
  },
  {
    title: "Document Management System",
    description: "Enterprise document management solution with advanced search and version control.",
    tech: ["React", "Node.js", "ElasticSearch", "PostgreSQL", "MinIO", "Docker"],
    features: [
      "Full-text search capabilities",
      "Version control system",
      "Document collaboration",
      "Access control management",
      "Automated OCR processing",
      "Audit trail tracking"
    ],
    implementation: {
      frontend: "React with Material-UI",
      backend: "Node.js with Express",
      storage: "MinIO for object storage",
      search: "ElasticSearch for document indexing",
      deployment: "Docker Swarm on AWS"
    },
    demoUrl: "https://docs-mgmt.demo.com",
    githubUrl: "https://github.com/portfolio/docs-mgmt",
    imageUrl: "/images/docs-mgmt.png"
  }
];

// Real-time Projects
export const realtimeProjects: Project[] = [
  {
    title: "Real-time Video Streaming Platform",
    description: "Live video streaming platform with interactive features.",
    tech: ["React", "Node.js", "WebRTC", "Redis", "MongoDB", "Docker"],
    features: [
      "Live streaming",
      "Chat integration",
      "Stream recording",
      "Analytics dashboard"
    ],
    implementation: {
      frontend: "React with WebRTC",
      backend: "Node.js with Socket.io",
      deployment: "Docker on GCP"
    },
    demoUrl: "https://video-stream.demo.com",
    githubUrl: "https://github.com/portfolio/video-stream",
    imageUrl: "/images/video-stream.png"
  }
];

// E-commerce Projects
export const ecommerceProjects: Project[] = [
  {
    title: "Auction Platform",
    description: "Real-time auction platform with live bidding and automated bid management.",
    tech: ["React", "Node.js", "Socket.io", "Redis", "MongoDB", "Docker"],
    features: [
      "Real-time bidding system",
      "Automated bid management",
      "Secure payment processing",
      "Auction scheduling",
      "Bidder verification",
      "Analytics dashboard"
    ],
    implementation: {
      frontend: "React with Socket.io client",
      backend: "Node.js with Express and Socket.io",
      deployment: "Docker on AWS"
    },
    demoUrl: "https://auction-platform.demo.com",
    githubUrl: "https://github.com/portfolio/auction-platform",
    imageUrl: "/images/auction-platform.png"
  },
  {
    title: "E-commerce Marketplace Platform",
    description: "Multi-vendor e-commerce platform with advanced features.",
    tech: ["React", "Node.js", "PostgreSQL", "Redis", "ElasticSearch", "AWS"],
    features: [
      "Multi-vendor support",
      "Real-time inventory",
      "Payment processing",
      "Order management"
    ],
    implementation: {
      frontend: "React with Next.js",
      backend: "Node.js with Express",
      deployment: "AWS ECS"
    },
    demoUrl: "https://marketplace.demo.com",
    githubUrl: "https://github.com/portfolio/marketplace",
    imageUrl: "/images/marketplace.png"
  }
];

// Social Media Projects
export const socialProjects: Project[] = [
  {
    title: "Social Media Analytics Platform",
    description: "Advanced analytics platform for social media data with real-time insights and trend analysis.",
    tech: ["React", "Node.js", "Python", "Apache Kafka", "ElasticSearch", "Redis"],
    features: [
      "Real-time sentiment analysis",
      "Trend detection and tracking",
      "Influencer identification",
      "Engagement metrics dashboard"
    ],
    implementation: {
      frontend: "React with D3.js for visualizations",
      backend: "Node.js with Kafka streams",
      ml: "Python for NLP and sentiment analysis",
      deployment: "Kubernetes on GCP"
    },
    demoUrl: "https://social-analytics.demo.com",
    githubUrl: "https://github.com/portfolio/social-analytics",
    imageUrl: "/images/social-analytics.png"
  }
];

// AR/VR Projects
export const arProjects: Project[] = [
  {
    title: "AR Navigation App",
    description: "Augmented reality navigation system providing real-time directions and points of interest.",
    tech: ["React Native", "ARKit", "ARCore", "Node.js", "MongoDB", "AWS"],
    features: [
      "Real-time AR navigation",
      "Points of interest overlay",
      "Offline map caching",
      "Voice-guided directions"
    ],
    implementation: {
      frontend: "React Native with AR frameworks",
      backend: "Node.js with MongoDB",
      deployment: "AWS Amplify"
    },
    demoUrl: "https://ar-nav.demo.com",
    githubUrl: "https://github.com/portfolio/ar-nav",
    imageUrl: "/images/ar-nav.png"
  }
];

// Development Tools Projects
export const devToolsProjects: Project[] = [
  {
    title: "Cloud-based IDE",
    description: "Browser-based integrated development environment with real-time collaboration features.",
    tech: ["React", "Monaco Editor", "WebSocket", "Docker", "Kubernetes", "Redis"],
    features: [
      "Real-time code collaboration",
      "Multi-language support",
      "Git integration",
      "Terminal emulation"
    ],
    implementation: {
      frontend: "React with Monaco Editor",
      backend: "Node.js with WebSocket",
      deployment: "Kubernetes on GCP"
    },
    demoUrl: "https://cloud-ide.demo.com",
    githubUrl: "https://github.com/portfolio/cloud-ide",
    imageUrl: "/images/cloud-ide.png"
  }
];

// Health & Fitness Projects
export const healthProjects: Project[] = [
  {
    title: "Fitness Tracking App",
    description: "Comprehensive fitness tracking application with real-time workout monitoring and analytics.",
    tech: ["React Native", "Node.js", "MongoDB", "WebSocket", "Redis", "AWS"],
    features: [
      "Real-time workout tracking",
      "Custom workout plans",
      "Progress analytics",
      "Social fitness challenges",
      "Integration with wearable devices"
    ],
    implementation: {
      frontend: "React Native with Redux",
      backend: "Node.js with Express",
      deployment: "AWS ECS with CloudFront"
    },
    demoUrl: "https://fitness-tracker.demo.com",
    githubUrl: "https://github.com/portfolio/fitness-tracker",
    imageUrl: "/images/fitness-tracker.png"
  }
];

// Career & Jobs Projects
export const careerProjects: Project[] = [
  {
    title: "Job Board Platform",
    description: "Advanced job listing and application management platform with real-time notifications.",
    tech: ["React", "Node.js", "MongoDB", "Redis", "ElasticSearch", "AWS"],
    features: [
      "Real-time job notifications",
      "Advanced job search and filtering",
      "Application tracking system",
      "Resume parsing and analysis",
      "Company profiles and reviews",
      "Salary insights and analytics"
    ],
    implementation: {
      frontend: "React with Chakra UI",
      backend: "Node.js with Express",
      deployment: "AWS ECS with auto-scaling"
    },
    demoUrl: "https://job-board.demo.com",
    githubUrl: "https://github.com/portfolio/job-board",
    imageUrl: "/images/job-board.png"
  }
];

// Event Management Projects
export const eventProjects: Project[] = [
  {
    title: "Event Management Platform",
    description: "Comprehensive event planning and management platform with real-time attendee tracking.",
    tech: ["React", "Node.js", "PostgreSQL", "Redis", "Socket.io", "AWS"],
    features: [
      "Real-time attendee tracking",
      "Ticket management system",
      "Event scheduling",
      "Vendor coordination",
      "Analytics dashboard",
      "Mobile check-in system"
    ],
    implementation: {
      frontend: "React with Material-UI",
      backend: "Node.js with Express",
      deployment: "AWS ECS with auto-scaling"
    },
    demoUrl: "https://event-mgmt.demo.com",
    githubUrl: "https://github.com/portfolio/event-mgmt",
    imageUrl: "/images/event-mgmt.png"
  }
];

// Entertainment Projects
export const entertainmentProjects: Project[] = [
  {
    title: "Music Streaming Service",
    description: "High-performance music streaming platform with personalized recommendations.",
    tech: ["React", "Node.js", "PostgreSQL", "Redis", "FFmpeg", "AWS"],
    features: [
      "Real-time audio streaming",
      "Personalized playlists",
      "Social sharing features",
      "Offline mode support",
      "Cross-device synchronization"
    ],
    implementation: {
      frontend: "React with Redux",
      backend: "Node.js with Express",
      deployment: "AWS ECS with CloudFront CDN"
    },
    demoUrl: "https://music-stream.demo.com",
    githubUrl: "https://github.com/portfolio/music-stream",
    imageUrl: "/images/music-stream.png"
  }
];

// Education Projects
export const educationProjects: Project[] = [
  {
    title: "Virtual Classroom Platform",
    description: "Interactive virtual classroom platform with real-time collaboration and learning tools.",
    tech: ["React", "Node.js", "MongoDB", "Socket.io", "WebRTC", "Docker"],
    features: [
      "Real-time video conferencing",
      "Interactive whiteboard",
      "Screen sharing",
      "Breakout rooms",
      "Student engagement analytics",
      "Resource sharing"
    ],
    implementation: {
      frontend: "React with Material-UI",
      backend: "Node.js with Express",
      deployment: "Docker on AWS ECS"
    },
    demoUrl: "https://virtual-classroom.demo.com",
    githubUrl: "https://github.com/portfolio/virtual-classroom",
    imageUrl: "/images/virtual-classroom.png"
  },
  {
    title: "E-Learning Platform",
    description: "Comprehensive online learning platform with interactive courses and real-time assessments.",
    tech: ["React", "Node.js", "MongoDB", "Socket.io", "AWS", "FFmpeg"],
    features: [
      "Live virtual classrooms",
      "Interactive quizzes",
      "Progress tracking",
      "Video content streaming"
    ],
    implementation: {
      frontend: "React with Material-UI",
      backend: "Node.js with Express",
      deployment: "AWS ECS with CloudFront CDN"
    },
    demoUrl: "https://elearning.demo.com",
    githubUrl: "https://github.com/portfolio/elearning",
    imageUrl: "/images/elearning.png"
  }
];

// Combine all projects
export const allProjects: Project[] = [
  ...aiProjects,
  ...blockchainProjects,
  ...iotProjects,
  ...managementProjects,
  ...realtimeProjects,
  ...ecommerceProjects,
  ...socialProjects,
  ...arProjects,
  ...devToolsProjects,
  ...healthProjects,
  ...careerProjects,
  ...eventProjects,
  ...entertainmentProjects,
  ...educationProjects
];

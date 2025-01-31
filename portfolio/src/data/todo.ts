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
    imageUrl: "/images/healthcare-ai.png"
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
    imageUrl: "/images/image-recognition.png"
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
    imageUrl: "/images/smart-home.png"
  }
];

// Management Systems
export const managementProjects: Project[] = [
  {
    title: "Real Estate Management System",
    description: "Comprehensive platform for real estate property management and analytics.",
    tech: ["React", "Node.js", "PostgreSQL", "Redis", "ElasticSearch", "AWS"],
    features: [
      "Property listing management",
      "Tenant portal",
      "Maintenance tracking",
      "Financial reporting"
    ],
    implementation: {
      frontend: "React with Material-UI",
      backend: "Node.js with Express",
      deployment: "AWS ECS"
    },
    demoUrl: "https://realestate.demo.com",
    githubUrl: "https://github.com/portfolio/realestate",
    imageUrl: "/images/realestate.png"
  },
  {
    title: "HR Management System",
    description: "Employee management platform with advanced HR features and analytics.",
    tech: ["React", "Python", "Django", "PostgreSQL", "Redis", "Docker"],
    features: [
      "Employee onboarding",
      "Performance tracking",
      "Leave management",
      "Payroll processing"
    ],
    implementation: {
      frontend: "React with Ant Design",
      backend: "Django REST framework",
      deployment: "Docker on Azure"
    },
    demoUrl: "https://hrms.demo.com",
    githubUrl: "https://github.com/portfolio/hrms",
    imageUrl: "/images/hrms.png"
  },
  {
    title: "Project Management Tool",
    description: "Collaborative project management platform with real-time updates.",
    tech: ["React", "Node.js", "MongoDB", "Socket.io", "Redis", "AWS"],
    features: [
      "Task management",
      "Team collaboration",
      "Time tracking",
      "Resource allocation"
    ],
    implementation: {
      frontend: "React with Redux",
      backend: "Node.js with Express",
      deployment: "AWS ECS"
    },
    demoUrl: "https://project-mgmt.demo.com",
    githubUrl: "https://github.com/portfolio/project-mgmt",
    imageUrl: "/images/project-mgmt.png"
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

// Additional Projects
export const additionalProjects: Project[] = [
  {
    title: "Social Media Analytics Platform",
    description: "Advanced analytics platform for social media data insights.",
    tech: ["React", "Python", "FastAPI", "ElasticSearch", "Redis", "AWS"],
    features: [
      "Real-time analytics",
      "Sentiment analysis",
      "Trend detection",
      "Custom reporting"
    ],
    implementation: {
      frontend: "React with D3.js",
      backend: "FastAPI with ElasticSearch",
      deployment: "AWS ECS"
    },
    demoUrl: "https://social-analytics.demo.com",
    githubUrl: "https://github.com/portfolio/social-analytics",
    imageUrl: "/images/social-analytics.png"
  },
  {
    title: "AR Navigation App",
    description: "Augmented reality navigation system for indoor and outdoor use.",
    tech: ["React Native", "ARKit", "Node.js", "MongoDB", "AWS"],
    features: [
      "AR waypoints",
      "Indoor mapping",
      "Voice guidance",
      "Offline support"
    ],
    implementation: {
      frontend: "React Native with ARKit",
      backend: "Node.js with MongoDB",
      deployment: "AWS Amplify"
    },
    demoUrl: "https://ar-nav.demo.com",
    githubUrl: "https://github.com/portfolio/ar-nav",
    imageUrl: "/images/ar-nav.png"
  },
  {
    title: "Cloud-based IDE",
    description: "Browser-based integrated development environment.",
    tech: ["React", "Monaco Editor", "Docker", "Kubernetes", "WebSocket"],
    features: [
      "Code editing",
      "Live collaboration",
      "Git integration",
      "Terminal access"
    ],
    implementation: {
      frontend: "React with Monaco Editor",
      backend: "Node.js with Docker",
      deployment: "Kubernetes on GCP"
    },
    demoUrl: "https://cloud-ide.demo.com",
    githubUrl: "https://github.com/portfolio/cloud-ide",
    imageUrl: "/images/cloud-ide.png"
  },
  {
    title: "E-Learning Platform",
    description: "Comprehensive online learning management system.",
    tech: ["React", "Node.js", "PostgreSQL", "Redis", "AWS"],
    features: [
      "Course management",
      "Video streaming",
      "Progress tracking",
      "Interactive quizzes"
    ],
    implementation: {
      frontend: "React with Material-UI",
      backend: "Node.js with Express",
      deployment: "AWS ECS"
    },
    demoUrl: "https://elearning.demo.com",
    githubUrl: "https://github.com/portfolio/elearning",
    imageUrl: "/images/elearning.png"
  },
  {
    title: "Inventory Management System",
    description: "Real-time inventory tracking and management system.",
    tech: ["React", "Node.js", "MongoDB", "Redis", "Docker"],
    features: [
      "Stock tracking",
      "Order management",
      "Supplier portal",
      "Analytics dashboard"
    ],
    implementation: {
      frontend: "React with Ant Design",
      backend: "Node.js with Express",
      deployment: "Docker on Azure"
    },
    demoUrl: "https://inventory.demo.com",
    githubUrl: "https://github.com/portfolio/inventory",
    imageUrl: "/images/inventory-mgmt.png"
  },
  {
    title: "Music Streaming Service",
    description: "Cloud-based music streaming platform.",
    tech: ["React", "Node.js", "MongoDB", "Redis", "AWS S3"],
    features: [
      "Audio streaming",
      "Playlist management",
      "Social features",
      "Offline mode"
    ],
    implementation: {
      frontend: "React with custom audio player",
      backend: "Node.js with Express",
      deployment: "AWS ECS"
    },
    demoUrl: "https://music-stream.demo.com",
    githubUrl: "https://github.com/portfolio/music-stream",
    imageUrl: "/images/music-stream.png"
  },
  {
    title: "Fitness Tracking App",
    description: "Comprehensive fitness and health tracking platform.",
    tech: ["React Native", "Node.js", "MongoDB", "Redis", "AWS"],
    features: [
      "Workout tracking",
      "Nutrition logging",
      "Progress analytics",
      "Social sharing"
    ],
    implementation: {
      frontend: "React Native",
      backend: "Node.js with Express",
      deployment: "AWS Amplify"
    },
    demoUrl: "https://fitness.demo.com",
    githubUrl: "https://github.com/portfolio/fitness",
    imageUrl: "/images/fitness-tracker.png"
  },
  {
    title: "Document Management System",
    description: "Enterprise document management and collaboration platform.",
    tech: ["React", "Node.js", "MongoDB", "ElasticSearch", "AWS S3"],
    features: [
      "Document storage",
      "Version control",
      "Access control",
      "Full-text search"
    ],
    implementation: {
      frontend: "React with Material-UI",
      backend: "Node.js with Express",
      deployment: "AWS ECS"
    },
    demoUrl: "https://docs-mgmt.demo.com",
    githubUrl: "https://github.com/portfolio/docs-mgmt",
    imageUrl: "/images/docs-mgmt.png"
  },
  {
    title: "Event Management Platform",
    description: "Comprehensive event planning and management system.",
    tech: ["React", "Node.js", "PostgreSQL", "Redis", "AWS"],
    features: [
      "Event scheduling",
      "Ticket management",
      "Vendor coordination",
      "Analytics dashboard"
    ],
    implementation: {
      frontend: "React with Chakra UI",
      backend: "Node.js with Express",
      deployment: "AWS ECS"
    },
    demoUrl: "https://event-mgmt.demo.com",
    githubUrl: "https://github.com/portfolio/event-mgmt",
    imageUrl: "/images/event-mgmt.png"
  },
  {
    title: "Job Board Platform",
    description: "Advanced job listing and applicant tracking system.",
    tech: ["React", "Node.js", "PostgreSQL", "ElasticSearch", "AWS"],
    features: [
      "Job listings",
      "Resume parsing",
      "Applicant tracking",
      "Analytics dashboard"
    ],
    implementation: {
      frontend: "React with Material-UI",
      backend: "Node.js with Express",
      deployment: "AWS ECS"
    },
    demoUrl: "https://job-board.demo.com",
    githubUrl: "https://github.com/portfolio/job-board",
    imageUrl: "/images/job-board.png"
  },
  {
    title: "Restaurant Management System",
    description: "Complete restaurant operations management platform.",
    tech: ["React", "Node.js", "PostgreSQL", "Redis", "AWS"],
    features: [
      "Order management",
      "Inventory tracking",
      "Staff scheduling",
      "Analytics dashboard"
    ],
    implementation: {
      frontend: "React with Material-UI",
      backend: "Node.js with Express",
      deployment: "AWS ECS"
    },
    demoUrl: "https://restaurant.demo.com",
    githubUrl: "https://github.com/portfolio/restaurant",
    imageUrl: "/images/restaurant-mgmt.png"
  },
  {
    title: "Virtual Classroom Platform",
    description: "Interactive online learning environment.",
    tech: ["React", "Node.js", "MongoDB", "WebRTC", "AWS"],
    features: [
      "Live classes",
      "Resource sharing",
      "Student tracking",
      "Interactive whiteboard"
    ],
    implementation: {
      frontend: "React with WebRTC",
      backend: "Node.js with Express",
      deployment: "AWS ECS"
    },
    demoUrl: "https://virtual-classroom.demo.com",
    githubUrl: "https://github.com/portfolio/virtual-classroom",
    imageUrl: "/images/virtual-classroom.png"
  },
  {
    title: "Fleet Management System",
    description: "Vehicle fleet tracking and management platform.",
    tech: ["React", "Node.js", "PostgreSQL", "Redis", "AWS"],
    features: [
      "Vehicle tracking",
      "Maintenance scheduling",
      "Route optimization",
      "Analytics dashboard"
    ],
    implementation: {
      frontend: "React with Material-UI",
      backend: "Node.js with Express",
      deployment: "AWS ECS"
    },
    demoUrl: "https://fleet.demo.com",
    githubUrl: "https://github.com/portfolio/fleet",
    imageUrl: "/images/fleet-mgmt.png"
  },
  {
    title: "Expense Management Tool",
    description: "Corporate expense tracking and management system.",
    tech: ["React", "Node.js", "PostgreSQL", "Redis", "AWS"],
    features: [
      "Expense tracking",
      "Receipt scanning",
      "Approval workflow",
      "Reporting dashboard"
    ],
    implementation: {
      frontend: "React with Material-UI",
      backend: "Node.js with Express",
      deployment: "AWS ECS"
    },
    demoUrl: "https://expense.demo.com",
    githubUrl: "https://github.com/portfolio/expense",
    imageUrl: "/images/expense-mgmt.png"
  },
  {
    title: "Hotel Booking System",
    description: "Comprehensive hotel reservation and management platform.",
    tech: ["React", "Node.js", "PostgreSQL", "Redis", "AWS"],
    features: [
      "Room booking",
      "Inventory management",
      "Payment processing",
      "Analytics dashboard"
    ],
    implementation: {
      frontend: "React with Material-UI",
      backend: "Node.js with Express",
      deployment: "AWS ECS"
    },
    demoUrl: "https://hotel.demo.com",
    githubUrl: "https://github.com/portfolio/hotel",
    imageUrl: "/images/hotel-booking.png"
  },
  {
    title: "Content Management System",
    description: "Enterprise content management and publishing platform.",
    tech: ["React", "Node.js", "PostgreSQL", "ElasticSearch", "AWS"],
    features: [
      "Content editing",
      "Workflow management",
      "Version control",
      "Analytics dashboard"
    ],
    implementation: {
      frontend: "React with Material-UI",
      backend: "Node.js with Express",
      deployment: "AWS ECS"
    },
    demoUrl: "https://cms.demo.com",
    githubUrl: "https://github.com/portfolio/cms",
    imageUrl: "/images/cms-platform.png"
  },
  {
    title: "Auction Platform",
    description: "Real-time online auction and bidding system.",
    tech: ["React", "Node.js", "PostgreSQL", "Redis", "AWS"],
    features: [
      "Live bidding",
      "Item management",
      "Payment processing",
      "Analytics dashboard"
    ],
    implementation: {
      frontend: "React with Material-UI",
      backend: "Node.js with Express",
      deployment: "AWS ECS"
    },
    demoUrl: "https://auction.demo.com",
    githubUrl: "https://github.com/portfolio/auction",
    imageUrl: "/images/auction-platform.png"
  },
  {
    title: "Library Management System",
    description: "Digital library management and cataloging system.",
    tech: ["React", "Node.js", "PostgreSQL", "ElasticSearch", "AWS"],
    features: [
      "Book catalog",
      "Member management",
      "Lending system",
      "Analytics dashboard"
    ],
    implementation: {
      frontend: "React with Material-UI",
      backend: "Node.js with Express",
      deployment: "AWS ECS"
    },
    demoUrl: "https://library.demo.com",
    githubUrl: "https://github.com/portfolio/library",
    imageUrl: "/images/library-management.png"
  },
  {
    title: "Appointment Scheduling System",
    description: "Advanced appointment booking and management platform.",
    tech: ["React", "Node.js", "PostgreSQL", "Redis", "AWS"],
    features: [
      "Calendar management",
      "Automated reminders",
      "Resource allocation",
      "Analytics dashboard"
    ],
    implementation: {
      frontend: "React with Material-UI",
      backend: "Node.js with Express",
      deployment: "AWS ECS"
    },
    demoUrl: "https://appointment.demo.com",
    githubUrl: "https://github.com/portfolio/appointment",
    imageUrl: "/images/appointment-scheduler.png"
  },
  {
    title: "Customer Support Platform",
    description: "Comprehensive customer service and support system.",
    tech: ["React", "Node.js", "PostgreSQL", "Redis", "AWS"],
    features: [
      "Ticket management",
      "Knowledge base",
      "Live chat",
      "Analytics dashboard"
    ],
    implementation: {
      frontend: "React with Material-UI",
      backend: "Node.js with Express",
      deployment: "AWS ECS"
    },
    demoUrl: "https://support.demo.com",
    githubUrl: "https://github.com/portfolio/support",
    imageUrl: "/images/customer-support.png"
  },
  {
    title: "Asset Management System",
    description: "Enterprise asset tracking and management platform.",
    tech: ["React", "Node.js", "PostgreSQL", "Redis", "AWS"],
    features: [
      "Asset tracking",
      "Maintenance scheduling",
      "Depreciation tracking",
      "Analytics dashboard"
    ],
    implementation: {
      frontend: "React with Material-UI",
      backend: "Node.js with Express",
      deployment: "AWS ECS"
    },
    demoUrl: "https://asset.demo.com",
    githubUrl: "https://github.com/portfolio/asset",
    imageUrl: "/images/asset-management.png"
  },
  {
    title: "Survey Management Platform",
    description: "Advanced survey creation and analytics system.",
    tech: ["React", "Node.js", "PostgreSQL", "Redis", "AWS"],
    features: [
      "Survey builder",
      "Response collection",
      "Data analysis",
      "Reporting dashboard"
    ],
    implementation: {
      frontend: "React with Material-UI",
      backend: "Node.js with Express",
      deployment: "AWS ECS"
    },
    demoUrl: "https://survey.demo.com",
    githubUrl: "https://github.com/portfolio/survey",
    imageUrl: "/images/survey-platform.png"
  },
  {
    title: "Subscription Management System",
    description: "Subscription billing and management platform.",
    tech: ["React", "Node.js", "PostgreSQL", "Redis", "AWS"],
    features: [
      "Plan management",
      "Billing automation",
      "Customer portal",
      "Analytics dashboard"
    ],
    implementation: {
      frontend: "React with Material-UI",
      backend: "Node.js with Express",
      deployment: "AWS ECS"
    },
    demoUrl: "https://subscription.demo.com",
    githubUrl: "https://github.com/portfolio/subscription",
    imageUrl: "/images/subscription-manager.png"
  },
  {
    title: "Time Tracking System",
    description: "Employee time tracking and management platform.",
    tech: ["React", "Node.js", "PostgreSQL", "Redis", "AWS"],
    features: [
      "Time tracking",
      "Project allocation",
      "Reporting system",
      "Analytics dashboard"
    ],
    implementation: {
      frontend: "React with Material-UI",
      backend: "Node.js with Express",
      deployment: "AWS ECS"
    },
    demoUrl: "https://timetrack.demo.com",
    githubUrl: "https://github.com/portfolio/timetrack",
    imageUrl: "/images/time-tracker.png"
  },
  {
    title: "Warehouse Management System",
    description: "Comprehensive warehouse operations management platform.",
    tech: ["React", "Node.js", "PostgreSQL", "Redis", "AWS"],
    features: [
      "Inventory control",
      "Order fulfillment",
      "Staff management",
      "Analytics dashboard"
    ],
    implementation: {
      frontend: "React with Material-UI",
      backend: "Node.js with Express",
      deployment: "AWS ECS"
    },
    demoUrl: "https://warehouse.demo.com",
    githubUrl: "https://github.com/portfolio/warehouse",
    imageUrl: "/images/warehouse-manager.png"
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
  ...additionalProjects
];

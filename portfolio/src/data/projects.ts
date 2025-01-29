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
    imageUrl: "/images/realestate-mgmt.png"
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
  ...eventProjects,
  ...entertainmentProjects,
  ...educationProjects
];

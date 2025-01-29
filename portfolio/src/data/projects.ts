import { Project } from '../types';

export const projects: Project[] = [
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
    imageUrl: "/images/healthcare-ai.jpg"
  },
  {
    title: "Blockchain Supply Chain System",
    description: "A decentralized supply chain management system using blockchain technology for transparency and traceability.",
    tech: ["React", "Solidity", "Web3.js", "Node.js", "MongoDB"],
    features: [
      "Real-time tracking",
      "Smart contract automation",
      "Decentralized verification",
      "Supply chain analytics"
    ],
    implementation: {
      frontend: "React with Web3 integration",
      backend: "Node.js with Express",
      blockchain: "Ethereum smart contracts with Solidity",
      deployment: "Decentralized deployment on IPFS"
    },
    demoUrl: "https://supply-chain.demo.com",
    githubUrl: "https://github.com/portfolio/supply-chain",
    imageUrl: "/images/supply-chain.jpg"
  },
  {
    title: "IoT Smart Home Dashboard",
    description: "A comprehensive IoT dashboard for managing and monitoring smart home devices with real-time updates.",
    tech: ["React", "Node.js", "MQTT", "InfluxDB", "WebSocket"],
    features: [
      "Real-time device monitoring",
      "Automated device control",
      "Energy consumption analytics",
      "Custom automation rules"
    ],
    implementation: {
      frontend: "React with real-time WebSocket updates",
      backend: "Node.js with MQTT broker",
      deployment: "Multi-container deployment on Google Cloud"
    },
    demoUrl: "https://smart-home.demo.com",
    githubUrl: "https://github.com/portfolio/smart-home",
    imageUrl: "/images/smart-home.jpg"
  },
  {
    title: "Real-time Video Streaming Platform",
    description: "Live video streaming platform with interactive features and real-time chat capabilities.",
    tech: ["React", "Node.js", "WebRTC", "Socket.io", "Redis", "AWS"],
    features: [
      "Live video streaming",
      "Real-time chat",
      "Stream recording",
      "Interactive viewer engagement",
      "Analytics dashboard"
    ],
    implementation: {
      frontend: "React with WebRTC integration",
      backend: "Node.js with Socket.io",
      deployment: "AWS MediaLive and CloudFront"
    },
    demoUrl: "https://video-stream.demo.com",
    githubUrl: "https://github.com/portfolio/video-stream",
    imageUrl: "/images/video-stream.jpg"
  },
  {
    title: "AI Image Recognition API",
    description: "Advanced image recognition system using deep learning for object detection and classification in real-time.",
    tech: ["Python", "TensorFlow", "FastAPI", "Docker", "Redis", "AWS"],
    features: [
      "Real-time object detection",
      "Multi-model inference",
      "Batch processing capabilities",
      "API rate limiting",
      "Model performance analytics"
    ],
    implementation: {
      frontend: "React dashboard for API monitoring",
      backend: "FastAPI with Redis caching",
      ml: "Custom TensorFlow models",
      deployment: "AWS Lambda with container support"
    },
    demoUrl: "https://image-recognition.demo.com",
    githubUrl: "https://github.com/portfolio/image-recognition",
    imageUrl: "/images/image-recognition.jpg"
  }
];

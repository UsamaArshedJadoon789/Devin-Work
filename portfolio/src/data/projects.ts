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
    githubUrl: "https://github.com/portfolio/healthcare-ai"
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
    githubUrl: "https://github.com/portfolio/supply-chain"
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
    githubUrl: "https://github.com/portfolio/smart-home"
  }
];

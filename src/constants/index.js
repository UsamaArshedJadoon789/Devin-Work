import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
  threejs,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Test Automation Architecture",
    icon: web,
  },
  {
    title: "Performance & Security Testing",
    icon: backend,
  },
  {
    title: "QA Strategy & Leadership",
    icon: mobile,
  },
  {
    title: "CI/CD Integration",
    icon: creator,
  },
];

const technologies = [
  {
    name: "Test Automation",
    icon: web,
    description: "Expert in Selenium, Playwright, and Cypress for web automation. Created frameworks reducing testing time by 70% and achieving 85% coverage across platforms."
  },
  {
    name: "Performance Testing",
    icon: backend,
    description: "JMeter specialist for load testing and performance analysis. Implemented infrastructure supporting 100K+ concurrent users with automated monitoring."
  },
  {
    name: "Security Testing",
    icon: mobile,
    description: "OWASP ZAP implementation reducing vulnerabilities by 40%. Expert in security best practices, compliance testing, and threat modeling."
  },
  {
    name: "CI/CD Integration",
    icon: creator,
    description: "Jenkins, GitLab CI, Azure DevOps expertise. Achieved 90% test coverage through automated pipeline integration and continuous testing."
  },
  {
    name: "Test Management",
    icon: web,
    description: "JIRA and TestRail expert for comprehensive test case management. Led implementation of efficient test tracking and reporting systems."
  },
  {
    name: "AWS IoT Testing",
    icon: backend,
    description: "Specialized in AWS IoT Core testing with 1000+ concurrent device simulations. Reduced manual testing effort by 80% through automation."
  }
];

const experiences = [
  {
    title: "Software QA Lead",
    company_name: "Zigron",
    icon: web,
    iconBg: "#383E56",
    date: "2021 - Present",
    points: [
      "Led a team of 8 QA engineers in implementing automated testing solutions, reducing testing cycles by 70%",
      "Established comprehensive QA strategies and best practices, improving overall product quality by 45%",
      "Architected and implemented CI/CD pipelines with automated testing, achieving 90% test coverage",
      "Spearheaded implementation of performance testing infrastructure supporting 100,000+ concurrent users",
      "Mentored team members in advanced testing methodologies and emerging automation tools",
    ],
  },
  {
    title: "Senior QA Engineer",
    company_name: "Zigron",
    icon: mobile,
    iconBg: "#E6DEDD",
    date: "2019 - 2021",
    points: [
      "Developed and maintained enterprise-level test automation frameworks using Selenium and Playwright",
      "Led performance testing initiatives using JMeter, identifying and resolving critical bottlenecks",
      "Implemented security testing practices, reducing vulnerability incidents by 40%",
      "Established automated testing processes for AWS IoT Core applications",
      "Trained and mentored junior QA engineers in test automation best practices",
    ],
  },
  {
    title: "QA Engineer",
    company_name: "Zigron",
    icon: backend,
    iconBg: "#383E56",
    date: "2017 - 2019",
    points: [
      "Designed and executed comprehensive test plans for web and mobile applications",
      "Developed automated test suites using Cypress and TestProject, improving efficiency by 50%",
      "Implemented Agile testing methodologies and continuous integration practices",
      "Created detailed test documentation and established robust bug tracking processes",
      "Collaborated with development teams to ensure high-quality software delivery",
    ],
  }
];

const testimonials = [
  {
    testimonial:
      "Usama's leadership in implementing automated testing frameworks has significantly improved our product quality and deployment efficiency. His expertise in QA strategy is invaluable.",
    name: "Sarah Mitchell",
    designation: "CTO",
    company: "TechCorp",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "The performance testing infrastructure Usama developed has been crucial in scaling our applications. His attention to detail and technical expertise are outstanding.",
    name: "Michael Chen",
    designation: "Engineering Director",
    company: "CloudTech Solutions",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "Usama's implementation of security testing practices has strengthened our application security posture significantly. His proactive approach to quality assurance is exemplary.",
    name: "Emma Rodriguez",
    designation: "Security Lead",
    company: "SecureNet Systems",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "Enterprise Test Framework",
    description:
      "Designed and implemented comprehensive test automation framework using Selenium and Playwright. Reduced regression testing time by 70%, improved coverage to 85%, integrated with CI/CD pipeline for continuous testing across multiple environments.",
    tags: [
      {
        name: "selenium",
        color: "blue-text-gradient",
      },
      {
        name: "playwright",
        color: "green-text-gradient",
      },
      {
        name: "jenkins",
        color: "pink-text-gradient",
      },
    ],
    image: web,
    source_code_link: "https://github.com/",
  },
  {
    name: "AWS IoT Testing Suite",
    description:
      "Developed automated testing platform for AWS IoT Core applications. Supports 1000+ concurrent device simulations, reduced manual testing by 80%, improved deployment reliability through automated end-to-end testing workflows.",
    tags: [
      {
        name: "aws",
        color: "blue-text-gradient",
      },
      {
        name: "python",
        color: "green-text-gradient",
      },
      {
        name: "automation",
        color: "pink-text-gradient",
      },
    ],
    image: mobile,
    source_code_link: "https://github.com/",
  },
  {
    name: "Performance Testing Platform",
    description:
      "Built enterprise-level performance testing infrastructure using JMeter and AWS. Enabled simulation of 100,000+ concurrent users with automated monitoring and alerting, reducing critical performance issues by 60%.",
    tags: [
      {
        name: "jmeter",
        color: "blue-text-gradient",
      },
      {
        name: "monitoring",
        color: "green-text-gradient",
      },
      {
        name: "ci/cd",
        color: "pink-text-gradient",
      },
    ],
    image: backend,
    source_code_link: "https://github.com/",
  },
];

export { services, technologies, experiences, testimonials, projects };

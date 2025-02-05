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
    name: "Selenium & Playwright",
    icon: web,
    description: "Expert in web automation using Selenium and Playwright frameworks. Skilled in creating robust, scalable test suites with cross-browser compatibility and CI/CD integration."
  },
  {
    name: "JMeter & Performance",
    icon: backend,
    description: "Advanced proficiency in JMeter for performance testing, load analysis, and stress testing. Experience in optimizing application performance and identifying bottlenecks."
  },
  {
    name: "Cypress & TestProject",
    icon: mobile,
    description: "Certified in modern test automation tools including Cypress and TestProject. Expertise in creating maintainable test frameworks with comprehensive reporting."
  },
  {
    name: "AWS IoT Testing",
    icon: creator,
    description: "Specialized in AWS IoT Core testing, including device simulation, message validation, and end-to-end testing of IoT applications."
  },
  {
    name: "Agile & Scrum",
    icon: web,
    description: "Certified Scrum Foundation Professional (SFPC) with expertise in Agile methodologies. Strong track record in leading QA teams and implementing Agile testing practices."
  },
  {
    name: "Security Testing",
    icon: backend,
    description: "Experienced in security testing methodologies, vulnerability assessment, and implementing security best practices in the testing lifecycle."
  },
  {
    name: "CI/CD Integration",
    icon: mobile,
    description: "Proficient in integrating automated tests with CI/CD pipelines, ensuring continuous quality assurance throughout the development lifecycle."
  },
  {
    name: "Test Management",
    icon: creator,
    description: "Expert in test planning, strategy development, and test case management using tools like Jira. Strong focus on quality metrics and process improvement."
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
    name: "Enterprise Test Automation Framework",
    description:
      "Architected and implemented a comprehensive test automation framework using Selenium and Playwright, reducing regression testing time by 70% and improving test coverage by 85%. Integrated with CI/CD pipeline for continuous testing across multiple browsers.",
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
        name: "ci/cd",
        color: "pink-text-gradient",
      },
    ],
    image: web,
    source_code_link: "https://github.com/",
  },
  {
    name: "Performance Testing Infrastructure",
    description:
      "Developed an enterprise-level performance testing infrastructure using JMeter and AWS, enabling simulation of 100,000+ concurrent users. Implemented automated performance monitoring and alerting, reducing critical issues by 60%.",
    tags: [
      {
        name: "jmeter",
        color: "blue-text-gradient",
      },
      {
        name: "aws",
        color: "green-text-gradient",
      },
      {
        name: "monitoring",
        color: "pink-text-gradient",
      },
    ],
    image: backend,
    source_code_link: "https://github.com/",
  },
  {
    name: "IoT Device Testing Platform",
    description:
      "Created an automated testing platform for AWS IoT Core applications, supporting 1000+ concurrent device simulations. Implemented end-to-end testing workflows reducing manual testing effort by 80% and improving deployment reliability.",
    tags: [
      {
        name: "automation",
        color: "blue-text-gradient",
      },
      {
        name: "iot",
        color: "green-text-gradient",
      },
      {
        name: "aws",
        color: "pink-text-gradient",
      },
    ],
    image: mobile,
    source_code_link: "https://github.com/",
  },
];

export { services, technologies, experiences, testimonials, projects };

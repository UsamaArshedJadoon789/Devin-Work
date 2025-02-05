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
    title: "Test Automation",
    icon: web,
  },
  {
    title: "Quality Assurance",
    icon: backend,
  },
  {
    title: "Agile Leadership",
    icon: mobile,
  },
  {
    title: "Performance Testing",
    icon: creator,
  },
];

const technologies = [
  {
    name: "Jira Project Management",
    icon: web,
    description: "Holder of the Jira Project Management Certificate, showcasing expertise in leveraging Jira for efficient project planning, tracking, and collaboration. Proficient in configuring projects, managing tasks, and utilizing reporting tools to drive project success."
  },
  {
    name: "Software Testing",
    icon: backend,
    description: "Proud recipient of a Software Testing Certificate, evidencing proficiency in testing methodologies and tools. Skilled in designing test plans, executing test cases, and identifying defects to ensure software quality."
  },
  {
    name: "Six Sigma Yellow Belt",
    icon: mobile,
    description: "Holder of a Six Sigma Yellow Belt Certificate, showcasing proficiency in process improvement methodologies. Skilled in data analysis, problem-solving, and implementing solutions to drive efficiency and quality in organizational processes."
  },
  {
    name: "First Bootcamp Session",
    icon: creator,
    description: "Certified attendee of the 2021 Testing Bootcamp First Session for TestProject, showcasing foundational knowledge in test automation and performance testing. Demonstrates expertise in test planning, execution, and quality assurance practices."
  },
  {
    name: "Second Bootcamp Session",
    icon: web,
    description: "Certified attendee of the 2021 Testing Bootcamp Second Session for TestProject, demonstrating advanced proficiency in test automation and software testing methodologies. Equipped with enhanced skills in test design, analysis, driving excellence in quality assurance practices."
  },
  {
    name: "Third Bootcamp Session",
    icon: backend,
    description: "Certified attendee of the 2021 Testing Bootcamp Third Session for TestProject, evidencing expertise in advanced test automation and software testing strategies. Proficient in test optimization, performance testing, and comprehensive quality assurance practices."
  },
  {
    name: "Scrum Foundation",
    icon: mobile,
    description: "Recipient of the Scrum Foundation Professional Certificate (SFPC) - (Q2023) from CertiProf. Knowledge in Scrum methodologies, demonstrates proficiency in Agile project management principles Shows commitment to enhancing project efficiency."
  },
  {
    name: "Appreciation Certificate",
    icon: creator,
    description: "Certificate of Appreciation awarded to Usama Arshad Jadoon. Recognized for commitment to excellence and specific milestones that have been commendable, demonstrating dedication and excellence."
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
      "Leading QA initiatives and implementing comprehensive test strategies for web and IoT applications.",
      "Managing and mentoring QA team members while collaborating with cross-functional teams to ensure software quality.",
      "Implementing automated testing frameworks using Cypress, Playwright, and JMeter for web and performance testing.",
      "Developing and maintaining test automation frameworks for AWS IoT Core applications.",
      "Conducting thorough testing of web applications, ensuring functionality, performance, and security requirements are met.",
    ],
  },
  {
    title: "Senior QA Engineer",
    company_name: "Zigron",
    icon: mobile,
    iconBg: "#E6DEDD",
    date: "2019 - 2021",
    points: [
      "Designed and executed comprehensive test plans for web and mobile applications.",
      "Implemented automated testing solutions using industry-standard tools and frameworks.",
      "Led performance testing initiatives using JMeter for high-traffic applications.",
      "Collaborated with development teams to improve software quality and reduce defect rates.",
      "Mentored junior QA engineers and provided technical guidance on testing methodologies.",
    ],
  },
  {
    title: "QA Engineer",
    company_name: "Zigron",
    icon: backend,
    iconBg: "#383E56",
    date: "2017 - 2019",
    points: [
      "Executed manual and automated tests for web applications and APIs.",
      "Created and maintained test documentation, including test cases and bug reports.",
      "Participated in Agile ceremonies and contributed to continuous improvement initiatives.",
      "Collaborated with developers to identify and resolve software defects efficiently.",
      "Gained expertise in various testing tools and methodologies.",
    ],
  }
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "Test Automation Framework",
    description:
      "Developed a comprehensive test automation framework using Cypress and Playwright for web applications. Implemented page object model, custom commands, and reporting functionality to enhance test maintainability and execution efficiency.",
    tags: [
      {
        name: "cypress",
        color: "blue-text-gradient",
      },
      {
        name: "playwright",
        color: "green-text-gradient",
      },
      {
        name: "javascript",
        color: "pink-text-gradient",
      },
    ],
    image: web,
    source_code_link: "https://github.com/",
  },
  {
    name: "Performance Testing Suite",
    description:
      "Designed and implemented a performance testing suite using JMeter for high-traffic web applications. Created test scenarios for load testing, stress testing, and endurance testing with detailed reporting and analysis capabilities.",
    tags: [
      {
        name: "jmeter",
        color: "blue-text-gradient",
      },
      {
        name: "performance",
        color: "green-text-gradient",
      },
      {
        name: "analytics",
        color: "pink-text-gradient",
      },
    ],
    image: backend,
    source_code_link: "https://github.com/",
  },
  {
    name: "AWS IoT Testing",
    description:
      "Implemented automated testing solutions for AWS IoT Core applications, ensuring reliability and performance of IoT device communications. Developed custom test frameworks for device simulation and message validation.",
    tags: [
      {
        name: "aws",
        color: "blue-text-gradient",
      },
      {
        name: "iot",
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
];

export { services, technologies, experiences, testimonials, projects };

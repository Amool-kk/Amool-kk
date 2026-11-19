export type Project = {
  id: string;
  number: string;
  name: string;
  category: string;
  summary: string;
  description: string;
  problem: string;
  solution: string;
  stack: string[];
  status: string;
  github: string;
  demo?: string;
  highlights: string[];
};

export const projects: Project[] = [
   {
    id: "hookreceiver",
    number: "01",
    name: "HookReceiver",
    category: "BACKEND / GO",
    summary: "A small Go HTTP service for receiving and inspecting webhook requests.",
    description: "A hands-on Go backend project focused on HTTP handlers, request lifecycle and building a reliable small service.",
    problem: "Webhook integrations are easier to debug when incoming requests can be received and inspected in a controlled environment.",
    solution: "HookReceiver provides a small HTTP endpoint that can evolve into an event-inspection and debugging tool.",
    stack: ["Go", "HTTP", "REST", "Testing"],
    status: "Early stage",
    github: "https://github.com/Amool-kk/HookReceiver",
    highlights: ["HTTP server foundation using the Go standard library", "Graceful shutdown foundation", "Next steps include request inspection, persistence and stronger test coverage"],
  },
  {
    id: "bytebridge",
    number: "02",
    name: "ByteBridge",
    category: "NETWORKING / DEVELOPER TOOL",
    summary: "Local-network file sharing with a focus on transfer performance and reliability.",
    description: "A practical file-transfer tool exploring device-to-device communication, network behavior and a smoother sharing workflow.",
    problem: "Moving files between devices on the same network can be unnecessarily slow or awkward, and performance is often hard to reason about.",
    solution: "ByteBridge explores a direct local-network workflow with attention to device approval, transfer behavior and measurable performance.",
    stack: ["Networking", "TCP", "Performance", "Desktop"],
    status: "Active project",
    github: "https://github.com/Amool-kk/ByteBridge",
    highlights: ["Investigating transfer throughput under different concurrency settings", "Benchmarking real network behavior instead of relying on assumptions", "Documenting trade-offs and reliability improvements"],
  },
  // {
  //   id: "atomyne",
  //   number: "02",
  //   name: "Atomyne",
  //   category: "FRONTEND / COMPONENT SYSTEM",
  //   summary: "A reusable UI component library focused on consistency and developer experience.",
  //   description: "A component-system project for exploring reusable interface primitives, component APIs and documentation workflows.",
  //   problem: "Repeated UI patterns become inconsistent when component behavior and styling are recreated independently.",
  //   solution: "Atomyne centralizes reusable UI building blocks and gives components a consistent place to evolve.",
  //   stack: ["React", "TypeScript", "Storybook", "UI Architecture"],
  //   status: "In development",
  //   github: "https://github.com/Amool-kk/Atomyne",
  //   highlights: ["Reusable component APIs", "Documentation-oriented development", "A foundation for accessibility and component testing"],
  // },
  {
    id: "taskboard",
    number: "03",
    name: "TaskBoard",
    category: "FULL STACK / WEB",
    summary: "A task-management application exploring end-to-end product development.",
    description: "A web application project used to explore frontend workflows and full-stack application structure.",
    problem: "Personal and team work benefits from a focused interface for organizing tasks and tracking progress.",
    solution: "TaskBoard brings task organization into a single web experience. Details and capabilities should be expanded as the repository is reviewed.",
    stack: ["Next.js", "TypeScript", "Web Application"],
    status: "Completed",
    github: "https://github.com/Amool-kk/taskboard",
    highlights: ["End-to-end web application practice", "Opportunity to deepen testing and data modeling", "Future improvements can include collaboration and activity history"],
  },
];

export const skills = [
  { group: "Frontend engineering", level: "Professional experience", items: ["React Native", "React", "TypeScript", "JavaScript", "Next.js", "Redux"] },
  { group: "Backend engineering", level: "Professional + project work", items: ["Node.js", "Express", "REST APIs", "Authentication", "PostgreSQL", "MongoDB", "Go"] },
  { group: "Systems & networking", level: "Hands-on projects / learning", items: ["Linux", "HTTP", "TCP/IP", "Concurrency", "System design"] },
  { group: "Infrastructure & quality", level: "Hands-on experience", items: ["Docker", "AWS fundamentals", "Prometheus", "Grafana", "Jest", "Git", "CI/CD"] },
];

export const experience = [
  {
    company: "Octave",
    role: "Software Developer",
    period: "Jul 2024 — Present",
    kind: "Professional experience",
    points: [
      "Developing and maintaining production React Native applications for tablet and large-screen environments.",
      "Built and improved map-based, split-screen and full-screen application experiences.",
      "Resolved 15+ UI and system-level issues and added 30+ Jest unit and integration tests.",
      "Contributed to React Native performance optimization; recognized with a Pat on the Back Award.",
    ],
    stack: ["React Native", "React", "TypeScript", "Jest", "C# (occasional)"],
  },
  {
    company: "PYOR",
    role: "Software Engineer Intern",
    period: "Jul 2023 — Jun 2024",
    kind: "Internship",
    points: [
      "Built a configurable frontend dashboard driven by JSON configuration.",
      "Developed a Google Sheets add-on for authenticated data extraction.",
      "Implemented Auth0/OAuth2 authentication and data formatting for charts, tables and spreadsheets.",
    ],
    stack: ["JavaScript", "TypeScript", "React", "Auth0", "OAuth2"],
  },
  {
    company: "Flipr",
    role: "DevOps Intern",
    period: "Jan 2023 — Feb 2023",
    kind: "Internship",
    points: [
      "Built monitoring dashboards for servers and Docker containers using Prometheus and Grafana.",
      "Developed AWS Lambda and S3-based notification workflows integrated with Slack and email.",
    ],
    stack: ["Docker", "Prometheus", "Grafana", "AWS Lambda", "S3"],
  },
];

export const notes = [
  { title: "Benchmarking file transfers over a local network", category: "Networking", detail: "Comparing transfer behavior, concurrency and real-world throughput.", url: "https://www.linkedin.com/in/amool-kuldiya/" },
  { title: "Exploring IPv6 for remote access", category: "Networking", detail: "Learning how addressing, routers and ISP support affect connectivity.", url: "https://www.linkedin.com/in/amool-kuldiya/" },
  { title: "Building backend fundamentals with Go", category: "Backend", detail: "Small, verifiable steps toward reliable HTTP services.", url: "https://github.com/Amool-kk/HookReceiver" },
];

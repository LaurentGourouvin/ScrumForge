<div align="center">

# 🐸⚙️ ScrumForge

### _Lightweight, self-hosted Scrum management platform_

<p align="center">
  <img src="./logo_scrum_forge.png" alt="ScrumForge Logo" width="250" />
</p>

---

![License](https://img.shields.io/badge/license-MIT-green?style=flat)
![Status](https://img.shields.io/badge/status-In%20Progress-yellow?style=flat)
![Stack](https://img.shields.io/badge/Stack-React%20%7C%20Node%20%7C%20GraphQL-blue?style=flat)

---

### A simple, developer-friendly Scrum app built for real teams

### **Fully aligned with the Scrum Guide. 100% self-hosted.**

Manage teams, products, backlogs, sprints, ceremonies, reports — all in one clean and intuitive interface.

</div>

---

# 🎯 What is ScrumForge?

ScrumForge is a **lightweight Scrum management platform** designed for:

- students learning Scrum
- teams who want a simple alternative to Jira
- developers needing a self-hosted project management tool
- anyone who wants a tool that **respects the Scrum Guide** without unnecessary complexity

It provides:

- Team & Product creation
- Product Backlog management
- Sprint lifecycle
- Scrum ceremonies support
- Sprint reports & metrics
- JSON import for Teams & Users
- Easy installation via Docker

ScrumForge is both a **developer project** and a **practical Scrum tool**.

---

# ✨ Core Features

### 🚧 In Progress

- Team creation & role assignment (PO / SM / Dev)
- Product creation & Product Overview
- Product Backlog (PBIs, priorities, story points)
- Sprint creation (goal, dates, PBIs)
- Sprint Board (To Do → In Progress → Done)
- Daily Scrum notes per team member
- Sprint Review report
- Sprint Retrospective (3-column format)
- User & Team import via JSON
- Wizard installation (Admin only)
- Strict role permissions:
  - Admin (technical only)
  - Organisation Manager
  - Product Owner
  - Scrum Master
  - Developer
- Velocity charts
- Burndown chart
- Advanced backlog filters
- Product metrics dashboard
- Multi-organisation support
- Webhooks (Slack, email)
- Comments on PBIs
- Action tracking from retros
- SRS-style improvement reminders
- Dark mode / theme system

---

# 🧱 App Structure (Overview)

ScrumForge follows a modern full-stack architecture:

- **Frontend**: React + TypeScript + React Query
- **Backend**: Node.js (NestJS or Express) + GraphQL
- **Database**: PostgreSQL + Prisma / TypeORM
- **Infra**: Docker Compose
- **Auth**: JWT + role-based middleware

---

# 🔧 Installation (Basic)

```bash
git clone https://github.com/LaurentGourouvin/ScrumForge
cd ScrumForge
docker compose up -d
```

Then open your browser:

👉 http://localhost:3000

You will be greeted by the Setup Wizard:

Create the Admin account

Set your organisation name

Create your first Team

(Optional) Import Users & Teams via JSON

# 🗺️ Roadmap

### 🧩 Core Functionality

- [ ] Role system (Admin / OrgManager / PO / SM / Dev)
- [ ] Team management
- [ ] Product management
- [ ] Product Backlog
- [ ] Sprint lifecycle
- [ ] Ceremonies (Planning, Daily, Review, Retro)
- [ ] Reports (Velocity / Burndown)
- [ ] Product metrics dashboard

### ⚙️ Infrastructure

- [ ] Docker support
- [ ] CI/CD pipelines
- [ ] OpenAPI / GraphQL schema documentation
- [ ] Logging / monitoring layer

### 🔮 Future Enhancements

- [ ] Multi-organisation support
- [ ] Assignments & comments on PBIs
- [ ] Notification system
- [ ] Advanced dashboards for PO & SM
- [ ] Workspace themes (Dark Mode, minimal mode)

---

# 🧩 Scrum Features (summary)

### 🧠 Product Backlog

- Create / edit PBIs
- Priorities
- Story points
- Filtering
- PO-only editing

### 🏃 Sprint Planning

- Drag & drop PBIs into sprint
- Sprint Goal mandatory
- Story points counting

### 📌 Sprint Board

- To Do / In Progress / Done
- Drag & drop
- Developer-friendly

### ⏱ Daily Scrum

- Per-member notes:
  - Yesterday
  - Today
  - Impediments

### 🎉 Sprint Review

- Auto-generated summary
- Review Report

### 🔧 Sprint Retrospective

- What went well
- What didn’t
- Action items

# ⚖️ License

ScrumForge is released under the **MIT License**.

This project is:

- non-commercial
- personal
- open-source
- created for learning, practice, and community contribution

See: [`LICENSE`](./LICENSE)

---

# 🧑‍💻 Author

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/laurentgourouvin)

**Laurent Gourouvin**  
Creator of **ScrumForge**  
2026 — Self-hosted Agile/Scrum Toolkit

---

# 🛠 Tech Stack

<p align="left">
  <img src="https://img.shields.io/badge/Next.js-16.0.7-black?style=flat&logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/React-19.2.1-61DAFB?style=flat&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-20-339933?style=flat&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/GraphQL-E10098?style=flat&logo=graphql&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker-Compose-2496ED?style=flat&logo=docker&logoColor=white" />
</p>

### **Frontend**

- Next.js (App Router)
- React
- TypeScript
- TailwindCSS (or shadcn/ui)

### **Backend**

- Node.js
- GraphQL
- TypeORM

### **Infrastructure**

- Docker Compose
- Role-based auth
- PostgreSQL

---

# 📣 Contributing

Contributions are welcome!

You can help with:

- UI/UX improvements
- GraphQL schema refinement
- Docker & DevOps
- Testing
- Documentation
- Bug reports

Before submitting a PR, please open an issue.

---

# 🧭 Vision

ScrumForge is designed to be:

- simple
- intuitive
- faithful to the Scrum Guide
- easy to install
- suitable for teams, students, and trainers

It is both a **learning project** and a fully usable **Scrum workflow tool**.

---

🐸 **ScrumForge — Lightweight. Self-hosted. Scrum without the clutter.**

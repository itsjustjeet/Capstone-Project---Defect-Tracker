# 🐞 Defect Tracking & Management System (DTMS)

> A lightweight, centralized bug-tracking platform designed to streamline the agile software development lifecycle. Built as a Capstone Project for Software Project Management (SPM).

---

## 🚀 Overview

In agile software development, teams require a centralized system to log, track, and resolve software defects efficiently. Decentralized communication often leads to lost information, duplicate efforts, and delayed release cycles. 

The **Defect Tracking & Management System (DTMS)** solves this by providing a cohesive environment tailored for agile teams. It eliminates the feature bloat of enterprise tools while focusing strictly on core tracking functionalities based on strict state-transition principles (inspired by SAP's Order-to-Cash logic).

## ✨ Core Features

* **End-to-End Workflow Management:** Enforces strict state transitions (`Open` → `In Progress` → `Resolved` → `Closed`) to ensure accountability and prevent duplicate work.
* **Interactive Kanban Board:** A visual dashboard with discrete columns to effortlessly map the lifecycle of a defect in real-time.
* **Issue Reporting & Prioritization:** Allows QA testers to submit detailed bug reports including titles, descriptions, and priority tags (*Low, High, Critical*) to communicate urgency.
* **Task Assignment & Triaging:** Facilitates the direct assignment of tickets to specific developers and enables status updates via an intuitive edit modal.
* **Accessible UI:** Clean interface with a native Dark/Light mode toggle for an improved user experience.

## 🛠️ Technology Stack

* **Frontend:** Vanilla JavaScript, HTML5, CSS3, GSAP (for fluid animations)
* **Backend:** Node.js, Express.js
* **Database:** Lightweight JSON / Local data structure for rapid prototyping

## 🔄 The Defect Lifecycle (Workflow)

1. **Bug Logging:** A QA Tester encounters an error and logs a new issue, setting a priority level.
2. **Triaging:** The system registers it as `Open` (unassigned). A manager assigns the ticket to a developer.
3. **Active Development:** The developer moves the ticket to `In Progress`.
4. **Resolution:** Once fixed, the ticket is marked as `Resolved` and routed back to QA.
5. **Closure:** QA verifies the fix and updates the final state to `Closed`.

## 📸 Screenshots

*(Pro-tip: Edit this section later by dragging and dropping your actual screenshots into the GitHub editor!)*

| Dashboard Overview | Issue Reporting | Edit / Assignment Modal |
|:---:|:---:|:---:|
| *(Add your dashboard image here)* | *(Add your report form image here)* | *(Add your edit modal image here)* |

## ⚙️ Installation & Setup

Want to run this project locally? Follow these simple steps:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/itsjustjeet/Capstone-Project---Defect-Tracker.git](https://github.com/itsjustjeet/Capstone-Project---Defect-Tracker.git)

# 🔥 Lenskart Incident Manager

A lightweight, full-stack incident response platform that connects system alerts to the right on-call engineers. This project streamlines the process of assigning and resolving service-level issues in real-time.

## 📝 Description
A real-time Incident Management System for DevOps workflows. It allows administrators to create on-call rotation policies and enables external services to trigger alerts. Built with Node.js and Vanilla JS, it manages the incident lifecycle—Triggered, Acknowledged, and Resolved—connecting specific services to assigned engineers via a dynamic dashboard.

## 🚀 Features
* **On-Call Management**: Admins can define which service is managed by which engineer using a simple rotation form.
* **Service Alerting**: External services can trigger incidents that are automatically routed to the assigned engineer.
* **Lifecycle States**: Track incidents through three primary states: `TRIGGERED`, `ACKNOWLEDGED`, and `RESOLVED`.
* **Live Dashboard**: A dynamic frontend that fetches and displays active incidents from the server.

## 🚥 API Documentation

### 1. Setup Rotation

- **Endpoint:** `POST /policy`
- **Description:** Links a service name to an on-call engineer.
- **Request Body:**

{
"service": "Database-Cluster",
"name": "John Doe",
"email": "john.d@lenskart.com"
}



### 2. Trigger Incident

- **Endpoint:** `POST /incident`
- **Description:** Creates a new alert. Fails if no matching service policy exists.
- **Request Body:**

{
"serviceName": "Database-Cluster",
"errorDetails": "Connection Timeout"
}

---

### 3. Fetch Dashboard

- **Endpoint:** `GET /dashboard`
- **Description:** Returns the current list of all incidents.
- **Response Status:** `200 OK`

---

### 4. Update Status (Ack / Resolve)

- **Endpoints:** `POST /ack` or `POST /resolve`
- **Description:** Updates the status of an existing incident using its unique ID.
- **Request Body:**

{
"id": "unique-incident-uuid"
}


---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript (Fetch API)
- **Backend:** Node.js, Express.js
- **Storage:** In-memory server-side state

---

## 📂 Project Structure

├── server.js # Express server with incident & policy logic
├── index.html # Dashboard UI and client-side logic
├── package.json # Project dependencies and scripts

🛠️ Installation & Setup

Clone the repository
git clone [https://github.com/beyondinfinity9988/Lenskart-B1.2.git](https://github.com/beyondinfinity9988/Lenskart-B1.2.git)

Install dependencies
npm install
Run the server
node server.js
Access the Dashboard Open http://localhost:3000 in your browser

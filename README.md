# Two-Tier-Web-App
Two-Tier Web Application Development and Deployment

Part 1 – Application Development
Develop a simple two-tier web application with clear separation between frontend and backend.
    • Frontend:
        ◦ Create using HTML/CSS/JavaScript, or any framework or any you want like React, Vue.js, or Angular.
        ◦ Example: a small Student Registration or Feedback Form or just login form.
    • Backend (Database):
        ◦ Use MySQL, PostgreSQL, or SQLite.
        ◦ Store and retrieve data from the frontend form.

Part 2 – Deployment on Virtual Machines (with WAF & Firewall Configuration)

Deploy the frontend and backend on two separate virtual machines (VMs) and secure the network using firewall or WAF (Web Application Firewall) rules.
VM1: Frontend Server
    • Install Apache, Nginx, or Node.js to host the frontend.
    • The web application should be accessible only via HTTPS.
    • Use a self-signed certificate or free SSL (e.g., Let’s Encrypt) for HTTPS.
VM2: Backend (Database) Server
    • Install and configure MySQL or PostgreSQL.
    • Allow connections only from the frontend server’s IP.
WAF / Firewall Configuration
Students must:
    1. Configure a firewall on both VMs e.g UFW.
    2. Allow only required traffic:
        ◦ Frontend Server:
            ▪ Allow HTTPS (port 443) inbound.
            ▪ Allow SSH (port 22) inbound (optional, for admin only).
            ▪ Block all other inbound ports.
        ◦ Backend Server:
            ▪ Allow database port (e.g., 3306 for MySQL) only from frontend server IP.
            ▪ Allow SSH (port 22) inbound (optional, for admin only).
            ▪ Deny all other traffic.
Part 3 – Deployment on Docker Containers

Containerize and deploy both the frontend and backend using Docker.
    1. Frontend Container
        ◦ Use nginx or http-server base image.
        ◦ Serve the frontend files.
    2. Backend Container
        ◦ Use mysql, postgres, or a custom backend image.
    3. Networking
        ◦ Create a custom Docker network for both containers.
        ◦ Link frontend to backend using service names.
    4. Optional:
        ◦ Use docker-compose.yml to define and launch both containers.

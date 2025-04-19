# AWS Instance Performance Monitor

This project provides a backend server (built with Node.js and Express) and a web UI to display the CPU usage of an AWS instance over time.

## Setup

Follow these steps to get the application running:

### 1. Clone the Repository

```bash
git clone https://github.com/NoamGini/AWS-CPU-Monitor.git
cd AWS-CPU-Monitor
```
### 2. Backend Configuration and dependencies installation

Navigate to the server directory. 
Add the AWS secret key to the .env file:
```
WS_SECRET_KEY=<your_secret_key>
```
npm install

### 3. Frontend dependencies installation

Navigate to the client directory.
```
npm install
```

### 4. Running the Application

#### Backend

Navigate to the server directory.
```
node Server.js
```

#### Frontend

Navigate to the client directory.
```
npm start
```


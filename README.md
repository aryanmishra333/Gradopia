# Gradopia - Alumni Networking Platform

## Overview
Gradopia is a **college-focused social networking platform** designed for students and alumni to connect, share job postings, news, and events. The platform facilitates professional networking by allowing users to follow peers and alumni, engage with career opportunities, and stay updated on campus activities.

## Features
- **User Authentication**: Secure login and signup using **JWT** and **bcrypt.js**.
- **Follow System & Search**: Connect with alumni and peers through an intuitive follow system and search functionality.
- **Job Posting & Alumni Referral**: Placement coordinators and alumni can post job opportunities and referral-based listings.
- **News Feed**: A dynamic feed displaying campus news, achievements, and career updates.

## Tech Stack
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MySQL (Relational Database)
- **Authentication**: JWT, bcrypt.js
- **Architecture**: MVC REST API

## Setup & Installation
### Prerequisites
- Node.js & npm
- MySQL (installed locally)

### Steps to Run Locally
1. Clone the repository:
   ```sh
   git clone https://github.com/aryanmishra333/Gradopia.git
   cd Gradopia
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up the MySQL database:
   - Create a database named `gradopia`
   - Import the provided SQL schema
4. Configure environment variables in a `.env` file:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=gradopia
   JWT_SECRET=your_secret_key
   ```
5. Start the backend server:
   ```sh
   node server.js
   ```


## Contributors
- **Aryan Mishra** -[GitHub](https://github.com/aryanmishra333)
- **Atharv Ganesh Katyarmal** - [GitHub]([https://github.com/atharvgk])

## License
This project is licensed under the MIT License.

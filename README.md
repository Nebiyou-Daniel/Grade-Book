# Grade-Book
- Individual frontend assignment belongs to Nathnael Dereje

## Group Members & ID
1. Nathnael Dereje - UGR/8587/13
2. Nebiyou Daniel - UGR/9906/13
3. Robel Yemane - UGR/0067/13
4. Zekariyas Teshager - UGR/5480/13
5. Dawit Zeleke - UGR/7912/13

## About Project
Grade-Book is a system that enables students to create, account, and track their grades throughout their stay in campus.

## Key Features
- Secure student registration and login
- Allows students to view and update their grades for all courses
- User-friendly interface for easy navigation
- Mobile-responsive design for accessibility on various devices
- Custom Grading system can be added
- GPA and CGPA calculated on the fly for all years and semesters

## Technology Stack
- Frontend:  HTML, CSS, vanilla js
- Backend: NestJS framework
- Database: SQLite with prisma

## Getting Started
1. Clone the repository from GitHub
2. Run the following  to install the required dependencies
   -  npm install
   - npm install prisma --save-dev
   - npm install @prisma/client

3. Start the development server with npm start
4. Navigate to Public folder Index.html file  to view the application and open it in a browser.

## Why we used relational database system
Because they offer a clear structure for organizing and storing data relating to students, courses, and grades. Relational databases are well suited for grade book systems. This data is easy to query and update, which is necessary for creating results quickly and maintaining correct records. Additionally, by enforcing data integrity through the use of constraints and relationships, relational databases help prevent errors and inaccurate data. Overall, using a relational database to manage our grade book data offers a reliable and scalable option.

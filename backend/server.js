// server.js - Backend API Server
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',          // Change this to your MySQL username
    password: 'your_password',  // Change this to your MySQL password
    database: 'student_db'
});

// Connect to Database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database');
    
    // Create students table if it doesn't exist
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS students (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            phone VARCHAR(15) NOT NULL,
            course VARCHAR(100) NOT NULL,
            registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;
    
    db.query(createTableQuery, (err) => {
        if (err) {
            console.error('Error creating table:', err);
        } else {
            console.log('Students table ready');
        }
    });
});

// API Routes

// Health check
app.get('/', (req, res) => {
    res.json({ message: 'Student Registration API is running' });
});

// Register a new student (CREATE)
app.post('/api/students', (req, res) => {
    const { name, email, phone, course } = req.body;
    
    // Validation
    if (!name || !email || !phone || !course) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    
    const query = 'INSERT INTO students (name, email, phone, course) VALUES (?, ?, ?, ?)';
    
    db.query(query, [name, email, phone, course], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ error: 'Email already registered' });
            }
            console.error('Error inserting student:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        
        res.status(201).json({
            message: 'Student registered successfully',
            studentId: result.insertId
        });
    });
});

// Get all students (READ)
app.get('/api/students', (req, res) => {
    const query = 'SELECT * FROM students ORDER BY registration_date DESC';
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching students:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        
        res.json({
            count: results.length,
            students: results
        });
    });
});

// Get single student by ID (READ)
app.get('/api/students/:id', (req, res) => {
    const query = 'SELECT * FROM students WHERE id = ?';
    
    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            console.error('Error fetching student:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }
        
        res.json(results[0]);
    });
});

// Delete a student (DELETE)
app.delete('/api/students/:id', (req, res) => {
    const query = 'DELETE FROM students WHERE id = ?';
    
    db.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error('Error deleting student:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }
        
        res.json({ message: 'Student deleted successfully' });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
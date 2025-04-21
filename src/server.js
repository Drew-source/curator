/**
 * CURATOR - Server Entry Point
 */

const express = require('express');
const path = require('path');
const apiRoutes = require('./routes/api');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3030;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// API Routes
app.use('/api', apiRoutes);

// Route for the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

// Route for the demo page
app.get('/demo', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/demo.html'));
});

// Route for the admin dashboard
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/dashboard.html'));
});

// Alternative route for the dashboard (for consistency)
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/dashboard.html'));
});

// Route for the contact page
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/contact.html'));
});

// Route for the thank you page
app.get('/thankyou', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/thankyou.html'));
});

// Handle 404s
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`CURATOR server running on port ${PORT}`);
    console.log(`Homepage: http://localhost:${PORT}`);
    console.log(`Demo page: http://localhost:${PORT}/demo`);
    console.log(`Admin dashboard: http://localhost:${PORT}/admin or http://localhost:${PORT}/dashboard`);
    console.log(`Contact page: http://localhost:${PORT}/contact`);
}); 
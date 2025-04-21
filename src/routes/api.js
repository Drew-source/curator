/**
 * CURATOR - API Routes
 */

const express = require('express');
const router = express.Router();

// Mock database of known HNWIs (would be replaced with actual database)
const knownHNWIs = [
    { id: 1, name: "James Reynolds", wealthScore: 9.8 },
    { id: 2, name: "Victoria Chen", wealthScore: 9.5 },
    { id: 3, name: "Alexander Müller", wealthScore: 9.3 },
    { id: 4, name: "Elizabeth Kingston", wealthScore: 9.7 }
];

// Mock recognition events (would be stored in a real database)
const recognitionEvents = [
    { id: 1, clientId: 1, clientName: "James Reynolds", timestamp: "2023-04-20T14:32:00", location: "Milan Flagship", status: "granted", confidence: 0.98, wealthScore: 9.8 },
    { id: 2, clientId: 2, clientName: "Victoria Chen", timestamp: "2023-04-20T13:47:00", location: "Paris Gallery", status: "granted", confidence: 0.96, wealthScore: 9.5 },
    { id: 3, clientId: null, clientName: "Unknown", timestamp: "2023-04-20T12:15:00", location: "New York Event", status: "granted", confidence: 0.87, wealthScore: 8.7 },
    { id: 4, clientId: null, clientName: "Unknown", timestamp: "2023-04-20T11:32:00", location: "Milan Flagship", status: "denied", confidence: 0.62, wealthScore: 5.1 },
    { id: 5, clientId: 3, clientName: "Alexander Müller", timestamp: "2023-04-20T10:08:00", location: "London Boutique", status: "granted", confidence: 0.93, wealthScore: 9.3 }
];

/**
 * GET /api/health
 * Simple health check endpoint for monitoring
 */
router.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

/**
 * GET /api/status
 * Returns the system status
 */
router.get('/status', (req, res) => {
    res.json({
        status: 'operational',
        version: '1.0.0',
        timestamp: new Date().toISOString()
    });
});

/**
 * GET /api/clients
 * Returns a list of all known HNWIs
 */
router.get('/clients', (req, res) => {
    res.json(knownHNWIs);
});

/**
 * GET /api/clients/:id
 * Returns a specific HNWI by ID
 */
router.get('/clients/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const client = knownHNWIs.find(c => c.id === id);
    
    if (!client) {
        return res.status(404).json({ error: 'Client not found' });
    }
    
    res.json(client);
});

/**
 * POST /api/clients
 * Adds a new HNWI to the database
 */
router.post('/clients', (req, res) => {
    const { name, wealthScore } = req.body;
    
    if (!name || !wealthScore) {
        return res.status(400).json({ error: 'Name and wealthScore are required' });
    }
    
    const newId = knownHNWIs.length > 0 ? Math.max(...knownHNWIs.map(c => c.id)) + 1 : 1;
    
    const newClient = {
        id: newId,
        name,
        wealthScore
    };
    
    knownHNWIs.push(newClient);
    
    res.status(201).json(newClient);
});

/**
 * GET /api/events
 * Returns all recognition events
 */
router.get('/events', (req, res) => {
    res.json(recognitionEvents);
});

/**
 * POST /api/recognize
 * Processes a recognition request
 * In a real application, this would process an image and perform recognition
 */
router.post('/recognize', (req, res) => {
    // Simulate a recognition process
    const random = Math.random();
    
    // Simulate result
    const result = {
        timestamp: new Date().toISOString(),
        processingTime: Math.floor(Math.random() * 500) + 200 // 200-700ms
    };
    
    // 30% chance of recognizing as a known HNWI
    if (random < 0.3) {
        const hnwi = knownHNWIs[Math.floor(Math.random() * knownHNWIs.length)];
        
        result.recognized = true;
        result.confidence = 0.85 + (Math.random() * 0.15); // High confidence (85-100%)
        result.name = hnwi.name;
        result.wealthScore = hnwi.wealthScore;
    } 
    // 30% chance of recognizing as an unknown HNWI
    else if (random < 0.6) {
        result.recognized = true;
        result.confidence = 0.7 + (Math.random() * 0.2); // Medium-high confidence (70-90%)
        result.name = null; // Unknown person
        result.wealthScore = 8.5 + (Math.random() * 1.0); // High wealth score (8.5-9.5)
    } 
    // 40% chance of not recognizing as HNWI
    else {
        result.recognized = false;
        result.confidence = 0.6 + (Math.random() * 0.3); // Medium confidence (60-90%)
        result.name = null;
        result.wealthScore = 3.0 + (Math.random() * 4.5); // Lower wealth score (3.0-7.5)
    }
    
    res.json(result);
});

/**
 * GET /api/stats
 * Returns system statistics
 */
router.get('/stats', (req, res) => {
    res.json({
        totalHNWIs: knownHNWIs.length,
        totalRecognitions: recognitionEvents.length,
        recognitionAccuracy: 92,
        activeLocations: 3
    });
});

/**
 * POST /api/contact
 * Handles contact form submissions
 */
router.post('/contact', (req, res) => {
    const { name, company, email, phone, interest, message } = req.body;
    
    // Validate required fields
    if (!name || !company || !email || !message) {
        return res.status(400).json({ 
            success: false,
            error: 'Missing required fields'
        });
    }
    
    // In a production environment, this would:
    // 1. Store the inquiry in a database
    // 2. Send an email notification to the team
    // 3. Potentially set up an automated response email
    
    // For now, we'll just log the submission and return success
    console.log('Contact form submission received:', {
        name,
        company,
        email,
        phone,
        interest,
        message,
        timestamp: new Date().toISOString()
    });
    
    // Return success response
    res.status(200).json({
        success: true,
        message: 'Your inquiry has been received. A member of our team will contact you within 24 hours.'
    });
});

module.exports = router; 
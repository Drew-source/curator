/**
 * CURATOR - Demo Page JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const video = document.getElementById('video');
    const startButton = document.getElementById('startButton');
    const stopButton = document.getElementById('stopButton');
    const statusDetails = document.getElementById('statusDetails');
    const resultElement = document.querySelector('.result');
    const videoContainer = document.querySelector('.video-container');
    
    // State variables
    let isRecognizing = false;
    let stream = null;
    
    /**
     * Update the status display with a new message
     */
    function updateStatus(message) {
        const timestamp = new Date().toLocaleTimeString();
        statusDetails.innerHTML += `<div>[${timestamp}] ${message}</div>`;
        statusDetails.scrollTop = statusDetails.scrollHeight;
    }
    
    /**
     * Start the webcam and recognition process
     */
    async function startRecognition() {
        try {
            // Request camera access
            stream = await navigator.mediaDevices.getUserMedia({ 
                video: true, 
                audio: false 
            });
            
            // Set video source to the camera stream
            video.srcObject = stream;
            
            // Update UI state
            isRecognizing = true;
            startButton.disabled = true;
            stopButton.disabled = false;
            updateStatus('Camera activated. Starting recognition...');
            
            // Start the recognition process
            if (typeof FaceRecognizer !== 'undefined') {
                // Initialize the recognizer with the video element
                FaceRecognizer.initialize(video, videoContainer, handleRecognitionResult);
                updateStatus('Recognition system initialized');
                
                // Start processing frames
                FaceRecognizer.startProcessing();
                updateStatus('Recognition processing started');
            } else {
                updateStatus('ERROR: Recognition module not loaded!');
            }
        } catch (error) {
            console.error('Error accessing camera:', error);
            updateStatus(`ERROR: Could not access camera - ${error.message}`);
        }
    }
    
    /**
     * Stop the webcam and recognition process
     */
    function stopRecognition() {
        // Stop the video stream
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            video.srcObject = null;
        }
        
        // Stop the recognition processing
        if (typeof FaceRecognizer !== 'undefined') {
            FaceRecognizer.stopProcessing();
        }
        
        // Update UI state
        isRecognizing = false;
        startButton.disabled = false;
        stopButton.disabled = true;
        updateStatus('Recognition stopped');
        
        // Clear detection boxes
        const detectionBoxes = document.querySelectorAll('.detection-box');
        detectionBoxes.forEach(box => box.remove());
        
        // Reset result display
        resultElement.className = 'result';
        resultElement.innerHTML = '<span>Awaiting Recognition...</span>';
    }
    
    /**
     * Handle recognition results from the face recognizer
     */
    function handleRecognitionResult(result) {
        // result will be an object with: 
        // - recognized: boolean (true if recognized as HNWI)
        // - confidence: number (confidence score)
        // - name: string (name if known, otherwise null)
        // - wealthScore: number (estimated wealth score)
        
        updateStatus(`Recognition result: ${JSON.stringify(result)}`);
        
        // Update UI based on recognition result
        if (result.recognized) {
            let resultText = '';
            
            if (result.name) {
                resultText = `<span class="status-icon">✓</span> Welcome, ${result.name}`;
                updateStatus(`VIP Recognized: ${result.name}`);
            } else {
                resultText = '<span class="status-icon">✓</span> Access Granted';
                updateStatus('HNWI detected with high confidence');
            }
            
            resultElement.className = 'result approved';
            resultElement.innerHTML = resultText;
        } else {
            resultElement.className = 'result denied';
            resultElement.innerHTML = '<span class="status-icon">✗</span> Access Denied';
            updateStatus('Non-HNWI detected');
        }
    }
    
    // Event listeners
    startButton.addEventListener('click', startRecognition);
    stopButton.addEventListener('click', stopRecognition);
    
    // Initial status update
    updateStatus('System ready. Click "Start Recognition" to begin.');
}); 
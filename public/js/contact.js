/**
 * CURATOR - Contact Page JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('Contact page loaded');
    
    // Handle contact form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault(); // Prevent the default form submission
            
            // Disable the submit button and show loading state
            const submitButton = this.querySelector('.cta-button');
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            try {
                // Collect form values
                const formData = {
                    name: this.querySelector('input[name="name"]').value,
                    company: this.querySelector('input[name="company"]').value,
                    email: this.querySelector('input[name="email"]').value,
                    phone: this.querySelector('input[name="phone"]').value,
                    interest: this.querySelector('select[name="interest"]').value,
                    message: this.querySelector('textarea[name="message"]').value
                };
                
                // Validate required fields
                const requiredFields = ['name', 'company', 'email', 'message'];
                const missingFields = requiredFields.filter(field => !formData[field]);
                
                if (missingFields.length > 0) {
                    alert(`Please complete the following required fields: ${missingFields.join(', ')}`);
                    submitButton.disabled = false;
                    submitButton.textContent = 'Submit';
                    return;
                }

                // Send data to the server using fetch API
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                
                const result = await response.json();
                
                if (result.success) {
                    // Show success message
                    const formContainer = document.querySelector('.contact-form');
                    formContainer.innerHTML = `
                        <div class="success-message">
                            <h3>Thank You!</h3>
                            <p>${result.message}</p>
                        </div>
                    `;
                } else {
                    // Show error message
                    alert('There was a problem submitting your form: ' + (result.error || 'Unknown error'));
                    submitButton.disabled = false;
                    submitButton.textContent = 'Submit';
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('An error occurred while submitting the form. Please try again later.');
                submitButton.disabled = false;
                submitButton.textContent = 'Submit';
            }
        });
    }
}); 
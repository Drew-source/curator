# CURATOR - Algorithmic Access Management

![CURATOR](https://img.shields.io/badge/CURATOR-1.0.0-b8860b)
![License](https://img.shields.io/badge/License-Proprietary-red)

CURATOR is an advanced AI-powered system designed for luxury brands to recognize and manage access for high-net-worth individuals (HNWIs). The system uses facial recognition and wealth assessment algorithms to provide exclusive experiences for valued clients.

*Developed in association with [blackcode SA](https://blackcode.ch) - Swiss boutique web and app agency for luxury brands*

## 🌟 Demo

🔗 **Live Demo**: [https://drew-source.github.io/curator/](https://drew-source.github.io/curator/)

## ✨ Features

- **Facial Recognition**: Identifies known HNWIs from a database of registered clients
- **Wealth Assessment**: Analyzes visual cues to identify potential HNWIs not in the database
- **Access Management**: Programmatically controls access to exclusive spaces
- **Analytics Dashboard**: Gathers intelligence on client patterns and preferences
- **Brand Protection**: Creates exclusive environments for authentic luxury experiences
- **Modern UI**: Clean, responsive design optimized for all devices
- **Data Visualization**: Interactive data tables and visualizations in the dashboard
- **Contact Form**: API-powered contact form with server-side validation

## 🛠️ Technologies

- **Frontend**: Pure HTML, CSS, and JavaScript
- **Backend**: Node.js with Express
- **API**: RESTful endpoints for contact form and data handling
- **Development Tools**: Browser-tools-mcp for performance and accessibility monitoring
- **CI/CD**: GitHub Actions for automated deployment

## 📂 Project Structure

The project follows a standard Node.js/Express structure:

```
curator/
├── public/                 # Static assets
│   ├── css/                # Stylesheets
│   ├── js/                 # Client-side JavaScript
│   └── img/                # Images and icons
├── src/                    # Server-side code
│   ├── server.js           # Express server entry point
│   ├── routes/             # API routes
│   ├── models/             # Database models
│   └── services/           # Business logic
├── views/                  # HTML templates
│   ├── index.html          # Homepage
│   ├── demo.html           # Demo page with webcam functionality
│   ├── dashboard.html      # Admin dashboard
│   └── contact.html        # Contact page
├── .github/                # GitHub configuration
├── package.json            # Node.js dependencies
├── README.md               # This file
└── DEVLOG.md               # Development log
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14.x or higher)
- npm (v6.x or higher)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/Drew-source/curator.git
   cd curator
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Access the application:
   - Homepage: http://localhost:3030
   - Demo page: http://localhost:3030/demo
   - Admin dashboard: http://localhost:3030/dashboard
   - Contact page: http://localhost:3030/contact

## 🌐 Deployment

### GitHub Pages (Static Version)

The project is automatically deployed to GitHub Pages via GitHub Actions when changes are pushed to the main branch. The static version simulates API responses and form submissions for demonstration purposes.

View the live demo at: [https://drew-source.github.io/curator/](https://drew-source.github.io/curator/)

### Full Backend Deployment (Planned)

For production use with full backend functionality, deployment to Google Cloud is planned:

1. Create a Google Cloud VM instance (Compute Engine)
2. Configure GitHub Actions for CI/CD pipeline
3. Set up environment with Node.js, Express, and PM2
4. Configure domain and SSL certificate

## 📝 Development Notes

This is a prototype demonstration that simulates AI recognition. In a production environment, this would be connected to actual machine learning models for face recognition and wealth assessment.

The dashboard is populated with sample data for demonstration purposes only. No real data is stored or processed in this demo.

## 📞 Contact

For inquiries about CURATOR, please contact:
- Email: inquiries@blackcode.ch
- Website: [blackcode.ch](https://blackcode.ch)

## 📜 License

This project is proprietary and confidential.

## 🙏 Acknowledgments

- This project is conceptual and intended for demonstration purposes
- No actual facial recognition or personal data processing is performed in this demo
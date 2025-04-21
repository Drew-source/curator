// GitHub Pages SPA Router
(function(l) {
  if (l.search[1] === '/') {
    var decoded = l.search.slice(1).split('&').map(function(s) { 
      return s.replace(/~and~/g, '&')
    }).join('?');
    window.history.replaceState(null, null,
        l.pathname.slice(0, -1) + decoded + l.hash
    );
  }
}(window.location));

// Handle routes for SPA on GitHub Pages
document.addEventListener('DOMContentLoaded', function() {
  // Extract the repository name from the URL
  var repoName = window.location.pathname.split('/')[1];
  
  // Update all links to include the repository name for GitHub Pages
  if (window.location.hostname !== 'localhost') {
    var links = document.querySelectorAll('a[href^="/"]');
    links.forEach(function(link) {
      if (!link.getAttribute('href').startsWith('/' + repoName)) {
        link.setAttribute('href', '/' + repoName + link.getAttribute('href'));
      }
    });
  }

  // Handle API requests
  window.apiBaseUrl = window.location.hostname === 'localhost' 
    ? '/api' 
    : 'https://curator-api.onrender.com/api'; // We'll set this up later as a fallback
}); 
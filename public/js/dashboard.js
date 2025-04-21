/**
 * CURATOR - Dashboard JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('Dashboard loaded');
    
    // Initialize the dashboard components
    initTabNavigation();
    renderBasicTables();
    addEventListeners();
});

/**
 * Initialize tab navigation functionality
 */
function initTabNavigation() {
    const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
    const dashboardTabs = document.querySelectorAll('.dashboard-tab');
    
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target tab
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all links and tabs
            sidebarLinks.forEach(item => item.classList.remove('active'));
            dashboardTabs.forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked link and corresponding tab
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

/**
 * Render all data tables as simple HTML
 */
function renderBasicTables() {
    // Reset containers first to ensure proper sizing
    prepareContainer('activityChart');
    prepareContainer('timeChart');  
    prepareContainer('locationChart');
    prepareContainer('wealthChart');

    // Add titles to containers
    addTitleToContainer('activityChart', 'Recognition Activity (Last 7 Days)', '#b8860b');
    addTitleToContainer('timeChart', 'Access Patterns by Time of Day', '#b8860b');
    addTitleToContainer('locationChart', 'Recognition by Location', '#4a90e2');
    addTitleToContainer('wealthChart', 'Wealth Score Distribution', '#6ab04c');

    // Then fill with simple data tables
    renderMinimalTable('activityChart', 
        'Recognition Activity (Last 7 Days)',
        ['Day', 'Count'],
        [
            ['Mon', 28],
            ['Tue', 32],
            ['Wed', 36], 
            ['Thu', 29],
            ['Fri', 43]
        ],
        '#b8860b'
    );
    
    renderMinimalTable('timeChart', 
        'Access Patterns by Time of Day',
        ['Time', 'Count'],
        [
            ['1PM', 42],
            ['2PM', 38], 
            ['12PM', 35], 
            ['3PM', 25], 
            ['11AM', 23]
        ],
        '#b8860b'
    );
    
    renderMinimalTable('locationChart', 
        'Recognition by Location',
        ['Location', 'Count'],
        [
            ['Milan', 42],
            ['Paris', 35],
            ['New York', 28]
        ],
        '#4a90e2'
    );
    
    renderMinimalTable('wealthChart', 
        'Wealth Score Distribution',
        ['Score', 'Count'],
        [
            ['7', 42],
            ['8', 38],
            ['6', 35],
            ['9', 25],
            ['5', 25]
        ],
        '#6ab04c'
    );
}

/**
 * Prepare a container before adding content
 */
function prepareContainer(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Clear container
    container.innerHTML = '';
    
    // Reset specific styles that might interfere
    container.style.height = 'auto'; // Explicitly set height to auto
    container.style.overflow = 'visible'; // Ensure content isn't clipped
    container.style.padding = '0'; // Remove JS padding if any
}

/**
 * Create a bare minimum data table
 */
function renderMinimalTable(containerId, title, headers, rows, color) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Limit to 5 rows maximum to ensure it fits
    const limitedRows = rows.slice(0, 5);
    
    let html = `
    <div style="padding: 15px; height: 100%;">
        <table style="width: 100%; border-collapse: collapse; color: white;">
            <thead>
                <tr>
                    <th style="text-align: left; padding: 8px 5px; border-bottom: 1px solid rgba(255,255,255,0.2);">${headers[0]}</th>
                    <th style="text-align: right; padding: 8px 5px; border-bottom: 1px solid rgba(255,255,255,0.2);">${headers[1]}</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    // Add rows
    limitedRows.forEach(row => {
        html += `
            <tr>
                <td style="padding: 8px 5px; text-align: left;">${row[0]}</td>
                <td style="padding: 8px 5px; text-align: right; font-weight: bold;">${row[1]}</td>
            </tr>
        `;
    });
    
    html += `
            </tbody>
        </table>
    </div>
    `;
    
    container.innerHTML = html;
}

/**
 * Add title to container
 */
function addTitleToContainer(containerId, title, color) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Add a title element before the table content
    const titleEl = document.createElement('h3');
    titleEl.textContent = title;
    titleEl.style.color = color;
    titleEl.style.margin = '10px 15px';
    titleEl.style.fontSize = '1.2rem';
    titleEl.style.fontWeight = '400';
    
    container.appendChild(titleEl);
}

/**
 * Add event listeners to dashboard elements
 */
function addEventListeners() {
    // Table rows for showing details
    const tableRows = document.querySelectorAll('.client-table tbody tr');
    
    tableRows.forEach(row => {
        row.addEventListener('click', function() {
            // In a real app, this would show detailed information
            // about the selected client/event
            const clientName = this.cells[0].textContent;
            console.log(`Selected client: ${clientName}`);
        });
    });
    
    // Handle range inputs to show values
    const rangeInputs = document.querySelectorAll('input[type="range"]');
    
    rangeInputs.forEach(input => {
        input.addEventListener('input', function() {
            // Find the associated slider-value span
            const valueDisplay = this.previousElementSibling.querySelector('.slider-value');
            if (valueDisplay) {
                valueDisplay.textContent = this.value + (this.step === '0.1' ? '' : '%');
            }
        });
    });
    
    // Add tab navigation for sidebar in dashboard
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabLinks.forEach(link => {
        link.addEventListener('click', function() {
            const tab = this.getAttribute('data-tab');
            
            // Hide all tabs and remove active class
            tabContents.forEach(content => content.style.display = 'none');
            tabLinks.forEach(link => link.classList.remove('active'));
            
            // Show the selected tab and add active class
            document.getElementById(tab).style.display = 'block';
            this.classList.add('active');
        });
    });
    
    // Ensure first tab is shown by default
    if (tabContents.length > 0 && tabContents[0].style.display !== 'block') {
        tabContents[0].style.display = 'block';
    }
}

/**
 * Fetch dashboard data from the server
 * Note: This is a placeholder for actual API calls
 */
async function fetchDashboardData() {
    console.log('Fetching dashboard data...');
    
    try {
        // Fetch client data
        const clientsResponse = await fetch('/api/clients');
        const clients = await clientsResponse.json();
        console.log('Client data received:', clients);
        
        // Fetch events data
        const eventsResponse = await fetch('/api/events');
        const events = await eventsResponse.json();
        console.log('Events data received:', events);
        
        // Fetch stats data
        const statsResponse = await fetch('/api/stats');
        const stats = await statsResponse.json();
        console.log('Stats data received:', stats);
        
        // Update UI with the received data
        // This would update charts, tables, etc.
        return { clients, events, stats };
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Fallback to static data if API calls fail
        return {
            clients: [
                { id: 1, name: "James Reynolds", wealthScore: 9.8 },
                { id: 2, name: "Victoria Chen", wealthScore: 9.5 },
                { id: 3, name: "Alexander Müller", wealthScore: 9.3 },
                { id: 4, name: "Elizabeth Kingston", wealthScore: 9.7 }
            ],
            events: [
                { id: 1, clientId: 1, clientName: "James Reynolds", timestamp: "2023-04-20T14:32:00", location: "Milan Flagship", status: "granted", confidence: 0.98, wealthScore: 9.8 },
                { id: 2, clientId: 2, clientName: "Victoria Chen", timestamp: "2023-04-20T13:47:00", location: "Paris Gallery", status: "granted", confidence: 0.96, wealthScore: 9.5 },
                { id: 3, clientId: null, clientName: "Unknown", timestamp: "2023-04-20T12:15:00", location: "New York Event", status: "granted", confidence: 0.87, wealthScore: 8.7 }
            ],
            stats: {
                totalHNWIs: 4,
                totalRecognitions: 5,
                recognitionAccuracy: 92,
                activeLocations: 3
            }
        };
    }
} 
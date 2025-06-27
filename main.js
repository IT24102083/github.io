// Main JavaScript file for IT24102083 Cyber Security Portfolio
document.addEventListener('DOMContentLoaded', function() {
    // Fix visibility of elements immediately
    fixVisibility();
    
    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        once: true,
        mirror: false
    });
    
    // Theme Switcher
    initThemeSwitcher();
    
    // Typing animation
    initTypingAnimation();
    
    // Set up live clock and date displays
    initTimeDisplays();
    
    // Project filtering
    initProjectFilters();
    
    // Smooth scrolling for navigation
    initSmoothScrolling();
    
    // Sticky header
    initStickyHeader();
    
    // Initialize the puzzle game
    initPuzzleGame();
    
    // Initialize cyber background animation
    initCyberBackground();
    
    // Initialize matrix animation
    initMatrixAnimation(document.getElementById('matrix-canvas'));
    
    // Add binary elements
    addBinaryElements();
    
    // Set up cyber alerts
    setupCyberAlerts();
    
    // Initialize secure contact form
    initSecureContactForm();
});

// Fix visibility issues
function fixVisibility() {
    // Add styles to ensure z-index is properly set
    const style = document.createElement('style');
    style.textContent = `
        /* Background elements should be at the back */
        #matrix-canvas, #cyber-background, .cyber-overlay, .matrix-overlay, .matrix-pattern {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            z-index: -100 !important;
            pointer-events: none !important;
        }
        
        /* Main content should be visible */
        body {
            position: relative;
            z-index: 1;
            background-color: rgba(0, 0, 0, 0.9);
        }
        
        header, section, footer, .container {
            position: relative;
            z-index: 10;
        }
        
        /* Form elements should be extra visible */
        #contactForm, .form-group, input, textarea, button {
            position: relative;
            z-index: 50;
        }
        
        /* Make sure form status shows on top */
        #form-status {
            position: relative;
            z-index: 1000;
        }
        
        /* Ensure containers have solid backgrounds */
        .container {
            background-color: rgba(17, 17, 17, 0.9) !important;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
        }
        
        /* Ensure cyber alerts show on top */
        .cyber-alert {
            z-index: 2000 !important;
        }
    `;
    document.head.appendChild(style);
    
    // Reduce opacity of matrix canvas
    const canvas = document.getElementById('matrix-canvas');
    if (canvas) {
        canvas.style.opacity = '0.08';
    }
}

// THEME SWITCHER
function initThemeSwitcher() {
    const toggleSwitch = document.querySelector('#checkbox');
    if (!toggleSwitch) return;
    
    const currentTheme = localStorage.getItem('theme') || 'dark'; // Default to dark for cyber security
    
    // Set the initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    toggleSwitch.checked = currentTheme === 'dark';
    
    // Theme switch event handler
    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    }
    
    toggleSwitch.addEventListener('change', switchTheme);
}

// TYPING ANIMATION
function initTypingAnimation() {
    const typedElement = document.querySelector('.typed-text');
    if (!typedElement) return;
    
    const options = {
        strings: ['Cyber Security Specialist', 'Ethical Hacker', 'Security Researcher'],
        typeSpeed: 70,
        backSpeed: 40,
        loop: true
    };
    
    try {
        const typed = new Typed('.typed-text', options);
    } catch (error) {
        console.error("Error initializing typing animation:", error);
    }
}

// DYNAMIC TIME DISPLAYS - Updated with current timestamp
function initTimeDisplays() {
    const currentTimeElements = document.querySelectorAll('#current-time, #footer-datetime');
    const footerDate = document.getElementById('footer-date');
    
    // Fixed date components (YYYY-MM-DD)
    const fixedDate = "2025-06-27";
    
    // Initial timestamp (Updated with current timestamp)
    const initialTimestamp = "2025-06-27 11:47:41";
    
    // Set initial time display
    currentTimeElements.forEach(el => {
        if (el) el.textContent = initialTimestamp;
    });
    
    // Set footer date
    if (footerDate) footerDate.textContent = fixedDate;
    
    // Calculate seconds difference for continuous updating
    const now = new Date();
    const initialSeconds = now.getSeconds();
    const initialMinutes = now.getMinutes();
    const initialHours = now.getHours();
    
    // Parse the initial timestamp to get starting point
    const [datePart, timePart] = initialTimestamp.split(' ');
    const [targetHours, targetMinutes, targetSeconds] = timePart.split(':').map(Number);
    
    function updateClock() {
        const currentDate = new Date();
        
        // Calculate time offset from when the page loaded
        const secondsDiff = currentDate.getSeconds() - initialSeconds;
        const minutesDiff = currentDate.getMinutes() - initialMinutes;
        const hoursDiff = currentDate.getHours() - initialHours;
        
        // Calculate new time values
        let newSeconds = targetSeconds + secondsDiff;
        let newMinutes = targetMinutes + minutesDiff;
        let newHours = targetHours + hoursDiff;
        
        // Handle overflow
        newMinutes += Math.floor(newSeconds / 60);
        newSeconds %= 60;
        
        newHours += Math.floor(newMinutes / 60);
        newMinutes %= 60;
        
        newHours %= 24;
        
        // Format the time
        const timeString = `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}:${String(newSeconds).padStart(2, '0')}`;
        
        // Combine with fixed date
        const dateTimeString = `${fixedDate} ${timeString}`;
        
        // Update all time elements
        currentTimeElements.forEach(el => {
            if (el) {
                el.textContent = dateTimeString;
                
                // Apply glitch effect occasionally
                if (Math.random() > 0.97) {
                    el.style.color = 'var(--primary-color)';
                    setTimeout(() => {
                        el.style.color = '';
                    }, 200);
                }
            }
        });
    }
    
    // Update every second
    setInterval(updateClock, 1000);
}

// PROJECT FILTERING
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    if (!filterBtns.length || !projectItems.length) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(filterBtn => {
                filterBtn.classList.remove('active');
            });
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            projectItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// SMOOTH SCROLLING
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a, .scroll-down a, .footer-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Check if it's an anchor link
            if (href && href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href;
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                    
                    window.scrollTo({
                        top: targetSection.offsetTop - headerHeight,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// STICKY HEADER
function initStickyHeader() {
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (header) {
            header.classList.toggle('sticky', window.scrollY > 0);
        }
    });
}

// PUZZLE GAME
function initPuzzleGame() {
    const board = document.getElementById('puzzle-board');
    const shuffleButton = document.getElementById('shuffle-puzzle');
    const moveCounter = document.getElementById('move-counter');
    
    if (!board || !shuffleButton || !moveCounter) return;
    
    // Make sure puzzle is visible
    board.style.position = 'relative';
    board.style.zIndex = '20';
    shuffleButton.style.position = 'relative';
    shuffleButton.style.zIndex = '20';
    
    let tiles = [];
    let emptyTilePos = { row: 3, col: 3 };
    let moves = 0;
    
    // Cybersecurity themed characters for the puzzle
    const securitySymbols = [
        '0x01', '0x02', '0x03', '0x04', 
        '0x05', '0x06', '0x07', '0x08', 
        '0x09', '0x0A', '0x0B', '0x0C', 
        '0x0D', '0x0E', '0x0F'
    ];
    
    // Create the puzzle board
    function createBoard() {
        board.innerHTML = '';
        tiles = [];
        
        // Create 15 numbered tiles + 1 empty
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                const tileNumber = i * 4 + j + 1;
                
                if (tileNumber < 16) {
                    const tile = document.createElement('div');
                    tile.className = 'puzzle-tile';
                    tile.textContent = securitySymbols[tileNumber - 1];
                    tile.dataset.row = i;
                    tile.dataset.col = j;
                    tile.style.position = 'relative';
                    tile.style.zIndex = '25';
                    
                    // Calculate position
                    tile.style.gridRow = i + 1;
                    tile.style.gridColumn = j + 1;
                    
                    tile.addEventListener('click', () => moveTile(i, j));
                    
                    board.appendChild(tile);
                    tiles.push({
                        element: tile,
                        number: tileNumber,
                        row: i,
                        col: j
                    });
                } else {
                    // Empty tile
                    const emptyTile = document.createElement('div');
                    emptyTile.className = 'puzzle-tile puzzle-empty';
                    emptyTile.style.gridRow = i + 1;
                    emptyTile.style.gridColumn = j + 1;
                    board.appendChild(emptyTile);
                    
                    emptyTilePos = { row: i, col: j };
                }
            }
        }
    }
    
    // Move a tile if it's adjacent to the empty space
    function moveTile(row, col) {
        // Check if the clicked tile is adjacent to the empty tile
        if ((Math.abs(row - emptyTilePos.row) === 1 && col === emptyTilePos.col) ||
            (Math.abs(col - emptyTilePos.col) === 1 && row === emptyTilePos.row)) {
            
            // Find the tile that was clicked
            const clickedTile = tiles.find(tile => tile.row === row && tile.col === col);
            
            if (clickedTile) {
                // Move the tile to the empty position
                clickedTile.element.style.gridRow = emptyTilePos.row + 1;
                clickedTile.element.style.gridColumn = emptyTilePos.col + 1;
                
                // Add cyber effect to the moved tile
                clickedTile.element.classList.add('tile-moved');
                setTimeout(() => {
                    clickedTile.element.classList.remove('tile-moved');
                }, 300);
                
                // Update the tile's position data
                clickedTile.row = emptyTilePos.row;
                clickedTile.col = emptyTilePos.col;
                
                // Update the empty tile position
                emptyTilePos = { row, col };
                
                // Increment move counter
                moves++;
                moveCounter.textContent = moves;
                
                // Check if puzzle is solved
                checkWin();
            }
        }
    }
    
    // Check if the puzzle is solved
    function checkWin() {
        const isSolved = tiles.every(tile => {
            const correctPos = (tile.number - 1);
            const correctRow = Math.floor(correctPos / 4);
            const correctCol = correctPos % 4;
            return tile.row === correctRow && tile.col === correctCol;
        });
        
        if (isSolved) {
            setTimeout(() => {
                // Success message with cyber security theme
                alert(`ENCRYPTION COMPLETE! Cipher arranged in ${moves} transformations.`);
                
                // Add special effect to the board
                board.classList.add('puzzle-solved');
                setTimeout(() => {
                    board.classList.remove('puzzle-solved');
                }, 2000);
            }, 300);
        }
    }
    
    // Shuffle the puzzle
    function shufflePuzzle() {
        // Reset moves
        moves = 0;
        moveCounter.textContent = moves;
        
        // Make random moves
        for (let i = 0; i < 100; i++) {
            const possibleMoves = [];
            
            // Check all 4 directions
            if (emptyTilePos.row > 0) {
                possibleMoves.push({ row: emptyTilePos.row - 1, col: emptyTilePos.col });
            }
            if (emptyTilePos.row < 3) {
                possibleMoves.push({ row: emptyTilePos.row + 1, col: emptyTilePos.col });
            }
            if (emptyTilePos.col > 0) {
                possibleMoves.push({ row: emptyTilePos.row, col: emptyTilePos.col - 1 });
            }
            if (emptyTilePos.col < 3) {
                possibleMoves.push({ row: emptyTilePos.row, col: emptyTilePos.col + 1 });
            }
            
            // Select a random move
            const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
            
            // Make the move (without updating moves counter)
            const tileToMove = tiles.find(tile => tile.row === randomMove.row && tile.col === randomMove.col);
            
            if (tileToMove) {
                // Update tile position
                tileToMove.element.style.gridRow = emptyTilePos.row + 1;
                tileToMove.element.style.gridColumn = emptyTilePos.col + 1;
                
                // Update data
                tileToMove.row = emptyTilePos.row;
                tileToMove.col = emptyTilePos.col;
                
                // Update empty position
                emptyTilePos = { row: randomMove.row, col: randomMove.col };
            }
        }
        
        // Add shuffle animation to the board
        board.classList.add('board-shuffled');
        setTimeout(() => {
            board.classList.remove('board-shuffled');
        }, 500);
    }
    
    // Initialize the game
    createBoard();
    shufflePuzzle();
    
    // Event listener for shuffle button
    shuffleButton.addEventListener('click', shufflePuzzle);
    
    // Add some CSS for the puzzle animations
    const style = document.createElement('style');
    style.textContent = `
        #puzzle-board {
            position: relative;
            z-index: 20;
            background-color: rgba(0, 0, 0, 0.7);
        }
        .puzzle-tile {
            position: relative;
            z-index: 25;
        }
        .tile-moved {
            background-color: var(--secondary-color) !important;
        }
        .puzzle-solved {
            box-shadow: 0 0 30px var(--primary-color) !important;
            animation: solved-pulse 1s infinite;
        }
        .board-shuffled {
            animation: shuffle-animation 0.5s;
        }
        @keyframes solved-pulse {
            0% { box-shadow: 0 0 20px var(--primary-color); }
            50% { box-shadow: 0 0 40px var(--primary-color); }
            100% { box-shadow: 0 0 20px var(--primary-color); }
        }
        @keyframes shuffle-animation {
            0% { transform: scale(1); }
            50% { transform: scale(0.95); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
}

// CYBER BACKGROUND ANIMATION - Reduced intensity
function initCyberBackground() {
    const background = document.getElementById('cyber-background');
    if (!background) return;
    
    // Make sure background stays in back
    background.style.position = 'fixed';
    background.style.top = '0';
    background.style.left = '0';
    background.style.width = '100%';
    background.style.height = '100%';
    background.style.zIndex = '-100';
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Create nodes (connection points) - reduced count
    const nodeCount = Math.floor(width * height / 20000);
    const nodes = [];
    
    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
        const node = document.createElement('div');
        node.className = 'node';
        
        // Random position
        const x = Math.random() * width;
        const y = Math.random() * height;
        
        node.style.left = `${x}px`;
        node.style.top = `${y}px`;
        
        background.appendChild(node);
        nodes.push({ element: node, x, y });
    }
    
    // Create connections between nearby nodes
    const connections = [];
    const maxDistance = 150; // Maximum distance for connection
    
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const nodeA = nodes[i];
            const nodeB = nodes[j];
            
            // Calculate distance between nodes
            const dx = nodeB.x - nodeA.x;
            const dy = nodeB.y - nodeA.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // If nodes are close enough, create a connection
            if (distance < maxDistance) {
                const connection = document.createElement('div');
                connection.className = 'connection';
                
                // Position and rotation
                connection.style.left = `${nodeA.x}px`;
                connection.style.top = `${nodeA.y}px`;
                connection.style.width = `${distance}px`;
                
                // Calculate angle for rotation
                const angle = Math.atan2(dy, dx) * (180 / Math.PI);
                connection.style.transform = `rotate(${angle}deg)`;
                
                background.appendChild(connection);
                connections.push({
                    element: connection,
                    nodeA,
                    nodeB,
                    distance
                });
            }
        }
    }
    
    // Create pulses at random intervals - less frequent
    function createPulse() {
        if (nodes.length === 0) return;
        
        // Select a random node
        const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
        
        // Create pulse element
        const pulse = document.createElement('div');
        pulse.className = 'pulse';
        pulse.style.left = `${randomNode.x}px`;
        pulse.style.top = `${randomNode.y}px`;
        
        background.appendChild(pulse);
        
        // Remove pulse after animation ends
        setTimeout(() => {
            pulse.remove();
        }, 3000);
        
        // Schedule next pulse - less frequent
        setTimeout(createPulse, Math.random() * 5000 + 5000);
    }
    
    // Create data streams occasionally - less frequent
    function createDataStream() {
        const dataStream = document.createElement('div');
        dataStream.className = 'data-stream';
        
        // Random position and angle
        const y = Math.random() * height;
        const angle = Math.random() * 30 - 15; // -15 to 15 degrees
        
        dataStream.style.top = `${y}px`;
        dataStream.style.transform = `rotate(${angle}deg)`;
        
        background.appendChild(dataStream);
        
        // Remove after animation
        setTimeout(() => {
            dataStream.remove();
        }, 8000);
        
        // Schedule next data stream - less frequent
        setTimeout(createDataStream, Math.random() * 10000 + 10000);
    }
    
    // Start creating visual elements
    setTimeout(createPulse, 3000);
    setTimeout(createDataStream, 5000);
}

// MATRIX ANIMATION EFFECT - Reduced opacity
function initMatrixAnimation(canvas) {
    if (!canvas) return;
    
    try {
        // Ensure canvas is in the background
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '-100';
        canvas.style.opacity = '0.08'; // Reduced opacity
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Matrix characters - simplified for better performance
        const chars = '01αβγδεζηθικλμνξοπρστυφχψω$+-*/=%"\'#&_(),.;:?!\\|{}<>[]^~';
        
        // Set up columns and starting positions
        const fontSize = 12;
        const columns = Math.floor(canvas.width / fontSize);
        const drops = [];
        
        // Initialize all columns to start at a random negative position
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.floor(Math.random() * -100);
        }
        
        // Create text colors - various shades of green for matrix effect
        const colors = [
            'rgba(0, 255, 140, 1)',    // Bright green
            'rgba(0, 255, 140, 0.9)',  // Slightly dimmer
            'rgba(0, 255, 140, 0.8)',  // Dimmer green
            'rgba(0, 255, 140, 0.7)',  // Even dimmer
        ];
        
        // Main drawing function
        function draw() {
            // Semi-transparent black background to create trailing effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < drops.length; i++) {
                // Select a random character
                const text = chars.charAt(Math.floor(Math.random() * chars.length));
                
                // Select a random color from our palette
                const color = colors[Math.floor(Math.random() * colors.length)];
                ctx.fillStyle = color;
                
                // Slightly vary the font size for more dynamic effect
                const size = fontSize + (Math.random() * 2 - 1);
                ctx.font = `${size}px monospace`;
                
                // Draw the character
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                // Randomly make the first character brighter (head of the drop)
                if (Math.random() > 0.975) {
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
                    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                }
                
                // Move the drop down after drawing
                drops[i]++;
                
                // If the drop goes off screen or randomly decides to restart
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = Math.floor(Math.random() * -100);
                }
            }
        }
        
        // Resize handler
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            // Recalculate columns
            const newColumns = Math.floor(canvas.width / fontSize);
            
            // If we have more columns now, add new drops
            if (newColumns > columns) {
                for (let i = columns; i < newColumns; i++) {
                    drops[i] = Math.floor(Math.random() * -100);
                }
            }
        });
        
        // Start the animation
        setInterval(draw, 40);
    } catch (error) {
        console.error("Error initializing matrix animation:", error);
    }
}

// BINARY ELEMENTS - Reduced count and opacity
function addBinaryElements() {
    try {
        const container = document.body;
        const binaryCount = 5; // Reduced count
        
        for (let i = 0; i < binaryCount; i++) {
            const element = document.createElement('div');
            element.className = 'binary-text';
            
            // Make sure binary elements stay in background
            element.style.position = 'fixed';
            element.style.zIndex = '-90';
            element.style.opacity = '0.05'; // Reduced opacity
            element.style.pointerEvents = 'none';
            
            // Generate random binary sequence
            let binaryText = '';
            const length = Math.floor(Math.random() * 100) + 50;
            for (let j = 0; j < length; j++) {
                binaryText += Math.round(Math.random());
            }
            
            element.textContent = binaryText;
            
            // Random positioning
            element.style.left = `${Math.random() * 100}vw`;
            element.style.fontSize = `${Math.random() * 12 + 8}px`;
            
            // Random animation duration and delay
            const duration = Math.random() * 30 + 30;
            const delay = Math.random() * 10;
            element.style.animationDuration = `${duration}s`;
            element.style.animationDelay = `${delay}s`;
            
            container.appendChild(element);
        }
    } catch (error) {
        console.error("Error adding binary elements:", error);
    }
}

// CYBER SECURITY ALERTS - Updated with current timestamp
function setupCyberAlerts() {
    const alerts = [
        {
            title: "Security Scan",
            message: "Routine security scan complete. No vulnerabilities detected.",
            type: "info"
        },
        {
            title: "Firewall Update",
            message: "System firewall updated to version 4.2.1. Enhanced protection against XSS attacks.",
            type: "success"
        },
        {
            title: "Authentication Notice",
            message: "Multiple authentication attempts detected from IP:",
            code: "192.168.1.45",
            type: "warning"
        },
        {
            title: "Encryption Status",
            message: "End-to-end encryption active. Communication channel secure.",
            type: "info"
        },
        {
            title: "System Update",
            message: "Security patches applied. Last update timestamp:",
            code: "2025-06-27 11:47:41", // Updated timestamp
            type: "success"
        },
        {
            title: "User Activity",
            message: "Current active user session:",
            code: "IT24102083", // Current user
            type: "info"
        }
    ];
    
    function showRandomAlert() {
        try {
            // Check if there's already an alert showing
            const existingAlert = document.querySelector('.cyber-alert');
            if (existingAlert) {
                existingAlert.remove();
            }
            
            // Select random alert
            const alert = alerts[Math.floor(Math.random() * alerts.length)];
            
            // Create alert element
            const alertElement = document.createElement('div');
            alertElement.className = 'cyber-alert';
            alertElement.style.zIndex = '2000'; // Ensure it's on top
            
            alertElement.innerHTML = `
                <div class="cyber-alert-header">
                    <div class="cyber-alert-title">${alert.title}</div>
                    <div class="cyber-alert-close">×</div>
                </div>
                <div class="cyber-alert-body">
                    ${alert.message}
                    ${alert.code ? `<div class="cyber-alert-code">${alert.code}</div>` : ''}
                </div>
            `;
            
            document.body.appendChild(alertElement);
            
            // Show alert
            setTimeout(() => {
                alertElement.classList.add('show');
            }, 100);
            
            // Set up close button
            const closeButton = alertElement.querySelector('.cyber-alert-close');
            closeButton.addEventListener('click', () => {
                alertElement.classList.remove('show');
                setTimeout(() => {
                    if (alertElement.parentNode) {
                        alertElement.remove();
                    }
                }, 300);
            });
            
            // Auto-close after a delay
            setTimeout(() => {
                if (alertElement.parentNode) {
                    alertElement.classList.remove('show');
                    setTimeout(() => {
                        if (alertElement.parentNode) {
                            alertElement.remove();
                        }
                    }, 300);
                }
            }, 8000);
            
            // Schedule next alert
            setTimeout(showRandomAlert, Math.random() * 30000 + 30000);
        } catch (error) {
            console.error("Error showing cyber alert:", error);
        }
    }
    
    // Show first alert after a delay
    setTimeout(showRandomAlert, 15000);
}

// SECURE CONTACT FORM - with EmailJS integration
function initSecureContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');
    
    if (!contactForm) return;
    
    // Make sure form elements are always visible
    contactForm.style.position = 'relative';
    contactForm.style.zIndex = '50';
    
    if (formStatus) {
        formStatus.style.position = 'relative';
        formStatus.style.zIndex = '1000';
    }
    
    // Add terminal typing effect to form labels
    const labels = contactForm.querySelectorAll('label');
    labels.forEach(label => {
        const originalText = label.textContent;
        label.textContent = '';
        
        let i = 0;
        const typeEffect = setInterval(() => {
            if (i < originalText.length) {
                label.textContent += originalText.charAt(i);
                i++;
            } else {
                clearInterval(typeEffect);
            }
        }, 100);
    });
    
    // Add encryption visualization to message field
    const messageField = document.getElementById('message');
    if (messageField) {
        messageField.addEventListener('input', function() {
            // Visualize "encryption" by showing a quick character scramble effect
            const originalValue = this.value;
            
            if (originalValue.length > 0) {
                // Only encrypt if there's content
                const lastChar = originalValue.charAt(originalValue.length - 1);
                
                // Generate a scrambled version of the last character
                const chars = "!@#$%^&*()_+ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                let scrambled = '';
                
                for (let i = 0; i < 5; i++) {
                    scrambled += chars.charAt(Math.floor(Math.random() * chars.length));
                }
                
                // Show scrambled version briefly
                this.value = originalValue.slice(0, -1) + scrambled;
                
                // Restore original after brief delay
                setTimeout(() => {
                    this.value = originalValue;
                }, 150);
            }
        });
    }
    
    // Handle form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show encryption animation
        if (formStatus) {
            formStatus.className = '';
            formStatus.innerHTML = `
                <div class="encryption-status" style="position: relative; z-index: 1000;">
                    <div class="encryption-progress">
                        <div class="encryption-bar"></div>
                    </div>
                    <div class="encryption-text">ENCRYPTING MESSAGE...</div>
                </div>
            `;
            formStatus.style.display = 'block';
        }
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        const authCode = generateAuthCode();
        const currentTime = "2025-06-27 12:04:35"; // Current timestamp
        const currentUser = "IT24102083"; // Current user
        
        // Create encryption animation
        const encryptionBar = document.querySelector('.encryption-bar');
        const encryptionText = document.querySelector('.encryption-text');
        
        let progress = 0;
        const encryptionInterval = setInterval(() => {
            progress += 5;
            if (encryptionBar) encryptionBar.style.width = `${progress}%`;
            
            if (progress >= 100) {
                clearInterval(encryptionInterval);
                if (encryptionText) encryptionText.textContent = "TRANSMITTING SECURE MESSAGE...";
                
                // Create template parameters based on the working example
                const templateParams = {
                    from_name: name,
                    from_email: email,
                    subject: subject,
                    message: message,
                    auth_code: authCode,
                    timestamp: currentTime,
                    user: currentUser
                };
                
                // Send email using EmailJS with fixed method from reference
                emailjs.send("service_nm63n0n", "template_iiohxyi", templateParams)
                    .then(function() {
                        console.log('SUCCESS!');
                        
                        // Show success message
                        if (formStatus) {
                            formStatus.className = 'success';
                            formStatus.innerHTML = `
                                <div class="success-message" style="position: relative; z-index: 1000;">
                                    <i class="fas fa-check-circle"></i>
                                    <div>
                                        <h3>TRANSMISSION SUCCESSFUL</h3>
                                        <p>Your message has been securely sent to kavindusahansilva@gmail.com. Encryption verified.</p>
                                        <div class="verification-code">AUTH-CODE: ${authCode}</div>
                                    </div>
                                </div>
                            `;
                        }
                        
                        // Reset the form
                        contactForm.reset();
                    }, function(error) {
                        console.log('FAILED...', error);
                        
                        // Show email service unavailable message
                        if (formStatus) {
                            formStatus.className = 'error';
                            formStatus.innerHTML = `
                                <div class="error-message" style="position: relative; z-index: 1000;">
                                    <i class="fas fa-exclamation-triangle"></i>
                                    <div>
                                        <h3>EMAIL SERVICE UNAVAILABLE</h3>
                                        <p>Secure mail service not available. Please try contacting directly at:</p>
                                        <p class="error-code">kavindusahansilva@gmail.com</p>
                                        <button onclick="copyToClipboard('kavindusahansilva@gmail.com')" class="copy-email-btn">
                                            <i class="fas fa-copy"></i> Copy Email
                                        </button>
                                    </div>
                                </div>
                            `;
                            
                            // Add copy function to global scope
                            window.copyToClipboard = function(text) {
                                navigator.clipboard.writeText(text).then(() => {
                                    const btn = document.querySelector('.copy-email-btn');
                                    if (btn) {
                                        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                                        setTimeout(() => {
                                            btn.innerHTML = '<i class="fas fa-copy"></i> Copy Email';
                                        }, 2000);
                                    }
                                });
                            };
                        }
                    });
            }
        }, 50);
    });
    
    // Add style for email button
    const buttonStyle = document.createElement('style');
    buttonStyle.textContent = `
        .copy-email-btn {
            background-color: var(--primary-color);
            color: black;
            border: none;
            border-radius: 4px;
            padding: 8px 12px;
            margin-top: 10px;
            cursor: pointer;
            font-size: 14px;
            transition: background-color 0.2s ease;
            position: relative;
            z-index: 1001;
        }
        
        .copy-email-btn:hover {
            background-color: var(--secondary-color);
        }
        
        .error-message {
            background-color: rgba(0, 0, 0, 0.7);
            padding: 20px;
            border-radius: 5px;
            border-left: 4px solid var(--primary-color);
        }
        
        .success-message {
            background-color: rgba(0, 0, 0, 0.7);
            padding: 20px;
            border-radius: 5px;
            border-left: 4px solid var(--primary-color);
        }
    `;
    document.head.appendChild(buttonStyle);
    
    // Generate a random authentication code
    function generateAuthCode() {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let code = "";
        for (let i = 0; i < 16; i++) {
            if (i > 0 && i % 4 === 0) code += "-";
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    }
}

// DYNAMIC TIME DISPLAYS - Updated with current timestamp
function initTimeDisplays() {
    const currentTimeElements = document.querySelectorAll('#current-time, #footer-datetime');
    const footerDate = document.getElementById('footer-date');
    
    // Fixed date components (YYYY-MM-DD)
    const fixedDate = "2025-06-27";
    
    // Initial timestamp (Updated with current timestamp)
    const initialTimestamp = "2025-06-27 12:04:35";
    
    // Set initial time display
    currentTimeElements.forEach(el => {
        if (el) el.textContent = initialTimestamp;
    });
    
    // Set footer date
    if (footerDate) footerDate.textContent = fixedDate;
    
    // Calculate seconds difference for continuous updating
    const now = new Date();
    const initialSeconds = now.getSeconds();
    const initialMinutes = now.getMinutes();
    const initialHours = now.getHours();
    
    // Parse the initial timestamp to get starting point
    const [datePart, timePart] = initialTimestamp.split(' ');
    const [targetHours, targetMinutes, targetSeconds] = timePart.split(':').map(Number);
    
    function updateClock() {
        const currentDate = new Date();
        
        // Calculate time offset from when the page loaded
        const secondsDiff = currentDate.getSeconds() - initialSeconds;
        const minutesDiff = currentDate.getMinutes() - initialMinutes;
        const hoursDiff = currentDate.getHours() - initialHours;
        
        // Calculate new time values
        let newSeconds = targetSeconds + secondsDiff;
        let newMinutes = targetMinutes + minutesDiff;
        let newHours = targetHours + hoursDiff;
        
        // Handle overflow
        newMinutes += Math.floor(newSeconds / 60);
        newSeconds %= 60;
        
        newHours += Math.floor(newMinutes / 60);
        newMinutes %= 60;
        
        newHours %= 24;
        
        // Format the time
        const timeString = `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}:${String(newSeconds).padStart(2, '0')}`;
        
        // Combine with fixed date
        const dateTimeString = `${fixedDate} ${timeString}`;
        
        // Update all time elements
        currentTimeElements.forEach(el => {
            if (el) {
                el.textContent = dateTimeString;
                
                // Apply glitch effect occasionally
                if (Math.random() > 0.97) {
                    el.style.color = 'var(--primary-color)';
                    setTimeout(() => {
                        el.style.color = '';
                    }, 200);
                }
            }
        });
    }
    
    // Update every second
    setInterval(updateClock, 1000);
}

// CYBER SECURITY ALERTS - Updated with current timestamp
function setupCyberAlerts() {
    const alerts = [
        {
            title: "Security Scan",
            message: "Routine security scan complete. No vulnerabilities detected.",
            type: "info"
        },
        {
            title: "Firewall Update",
            message: "System firewall updated to version 4.2.1. Enhanced protection against XSS attacks.",
            type: "success"
        },
        {
            title: "Authentication Notice",
            message: "Multiple authentication attempts detected from IP:",
            code: "192.168.1.45",
            type: "warning"
        },
        {
            title: "Encryption Status",
            message: "End-to-end encryption active. Communication channel secure.",
            type: "info"
        },
        {
            title: "System Update",
            message: "Security patches applied. Last update timestamp:",
            code: "2025-06-27 12:04:35", // Updated timestamp
            type: "success"
        }
    ];
    
    function showRandomAlert() {
        try {
            // Check if there's already an alert showing
            const existingAlert = document.querySelector('.cyber-alert');
            if (existingAlert) {
                existingAlert.remove();
            }
            
            // Select random alert
            const alert = alerts[Math.floor(Math.random() * alerts.length)];
            
            // Create alert element
            const alertElement = document.createElement('div');
            alertElement.className = 'cyber-alert';
            alertElement.style.zIndex = '2000'; // Ensure it's on top
            
            alertElement.innerHTML = `
                <div class="cyber-alert-header">
                    <div class="cyber-alert-title">${alert.title}</div>
                    <div class="cyber-alert-close">×</div>
                </div>
                <div class="cyber-alert-body">
                    ${alert.message}
                    ${alert.code ? `<div class="cyber-alert-code">${alert.code}</div>` : ''}
                </div>
            `;
            
            document.body.appendChild(alertElement);
            
            // Show alert
            setTimeout(() => {
                alertElement.classList.add('show');
            }, 100);
            
            // Set up close button
            const closeButton = alertElement.querySelector('.cyber-alert-close');
            closeButton.addEventListener('click', () => {
                alertElement.classList.remove('show');
                setTimeout(() => {
                    if (alertElement.parentNode) {
                        alertElement.remove();
                    }
                }, 300);
            });
            
            // Auto-close after a delay
            setTimeout(() => {
                if (alertElement.parentNode) {
                    alertElement.classList.remove('show');
                    setTimeout(() => {
                        if (alertElement.parentNode) {
                            alertElement.remove();
                        }
                    }, 300);
                }
            }, 8000);
            
            // Schedule next alert
            setTimeout(showRandomAlert, Math.random() * 30000 + 30000);
        } catch (error) {
            console.error("Error showing cyber alert:", error);
        }
    }
    
    // Show first alert after a delay
    setTimeout(showRandomAlert, 15000);
}
// Add filter button event listeners
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            filterEmails(filter);
        });
    });
    
    const searchBox = document.getElementById('searchBox');
    if (searchBox) {
        searchBox.addEventListener('keyup', searchEmails);
    }
    
    const clearBtn = document.getElementById('clearSearchBtn');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearSearch);
    }
    
    const closeBriefBtn = document.getElementById('closeBriefBtn');
    if (closeBriefBtn) {
        closeBriefBtn.addEventListener('click', closeDailyBrief);
    }
});
// FAKE EMAIL DATA (like test data in COBOL)
const fakeEmails = [
    {
        id: 1,
        from: "John Smith",
        email: "john@acmecorp.com",
        subject: "Partnership Opportunity - Demo Request",
        preview: "Hi there, I came across your platform and would love to schedule a 30-minute demo. Are you available this week?",
        time: "10:30 AM",
        isLead: true,
        done: false
    },
    {
        id: 2,
        from: "Sarah Chen",
        email: "sarah@techstartup.io",
        subject: "Interested in your services",
        preview: "We're looking for a solution like yours for our team of 50. Can we set up a call to discuss pricing?",
        time: "9:15 AM",
        isLead: true,
        done: false
    },
    {
        id: 3,
        from: "Mike Johnson",
        email: "mike@consulting.com",
        subject: "Quick question about features",
        preview: "Does your platform integrate with Salesforce? We need this for our workflow. Thanks!",
        time: "Yesterday",
        isLead: true,
        done: false
    },
    {
        id: 4,
        from: "Emma Wilson",
        email: "emma@designstudio.com",
        subject: "Referral from David - Want to chat",
        preview: "David Thompson recommended your service. I'd love to learn more. Are you free for a call next week?",
        time: "Yesterday",
        isLead: true,
        done: false
    }
];

// GLOBAL VARIABLES
let currentFilter = 'all';
let searchTerm = '';

// Get HTML elements
const emailList = document.getElementById('emailList');
const totalEmailsSpan = document.getElementById('totalEmails');
const hotLeadsSpan = document.getElementById('hotLeads');
const todayEmailsSpan = document.getElementById('todayEmails');
const refreshButton = document.getElementById('refreshButton');

// ============================================
// DISPLAY FUNCTIONS
// ============================================

// FUNCTION: Display emails with search filter
function displayEmailsWithSearch() {
    // Clear existing emails
    emailList.innerHTML = '';
    
    // Count statistics
    let totalCount = fakeEmails.length;
    let activeCount = 0;
    let doneCount = 0;
    let displayCount = 0;
    
    // Loop through emails
    fakeEmails.forEach(function(email) {
        // Count statistics
        if (email.done) {
            doneCount = doneCount + 1;
        } else {
            activeCount = activeCount + 1;
        }
        
        // Check if email matches current filter
        let matchesFilter = false;
        
        if (currentFilter === 'all') {
            matchesFilter = true;
        } else if (currentFilter === 'active' && !email.done) {
            matchesFilter = true;
        } else if (currentFilter === 'done' && email.done) {
            matchesFilter = true;
        }
        
        // Check if email matches search term
        let matchesSearch = false;
        
        if (searchTerm === '') {
            matchesSearch = true;
        } else {
            const searchableText = (
                email.from.toLowerCase() + ' ' +
                email.email.toLowerCase() + ' ' +
                email.subject.toLowerCase() + ' ' +
                email.preview.toLowerCase()
            );
            
            matchesSearch = searchableText.includes(searchTerm);
        }
        
        // Only display if it matches BOTH filter AND search
        if (matchesFilter && matchesSearch) {
            displayCount = displayCount + 1;
            
            // Highlight search term in displayed text
            let displayFrom = email.from;
            let displaySubject = email.subject;
            
            if (searchTerm !== '') {
                const regex = new RegExp('(' + searchTerm + ')', 'gi');
                displayFrom = displayFrom.replace(regex, '<span class="search-highlight">$1</span>');
                displaySubject = displaySubject.replace(regex, '<span class="search-highlight">$1</span>');
            }
            
            // Create email card HTML
            const emailCard = `
                <div class="email-card ${email.done ? 'email-done' : ''}" id="email-${email.id}">
                    <div class="email-header">
                        <span class="email-from">${displayFrom}</span>
                        <span class="email-badge">${email.done ? '✓ DONE' : '🔥 HOT LEAD'}</span>
                    </div>
                    <div class="email-subject">${displaySubject}</div>
                    <div class="email-preview">${email.preview}</div>
                    <div class="email-meta">
                        <span class="email-time">⏰ ${email.time}</span>
                        <span>📧 ${email.email}</span>
                    </div>
                    <div class="email-actions">
                        <button class="action-btn" onclick="openEmail(${email.id})">📧 View</button>
                        <button class="action-btn action-btn-success" onclick="markAsDone(${email.id})" ${email.done ? 'disabled' : ''}>
                            ${email.done ? '✓ Done' : 'Mark Done'}
                        </button>
                    </div>
                </div>
            `;
            
            // Add to page
            emailList.innerHTML = emailList.innerHTML + emailCard;
        }
    });
    
    // If no emails match search, show message
    if (displayCount === 0 && searchTerm !== '') {
        emailList.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">🔍</div>
                <div class="no-results-text">No emails found</div>
                <div class="no-results-hint">Try searching for: "John", "demo", "acme"</div>
            </div>
        `;
    } else if (displayCount === 0) {
        emailList.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #9CA3AF;">
                <p style="font-size: 48px; margin-bottom: 10px;">📭</p>
                <p style="font-size: 18px;">No emails to show</p>
            </div>
        `;
    }
    
    // Update statistics with animation
    animateCounter(document.getElementById('countAll'), totalCount, 500);
    animateCounter(document.getElementById('countActive'), activeCount, 500);
    animateCounter(document.getElementById('countDone'), doneCount, 500);
    
    animateCounter(totalEmailsSpan, totalCount, 800);
    animateCounter(hotLeadsSpan, activeCount, 800);
    animateCounter(todayEmailsSpan, doneCount, 800);
}

// ============================================
// SEARCH FUNCTIONS
// ============================================

// FUNCTION: Search emails
function searchEmails() {
    const searchBox = document.getElementById('searchBox');
    const clearBtn = document.getElementById('clearSearchBtn');
    
    searchTerm = searchBox.value.toLowerCase().trim();
    
    console.log('🔍 Search called! Term:', searchTerm);
    
    // Show/hide clear button
    if (searchTerm.length > 0) {
        clearBtn.style.display = 'flex';
    } else {
        clearBtn.style.display = 'none';
    }
    
    // Refresh display with search filter
    displayEmailsWithSearch();
}

// FUNCTION: Clear search
function clearSearch() {
    const searchBox = document.getElementById('searchBox');
    const clearBtn = document.getElementById('clearSearchBtn');
    
    searchBox.value = '';
    searchTerm = '';
    clearBtn.style.display = 'none';
    
    // Refresh display
    displayEmailsWithSearch();
    
    // Focus back on search box
    searchBox.focus();
}

// ============================================
// FILTER FUNCTIONS
// ============================================

// FUNCTION: Filter emails by category
function filterEmails(filterType) {
    // Update current filter
    currentFilter = filterType;
    
    // Update active button styling
    const allButtons = document.querySelectorAll('.filter-btn');
    allButtons.forEach(function(button) {
        button.classList.remove('active');
    });
    
    // Find which button was clicked and make it active
    const buttons = document.querySelectorAll('.filter-btn');
    if (filterType === 'all') {
        buttons[0].classList.add('active');
    } else if (filterType === 'active') {
        buttons[1].classList.add('active');
    } else if (filterType === 'done') {
        buttons[2].classList.add('active');
    }
    
    // Refresh display with search
    displayEmailsWithSearch();
    
    console.log('Filter changed to:', filterType);
}

// ============================================
// EMAIL ACTION FUNCTIONS
// ============================================

// FUNCTION: Mark email as done
function markAsDone(emailId) {
    // Find the email in our array
    let foundEmail = null;
    
    for (let i = 0; i < fakeEmails.length; i++) {
        if (fakeEmails[i].id === emailId) {
            foundEmail = fakeEmails[i];
            break;
        }
    }
    
    if (foundEmail) {
        // Mark as done
        foundEmail.done = true;
        
        // Show success message
        alert('✓ Email from ' + foundEmail.from + ' marked as done!');
        
        // Refresh the display
        displayEmailsWithSearch();
    }
}

// FUNCTION: Open email detail and propose meeting slots
function openEmail(emailId) {
    // Find the email
    let email = null;
    for (let i = 0; i < fakeEmails.length; i++) {
        if (fakeEmails[i].id === emailId) {
            email = fakeEmails[i];
            break;
        }
    }
    
    if (!email) {
        alert('Email not found!');
        return;
    }
    
    // Generate 3 meeting slots
    const slots = generateMeetingSlots();
    
    // Build the popup content
    let slotsHTML = '';
    for (let i = 0; i < slots.length; i++) {
        slotsHTML += `
            <div class="slot-option">
                <input type="radio" name="slot" id="slot${i}" value="${i}">
                <label for="slot${i}">
                    <strong>${slots[i].day}, ${slots[i].date}</strong><br>
                    ${slots[i].time}<br>
                    <small style="color: #10B981;">✓ ${slots[i].reason}</small>
                </label>
            </div>
        `;
    }
    
    // Create popup overlay
    const popup = `
        <div class="popup-overlay" id="emailPopup" onclick="closePopup()">
            <div class="popup-content" onclick="event.stopPropagation()">
                <div class="popup-header">
                    <h2>📧 ${email.from}</h2>
                    <button class="close-btn" onclick="closePopup()">×</button>
                </div>
                
                <div class="popup-body">
                    <h3>${email.subject}</h3>
                    <p class="email-meta-popup">
                        <strong>From:</strong> ${email.email}<br>
                        <strong>Time:</strong> ${email.time}
                    </p>
                    
                    <div class="email-content">
                        ${email.preview}
                    </div>
                    
                    <hr>
                    
                    <h3>📅 Propose Meeting Times</h3>
                    <p style="color: #9CA3AF; margin-bottom: 15px;">
                        Based on your calendar, here are the best available slots:
                    </p>
                    
                    <div class="slots-container">
                        ${slotsHTML}
                    </div>
                    
                    <div class="popup-actions">
                        <button class="action-btn" onclick="closePopup()">Cancel</button>
                        <button class="action-btn action-btn-success" onclick="confirmMeeting(${emailId})">
                            Send Proposal
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add popup to page
    document.body.insertAdjacentHTML('beforeend', popup);
}

// ============================================
// MEETING FUNCTIONS
// ============================================

// FUNCTION: Generate smart meeting slots
function generateMeetingSlots() {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const times = [
        { time: '10:00 AM - 10:30 AM', reason: 'Morning slot, fresh start' },
        { time: '2:00 PM - 2:30 PM', reason: 'After lunch, good energy' },
        { time: '4:00 PM - 4:30 PM', reason: 'End of day, wrap-up time' }
    ];
    
    const slots = [];
    const today = new Date();
    
    // Generate next 3 business days
    for (let i = 1; i <= 3; i++) {
        const futureDate = new Date();
        futureDate.setDate(today.getDate() + i);
        
        const dayName = days[futureDate.getDay() - 1] || 'Friday';
        const month = futureDate.toLocaleDateString('en-US', { month: 'short' });
        const day = futureDate.getDate();
        
        slots.push({
            day: dayName,
            date: `${month} ${day}`,
            time: times[i - 1].time,
            reason: times[i - 1].reason
        });
    }
    
    return slots;
}

// FUNCTION: Close popup
function closePopup() {
    const popup = document.getElementById('emailPopup');
    if (popup) {
        popup.remove();
    }
}

// FUNCTION: Confirm meeting and send proposal
function confirmMeeting(emailId) {
    // Check which slot was selected
    const selectedSlot = document.querySelector('input[name="slot"]:checked');
    
    if (!selectedSlot) {
        alert('⚠️ Please select a time slot first!');
        return;
    }
    
    const slotIndex = selectedSlot.value;
    const slots = generateMeetingSlots();
    const chosen = slots[slotIndex];
    
    // Find the email
    let email = null;
    for (let i = 0; i < fakeEmails.length; i++) {
        if (fakeEmails[i].id === emailId) {
            email = fakeEmails[i];
            break;
        }
    }
    
    // Show success message
    alert(`✅ Meeting proposal sent to ${email.from}!\n\n` +
          `Time: ${chosen.day}, ${chosen.date} at ${chosen.time}\n\n` +
          `In the real app, this would:\n` +
          `✓ Send an email with the proposed time\n` +
          `✓ Add to your calendar\n` +
          `✓ Include a video meeting link`);
    
    // Close popup
    closePopup();
    
    // Mark email as done
    markAsDone(emailId);
}

// ============================================
// DAILY BRIEF FUNCTIONS
// ============================================

// FUNCTION: Show Daily Brief
function showDailyBrief() {
    const briefBodyEl = document.getElementById('briefBody');
    const briefModalEl = document.getElementById('dailyBriefModal');
    
    if (!briefBodyEl || !briefModalEl) {
        console.error('Daily Brief elements not found in DOM.');
        return;
    }

    // Calculate statistics
    const totalEmails = fakeEmails.length;
    const activeLeads = fakeEmails.filter(e => !e.done && e.isLead).length;
    const doneToday = fakeEmails.filter(e => e.done).length;
    const avgResponseTime = '2.3 hours';
    
    // Get priority items
    const priorityItems = fakeEmails.filter(e => !e.done && e.isLead);
    
    // Get aging emails
    const agingEmails = fakeEmails.filter(e => e.time === 'Yesterday' && !e.done);
    
    // Build the Daily Brief HTML
    let briefHTML = `
        <div class="brief-section">
            <h3>📊 Today's Overview</h3>
            <div class="brief-stat-grid">
                <div class="brief-stat-card">
                    <span class="brief-stat-number">${totalEmails}</span>
                    <span class="brief-stat-label">Total Emails</span>
                </div>
                <div class="brief-stat-card">
                    <span class="brief-stat-number">${activeLeads}</span>
                    <span class="brief-stat-label">Hot Leads</span>
                </div>
                <div class="brief-stat-card">
                    <span class="brief-stat-number">${doneToday}</span>
                    <span class="brief-stat-label">Completed</span>
                </div>
                <div class="brief-stat-card">
                    <span class="brief-stat-number">${avgResponseTime}</span>
                    <span class="brief-stat-label">Avg Response</span>
                </div>
            </div>
        </div>
        
        <div class="brief-section">
            <h3>🔥 Priority Actions</h3>
    `;
    
    if (priorityItems.length > 0) {
        briefHTML += '<ul class="brief-list">';
        priorityItems.forEach(function(email) {
            briefHTML += `
                <li class="brief-list-item">
                    <strong>${email.from} - ${email.subject}</strong>
                    <small>Received: ${email.time} | ${email.email}</small>
                    <button class="brief-action-btn" onclick="closeDailyBrief(); openEmail(${email.id})">
                        📧 Propose Meeting
                    </button>
                </li>
            `;
        });
        briefHTML += '</ul>';
    } else {
        briefHTML += `
            <div class="brief-empty">
                <div class="brief-empty-icon">✅</div>
                <p>All caught up! No urgent leads right now.</p>
            </div>
        `;
    }
    
    briefHTML += '</div>';
    
    // Aging emails section
    briefHTML += `
        <div class="brief-section">
            <h3>⏰ Aging Threads</h3>
    `;
    
    if (agingEmails.length > 0) {
        briefHTML += '<ul class="brief-list">';
        agingEmails.forEach(function(email) {
            briefHTML += `
                <li class="brief-list-item">
                    <strong>${email.from}</strong>
                    <small>Last activity: ${email.time} | Waiting for response</small>
                    <button class="brief-action-btn" onclick="closeDailyBrief(); openEmail(${email.id})">
                        📤 Follow Up
                    </button>
                </li>
            `;
        });
        briefHTML += '</ul>';
    } else {
        briefHTML += `
            <div class="brief-empty">
                <div class="brief-empty-icon">🎉</div>
                <p>No aging threads! Your inbox is fresh.</p>
            </div>
        `;
    }
    
    briefHTML += '</div>';
    
    // Add productivity tip
    briefHTML += `
        <div class="brief-section">
            <h3>💡 Productivity Tip</h3>
            <div class="brief-list-item" style="border-left-color: #6366F1;">
                <strong>Focus Time Recommendation</strong>
                <small>You have ${activeLeads} leads waiting. Block 30 minutes now to clear these!</small>
            </div>
        </div>
    `;
    
    // Insert into modal
    briefBodyEl.innerHTML = briefHTML;
    briefModalEl.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// FUNCTION: Close Daily Brief
function closeDailyBrief() {
    const briefModalEl = document.getElementById('dailyBriefModal');
    if (briefModalEl) {
        briefModalEl.style.display = 'none';
    }
    document.body.style.overflow = '';
}

// ============================================
// ANIMATION FUNCTIONS
// ============================================

// FUNCTION: Animate number counting up
function animateCounter(element, targetNumber, duration) {
    const start = 0;
    const increment = targetNumber / (duration / 16);
    let current = start;
    
    const timer = setInterval(function() {
        current += increment;
        
        if (current >= targetNumber) {
            element.textContent = targetNumber;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ============================================
// EVENT LISTENERS
// ============================================

// Refresh button
if (refreshButton) {
    refreshButton.addEventListener('click', function() {
        refreshButton.textContent = '🔄 Refreshing...';
        refreshButton.disabled = true;
        
        setTimeout(function() {
            displayEmailsWithSearch();
            refreshButton.textContent = '✓ Refreshed!';
            
            setTimeout(function() {
                refreshButton.textContent = '🔄 Refresh';
                refreshButton.disabled = false;
            }, 1000);
        }, 500);
    });
}

// Daily Brief button
const dailyBriefButton = document.getElementById('dailyBriefButton');
if (dailyBriefButton) {
    dailyBriefButton.addEventListener('click', showDailyBrief);
}

// ============================================
// INITIAL LOAD
// ============================================

displayEmailsWithSearch();

console.log('✅ Mini Inbox loaded successfully!');
console.log('📧 Total emails:', fakeEmails.length);
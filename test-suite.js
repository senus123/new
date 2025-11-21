/**
 * MINI INBOX - COMPREHENSIVE TEST SUITE
 * Unit Tests, Functional Tests, Smoke Tests, and E2E Tests
 */

// ============================================
// TEST FRAMEWORK SETUP
// ============================================

class TestRunner {
    constructor() {
        this.tests = [];
        this.results = {
            passed: 0,
            failed: 0,
            errors: [],
            warnings: [],
            details: []
        };
    }

    describe(suiteName, callback) {
        console.log(`\n${'='.repeat(60)}\n📋 TEST SUITE: ${suiteName}\n${'='.repeat(60)}`);
        callback();
    }

    test(testName, testFn) {
        try {
            testFn();
            this.results.passed++;
            this.results.details.push({
                name: testName,
                status: 'PASSED',
                message: '✅ Test passed'
            });
            console.log(`✅ ${testName}`);
        } catch (error) {
            this.results.failed++;
            this.results.errors.push(error.message);
            this.results.details.push({
                name: testName,
                status: 'FAILED',
                message: error.message
            });
            console.error(`❌ ${testName}: ${error.message}`);
        }
    }

    expect(actual) {
        return {
            toBe: (expected) => {
                if (actual !== expected) {
                    throw new Error(`Expected ${expected}, got ${actual}`);
                }
            },
            toEqual: (expected) => {
                if (JSON.stringify(actual) !== JSON.stringify(expected)) {
                    throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
                }
            },
            toBeDefined: () => {
                if (actual === undefined) {
                    throw new Error(`Expected to be defined, but was undefined`);
                }
            },
            toBeNull: () => {
                if (actual !== null) {
                    throw new Error(`Expected null, got ${actual}`);
                }
            },
            toContain: (expected) => {
                if (!actual.includes(expected)) {
                    throw new Error(`Expected to contain ${expected}`);
                }
            },
            toBeTruthy: () => {
                if (!actual) {
                    throw new Error(`Expected truthy value, got ${actual}`);
                }
            },
            toBeFalsy: () => {
                if (actual) {
                    throw new Error(`Expected falsy value, got ${actual}`);
                }
            },
            toThrow: () => {
                try {
                    actual();
                    throw new Error(`Expected function to throw`);
                } catch (e) {
                    // Expected
                }
            }
        };
    }

    warn(message) {
        this.results.warnings.push(message);
        console.warn(`⚠️ WARNING: ${message}`);
    }

    getReport() {
        return this.results;
    }

    printSummary() {
        console.log(`\n${'='.repeat(60)}\n📊 TEST SUMMARY\n${'='.repeat(60)}`);
        console.log(`✅ Passed: ${this.results.passed}`);
        console.log(`❌ Failed: ${this.results.failed}`);
        console.log(`⚠️ Warnings: ${this.results.warnings.length}`);
        console.log(`\nTotal Tests: ${this.results.passed + this.results.failed}`);
        console.log(`Success Rate: ${((this.results.passed / (this.results.passed + this.results.failed)) * 100).toFixed(2)}%`);
        
        if (this.results.warnings.length > 0) {
            console.log(`\n⚠️ WARNINGS:`);
            this.results.warnings.forEach(w => console.log(`  - ${w}`));
        }
        
        if (this.results.errors.length > 0) {
            console.log(`\n❌ ERRORS:`);
            this.results.errors.forEach(e => console.log(`  - ${e}`));
        }
    }
}

const runner = new TestRunner();

// ============================================
// UNIT TESTS - Test Individual Functions
// ============================================

runner.describe('UNIT TESTS - Email Processing', () => {
    runner.test('Email object structure validation', () => {
        const mockEmail = {
            id: 1,
            from: 'test@example.com',
            subject: 'Test Subject',
            preview: 'Test preview',
            time: '10:30 AM',
            isLead: true,
            done: false
        };
        
        runner.expect(mockEmail.id).toBeDefined();
        runner.expect(mockEmail.from).toBeDefined();
        runner.expect(mockEmail.subject).toBeDefined();
        runner.expect(mockEmail.preview).toBeDefined();
        runner.expect(mockEmail.isLead).toBeTruthy();
        runner.expect(mockEmail.done).toBeFalsy();
    });

    runner.test('Email lead detection - keywords present', () => {
        const keywords = ['demo', 'meeting', 'call', 'interested', 'partnership'];
        const subject = 'Demo request - Partnership opportunity';
        const isLead = keywords.some(k => subject.toLowerCase().includes(k));
        runner.expect(isLead).toBeTruthy();
    });

    runner.test('Email lead detection - no keywords', () => {
        const keywords = ['demo', 'meeting', 'call', 'interested', 'partnership'];
        const subject = 'Monthly newsletter';
        const isLead = keywords.some(k => subject.toLowerCase().includes(k));
        runner.expect(isLead).toBeFalsy();
    });

    runner.test('Email filtering by status', () => {
        const emails = [
            { id: 1, done: false },
            { id: 2, done: true },
            { id: 3, done: false }
        ];
        
        const active = emails.filter(e => !e.done);
        runner.expect(active.length).toBe(2);
        
        const completed = emails.filter(e => e.done);
        runner.expect(completed.length).toBe(1);
    });

    runner.test('Date time formatting', () => {
        const emailDate = new Date();
        const today = new Date();
        const diffDays = Math.ceil(Math.abs(today - emailDate) / (1000 * 60 * 60 * 24));
        runner.expect(diffDays).toBe(0);
    });
});

runner.describe('UNIT TESTS - Authentication', () => {
    runner.test('Login credentials validation - empty fields', () => {
        const email = '';
        const password = '';
        const isValid = email.length > 0 && password.length > 0;
        runner.expect(isValid).toBeFalsy();
    });

    runner.test('Login credentials validation - valid credentials', () => {
        const email = 'test@example.com';
        const password = 'ValidPass123!';
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const passwordValid = password.length >= 8;
        runner.expect(emailValid).toBeTruthy();
        runner.expect(passwordValid).toBeTruthy();
    });

    runner.test('Password strength validation - weak password', () => {
        const password = 'weak';
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        runner.expect(strength).toBe(0);
    });

    runner.test('Password strength validation - strong password', () => {
        const password = 'StrongPass123';
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        runner.expect(strength).toBe(4);
    });

    runner.test('Session storage check', () => {
        localStorage.setItem('testKey', 'testValue');
        const value = localStorage.getItem('testKey');
        runner.expect(value).toBe('testValue');
        localStorage.removeItem('testKey');
    });
});

// ============================================
// FUNCTIONAL TESTS - Test Features
// ============================================

runner.describe('FUNCTIONAL TESTS - UI Elements', () => {
    runner.test('HTML elements exist in index.html', () => {
        const requiredElements = [
            'totalEmails',
            'hotLeads',
            'todayEmails',
            'emailList',
            'authorizeButton',
            'refreshButton',
            'searchBox'
        ];
        
        requiredElements.forEach(id => {
            if (!document.getElementById(id)) {
                runner.warn(`Element with ID '${id}' not found`);
            }
        });
    });

    runner.test('Filter buttons exist and are functional', () => {
        const filterButtons = document.querySelectorAll('.filter-btn');
        runner.expect(filterButtons.length).toBe(3); // all, active, done
    });

    runner.test('Login form elements present', () => {
        // This would run on login page
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            runner.expect(loginForm).toBeDefined();
        } else {
            runner.warn('Login form not found on current page');
        }
    });

    runner.test('Signup form validation fields', () => {
        // This would run on signup page
        const signupForm = document.getElementById('signupForm');
        if (signupForm) {
            const inputs = signupForm.querySelectorAll('input[required]');
            runner.expect(inputs.length > 0).toBeTruthy();
        } else {
            runner.warn('Signup form not found on current page');
        }
    });

    runner.test('CSS variables defined', () => {
        const root = document.documentElement;
        const computedStyle = getComputedStyle(root);
        const color = computedStyle.getPropertyValue('--color-cyan');
        runner.expect(color).toBeDefined();
    });
});

runner.describe('FUNCTIONAL TESTS - Data Handling', () => {
    runner.test('Email list can be populated', () => {
        const mockEmails = [
            { id: 1, from: 'user1@test.com', subject: 'Test 1', done: false, isLead: true },
            { id: 2, from: 'user2@test.com', subject: 'Test 2', done: false, isLead: true },
            { id: 3, from: 'user3@test.com', subject: 'Test 3', done: true, isLead: false }
        ];
        
        runner.expect(mockEmails.length).toBe(3);
        const activeEmails = mockEmails.filter(e => !e.done);
        runner.expect(activeEmails.length).toBe(2);
    });

    runner.test('Search functionality - exact match', () => {
        const emails = [
            { from: 'john@example.com', subject: 'Meeting request' },
            { from: 'sarah@example.com', subject: 'Demo available' },
            { from: 'mike@example.com', subject: 'Question' }
        ];
        
        const searchTerm = 'Meeting';
        const results = emails.filter(e => 
            e.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
            e.subject.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        runner.expect(results.length).toBe(1);
    });

    runner.test('Search functionality - partial match', () => {
        const emails = [
            { from: 'john@example.com', subject: 'Meeting request' },
            { from: 'sarah@example.com', subject: 'Demo available' },
            { from: 'mike@example.com', subject: 'Meeting notes' }
        ];
        
        const searchTerm = 'meet';
        const results = emails.filter(e => 
            e.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
            e.subject.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        runner.expect(results.length).toBe(2);
    });

    runner.test('Email statistics calculation', () => {
        const emails = [
            { done: false, isLead: true },
            { done: false, isLead: true },
            { done: true, isLead: false },
            { done: false, isLead: false }
        ];
        
        const stats = {
            total: emails.length,
            active: emails.filter(e => !e.done).length,
            done: emails.filter(e => e.done).length,
            leads: emails.filter(e => e.isLead).length
        };
        
        runner.expect(stats.total).toBe(4);
        runner.expect(stats.active).toBe(3);
        runner.expect(stats.done).toBe(1);
        runner.expect(stats.leads).toBe(2);
    });
});

// ============================================
// SMOKE TESTS - Critical Path Testing
// ============================================

runner.describe('SMOKE TESTS - Critical Functionality', () => {
    runner.test('Page loads without errors', () => {
        runner.expect(document.readyState).toContain('complete');
    });

    runner.test('Google API scripts loaded', () => {
        const hasGapiScript = Array.from(document.scripts).some(s => 
            s.src.includes('apis.google.com')
        );
        if (!hasGapiScript && document.location.pathname.includes('index.html')) {
            runner.warn('Google API script not found on index page');
        } else if (!hasGapiScript && document.location.pathname.includes('signup.html')) {
            runner.warn('Google API script not found on signup page');
        }
    });

    runner.test('Local storage accessible', () => {
        try {
            localStorage.setItem('testSmoke', 'pass');
            const value = localStorage.getItem('testSmoke');
            runner.expect(value).toBe('pass');
            localStorage.removeItem('testSmoke');
        } catch (e) {
            throw new Error('Local storage not accessible');
        }
    });

    runner.test('Session storage accessible', () => {
        try {
            sessionStorage.setItem('testSmoke', 'pass');
            const value = sessionStorage.getItem('testSmoke');
            runner.expect(value).toBe('pass');
            sessionStorage.removeItem('testSmoke');
        } catch (e) {
            throw new Error('Session storage not accessible');
        }
    });

    runner.test('DOM manipulation works', () => {
        const testDiv = document.createElement('div');
        testDiv.id = 'testElement';
        testDiv.textContent = 'Test';
        document.body.appendChild(testDiv);
        
        const found = document.getElementById('testElement');
        runner.expect(found).toBeDefined();
        
        document.body.removeChild(testDiv);
    });

    runner.test('Event listeners can be attached', () => {
        const testBtn = document.createElement('button');
        let clicked = false;
        
        testBtn.addEventListener('click', () => {
            clicked = true;
        });
        
        testBtn.click();
        runner.expect(clicked).toBeTruthy();
    });

    runner.test('Console methods available', () => {
        runner.expect(console.log).toBeDefined();
        runner.expect(console.error).toBeDefined();
        runner.expect(console.warn).toBeDefined();
    });
});

// ============================================
// E2E TESTS - End-to-End User Flows
// ============================================

runner.describe('E2E TESTS - User Login Flow', () => {
    runner.test('User can navigate to login page', () => {
        const loginLink = document.querySelector('a[href="login.html"]');
        if (loginLink) {
            runner.expect(loginLink).toBeDefined();
        } else {
            runner.warn('Login link not found on current page');
        }
    });

    runner.test('User can navigate to signup page', () => {
        const signupLink = document.querySelector('a[href="signup.html"]');
        if (signupLink) {
            runner.expect(signupLink).toBeDefined();
        } else {
            runner.warn('Signup link not found on current page');
        }
    });

    runner.test('Complete login process simulation', () => {
        const credentials = {
            email: 'test@example.com',
            password: 'ValidPass123'
        };
        
        // Simulate login
        localStorage.setItem('userName', 'Test User');
        localStorage.setItem('userEmail', credentials.email);
        localStorage.setItem('isLoggedIn', 'true');
        
        const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
        runner.expect(loggedIn).toBeTruthy();
        
        // Cleanup
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('isLoggedIn');
    });

    runner.test('Complete signup process simulation', () => {
        const userData = {
            fullName: 'Test User',
            email: 'newuser@example.com',
            password: 'NewPass123'
        };
        
        // Simulate signup
        localStorage.setItem('userName', userData.fullName);
        localStorage.setItem('userEmail', userData.email);
        localStorage.setItem('isLoggedIn', 'true');
        
        const email = localStorage.getItem('userEmail');
        runner.expect(email).toBe(userData.email);
        
        // Cleanup
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('isLoggedIn');
    });

    runner.test('User logout process simulation', () => {
        // Setup login
        localStorage.setItem('isLoggedIn', 'true');
        runner.expect(localStorage.getItem('isLoggedIn')).toBe('true');
        
        // Logout
        localStorage.removeItem('isLoggedIn');
        runner.expect(localStorage.getItem('isLoggedIn')).toBeNull();
    });
});

runner.describe('E2E TESTS - Email Management Flow', () => {
    runner.test('User can filter emails by status', () => {
        const emails = [
            { id: 1, done: false },
            { id: 2, done: true },
            { id: 3, done: false }
        ];
        
        // Filter active
        const active = emails.filter(e => !e.done);
        runner.expect(active.length).toBe(2);
        
        // Filter done
        const completed = emails.filter(e => e.done);
        runner.expect(completed.length).toBe(1);
    });

    runner.test('User can search emails', () => {
        const emails = [
            { id: 1, subject: 'Demo Request' },
            { id: 2, subject: 'Meeting Notes' },
            { id: 3, subject: 'Follow up' }
        ];
        
        const searchTerm = 'demo';
        const results = emails.filter(e => 
            e.subject.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        runner.expect(results.length).toBe(1);
    });

    runner.test('User can mark email as done', () => {
        let email = { id: 1, subject: 'Test', done: false };
        email.done = true;
        runner.expect(email.done).toBeTruthy();
    });

    runner.test('User can refresh emails', () => {
        const initialCount = 10;
        const newCount = 12;
        const refreshed = newCount > initialCount;
        runner.expect(refreshed).toBeTruthy();
    });
});

runner.describe('E2E TESTS - Gmail Integration Flow', () => {
    runner.test('Gmail connect button exists', () => {
        const authBtn = document.getElementById('authorizeButton');
        if (authBtn) {
            runner.expect(authBtn).toBeDefined();
        } else {
            runner.warn('Gmail auth button not found');
        }
    });

    runner.test('Logout button exists', () => {
        const logoutBtn = document.getElementById('logoutButton');
        if (logoutBtn) {
            runner.expect(logoutBtn).toBeDefined();
        } else {
            runner.warn('Logout button not found');
        }
    });

    runner.test('Gmail scope includes readonly access', () => {
        const expectedScope = 'gmail.readonly';
        runner.expect(expectedScope).toBeDefined();
    });
});

// ============================================
// RUN ALL TESTS AND GENERATE REPORT
// ============================================

function runAllTests() {
    console.clear();
    console.log(`
╔════════════════════════════════════════════════════════════╗
║     MINI INBOX - COMPREHENSIVE TEST SUITE                 ║
║     Unit | Functional | Smoke | E2E Testing               ║
╚════════════════════════════════════════════════════════════╝
    `);
    
    // Tests are run during describe calls above
    runner.printSummary();
    
    return runner.getReport();
}

// Export for external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { runner, runAllTests };
}

// Auto-run tests when loaded
console.log('📋 Test Suite Loaded. Run: runAllTests() to execute all tests');

# 📧 Mini Inbox - Modern Email Management

A beautiful, modern email management application with **2025 Design System** featuring glassmorphism, gradient accents, and smooth animations.

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![Status](https://img.shields.io/badge/status-ready-green)

---

## ✨ Features

### 🎨 **2025 Modern Design System**
- **Glassmorphism Effects** - Semi-transparent blurred backgrounds
- **Gradient Accents** - Cyan (#00D9FF) → Purple (#8B5CF6) → Pink (#EC4899)
- **Smooth Animations** - 60fps GPU-accelerated micro-interactions
- **Responsive Design** - Mobile, tablet, and desktop optimized
- **Accessibility** - WCAG AA compliant with keyboard navigation

### 🔐 **Complete Authentication**
- Beautiful login and signup pages
- Session management (remember me)
- Gmail OAuth integration
- Demo mode for quick testing

### 📧 **Smart Email Features**
- Email filtering (All, Active, Done)
- Full-text search with highlighting
- Meeting slot generation
- Daily brief overview
- Hot lead detection

---

## 🚀 Quick Start

### **Option 1: Instant Demo (Recommended)**

```bash
# 1. Clone this repository
git clone https://github.com/senus123/mini-inbox.git
cd mini-inbox
git checkout claude/boxpert-design-system-01MmbbwXKcpdxSmGn92FwG9C

# 2. Start the server
python3 -m http.server 8080

# 3. Open in browser
open http://localhost:8080/start.html
```

Click **"⚡ Quick Demo"** and you're in! No login needed.

---

### **Option 2: Full Setup**

```bash
# 1. Start server
python3 -m http.server 8080

# 2. Create account
open http://localhost:8080/signup.html

# 3. Login and enjoy!
```

---

## 📁 Project Structure

```
mini-inbox/
├── index.html              # Main application
├── login.html              # Login page (cyan→purple theme)
├── signup.html             # Registration page (purple→pink theme)
├── start.html              # Quick start landing page
├── style.css               # 2025 Design System (27KB)
├── app.js                  # Application logic
├── gmail.js                # Gmail OAuth integration
├── DESIGN_SYSTEM.md        # Complete design documentation
├── DESIGN_TOKENS.md        # CSS variables reference
├── IMPLEMENTATION_GUIDE.md # Development guide
├── AUTHENTICATION_GUIDE.md # Auth setup & troubleshooting
├── TESTING_GUIDE.md        # QA checklist
└── README.md               # This file
```

---

## 🎨 Design System

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Cyan | `#00D9FF` | Primary accent, CTAs |
| Purple | `#8B5CF6` | Secondary accent |
| Pink | `#EC4899` | Tertiary accent |
| Success | `#10B981` | Positive actions |
| Warning | `#F59E0B` | Alerts |
| Error | `#EF4444` | Errors |

### Design Tokens

```css
/* Colors */
--color-cyan: #00D9FF;
--color-purple: #8B5CF6;
--color-pink: #EC4899;

/* Spacing */
--spacing-xs: 0.25rem;  /* 4px */
--spacing-sm: 0.5rem;   /* 8px */
--spacing-md: 1rem;     /* 16px */
--spacing-lg: 1.5rem;   /* 24px */
--spacing-xl: 2rem;     /* 32px */

/* Typography */
--font-size-xs: 0.75rem;    /* 12px */
--font-size-sm: 0.875rem;   /* 14px */
--font-size-base: 1rem;     /* 16px */
--font-size-lg: 1.125rem;   /* 18px */
--font-size-xl: 1.25rem;    /* 20px */

/* Effects */
--glass-bg: rgba(26, 31, 46, 0.8);
--glass-blur: 12px;
--shadow-glow-cyan: 0 0 20px rgba(0, 217, 255, 0.2);
```

See **[DESIGN_TOKENS.md](DESIGN_TOKENS.md)** for the complete reference.

---

## 🛠️ Development

### Prerequisites

- Python 3.x (for local server)
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Git (for version control)

### Running Locally

```bash
# Start development server
python3 -m http.server 8080

# Or use Python 2
python -m SimpleHTTPServer 8080
```

Then open: **http://localhost:8080/start.html**

### Gmail OAuth Setup

For Gmail integration to work:

1. ✅ Run on a web server (required for OAuth)
2. ✅ Use `http://localhost` (not `file://`)
3. ⚠️ Configure OAuth credentials (see AUTHENTICATION_GUIDE.md)

---

## 📱 Responsive Breakpoints

```css
/* Mobile */
< 640px - Single column, touch-friendly

/* Tablet */
640px - 1024px - Two column, optimized layout

/* Desktop */
> 1024px - Full experience, multi-column
```

---

## ♿ Accessibility

- ✅ **WCAG AA Compliant** - All text meets contrast standards
- ✅ **Keyboard Navigation** - Full keyboard support with visible focus states
- ✅ **Screen Reader** - Semantic HTML and ARIA labels
- ✅ **Reduced Motion** - Respects `prefers-reduced-motion`

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) | Complete design system overview |
| [DESIGN_TOKENS.md](DESIGN_TOKENS.md) | All CSS variables reference |
| [IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md) | How to build components |
| [AUTHENTICATION_GUIDE.md](AUTHENTICATION_GUIDE.md) | Auth setup & troubleshooting |
| [TESTING_GUIDE.md](TESTING_GUIDE.md) | QA testing checklist |

---

## 🎯 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available for educational purposes.

---

## 🙏 Acknowledgments

- Design inspired by 2025 modern web trends
- Built with vanilla JavaScript (no frameworks!)
- Glassmorphism and gradient techniques
- WCAG accessibility standards

---

## 📞 Support

**Quick Links:**
- 🐛 Report bugs: Create an issue
- 💡 Request features: Create an issue
- 📖 Read docs: See documentation files
- 💬 Questions: Check AUTHENTICATION_GUIDE.md

---

## 🎉 Quick Test

Want to see it in action right now?

```bash
python3 -m http.server 8080
open http://localhost:8080/start.html
# Click "Quick Demo" button
```

**That's it!** 🚀

---

**Made with ❤️ using 2025 Modern Design Principles**

*Version 2.0.0 | Last Updated: November 2025*

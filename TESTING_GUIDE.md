# 🧪 boXpert Mini-Inbox - Visual Testing Guide

## Quick Visual Testing Checklist

### 1. Header Section ✅
- [ ] Background: Cyan-to-Purple gradient visible
- [ ] Shimmer animation: Subtle rotating light effect
- [ ] Text: White, centered, readable
- [ ] Border radius: Smooth rounded corners (16px)

---

### 2. Stats Dashboard ✅
**Test Each Stat Box:**
- [ ] Background: Semi-transparent with blur effect
- [ ] Numbers: Gradient colored (cyan → purple)
- [ ] Labels: Gray uppercase text
- [ ] Hover: Lifts up, cyan glow appears
- [ ] Border: Subtle white/transparent border

**Expected Values:**
- Total Emails: 0 (or your email count)
- Hot Leads: 0 (or your lead count)
- Today: 0 (or today's count)

---

### 3. Filter Tabs ✅
**Test Each Tab:**
- [ ] Default state: Glass background, gray text
- [ ] Hover state: Cyan border, lifts up 2px
- [ ] Active state: Gradient background, white text, cyan glow
- [ ] Click: Switches active state smoothly

**Tabs to test:**
1. 📬 All
2. 🔥 Active
3. ✅ Done

---

### 4. Search Box ✅
- [ ] Background: Glass effect with blur
- [ ] Placeholder: Gray text "🔍 Search emails..."
- [ ] Focus (click inside): Cyan border + glow effect
- [ ] Type text: White text appears
- [ ] Clear button (×): Appears when typing, gradient on hover

---

### 5. Buttons ✅

**Connect Gmail Button:**
- [ ] Background: Cyan-to-Purple gradient
- [ ] Hover: Lifts up 2px, shadow glow
- [ ] Click: Scales down to 98%

**Daily Brief Button:**
- [ ] Background: Purple-to-Pink gradient
- [ ] Hover: Lifts up 2px, purple glow
- [ ] Click: Opens modal

**Refresh Button:**
- [ ] Background: Cyan solid color
- [ ] Text: Dark (for contrast)
- [ ] Hover: Changes to purple, lifts up

---

### 6. Email Cards (if you have emails) ✅
- [ ] Background: Glass effect
- [ ] Left border: 4px gradient bar (appears on hover)
- [ ] Hover: Slides right 8px + lifts up 4px
- [ ] Badge: Purple-pink gradient pill shape
- [ ] Action buttons: Cyan border, fill on hover

---

### 7. Daily Brief Modal ✅
**How to test:** Click "☀️ Daily Brief" button

- [ ] Overlay: Dark with backdrop blur
- [ ] Modal: Glass background, purple border
- [ ] Header: Purple-pink gradient
- [ ] Close button (×): Rotates 90° on hover
- [ ] Content: Dark slate background sections
- [ ] Stat cards: Hover to see purple glow

---

### 8. Responsive Breakpoints 📱

**How to test:**
1. Open browser DevTools (F12)
2. Click "Toggle device toolbar" (Ctrl+Shift+M or Cmd+Shift+M)
3. Test these widths:

**Mobile (375px):**
- [ ] Stats: Stack vertically
- [ ] Buttons: Stack or wrap
- [ ] Padding: Reduced to 16px

**Tablet (768px):**
- [ ] Stats: 2 columns or responsive grid
- [ ] Buttons: Side by side
- [ ] Padding: 24px

**Desktop (1280px):**
- [ ] Stats: 3 columns
- [ ] All elements: Maximum spacing
- [ ] Container: Centered, max-width 1280px

---

### 9. Animations & Performance 🎬

**Hover Animations (should be smooth 60fps):**
- [ ] Stat boxes: 250ms transition
- [ ] Email cards: 250ms transition
- [ ] Buttons: 150ms transition (faster)
- [ ] Filter tabs: 250ms transition

**Entry Animations:**
- [ ] Modal: Fade in + slide up from bottom
- [ ] Email cards: None (loads instantly)

**Shimmer Effect:**
- [ ] Header: Subtle rotating light (8s loop)

---

### 10. Keyboard Navigation ♿

**How to test:** Press Tab key repeatedly

- [ ] Focus outline: 3px cyan border visible
- [ ] Focus glow: Cyan shadow around focused element
- [ ] Tab order: Logical (top to bottom, left to right)
- [ ] Skip to content: Should work for screen readers

**Elements to tab through:**
1. Connect Gmail button
2. Sign Out button (if visible)
3. Daily Brief button
4. Refresh button
5. All filter tab
6. Active filter tab
7. Done filter tab
8. Search input
9. Email cards (if any)

---

### 11. Scrollbar (if page is scrollable) 🎨

**Desktop browsers (Chrome, Edge):**
- [ ] Scrollbar thumb: Cyan-purple gradient
- [ ] Track: Dark charcoal
- [ ] Hover: Changes to purple-pink gradient

**Firefox:**
- [ ] Thin scrollbar
- [ ] Cyan colored thumb

---

### 12. Browser Compatibility 🌐

**Test in these browsers:**
- [ ] Chrome/Edge: Full support (glassmorphism, gradients, etc.)
- [ ] Firefox: Full support
- [ ] Safari: Full support (check -webkit- prefixes)
- [ ] Mobile Safari: Touch interactions smooth
- [ ] Mobile Chrome: Touch interactions smooth

---

### 13. Dark Mode Specific 🌙

The entire design is dark mode:
- [ ] Background: Dark gradient (not pure black)
- [ ] No bright white backgrounds
- [ ] All text readable (white, gray shades)
- [ ] Comfortable for eyes in dark environment

---

### 14. Performance Checks ⚡

**Open DevTools → Performance tab:**
- [ ] Page load: Under 1 second
- [ ] Hover animations: 60fps (no jank)
- [ ] No layout shifts
- [ ] No memory leaks

**Check in DevTools → Console:**
- [ ] No errors
- [ ] No warnings (except Gmail API if not connected)

---

## 🐛 Common Issues & Fixes

### Issue 1: No glass effect visible
**Cause:** Browser doesn't support backdrop-filter
**Fix:** Check in Chrome/Edge/Firefox latest versions

### Issue 2: Gradients not showing
**Cause:** CSS not loaded
**Fix:** Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### Issue 3: Animations choppy
**Cause:** Low-end device or many browser tabs open
**Expected:** Should still work, just slower

### Issue 4: Focus outlines not visible
**Cause:** Using mouse clicks (not keyboard)
**Fix:** Press Tab key to see keyboard focus states

---

## ✅ Pass Criteria

**Your design system is working correctly if:**

1. ✅ All glassmorphism effects visible
2. ✅ Gradients render smoothly
3. ✅ Hover effects are smooth (no jank)
4. ✅ Focus states visible with keyboard
5. ✅ Responsive at all screen sizes
6. ✅ No console errors
7. ✅ Colors are vibrant (cyan, purple, pink)
8. ✅ Text is readable (good contrast)

---

## 📸 Screenshots to Take

**For documentation/reference:**
1. Full page view (desktop)
2. Stats dashboard hover state
3. Filter tabs active state
4. Daily Brief modal open
5. Email card hover state
6. Mobile view (375px width)
7. Tablet view (768px width)

---

## 🎯 Next Steps After Testing

1. ✅ Everything works → Create Pull Request
2. ⚠️ Minor issues → Adjust CSS variables in style.css
3. ❌ Major issues → Report in GitHub issue

---

**Last Updated:** November 2025
**Design System Version:** 1.0.0

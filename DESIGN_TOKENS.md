# boXpert Mini-Inbox - Design Tokens Reference

Complete reference guide for all CSS custom properties (design tokens) used in the boXpert Mini-Inbox design system.

---

## 🎨 Color Tokens

### Primary Colors

```css
--color-cyan: #00D9FF;
--color-purple: #8B5CF6;
--color-pink: #EC4899;
```

**Usage Examples:**
- Primary accent, call-to-action buttons
- Highlights, interactive elements
- Alert indicators, trending badges

---

### Background Colors

```css
--bg-deep-charcoal: #0F1419;
--bg-dark-slate: #1A1F2E;
--bg-lighter-slate: #252D3D;
--bg-subtle-gray: #3A3F4B;
```

**Usage Examples:**
- Body background (deep-charcoal)
- Card backgrounds (dark-slate)
- Modal backgrounds (lighter-slate)
- Borders and dividers (subtle-gray)

---

### Status Colors

```css
--color-success: #10B981;
--color-warning: #F59E0B;
--color-error: #EF4444;
--color-info: #3B82F6;
```

**Usage Examples:**
- Success: Completed emails, approved actions
- Warning: Pending items, attention needed
- Error: Failed actions, destructive operations
- Info: Neutral notifications, information

---

### Text Colors

```css
--text-primary: #FFFFFF;
--text-secondary: #A1A1A1;
--text-tertiary: #6B7280;
```

**Usage Examples:**
- Primary: Main headings, important text
- Secondary: Descriptions, metadata
- Tertiary: Disabled text, placeholders

---

## 📏 Spacing Tokens

```css
--spacing-xs: 0.25rem;   /* 4px */
--spacing-sm: 0.5rem;    /* 8px */
--spacing-md: 1rem;      /* 16px */
--spacing-lg: 1.5rem;    /* 24px */
--spacing-xl: 2rem;      /* 32px */
--spacing-2xl: 3rem;     /* 48px */
--spacing-3xl: 4rem;     /* 64px */
```

**Usage Guide:**

| Token | Pixel Value | Common Uses |
|-------|-------------|-------------|
| `--spacing-xs` | 4px | Icon gaps, badge padding |
| `--spacing-sm` | 8px | Button groups, small gaps |
| `--spacing-md` | 16px | Card padding, standard spacing |
| `--spacing-lg` | 24px | Section spacing, large padding |
| `--spacing-xl` | 32px | Component spacing |
| `--spacing-2xl` | 48px | Major section spacing |
| `--spacing-3xl` | 64px | Page-level spacing |

---

## 🔤 Typography Tokens

### Font Families

```css
--font-family-primary: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
--font-family-mono: "SF Mono", Monaco, "Cascadia Code", monospace;
```

### Font Sizes

```css
--font-size-xs: 0.75rem;      /* 12px */
--font-size-sm: 0.875rem;     /* 14px */
--font-size-base: 1rem;       /* 16px */
--font-size-lg: 1.125rem;     /* 18px */
--font-size-xl: 1.25rem;      /* 20px */
--font-size-2xl: 1.5rem;      /* 24px */
--font-size-3xl: 1.875rem;    /* 30px */
```

**Typography Scale:**

| Token | Rem | Pixels | Usage |
|-------|-----|--------|-------|
| `--font-size-xs` | 0.75rem | 12px | Badges, labels, metadata |
| `--font-size-sm` | 0.875rem | 14px | Secondary text, descriptions |
| `--font-size-base` | 1rem | 16px | Body text, standard content |
| `--font-size-lg` | 1.125rem | 18px | Emphasized text, sender names |
| `--font-size-xl` | 1.25rem | 20px | Subheadings, section titles |
| `--font-size-2xl` | 1.5rem | 24px | Page headings, modal titles |
| `--font-size-3xl` | 1.875rem | 30px | Main page headings, hero text |

### Font Weights

```css
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

**Weight Usage:**
- **Regular (400)**: Body text, descriptions
- **Medium (500)**: Labels, navigation items
- **Semibold (600)**: Button text, emphasized content
- **Bold (700)**: Headings, statistics, numbers

---

## 🎭 Visual Effect Tokens

### Border Radius

```css
--radius-sm: 0.375rem;   /* 6px */
--radius-md: 0.5rem;     /* 8px */
--radius-lg: 0.75rem;    /* 12px */
--radius-xl: 1rem;       /* 16px */
--radius-full: 9999px;   /* Pill-shaped */
```

**Radius Usage:**

| Token | Pixels | Common Uses |
|-------|--------|-------------|
| `--radius-sm` | 6px | Subtle corners, small elements |
| `--radius-md` | 8px | Buttons, inputs, standard elements |
| `--radius-lg` | 12px | Cards, containers |
| `--radius-xl` | 16px | Modals, large components |
| `--radius-full` | 9999px | Pills, badges, circular buttons |

---

### Shadow Tokens

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.6);
--shadow-glow-cyan: 0 0 20px rgba(0, 217, 255, 0.2);
--shadow-glow-purple: 0 0 20px rgba(139, 92, 246, 0.2);
```

**Shadow Hierarchy:**
- **SM**: Subtle elevation (buttons, small cards)
- **MD**: Standard elevation (cards, dropdowns)
- **LG**: Prominent elevation (modals, popovers)
- **XL**: Maximum elevation (modal overlays)
- **Glow Cyan**: Accent glow for cyan elements
- **Glow Purple**: Accent glow for purple elements

---

### Transition Tokens

```css
--transition-fast: 150ms ease-in-out;
--transition-base: 250ms ease-in-out;
--transition-slow: 350ms ease-in-out;
```

**Transition Timing:**
- **Fast (150ms)**: Quick feedback (button hover, focus states)
- **Base (250ms)**: Standard animations (card hover, modal open)
- **Slow (350ms)**: Deliberate animations (page transitions)

---

## 🌈 Gradient Tokens

```css
--gradient-cyan-purple: linear-gradient(135deg, #00D9FF, #8B5CF6);
--gradient-purple-pink: linear-gradient(135deg, #8B5CF6, #EC4899);
--gradient-subtle-bg: linear-gradient(135deg, #0F1419, #1A1F2E);
```

**Gradient Applications:**

| Token | From | To | Usage |
|-------|------|-----|-------|
| `--gradient-cyan-purple` | Cyan | Purple | Primary buttons, headers, accents |
| `--gradient-purple-pink` | Purple | Pink | Secondary buttons, badges |
| `--gradient-subtle-bg` | Deep Charcoal | Dark Slate | Body background |

---

## 💎 Glassmorphism Tokens

```css
--glass-bg: rgba(26, 31, 46, 0.8);
--glass-border: rgba(255, 255, 255, 0.1);
--glass-blur: 12px;
```

**Implementation Pattern:**

```css
.glass-element {
    background: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
    border: 1px solid var(--glass-border);
}
```

**Usage:**
- Card backgrounds
- Modal overlays
- Filter tabs
- Search inputs
- Any element requiring depth perception

---

## 📊 Token Usage Statistics

### Most Used Tokens

1. `--spacing-md` (16px) - Standard spacing
2. `--spacing-lg` (24px) - Component spacing
3. `--color-cyan` - Primary accent color
4. `--text-primary` - Main text color
5. `--glass-bg` - Glassmorphism backgrounds

### Color Distribution

- **Primary Colors**: 3 (Cyan, Purple, Pink)
- **Background Colors**: 4 (Deep Charcoal → Subtle Gray)
- **Status Colors**: 4 (Success, Warning, Error, Info)
- **Text Colors**: 3 (Primary, Secondary, Tertiary)

### Spacing Distribution

- 7 spacing sizes (4px to 64px)
- Scales using powers and multiples for visual harmony
- Rem-based for accessibility and responsive scaling

---

## 🔧 Developer Quick Reference

### Common Patterns

**Card with Glassmorphism:**
```css
.card {
    background: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur));
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
}
```

**Primary Button:**
```css
.btn-primary {
    background: var(--color-cyan);
    color: var(--bg-deep-charcoal);
    padding: var(--spacing-sm) var(--spacing-lg);
    border-radius: var(--radius-md);
    font-weight: var(--font-weight-semibold);
    transition: all var(--transition-fast);
}
```

**Gradient Accent:**
```css
.gradient-text {
    background: var(--gradient-cyan-purple);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}
```

**Focus State:**
```css
.interactive:focus-visible {
    outline: 3px solid var(--color-cyan);
    outline-offset: 2px;
    box-shadow: var(--shadow-glow-cyan);
}
```

---

## 🎨 Token Customization

To customize the design system, modify the `:root` variables in `style.css`:

```css
:root {
    /* Override any token */
    --color-cyan: #YOUR_COLOR;
    --spacing-md: YOUR_VALUE;
}
```

**Best Practices:**
- Maintain contrast ratios for accessibility
- Keep spacing scale proportional
- Test changes across all components
- Document any custom tokens

---

## 📱 Responsive Token Adjustments

Some tokens adjust at different breakpoints:

```css
/* Mobile: Default values */

/* Tablet (640px+) */
@media (min-width: 640px) {
    /* Spacing can increase */
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
    /* Maximum spacing and typography */
}
```

---

## ✅ Token Validation Checklist

- [ ] All colors meet WCAG AA contrast standards
- [ ] Spacing scale maintains visual rhythm
- [ ] Typography scale is legible at all sizes
- [ ] Shadows create clear depth hierarchy
- [ ] Transitions feel responsive (< 350ms)
- [ ] Gradients flow naturally (135deg angle)
- [ ] Glassmorphism is subtle and elegant

---

**Last Updated**: November 2025
**Version**: 1.0.0
**Total Tokens**: 50+

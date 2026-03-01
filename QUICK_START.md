# Quick Start Guide

Get your portfolio up and running in 5 minutes!

## Prerequisites

- Node.js 16.8 or later
- npm or yarn package manager

## Installation

```bash
# Install dependencies (already done if you're reading this)
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## What You'll See

Your portfolio with these sections:
1. **Hero** - Animated introduction with typewriter effect
2. **About** - Personal story and highlights
3. **Skills** - Filterable technical skills
4. **Experience** - Work history timeline
5. **Projects** - Filterable project showcase
6. **Education** - Degrees and certifications
7. **Contact** - Working contact form
8. **Footer** - Links and information

## Immediate Customizations

### 1. Change Your Name (2 minutes)

**File:** `/app/layout.tsx`
```typescript
title: 'Your Name - Your Title'
```

**File:** `/components/portfolio/Hero.tsx`
```typescript
<h1>Hi, I'm <span>Your Name</span></h1>
```

### 2. Update Social Links (1 minute)

**File:** `/components/portfolio/Hero.tsx`
```typescript
// Lines 97-115
<a href="https://github.com/yourhandle">
<a href="https://linkedin.com/in/yourhandle">
<a href="mailto:your@email.com">
```

### 3. Change Colors (1 minute)

**File:** `/app/globals.css`
```css
/* Line 13 - Primary color */
--primary: 221.2 83.2% 53.3%;

/* Lines 29-30 - Gradient */
--gradient-start: 221.2 83.2% 53.3%;
--gradient-end: 262.1 83.3% 57.8%;
```

### 4. Add Your Contact Info (1 minute)

**File:** `/components/portfolio/Contact.tsx`
```typescript
// Email (line 111)
<a href="mailto:your@email.com">your@email.com</a>

// Location (line 140)
<p>Your City, State<br />Country</p>
```

## File Structure

```
project/
├── app/
│   ├── layout.tsx       ← SEO and metadata
│   ├── page.tsx         ← Main page
│   └── globals.css      ← Styles
├── components/
│   └── portfolio/       ← All components here
└── Documentation files
```

## Key Commands

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm start            # Run production build

# Quality
npm run lint         # Run ESLint
npm run typecheck    # Check TypeScript
```

## Common Tasks

### Add a New Skill
**File:** `/components/portfolio/Skills.tsx`
```typescript
const skills = [
  { name: 'New Skill', level: 85, category: 'Frontend' },
  // ...existing skills
];
```

### Add a New Project
**File:** `/components/portfolio/Projects.tsx`
```typescript
const projects = [
  {
    title: 'My New Project',
    description: 'What it does...',
    category: 'Web App',
    technologies: ['React', 'Node.js'],
    github: 'https://github.com/you/project',
    demo: 'https://demo.com',
  },
  // ...existing projects
];
```

### Add Work Experience
**File:** `/components/portfolio/Experience.tsx`
```typescript
const experiences = [
  {
    company: 'Company Name',
    position: 'Your Role',
    period: '2023 - Present',
    location: 'City, State',
    description: 'What you did...',
    achievements: [
      'Achievement 1',
      'Achievement 2',
      'Achievement 3',
    ],
  },
  // ...existing experiences
];
```

## Testing Your Changes

After making changes:

1. **Check the browser** - Changes should appear immediately (hot reload)
2. **Test mobile view** - Use browser DevTools (F12) → Toggle device toolbar
3. **Check all sections** - Scroll through entire page
4. **Test interactions** - Try filters, forms, menu

## Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Click "Deploy"

Done! Your site is live.

### Deploy to Netlify

1. Push code to GitHub
2. Visit [netlify.com](https://netlify.com)
3. Click "Add new site"
4. Select your repository
5. Click "Deploy"

## Troubleshooting

### Port 3000 already in use
```bash
# Find and kill process
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

### Changes not showing
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### Type errors
```bash
# Check for errors
npm run typecheck

# Common fix: restart dev server
# Ctrl+C to stop, then npm run dev
```

### Build fails
```bash
# Clear everything and reinstall
rm -rf .next node_modules
npm install
npm run build
```

## Next Steps

1. ✓ Run development server
2. ✓ View your portfolio
3. → Update your name and info
4. → Change colors to your brand
5. → Add your real content
6. → Test on mobile
7. → Deploy to Vercel/Netlify
8. → Share with the world!

## Need More Help?

- **Detailed docs:** See `PORTFOLIO_README.md`
- **Customization:** See `CUSTOMIZATION_GUIDE.md`
- **Architecture:** See `COMPONENT_SUMMARY.md`

## Pro Tips

1. **Make small changes** - Test after each change
2. **Use Git** - Commit working versions
3. **Test mobile** - Most users are on mobile
4. **Optimize images** - Use WebP format, compress images
5. **Add analytics** - Track your visitors
6. **Update regularly** - Keep content fresh

## Portfolio Checklist

Before going live:
- [ ] Personal information updated
- [ ] Social links working
- [ ] Contact email correct
- [ ] Resume/CV uploaded
- [ ] Colors match your brand
- [ ] All external links work
- [ ] Mobile responsive
- [ ] Form submits correctly
- [ ] No Lorem ipsum text
- [ ] Meta tags updated
- [ ] Favicon added
- [ ] OG image added

## Performance

Current setup is optimized:
- ✓ Server Components by default
- ✓ Minimal JavaScript
- ✓ Responsive images ready
- ✓ Font optimization
- ✓ CSS optimization
- ✓ Code splitting

Expected Lighthouse scores:
- Performance: 90-100
- Accessibility: 90-100
- Best Practices: 90-100
- SEO: 90-100

## Support

If you encounter issues:
1. Check this guide first
2. Review error messages carefully
3. Search the issue online
4. Check Next.js documentation

---

**You're ready to go!** Start the dev server and begin customizing your portfolio.

```bash
npm run dev
```

Then open http://localhost:3000 and make it yours!

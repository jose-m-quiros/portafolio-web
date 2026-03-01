# Next.js 13+ Portfolio with App Router

A modern, fully-featured portfolio website built with Next.js 13+, App Router, TypeScript, and Tailwind CSS. This portfolio showcases a clean architecture with proper separation of Server and Client Components for optimal performance.

## Project Structure

```
project/
├── app/
│   ├── layout.tsx          # Root layout with metadata and SEO
│   ├── page.tsx            # Main page assembling all components
│   └── globals.css         # Global styles and custom CSS
├── components/
│   ├── portfolio/          # Portfolio-specific components
│   │   ├── Navigation.tsx  # Client Component - Mobile menu state
│   │   ├── Hero.tsx        # Client Component - Typewriter animation
│   │   ├── About.tsx       # Server Component - Static content
│   │   ├── Skills.tsx      # Client Component - Category filters
│   │   ├── Experience.tsx  # Server Component - Timeline
│   │   ├── Projects.tsx    # Client Component - Project filters
│   │   ├── Education.tsx   # Server Component - Timeline
│   │   ├── Contact.tsx     # Client Component - Form handling
│   │   ├── Footer.tsx      # Server Component - Static content
│   │   └── index.ts        # Centralized exports
│   └── ui/                 # Shadcn UI components (pre-existing)
└── tailwind.config.ts      # Tailwind configuration
```

## Features

### 1. Navigation Component (Client)
- Sticky header with scroll effect
- Mobile-responsive hamburger menu
- Smooth scroll navigation
- Logo and navigation links

### 2. Hero Section (Client)
- Animated typewriter effect cycling through roles
- Gradient text effects
- Social media links
- CTA buttons (Contact, Download CV)
- Animated background with gradient circles
- Scroll indicator

### 3. About Section (Server)
- Personal introduction
- Highlight cards (Clean Code, Problem Solver, Team Player, Fast Learner)
- Statistics badges
- Grid layout for highlights

### 4. Skills Section (Client)
- Filterable skill categories (All, Frontend, Backend, Database, Tools, Other)
- Animated progress bars
- 20+ skills with proficiency levels
- Responsive grid layout

### 5. Experience Section (Server)
- Timeline layout
- Company details with position, period, location
- Key achievements for each role
- Alternating layout for visual interest

### 6. Projects Section (Client)
- Filterable project categories
- Project cards with hover effects
- Technologies used badges
- GitHub and demo links
- 6 sample projects

### 7. Education Section (Server)
- Academic degrees with timeline
- Achievements and GPA
- Professional certifications with year badges
- Continuous learning section

### 8. Contact Section (Client)
- Working contact form with validation
- Form submission handling
- Success/error states
- Contact information (Email, Location)
- Loading states with animations

### 9. Footer (Server)
- Brand section
- Quick links navigation
- Social media links
- Copyright and attribution
- Privacy and Terms links

## Component Architecture

### Server Components (Default)
- About
- Experience
- Education
- Footer

**Benefits:**
- Zero JavaScript sent to client
- Better SEO
- Faster initial page load
- Can fetch data directly

### Client Components ('use client')
- Navigation (mobile menu state)
- Hero (typewriter animation)
- Skills (filter state)
- Projects (filter state)
- Contact (form state)

**Benefits:**
- Interactive features
- State management
- Browser APIs access
- Event handlers

## Styling

### Tailwind CSS
- Custom color scheme with CSS variables
- Dark mode support (automatic)
- Responsive design (mobile-first)
- Custom utility classes

### Custom CSS Classes
- `.gradient-text` - Blue to purple gradient text
- `.section-container` - Consistent section spacing
- `.card-hover` - Card hover animations
- `.smooth-transition` - Smooth transitions
- `.skill-badge` - Skill tag styling
- `.btn-primary` / `.btn-secondary` - Button styles
- `.form-input` / `.form-textarea` - Form element styles

### Animations
- Fade in animations
- Slide in (left/right)
- Gradient background animation
- Pulse effects
- Custom keyframe animations

## SEO & Metadata

The `layout.tsx` includes comprehensive metadata:
- Title and description
- Open Graph tags for social sharing
- Twitter Card tags
- Robots meta tags
- Google verification
- Multiple fonts (Inter, Poppins)

## Customization Guide

### 1. Personal Information
Update in each component:
- **layout.tsx**: Change name, title, description
- **Hero.tsx**: Update name, roles, social links
- **About.tsx**: Modify bio and highlights
- **Contact.tsx**: Update email and location

### 2. Skills
Edit the `skills` array in **Skills.tsx**:
```typescript
const skills = [
  { name: 'React', level: 95, category: 'Frontend' },
  // Add more skills
];
```

### 3. Experience
Edit the `experiences` array in **Experience.tsx**:
```typescript
const experiences = [
  {
    company: 'Company Name',
    position: 'Your Position',
    period: '2022 - Present',
    // ...
  },
];
```

### 4. Projects
Edit the `projects` array in **Projects.tsx**:
```typescript
const projects = [
  {
    title: 'Project Name',
    description: 'Description',
    category: 'Web App',
    technologies: ['React', 'Node.js'],
    github: 'https://github.com/...',
    demo: 'https://demo.com',
  },
];
```

### 5. Education & Certifications
Edit the arrays in **Education.tsx**:
```typescript
const education = [/* ... */];
const certifications = [/* ... */];
```

### 6. Colors
Modify CSS variables in **globals.css**:
```css
:root {
  --primary: 221.2 83.2% 53.3%; /* Blue */
  --gradient-start: 221.2 83.2% 53.3%;
  --gradient-end: 262.1 83.3% 57.8%; /* Purple */
}
```

### 7. Fonts
Change fonts in **layout.tsx**:
```typescript
import { Inter, Poppins } from 'next/font/google';
```

## Performance Optimizations

1. **Server Components by default** - Reduced JavaScript bundle
2. **Next.js 13+ App Router** - Improved routing and layouts
3. **Font optimization** - Using next/font for font loading
4. **Smooth scroll** - CSS-based smooth scrolling
5. **Lazy loading** - Components loaded as needed
6. **Optimized images** - Using Next.js Image component ready
7. **Responsive design** - Mobile-first approach

## Installation & Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Run development server:**
```bash
npm run dev
```

3. **Build for production:**
```bash
npm run build
npm start
```

## Environment Variables

Create a `.env.local` file for environment-specific variables:
```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

## Deployment

This portfolio is ready to deploy to:
- **Vercel** (Recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- Any platform supporting Next.js

### Vercel Deployment
```bash
vercel --prod
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Accessibility

- Semantic HTML
- ARIA labels
- Keyboard navigation
- Focus indicators
- Color contrast compliance

## Future Enhancements

Consider adding:
1. Blog section with MDX
2. Dark/Light mode toggle
3. Multi-language support
4. Analytics integration
5. Real-time form submission to API
6. CMS integration (Sanity, Contentful)
7. Animation library (Framer Motion)
8. Testing (Jest, React Testing Library)

## License

MIT License - Feel free to use this template for your own portfolio.

## Credits

Built with:
- [Next.js 13+](https://nextjs.org/)
- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [Shadcn UI](https://ui.shadcn.com/)

---

**Note:** Remember to replace all placeholder content (name, email, links, images) with your actual information before deploying.

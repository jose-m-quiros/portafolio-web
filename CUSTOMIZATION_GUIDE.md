# Portfolio Customization Quick Guide

This guide provides step-by-step instructions to customize your portfolio with your personal information.

## Step 1: Update Site Metadata (app/layout.tsx)

```typescript
export const metadata: Metadata = {
  title: 'Your Name - Your Title',
  description: 'Your professional description here...',
  keywords: ['Your', 'Skills', 'Here'],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  openGraph: {
    url: 'https://yourdomain.com',
    title: 'Your Name - Your Title',
    // ...
  },
  twitter: {
    creator: '@yourhandle',
    // ...
  },
};
```

## Step 2: Update Hero Section (components/portfolio/Hero.tsx)

### Change Name and Roles
```typescript
// Line 12-17: Update your roles
const roles = [
  'Your Role 1',
  'Your Role 2',
  'Your Role 3',
  'Your Role 4',
];

// Line 62: Update your name
<h1>Hi, I'm <span className="gradient-text">Your Name</span></h1>

// Line 77: Update your description
<p>Your professional description...</p>
```

### Update Links
```typescript
// Line 85: Contact link
<Link href="#contact">Get in Touch</Link>

// Line 90: Resume download
<a href="/your-resume.pdf" download>Download CV</a>

// Line 97-115: Social media links
<a href="https://github.com/yourhandle">GitHub</a>
<a href="https://linkedin.com/in/yourhandle">LinkedIn</a>
<a href="mailto:your@email.com">Email</a>
```

## Step 3: Update About Section (components/portfolio/About.tsx)

### Personal Description
```typescript
// Lines 39-55: Update your bio
<p>Your experience and background...</p>
<p>Your journey in tech...</p>
<p>Your interests...</p>
```

### Statistics
```typescript
// Lines 58-68: Update your stats
<div>X+ Years Experience</div>
<div>X+ Projects Completed</div>
<div>X+ Happy Clients</div>
```

## Step 4: Update Skills (components/portfolio/Skills.tsx)

### Add/Remove/Modify Skills
```typescript
// Lines 8-31: Update skills array
const skills = [
  { name: 'Your Skill', level: 90, category: 'Category' },
  // Add more skills...
];
```

### Categories
```typescript
// Line 5: Update categories
const categories = ['All', 'Category1', 'Category2', ...];
```

## Step 5: Update Experience (components/portfolio/Experience.tsx)

```typescript
// Lines 4-50: Replace with your experience
const experiences = [
  {
    company: 'Your Company',
    position: 'Your Position',
    period: 'Start - End or Present',
    location: 'City, State',
    description: 'What you did...',
    achievements: [
      'Achievement 1',
      'Achievement 2',
      'Achievement 3',
    ],
  },
  // Add more experiences...
];
```

## Step 6: Update Projects (components/portfolio/Projects.tsx)

```typescript
// Lines 8-78: Replace with your projects
const projects = [
  {
    title: 'Project Name',
    description: 'Project description...',
    image: '/projects/project-image.jpg', // Optional
    category: 'Category',
    technologies: ['Tech1', 'Tech2', 'Tech3'],
    github: 'https://github.com/you/project',
    demo: 'https://project-demo.com',
  },
  // Add more projects...
];
```

**Note:** Currently using placeholder images. To add real images:
1. Place images in `/public/projects/` folder
2. Update `image` paths in projects array
3. Or keep the gradient placeholders with first letter

## Step 7: Update Education (components/portfolio/Education.tsx)

### Degrees
```typescript
// Lines 4-34: Update education
const education = [
  {
    degree: 'Your Degree',
    school: 'Your School',
    period: 'Start - End',
    location: 'City, State',
    description: 'What you studied...',
    achievements: [
      'GPA: X.X/4.0',
      'Honor 1',
      'Honor 2',
    ],
  },
  // Add more degrees...
];
```

### Certifications
```typescript
// Lines 36-56: Update certifications
const certifications = [
  {
    name: 'Certification Name',
    issuer: 'Issuing Organization',
    year: '2024',
  },
  // Add more certifications...
];
```

## Step 8: Update Contact (components/portfolio/Contact.tsx)

### Contact Information
```typescript
// Lines 110-115: Email
<a href="mailto:your@email.com">your@email.com</a>

// Lines 138-145: Location
<p>Your City, State<br />Country</p>
```

### Form Submission
Currently simulated. To implement real submission:
```typescript
// Line 36-40: Replace with your API call
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
});
```

## Step 9: Update Footer (components/portfolio/Footer.tsx)

### Personal Information
```typescript
// Line 47: Brand name
<Link href="#home">Your Name</Link>

// Lines 50-52: Description
<p>Your tagline or description...</p>

// Lines 78-84: Social media
const navigation = {
  social: [
    { name: 'GitHub', href: 'https://github.com/you', icon: Github },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/you', icon: Linkedin },
    // ...
  ],
};

// Lines 92-96: Contact email
<a href="mailto:your@email.com">your@email.com</a>
```

## Step 10: Color Scheme (app/globals.css)

### Primary Colors
```css
/* Lines 13-14: Change blue to your brand color */
--primary: 221.2 83.2% 53.3%;  /* HSL format */

/* Lines 29-30: Gradient colors */
--gradient-start: 221.2 83.2% 53.3%;  /* Blue */
--gradient-end: 262.1 83.3% 57.8%;    /* Purple */
```

### Pre-made Color Schemes

**Professional Blue/Purple** (Default)
```css
--primary: 221.2 83.2% 53.3%;
--gradient-end: 262.1 83.3% 57.8%;
```

**Tech Green**
```css
--primary: 142 76% 36%;
--gradient-end: 158 64% 52%;
```

**Creative Orange**
```css
--primary: 24 95% 53%;
--gradient-end: 45 93% 58%;
```

**Elegant Purple**
```css
--primary: 271 91% 65%;
--gradient-end: 300 77% 61%;
```

## Step 11: Typography (app/layout.tsx)

Change fonts:
```typescript
import { YourFont1, YourFont2 } from 'next/font/google';

const font1 = YourFont1({
  subsets: ['latin'],
  variable: '--font-sans',
});

const font2 = YourFont2({
  subsets: ['latin'],
  variable: '--font-heading',
});
```

Popular combinations:
- **Modern:** Inter + Poppins (default)
- **Professional:** Roboto + Montserrat
- **Creative:** Raleway + Lato
- **Elegant:** Playfair Display + Source Sans Pro

## Step 12: Resume/CV

1. Place your resume PDF in `/public/` folder
2. Name it `resume.pdf` or update Hero.tsx line 90:
   ```typescript
   <a href="/your-resume-name.pdf" download>
   ```

## Step 13: Favicon and Images

1. Add favicon to `/public/favicon.ico`
2. Add og-image to `/public/og-image.png` (1200x630px)
3. Update layout.tsx metadata if using different filenames

## Testing Your Changes

1. **Run development server:**
   ```bash
   npm run dev
   ```

2. **Open in browser:**
   ```
   http://localhost:3000
   ```

3. **Check all sections:**
   - ✓ Navigation works
   - ✓ All links function
   - ✓ Forms work
   - ✓ Animations play
   - ✓ Mobile responsive

4. **Build for production:**
   ```bash
   npm run build
   ```

## Common Issues

### Typewriter effect not working
- Check Hero.tsx roles array is not empty
- Ensure component is marked with 'use client'

### Form not submitting
- Check Contact.tsx handleSubmit function
- Implement your API endpoint

### Colors not changing
- Clear browser cache
- Check CSS variable format (HSL without commas)

### Fonts not loading
- Verify font names are correct
- Check Google Fonts availability

## Next Steps

After customization:
1. Test on multiple devices
2. Check accessibility
3. Run Lighthouse audit
4. Deploy to hosting platform
5. Update social media links
6. Share your portfolio!

## Need Help?

- Check PORTFOLIO_README.md for detailed documentation
- Review component files for inline comments
- Test one section at a time
- Use browser DevTools for debugging

---

Remember: Make incremental changes and test frequently!

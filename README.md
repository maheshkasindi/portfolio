# Portfolio Website

A beautiful, minimal, and clean portfolio website with smooth animations and modern design.

## 🚀 Quick Start

Simply open `index.html` in your web browser to view the website.

## ✏️ Customization Guide

### 1. Personal Information
Update these in `index.html`:
- **Line 7**: Change page title
- **Line 16**: Update logo text
- **Line 32-33**: Replace "Your Name" with your actual name
- **Line 34**: Update your tagline/subtitle
- **Lines 49-61**: Add your about me text
- **Footer (Line 235)**: Update copyright with your name

### 2. Projects
Each project is in a `.project-card` div (starting around line 77):
- Update project titles, descriptions, and tags
- Change the `href="#"` to link to your actual projects
- You can add more projects by duplicating the `.project-card` structure

### 3. Skills
Update skill names and percentages in the skills section (starting around line 129):
- Change `data-progress="95"` to your desired percentage (0-100)
- Add or remove skills by copying the `.skill-item` structure
- Organize skills into different categories

### 4. Profile Photo
Replace the placeholder:
- Add your photo to the portfolio folder
- In `index.html` line 65, replace:
  ```html
  <div class="image-placeholder">
      <span>Your Photo</span>
  </div>
  ```
  With:
  ```html
  <img src="your-photo.jpg" alt="Your Name" style="width: 100%; height: 100%; object-fit: cover; border-radius: 20px;">
  ```

### 5. Social Links
Update social media links in the footer (around line 240):
- Replace `href="#"` with your actual social media URLs
- GitHub, LinkedIn, and Twitter links are included

### 6. Colors
Customize colors in `styles.css` (lines 9-16):
```css
:root {
    --primary-color: #2563eb;    /* Main blue color */
    --secondary-color: #1e40af;  /* Darker blue */
    --text-dark: #1f2937;        /* Dark text */
    --text-light: #6b7280;       /* Light text */
}
```

### 7. Contact Form
The form currently logs to console. To make it functional:
- Connect to a backend service (like Formspree, EmailJS, or your own server)
- Update the form submission handler in `script.js` (line 56)

## 📱 Responsive Design

The website is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🎨 Features

- Smooth scroll navigation
- Animated skill progress bars
- Parallax effects on hero section
- Hover animations on projects and buttons
- Intersection Observer for scroll animations
- Active navigation highlighting

## 📝 Tips

- Use high-quality images for projects and profile photo
- Keep project descriptions concise (2-3 sentences)
- Choose 3-5 of your best projects to showcase
- Update skill percentages honestly
- Test on different devices and browsers

## 🔧 Advanced Customization

- Add more sections by copying existing section structures
- Modify animations in `script.js`
- Add your own CSS animations in `styles.css`
- Integrate analytics (Google Analytics, etc.)
- Add a blog section if desired

## 📦 Deployment

Deploy your portfolio to:
- **GitHub Pages**: Free hosting for static sites
- **Netlify**: Drag and drop deployment
- **Vercel**: One-click deployment
- **Your own server**: Upload via FTP/SSH

---

Built with HTML, CSS, and vanilla JavaScript. No frameworks required!

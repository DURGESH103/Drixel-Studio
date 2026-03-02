# 🚀 Quick Start Guide

## Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to `http://localhost:3000`

## 🎨 Customization Guide

### Update Brand Name
- Edit `src/components/Navigation.jsx` - Change "Drixel" to your name
- Edit `index.html` - Update title and meta tags

### Add Your Projects
- Edit `src/components/WorkGrid.jsx` - Update the `projects` array
- Edit `src/components/LandingShowcase.jsx` - Update `landingPages` array
- Edit `src/components/BrandingShowcase.jsx` - Update `brandingProjects` array

### Change Colors
- Edit `tailwind.config.js` - Modify the color palette
- Edit `src/styles/index.css` - Update gradient definitions

### Update Content
- **Hero Section**: `src/components/Hero.jsx`
- **Footer**: `src/components/Footer.jsx`
- **Navigation Links**: `src/components/Navigation.jsx`

## 📸 Adding Your Images

Replace the Unsplash placeholder URLs with your own images:
- Project thumbnails in `WorkGrid.jsx`
- Landing page previews in `LandingShowcase.jsx`
- Store images in `public/images/` folder

## 🎬 Animation Settings

### Disable Custom Cursor (Optional)
Remove `<CustomCursor />` from `src/App.jsx`

### Adjust Scroll Speed
Edit `src/App.jsx` - Modify Lenis `duration` parameter

### Reduce Motion for Performance
Edit individual component animation `duration` and `delay` values

## 🌐 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm i -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Drag and drop the 'dist' folder to Netlify
```

## 💡 Tips

- Use high-quality images (WebP format recommended)
- Keep animations subtle on mobile
- Test on multiple devices
- Optimize images before uploading
- Use lazy loading for better performance

## 🐛 Troubleshooting

**Issue**: Animations not working
- Check browser console for errors
- Ensure all dependencies are installed

**Issue**: Slow performance
- Reduce number of animated elements
- Optimize image sizes
- Disable custom cursor on mobile

**Issue**: Horizontal scroll not working
- Check GSAP ScrollTrigger is properly registered
- Verify container dimensions

## 📞 Support

For issues or questions, check the documentation:
- [Framer Motion Docs](https://www.framer.com/motion/)
- [GSAP Docs](https://greensock.com/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

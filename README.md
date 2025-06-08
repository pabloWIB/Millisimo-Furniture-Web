![image](https://github.com/pabloDYEL/ESTATICA-31/assets/116923433/884f6f03-4d8b-4bb8-8480-7aa61e854517)

# Nevada

A minimalist industrial furniture showcase website featuring modern chair collections and design inspiration. Built with clean animations and contemporary styling to highlight industrial-style furniture pieces with wooden and metal elements.

## Tech Stack

- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with animations and responsive design
- **Vanilla JavaScript** - Interactive elements and smooth animations
- **Static Hosting** - No server-side dependencies required

## Features

- Modern industrial furniture collections showcase
- Minimalist design with smooth animations
- Responsive layout for all device sizes
- Professional photography gallery integration
- Clean typography and contemporary styling
- Industrial design inspiration content
- Chair collection presentations with detailed imagery
- Mobile-optimized user experience

## Project Structure

```
nevada/
├── index.html              # Main homepage
├── css/
│   ├── style.css          # Main stylesheet
│   ├── animations.css     # Animation definitions
│   └── responsive.css     # Mobile responsiveness
├── js/
│   ├── main.js           # Core functionality
│   ├── animations.js     # Animation controls
│   └── gallery.js        # Image gallery features
├── images/
│   ├── furniture/        # Product photography
│   ├── collections/      # Collection images
│   └── inspiration/      # Design inspiration photos
├── assets/
│   ├── fonts/           # Custom typography
│   └── icons/           # UI elements
└── README.md
```

## Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server for development (optional but recommended)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/pabloWIB/Nevada.git
   cd Nevada
   ```

2. **Start local development server**
   ```bash
   # Using Node.js (if available)
   npx serve .
   
   # Using PHP (if available)
   php -S localhost:8000
   
   # Or simply open index.html in your browser
   open index.html
   ```

3. **View in browser**
   Navigate to `http://localhost:8000` or open `index.html` directly

### File Modifications

- Edit `index.html` for content changes
- Modify `css/style.css` for styling adjustments
- Update `js/main.js` for functionality changes
- Replace images in respective folders for new content

## Deployment

### Static Hosting Platforms

**Netlify**
1. Connect your GitHub repository
2. Deploy automatically on push
3. Custom domain support available

**Vercel**
1. Import project from GitHub
2. Zero-configuration deployment
3. Instant global CDN

**GitHub Pages**
1. Enable Pages in repository settings
2. Select source branch (main/gh-pages)
3. Access via username.github.io/Nevada

**Alternative Platforms**
- Firebase Hosting
- Surge.sh
- Cloudflare Pages

### Manual Deployment
Upload all files to your web hosting provider's public directory via FTP/SFTP.

## Customization

### Content Updates
- **Product Information**: Edit furniture descriptions in `index.html`
- **Collections**: Update collection data in the HTML structure
- **Photography**: Replace images in `/images/` directories
- **Company Details**: Modify branding information throughout

### Styling Changes
- **Colors**: Update CSS custom properties in `:root` selector
- **Typography**: Modify font families and sizes in `css/style.css`
- **Layout**: Adjust grid systems and spacing variables
- **Animations**: Customize timing and effects in `css/animations.css`

### Adding New Sections
1. Create HTML structure in `index.html`
2. Add corresponding styles in CSS files
3. Implement interactive features in JavaScript files
4. Test responsiveness across devices

### Performance Optimization
- Compress images before adding to the project
- Minify CSS and JavaScript files for production
- Optimize font loading and fallbacks
- Consider lazy loading for large image galleries

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

Modern CSS features used include CSS Grid, Flexbox, and CSS Custom Properties. Fallbacks provided for older browsers where necessary.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

### Development Guidelines
- Maintain semantic HTML structure
- Follow CSS naming conventions (BEM methodology preferred)
- Keep JavaScript modular and well-commented
- Test across multiple browsers and devices
- Optimize images and assets before committing

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Nevada** - Industrial furniture showcase with modern design and professional presentation. Built for furniture designers, interior stylists, and design enthusiasts.

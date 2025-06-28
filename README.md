# Tech Bite - Blog Site

A modern, responsive blog platform built with Node.js, Express, and EJS templating engine. Features a beautiful UI with full CRUD operations, comment system, and social sharing capabilities.

## 🚀 Features

### ✨ Core Functionality
- **Full CRUD Operations**: Create, Read, Update, Delete blog posts
- **Comment System**: Users can leave comments on posts
- **Image Upload**: Support for blog post images with Multer
- **Responsive Design**: Mobile-first approach with Bootstrap 5
- **Social Sharing**: Share posts on Facebook, Twitter, and LinkedIn

### 🎨 User Interface
- **Modern Design**: Clean, professional layout with gradient backgrounds
- **Hero Section**: Eye-catching homepage with call-to-action
- **Card Layout**: Beautiful post cards with hover effects
- **Breadcrumb Navigation**: Easy navigation throughout the site
- **Success Modals**: User feedback for all actions (create, update, delete)

### 📱 Responsive Features
- **Mobile-First**: Optimized for all device sizes
- **Flexible Grid**: Bootstrap grid system for perfect layouts
- **Touch-Friendly**: Optimized buttons and interactions
- **Adaptive Typography**: Readable text on all screens

### 🔧 Technical Features
- **Server-Side Rendering**: EJS templating for dynamic content
- **File Upload**: Image handling with validation
- **Session Management**: URL-based state management
- **Error Handling**: Proper 404 and error responses

## 📁 Project Structure

```
Blog site/
├── index.js                 # Main server file
├── package.json            # Dependencies and scripts
├── README.md              # This file
├── views/                 # EJS templates
│   ├── home.ejs          # Homepage template
│   ├── post.ejs          # Individual post template
│   ├── create.ejs        # Create post form
│   ├── edit.ejs          # Edit post form
│   └── partials/         # Reusable template parts
│       ├── header.ejs    # Site header with navigation
│       └── footer.ejs    # Site footer with social links
└── public/               # Static assets
    ├── CSS/
    │   └── styles.css    # Custom styles
    ├── images/           # Site images
    │   ├── blog images/  # Blog post images
    │   ├── Tech-Byte-logo2.png
    │   └── tech-bg-img7.jpg
    └── uploads/          # User uploaded images
```

## 🛠️ Technologies Used

- **Backend**: Node.js, Express.js
- **Template Engine**: EJS (Embedded JavaScript)
- **Frontend**: HTML5, CSS3, JavaScript
- **CSS Framework**: Bootstrap 5.3.7
- **Icons**: Bootstrap Icons 1.11.3
- **File Upload**: Multer
- **Styling**: Custom CSS with CSS Variables

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Blog site"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   node index.js
   ```

4. **Access the application**
   - Open your browser and navigate to `http://localhost:3000`
   - The application will run on port 3000 by default
   - For production, set the `PORT` environment variable

## 🎯 Usage Guide

### Creating a Blog Post
1. Click "Create Blog" on the homepage
2. Fill in the form with:
   - Title
   - Author name
   - Category (with predefined options)
   - Content
   - Optional image upload
3. Click "Create Post"
4. Success message will appear with option to view the post

### Managing Posts
- **View Post**: Click "Read More" on any post card
- **Edit Post**: Click "Edit Post" button on individual post pages
- **Delete Post**: Click "Delete Post" button and confirm in modal
- **Leave Comments**: Use the comment form on post pages

### Features Overview

#### Homepage
- Hero section with site branding
- Grid layout of all blog posts
- Success alerts for post creation
- Delete confirmation modals

#### Individual Post Pages
- Full post content with featured image
- Author information and metadata
- Social sharing buttons
- Comment section with form
- Edit and delete buttons
- Recent posts sidebar

#### Create/Edit Forms
- Pre-filled forms for editing
- Image upload with preview
- Category selection with datalist
- Form validation

## 🎨 Design Features

### Color Scheme
- **Primary**: Bootstrap blue (#0d6efd)
- **Background**: Light gray (#F5F5F5)
- **Text**: Dark gray (#333333)
- **Accent**: Blue gradient backgrounds

### Typography
- **Font Family**: Inter, system fonts
- **Responsive**: Scales appropriately on all devices
- **Readable**: Optimized line heights and spacing

### Interactive Elements
- **Hover Effects**: Buttons and cards have smooth transitions
- **Modals**: Bootstrap modals for confirmations and feedback
- **Animations**: Subtle animations for better UX

## 🔧 Configuration

### Environment Variables
- `PORT`: Server port (default: 3000)

### File Upload Settings
- **Destination**: `public/uploads/`
- **Accepted Formats**: PNG, JPG, JPEG, WebP
- **File Size**: No explicit limit (handled by Multer defaults)

### Static Posts
The application includes 3 pre-configured static posts:
1. "Understanding AI in Everyday Life" (Emerging Trends)
2. "The Rise of Smart Homes" (Tech Tips & Hacks)
3. "Gadgets for Small Businesses" (Product Reviews)

## 🚀 Deployment

### Local Development
```bash
npm install
node index.js
```

### Production Deployment
1. Set environment variables
2. Install dependencies: `npm install --production`
3. Start server: `node index.js`
4. Use process manager like PM2 for production

### Environment Variables
```bash
PORT=3000  # Optional: defaults to 3000
```

## 📝 API Endpoints

### GET Routes
- `/` - Homepage with all posts
- `/create` - Create new post form
- `/post/:id` - Individual post page
- `/post/:id/edit` - Edit post form

### POST Routes
- `/create` - Create new post
- `/post/:id/update` - Update existing post
- `/post/:id/delete` - Delete post
- `/post/:id/comment` - Add comment to post

## 🔒 Security Considerations

- **File Upload**: Basic file type validation
- **Input Validation**: Form validation on client and server
- **XSS Protection**: EJS auto-escapes content
- **CSRF**: Consider adding CSRF protection for production

## 🐛 Known Issues

- Static posts cannot be edited/deleted (by design)
- No user authentication system
- Comments are stored in memory (not persistent)
- No database integration (data resets on server restart)

## 🔮 Future Enhancements

- [ ] User authentication and authorization
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Rich text editor for post content
- [ ] Image optimization and compression
- [ ] Search functionality
- [ ] Categories and tags system
- [ ] User profiles and avatars
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] API endpoints for mobile apps

## 👨‍💻 Author

**EversonTheDev**
- GitHub: [@EversonTheDev](https://github.com/EversonTheDev)
- LinkedIn: [Emmanuel Everson](https://www.linkedin.com/in/emmanuel-everson-4606b3344/)
- Twitter: [@EversonTheDev](https://x.com/EversonTheDev)
- Facebook: [EversonTheDev](https://www.facebook.com/share/16UZpMTEey/)
- Instagram: [@eversonthedev](https://www.instagram.com/eversonthedev?igsh=MXhnZW0wOHJodTdtbA==)

## 📄 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Contact the author through social media links above

---

**Tech Bite** - Quick, insightful posts about emerging tech trends, gadgets, and tips for Nigerian enthusiasts and small businesses.
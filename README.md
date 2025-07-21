# Southwave Official Website

A modern, responsive artist website built with Next.js, featuring music streaming integration, e-commerce functionality, and concert listings.

## Features

### 🎵 Music Integration
- Spotify API integration for displaying tracks and albums
- Apple Music support ready
- Interactive music player with preview functionality
- Upcoming releases section

### 🛒 E-commerce
- Stripe payment integration for merchandise
- Shopping cart functionality
- Product catalog with variants (sizes, colors)
- Order processing and confirmation

### 🎤 Concert Listings
- Upcoming and past concert listings
- Ticket purchasing integration
- Festival and venue information
- Newsletter signup for tour updates

### 🎨 Modern Design
- Responsive design optimized for all devices
- Smooth animations with Framer Motion
- Dark theme with gradient backgrounds
- Interactive UI components

### 🔍 SEO Optimized
- Meta tags and Open Graph optimization
- Structured data (JSON-LD) for search engines
- Sitemap generation
- Performance optimized

## Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Payments**: Stripe
- **Music API**: Spotify Web API
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Stripe account for payments
- Spotify Developer account for music integration

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/southwave-website.git
cd southwave-website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:

Copy `.env.local` and update with your credentials:

```env
# Stripe Configuration
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here

# Spotify API Configuration
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
ARTIST_NAME="Southwave"
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## API Setup

### Spotify Integration

1. Create a Spotify Developer account at [developer.spotify.com](https://developer.spotify.com)
2. Create a new app and get your Client ID and Secret
3. Add the credentials to your `.env.local` file

### Stripe Integration

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your test/live API keys from the Stripe Dashboard
3. Add the keys to your `.env.local` file
4. Configure webhooks for order processing (optional)

## Customization

### Artist Information
Update artist details in:
- `/app/layout.tsx` - SEO metadata
- `/app/page.tsx` - Homepage content
- `/components/Navbar.tsx` - Navigation branding

### Products
Modify the merchandise catalog in:
- `/app/merch/page.tsx` - Product listings
- Add product images to `/public/images/`

### Concerts
Update concert listings in:
- `/app/concerts/page.tsx` - Event data
- Add venue images to `/public/images/`

### Styling
Customize the design in:
- `/tailwind.config.js` - Theme colors and styling
- `/app/globals.css` - Global styles and custom CSS

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Other Platforms

The site can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- Digital Ocean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For questions or support, please open an issue on GitHub or contact [your-email@example.com](mailto:your-email@example.com).
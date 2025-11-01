# Eubiosis — Nature in a Bottle

A premium 3-page responsive website for Eubiosis, a natural honey-based probiotic supplement that restores gut balance and promotes whole-body wellness.

## 🌟 Features

### Pages
- **Home (/)** - Information page with product benefits, ingredients, testimonials
- **Shop (/shop)** - Product detail page with pricing options and tabbed content
- **Funnel (/funnel)** - Discount capture and upsell page with email collection

### Design System
- **Fonts**: Futura Std (fallback to system fonts)
- **Colors**:
  - Background: #FFFFFF
  - Text: #222222
  - Accent: #4AAE9B (teal green)
  - Secondary: #F1C56B (soft honey gold)
  - Border: #D9D9D9
- **No gradients** - Flat, modern design
- **Border radius**: 11px max
- **Fully responsive** - Mobile-first approach

### Components
- Fixed bottom navigation bar
- Hero banner with CTA buttons
- Interactive pricing table
- Tabbed content sections
- Multi-step funnel flow
- Trust badges and icons

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
eubiosis/
├── app/
│   ├── page.tsx           # Home/Information page
│   ├── shop/
│   │   └── page.tsx       # Product detail page
│   ├── funnel/
│   │   └── page.tsx       # Discount & upsell page
│   ├── layout.tsx         # Root layout with navigation
│   └── globals.css        # Global styles & design system
├── components/
│   └── BottomNav.tsx      # Fixed bottom navigation
├── public/                # Static assets (add product images here)
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## 🎨 Design Guidelines

### Typography
- Headings: Futura Std Medium Condensed (font-weight: 500)
- Body: Futura Std Light Condensed (font-weight: 300)
- Line height: 1.4
- Letter spacing: +1%

### Buttons
- Flat white or teal background
- 1px solid #222222 border
- 11px border radius
- Hover: darker text or teal outline

### Navigation
- Fixed bottom bar (60px height)
- Active state: teal text + teal border
- Visible on all pages

## 🔧 Customization

### Adding Product Images
Replace the emoji placeholders in the code with actual product images:
1. Add images to `/public/images/`
2. Update image references in page components

### Email Integration
The funnel page includes placeholder code for email capture. To integrate:
- **Supabase**: Add Supabase client and save to database
- **Brevo**: Use Brevo API to add contacts to mailing list

Example integration point in `/app/funnel/page.tsx`:
```typescript
const handleEmailSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  if (email) {
    // TODO: Save to Supabase/Brevo
    console.log('Email saved:', email)
  }
}
```

### Payment Integration
Add payment processing in the funnel completion step:
- Stripe
- PayPal
- PayFast (South African payment gateway)

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

All layouts use Tailwind's responsive utilities (sm:, md:, lg:, xl:)

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 License

This project is created for Eubiosis. All rights reserved.

## 🤝 Contributing

This is a client project. For modifications, please contact the project owner.

## 📞 Support

For technical support or questions, please contact the development team.

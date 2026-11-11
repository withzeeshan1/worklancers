// Demo content layer. Shapes mirror the planned REST API so it can be swapped for Axios calls.
export const services = [
  { slug: 'web-development', image: '/images/code-closeup.jpg', title: 'Web Development', icon: 'Code2',
    description: 'Fast, secure and scalable websites and web applications built around your business goals.',
    subs: ['WordPress Development', 'MERN Stack Development', 'Custom Website Development', 'E-commerce Website Development', 'Web Applications'],
    features: ['Responsive, mobile-first builds', 'SEO-ready code structure', 'Secure authentication and APIs', 'Admin panels and CMS'],
    benefits: ['A site that loads fast and converts', 'Easy to manage without developers', 'Built to scale as you grow'] },
  { slug: 'mobile-app-development', image: '/images/mobile.jpg', title: 'Mobile App Development', icon: 'Smartphone',
    description: 'Native and cross-platform mobile apps that feel smooth and keep users engaged.',
    subs: ['Android Development', 'iOS Development', 'React Native Development'],
    features: ['Single codebase with React Native', 'Clean, intuitive interfaces', 'API and backend integration', 'Store release support'],
    benefits: ['Reach users on both platforms', 'Lower cost with shared code', 'Reliable performance'] },
  { slug: 'graphic-design-branding', image: '/images/design.jpg', title: 'Graphic Design & Branding', icon: 'Palette',
    description: 'Visual identities and interfaces that make your brand memorable and trusted.',
    subs: ['Logo Design', 'Brand Identity', 'UI/UX Design', 'Social Media Graphics'],
    features: ['Logo and brand guidelines', 'Wireframes and prototypes', 'Consistent social media kits', 'Print and digital assets'],
    benefits: ['A consistent professional image', 'Better user experience', 'Stronger brand recall'] },
  { slug: 'digital-marketing-seo', image: '/images/analytics.jpg', title: 'Digital Marketing & SEO', icon: 'Megaphone',
    description: 'Data-driven marketing that brings the right visitors to your website.',
    subs: ['Search Engine Optimization', 'Social Media Marketing', 'Google Ads', 'Content Marketing'],
    features: ['Keyword research and on-page SEO', 'Campaign setup and tracking', 'Content planning', 'Monthly reporting'],
    benefits: ['More qualified traffic', 'Measurable campaign results', 'Long-term organic growth'] },
  { slug: 'ecommerce-solutions', image: '/images/ecommerce.jpg', title: 'E-commerce Solutions', icon: 'ShoppingCart',
    description: 'Online stores designed to showcase products and make buying simple.',
    subs: ['Shopify Development', 'WooCommerce Development', 'Online Store Development'],
    features: ['Product and inventory setup', 'Payment gateway integration', 'Checkout optimization', 'Store customization'],
    benefits: ['Sell around the clock', 'Smooth buying experience', 'Easy store management'] },
  { slug: 'ai-automation', image: '/images/ai.jpg', title: 'AI & Automation', icon: 'Bot',
    description: 'Practical AI tools and automation that save time and reduce manual work.',
    subs: ['AI Chatbots', 'AI Agents', 'Business Automation', 'AI-powered Solutions'],
    features: ['Chatbots for support and lead capture', 'Workflow automation', 'Custom AI integrations', 'Process analysis'],
    benefits: ['Less repetitive work', 'Faster response to customers', 'Smarter operations'] },
];

// Faded background photos (Unsplash licence) in public/images. Replace with real screenshots of your work.
const projectImages = {
  'demo-agency-landing': '/images/code-laptop.jpg',
  'demo-mern-dashboard': '/images/analytics.jpg',
  'demo-fitness-app': '/images/mobile.jpg',
  'demo-brand-identity': '/images/design.jpg',
  'demo-online-store': '/images/ecommerce.jpg',
  'demo-support-chatbot': '/images/ai.jpg',
};

export const projects = [
  { slug: 'demo-agency-landing', title: 'Agency Landing Page', category: 'Web Development', technologies: ['React', 'Tailwind CSS', 'Framer Motion'], description: 'A demo marketing site showing a conversion-focused layout with animated sections.' },
  { slug: 'demo-mern-dashboard', title: 'Business Dashboard', category: 'Web Development', technologies: ['MongoDB', 'Express', 'React', 'Node.js'], description: 'A demo MERN admin dashboard with authentication, charts and CRUD tables.' },
  { slug: 'demo-fitness-app', title: 'Fitness Tracker App', category: 'Mobile Apps', technologies: ['React Native', 'Node.js'], description: 'A demo mobile app concept for workout logging and progress tracking.' },
  { slug: 'demo-brand-identity', title: 'Brand Identity Kit', category: 'Branding', technologies: ['Figma', 'Illustrator'], description: 'A demo brand package: logo variations, colour palette and typography guide.' },
  { slug: 'demo-online-store', title: 'Online Store Template', category: 'E-commerce', technologies: ['Shopify', 'Liquid'], description: 'A demo storefront showing product pages, cart and a simple checkout flow.' },
  { slug: 'demo-support-chatbot', title: 'Support Chatbot', category: 'AI & Automation', technologies: ['Node.js', 'LLM API'], description: 'A demo AI chatbot concept that answers common customer questions.' },
].map((p, i) => ({ ...p, image: projectImages[p.slug], isDemo: true, liveUrl: '', isFeatured: i < 3 }));

export const posts = [
  { slug: 'how-to-choose-a-web-development-agency', title: 'How to Choose a Web Development Agency', category: 'Web Development', author: 'Worklancers Team', publishedAt: '2026-10-12',
    excerpt: 'A short checklist to compare agencies on process, communication and technical fit before you sign.',
    content: ['Start with your goal, not the technology. Know whether you need leads, sales or an internal tool.', 'Ask to see the process: how requirements are gathered, how progress is shared and how changes are handled.', 'Check that the agency explains trade-offs clearly. Good teams say what they would not build as well as what they would.', 'Finally, agree on what happens after launch: hosting, fixes and support.'] },
  { slug: 'seo-basics-for-new-websites', title: 'SEO Basics for a New Website', category: 'SEO', author: 'Worklancers Team', publishedAt: '2026-10-20',
    excerpt: 'The first steps every new site should take so search engines can find and understand it.',
    content: ['Give every page a unique title and meta description that match what people search for.', 'Use clean URLs, semantic headings and descriptive image alt text.', 'Submit a sitemap and make sure the site loads quickly on mobile.', 'Publish useful content consistently; rankings follow value over time.'] },
  { slug: 'when-to-automate-with-ai', title: 'When to Automate With AI', category: 'AI & Automation', author: 'Worklancers Team', publishedAt: '2026-10-28',
    excerpt: 'Not every task needs AI. Here is how to spot the ones that do.',
    content: ['Look for repetitive tasks with clear rules, such as answering common questions or sorting leads.', 'Keep a human in the loop where mistakes are costly.', 'Start with one small workflow, measure the time saved, then expand.'] },
];

export const faqs = [
  { q: 'How much does a project cost?', a: 'It depends on scope. Send us your requirements through the contact form and we will reply with a clear quote.' },
  { q: 'How long does a typical website take?', a: 'Simple business sites usually take a few weeks; larger custom platforms take longer. We agree a timeline before starting.' },
  { q: 'Do you work with international clients?', a: 'Yes. We work remotely with clients in Pakistan and abroad.' },
  { q: 'Will I be able to update my website myself?', a: 'Yes. We can build an admin panel or CMS so you can manage content without code.' },
  { q: 'Do you provide support after launch?', a: 'Yes. We offer maintenance and support options after your project goes live.' },
];

export const processSteps = [
  { title: 'Discover', text: 'We learn your goals, audience and requirements.' },
  { title: 'Plan', text: 'We define scope, timeline and the right technology.' },
  { title: 'Design & Build', text: 'We design, develop and share progress regularly.' },
  { title: 'Test & Launch', text: 'We test thoroughly, then deploy and hand over.' },
  { title: 'Support', text: 'We help you maintain and grow after launch.' },
];

export const technologies = ['React', 'Node.js', 'MongoDB', 'Express', 'WordPress', 'Shopify', 'React Native', 'Figma', 'Tailwind CSS', 'WooCommerce'];

export const whyChoose = [
  { title: 'End-to-end delivery', text: 'Design, development, marketing and automation from one team.' },
  { title: 'Clear communication', text: 'Regular updates and plain-language explanations.' },
  { title: 'Modern, secure code', text: 'Maintainable builds that follow current best practices.' },
  { title: 'Built for growth', text: 'Solutions that scale with your business.' },
];

// Real testimonials only. Leave empty until genuine client feedback is available.
export const testimonials = [];

export const budgets = ['Under $500', '$500 – $1,500', '$1,500 – $5,000', '$5,000+', 'Not sure yet'];

// "Sound familiar?" problems the home page speaks to.
export const painPoints = [
  { title: 'Your website gets visitors, but no inquiries', text: 'We redesign around one goal: turning visitors into calls, messages and orders.' },
  { title: 'Customers can\'t find you on Google', text: 'We fix technical SEO, speed and content so the right people find you first.' },
  { title: 'You lose hours on repetitive work', text: 'We automate replies, follow-ups and admin with practical AI tools.' },
];

// Promises shown in the animated stats strip. Only list commitments the team actually keeps.
export const guarantees = [
  { value: 24, suffix: 'h', label: 'Reply to every inquiry' },
  { value: 100, suffix: '%', label: 'You own your code & designs' },
  { value: 0, prefix: '$', label: 'Free audit & consultation' },
  { value: services.reduce((n, s) => n + s.subs.length, 0), suffix: '', label: 'Specialized services' },
];

// Search titles/descriptions for each service page (titles under ~60 chars, descriptions under ~160).
export const serviceSeo = {
  'web-development': { title: 'Web Development Company in Pakistan', description: 'Custom websites, MERN web apps, WordPress and e-commerce sites that load fast and bring in leads. Fixed-price quotes from Worklancers, a Pakistan software house.' },
  'mobile-app-development': { title: 'Mobile App Development (Android & iOS)', description: 'Android, iOS and React Native app development for startups and businesses. One codebase, clean UI and API integration. Get a free estimate from Worklancers.' },
  'graphic-design-branding': { title: 'Logo, Branding & UI/UX Design Services', description: 'Logo design, brand identity, UI/UX design and social media graphics that make your business look trusted and professional. Branding services by Worklancers.' },
  'digital-marketing-seo': { title: 'SEO & Digital Marketing Services', description: 'SEO, Google Ads, social media marketing and content marketing that bring qualified traffic and measurable results. Digital marketing services by Worklancers.' },
  'ecommerce-solutions': { title: 'Shopify & WooCommerce Store Development', description: 'Online stores built on Shopify and WooCommerce with payment gateways, product setup and fast checkout. E-commerce development by Worklancers.' },
  'ai-automation': { title: 'AI Chatbots & Business Automation Services', description: 'AI chatbots, AI agents and workflow automation that cut manual work and answer customers 24/7. Practical AI solutions from Worklancers.' },
};

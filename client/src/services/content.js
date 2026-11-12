// Demo content layer. Shapes mirror the planned REST API so it can be swapped for Axios calls.
export const services = [
  { slug: 'web-development', image: '/images/code-closeup.webp', title: 'Web Development', icon: 'Code2',
    description: 'Fast, secure and scalable websites and web applications built around your business goals.',
    subs: ['WordPress Development', 'MERN Stack Development', 'Custom Website Development', 'E-commerce Website Development', 'Web Applications'],
    features: ['Responsive, mobile-first builds', 'SEO-ready code structure', 'Secure authentication and APIs', 'Admin panels and CMS'],
    benefits: ['A site that loads fast and converts', 'Easy to manage without developers', 'Built to scale as you grow'] },
  { slug: 'mobile-app-development', image: '/images/mobile.webp', title: 'Mobile App Development', icon: 'Smartphone',
    description: 'Native and cross-platform mobile apps that feel smooth and keep users engaged.',
    subs: ['Android Development', 'iOS Development', 'React Native Development'],
    features: ['Single codebase with React Native', 'Clean, intuitive interfaces', 'API and backend integration', 'Store release support'],
    benefits: ['Reach users on both platforms', 'Lower cost with shared code', 'Reliable performance'] },
  { slug: 'graphic-design-branding', image: '/images/design.webp', title: 'Graphic Design & Branding', icon: 'Palette',
    description: 'Visual identities and interfaces that make your brand memorable and trusted.',
    subs: ['Logo Design', 'Brand Identity', 'UI/UX Design', 'Social Media Graphics'],
    features: ['Logo and brand guidelines', 'Wireframes and prototypes', 'Consistent social media kits', 'Print and digital assets'],
    benefits: ['A consistent professional image', 'Better user experience', 'Stronger brand recall'] },
  { slug: 'digital-marketing-seo', image: '/images/analytics.webp', title: 'Digital Marketing & SEO', icon: 'Megaphone',
    description: 'Data-driven marketing that brings the right visitors to your website.',
    subs: ['Search Engine Optimization', 'Social Media Marketing', 'Google Ads', 'Content Marketing'],
    features: ['Keyword research and on-page SEO', 'Campaign setup and tracking', 'Content planning', 'Monthly reporting'],
    benefits: ['More qualified traffic', 'Measurable campaign results', 'Long-term organic growth'] },
  { slug: 'ecommerce-solutions', image: '/images/ecommerce.webp', title: 'E-commerce Solutions', icon: 'ShoppingCart',
    description: 'Online stores designed to showcase products and make buying simple.',
    subs: ['Shopify Development', 'WooCommerce Development', 'Online Store Development'],
    features: ['Product and inventory setup', 'Payment gateway integration', 'Checkout optimization', 'Store customization'],
    benefits: ['Sell around the clock', 'Smooth buying experience', 'Easy store management'] },
  { slug: 'ai-automation', image: '/images/ai.webp', title: 'AI & Automation', icon: 'Bot',
    description: 'Practical AI tools and automation that save time and reduce manual work.',
    subs: ['AI Chatbots', 'AI Agents', 'Business Automation', 'AI-powered Solutions'],
    features: ['Chatbots for support and lead capture', 'Workflow automation', 'Custom AI integrations', 'Process analysis'],
    benefits: ['Less repetitive work', 'Faster response to customers', 'Smarter operations'] },
];

// Real client projects. `image` = screenshot in public/images/projects (leave empty to show a branded cover).
// `type` groups the portfolio: 'web' (websites & web apps) or 'mobile' (mobile apps & games).
export const projects = [
  {
    slug: 'loomysend', title: 'LoomySend', category: 'SaaS Platform', type: 'web', liveUrl: 'https://loomysend.com',
    image: '/images/projects/loomysend.jpg',
    description: 'An email and SMS marketing platform where businesses design campaigns, send them in minutes and watch every open, click and reply arrive live.',
    highlights: ['Drag-and-drop email builder with ready-made templates', 'Email and SMS campaigns run from a single dashboard', 'Real-time tracking of opens, clicks and replies', 'AI-assisted copywriting and an installable app for desktop and mobile'],
  },
  {
    slug: 'loomy360', title: 'Loomy360', category: 'SaaS Platform', type: 'web', liveUrl: 'https://loomy360.com',
    image: '/images/projects/loomy360.jpg',
    description: 'An all-in-one business app for small businesses and non-profits that brings CRM, e-signatures, booking, invoices and proposals under one client list.',
    highlights: ['CRM, e-signatures, booking, invoicing and proposals in one product', 'One shared client list instead of several separate tools', 'Texting and calling saved straight to the customer record', 'Automations created from a plain-language description'],
  },
  {
    slug: 'venuesvegas', title: 'VenuesVegas', category: 'Web Platform', type: 'web', liveUrl: 'https://venuesvegas.com',
    image: '/images/projects/venuesvegas.jpg',
    description: 'A Las Vegas and Nevada event venue and vendor directory where planners search by category and city, compare options and contact vendors directly.',
    highlights: ['Venue and event-service search by category and city', 'Separate customer and vendor accounts', 'Monthly and yearly vendor membership plans', 'Simple search, compare, contact and book flow'],
  },
  {
    slug: 'drytis-ai-studio', title: 'Drytis AI Studio', category: 'AI Platform', type: 'web', liveUrl: 'https://studio.drytis.ai/', technologies: ['Next.js'],
    image: '/images/projects/drytis-ai-studio.jpg',
    description: 'An AI-powered development studio delivered as a secure web application, with sign-in through Google, GitHub or email for each team member.',
    highlights: ['AI-powered development studio in the browser', 'Sign-in with Google, GitHub or email', 'Built with Next.js', 'In-app issue reporting for users'],
  },
  {
    slug: 'arete-ai-engineers', title: 'Arete AI Engineers', category: 'AI Platform', type: 'web', liveUrl: 'https://arete.drytis.ai/',
    image: '/images/projects/arete-ai-engineers.jpg',
    description: 'Arete AI Engineers, a secure web platform from Drytis with account sign-in by email, GitHub or Google and a clean, focused user experience.',
    highlights: ['Secure account sign-in by email, GitHub or Google', 'Part of the Drytis AI product family', 'Clean, focused interface', 'In-app issue reporting for users'],
  },
  {
    slug: 'selloverse', title: 'Selloverse', category: 'E-commerce', type: 'web', liveUrl: 'https://selloverse.pk/',
    image: '/images/projects/selloverse.jpg', logo: '/images/projects/selloverse-logo.png',
    description: 'An online shopping platform for Pakistan with products by category and brand, daily deals, flash sales and fast nationwide delivery in PKR.',
    highlights: ['Shop by category, brand and campaign', 'Daily deals and countdown flash sales', 'Product comparison and order tracking', 'Store finder, helpline and nationwide delivery'],
  },
  {
    slug: 'plane-shooter', title: 'Plane Shooter', category: 'Mobile Game', type: 'mobile', liveUrl: '', image: '', icon: '/images/projects/plane-shooter-icon.svg',
    description: 'A fast-paced arcade plane shooter game for mobile devices, built for quick, action-packed play sessions and smooth controls on the go.',
    highlights: [],
  },
  {
    slug: 'mytenpin', title: 'MyTenPin', category: 'Mobile Game', type: 'mobile', liveUrl: '', image: '', icon: '/images/projects/mytenpin-icon.jpg',
    description: 'A ten-pin bowling game for mobile that brings the fun of a night at the bowling alley to your phone, ready to play anywhere, anytime.',
    highlights: [],
  },
  {
    slug: 'match-3-realms', title: 'Match-3 Realms', category: 'Mobile Game', type: 'mobile', liveUrl: '', image: '', icon: '/images/projects/match-3-realms-icon.jpg',
    description: 'Match-3 Realms, a colourful match-3 puzzle game for mobile where players swap and match pieces to clear levels and progress through the game.',
    highlights: [],
  },
].map((p, i) => ({ technologies: [], isDemo: false, isFeatured: i < 3, ...p }));

export const posts = [
  { slug: 'how-to-choose-a-web-development-agency', title: 'How to Choose a Web Development Agency', category: 'Web Development', author: 'Worklancers Team', publishedAt: '2026-10-12',
    excerpt: 'A practical checklist for comparing web development agencies on process, communication, pricing and technical fit before you sign a contract.',
    content: [
      "Hiring a web development agency is one of the biggest marketing decisions a growing business makes. The right partner gives you a website or web app that brings in customers for years. The wrong one leaves you with missed deadlines, a site nobody on your team can update and a bill that keeps growing. The good news is that you can tell the two apart before you sign anything, if you know what to look for.",
      "This guide walks through a practical checklist you can use to compare agencies side by side, whether you are building your first business website or replacing a platform that no longer works for you.",
      {
            "h": "1. Start with your goal, not the technology"
      },
      "Before you speak to any agency, write down what the website needs to achieve. Do you want more enquiries, more online sales, fewer support calls or a tool your team uses every day? A clear goal changes everything: the pages you need, the features worth paying for and how you will judge success after launch.",
      "A strong agency will ask about these goals in the first conversation. If the discussion jumps straight to colours, plugins or frameworks, treat that as a warning sign. Technology should be chosen to serve the goal, not the other way round.",
      {
            "h": "2. Look at real work, not just a pretty portfolio"
      },
      "Every agency shows its best screenshots. What you want to know is whether those projects are live, whether they load quickly and whether they actually work. Open a few of the sites they list on your phone. Try the contact form, the menu and the checkout if there is one.",
      {
            "list": [
                  "Are the projects live websites you can visit, or only images?",
                  "Do they load quickly on a mobile connection?",
                  "Have they built something similar in size and complexity to your project?",
                  "Can they explain what problem each project solved for the client?"
            ]
      },
      "If an agency has built products in your industry, that is a bonus, but it is not essential. Experience with similar features, such as bookings, member areas or online payments, often matters more than the industry itself.",
      {
            "h": "3. Ask how they work, step by step"
      },
      "A professional agency can describe its process clearly: how requirements are gathered, how designs are approved, how progress is shared and what happens when you want to change something halfway through. You should come away knowing exactly what the next few weeks look like.",
      "Ask how often you will see working progress. Agencies that share a live preview link every week or two catch misunderstandings early, when they are cheap to fix. Agencies that disappear for two months and then reveal a finished site often deliver something that does not match what you imagined.",
      {
            "h": "4. Compare quotes on scope, not just price"
      },
      "Two quotes with very different prices are rarely quoting for the same thing. Before comparing numbers, make sure each quote lists the same pages, features, integrations and number of design revisions. A cheaper quote that leaves out content entry, testing or launch support can end up costing more.",
      {
            "list": [
                  "What exactly is included, and what would count as extra work?",
                  "Is the price fixed for an agreed scope, or billed by the hour?",
                  "How are payments split across milestones?",
                  "What happens if the project runs over the agreed timeline?"
            ]
      },
      "Fixed-price quotes for a clearly defined scope protect both sides. You know the total cost upfront, and the agency is motivated to plan carefully.",
      {
            "h": "5. Check communication before you sign"
      },
      "The way an agency communicates during the sales process is the best preview of how it will communicate during the project. Notice how quickly they reply, whether they answer your actual questions and whether they explain technical topics in plain language.",
      "Good agencies are also honest about what they would not build. If something you ask for will not help your goal, or would cost far more than it is worth, a trustworthy partner will tell you so.",
      {
            "h": "6. Make sure you will own your website"
      },
      "Ownership is easy to overlook and painful to fix later. Confirm in writing that you will receive full access to the code, the hosting account, the domain and any design files once the project is paid for. Avoid arrangements where the agency keeps the website on its own account and you only rent it.",
      "Ask which platform the site will be built on and whether your team will be able to edit content without calling a developer. For most business websites, you should be able to change text, images and blog posts yourself.",
      {
            "h": "7. Agree on what happens after launch"
      },
      "A website is never really finished. Plugins need updates, browsers change and your business will want new pages and features. Ask what support the agency offers after launch, how quickly they respond to problems and what ongoing maintenance costs.",
      {
            "list": [
                  "Is there a free support period after launch?",
                  "Who handles hosting, security updates and backups?",
                  "How are small changes and new features quoted later?"
            ]
      },
      {
            "h": "A quick comparison checklist"
      },
      "When you have two or three agencies on your shortlist, score each one against the same questions:",
      {
            "list": [
                  "They asked about my business goals before talking about technology.",
                  "Their past projects are live, fast and work well on mobile.",
                  "They explained a clear, step-by-step process with regular progress updates.",
                  "Their quote lists the scope in detail and the price is fixed or clearly capped.",
                  "They reply quickly and explain things in plain language.",
                  "I will own the code, hosting, domain and design files.",
                  "They offer a clear plan for support after launch."
            ]
      },
      "The agency that ticks the most boxes is usually the safest choice, even if it is not the cheapest. A website that brings in customers pays for itself; one that has to be rebuilt in a year never does.",
      "If you would like a second opinion on your current website or a quote you have received, our team offers a free website audit. We will review your site and send practical recommendations within 24 hours, with no obligation to work with us."
] },
  { slug: 'seo-basics-for-new-websites', title: 'SEO Basics for a New Website', category: 'SEO', author: 'Worklancers Team', publishedAt: '2026-10-20',
    excerpt: 'The first SEO steps every new website should take, from titles and page speed to sitemaps and content, so Google can find, understand and rank it.',
    content: [
      "Launching a new website is exciting, but on day one Google does not know it exists. Search engines need clear signals to find your pages, understand what they are about and decide when to show them. The good news is that the most important SEO foundations are simple, and getting them right at launch saves months of catching up later.",
      "This guide covers the first steps every new business website should take, in roughly the order we work through them when we launch a site for a client.",
      {
            "h": "1. Choose the keywords each page should rank for"
      },
      "Every important page on your site should target one main search phrase. Think about the words a potential customer would actually type, such as “web development company in Lahore” or “Shopify store setup”, rather than the internal names your team uses.",
      "Use free tools such as Google Search Console, Google Trends and the suggestions that appear as you type in Google to see which phrases people search for. Avoid targeting the same phrase on several pages, because they end up competing with each other.",
      {
            "h": "2. Write a unique title and meta description for every page"
      },
      "The page title is the blue headline people see in search results, and it is one of the strongest signals Google uses. Keep it under about 60 characters, put the main keyword near the start and include your brand name at the end.",
      "The meta description is the short summary underneath. It does not directly affect rankings, but a clear, specific description earns more clicks. Aim for roughly 120 to 160 characters that explain what the page offers and why someone should visit.",
      {
            "list": [
                  "Give every page its own title; never reuse the same one.",
                  "Include the main keyword naturally, not stuffed in several times.",
                  "Write descriptions for people, with a clear benefit or next step."
            ]
      },
      {
            "h": "3. Structure pages with clear headings"
      },
      "Each page should have a single main heading (H1) that describes the topic, followed by subheadings (H2, H3) that break the content into sections. This helps visitors skim and helps search engines understand how your content is organised.",
      "Write enough useful content to answer the questions your customers have. Thin pages with a few lines of text rarely rank well. A service page that explains who the service is for, how it works, what it costs to get started and common questions gives Google much more to work with.",
      {
            "h": "4. Make the site fast and mobile-friendly"
      },
      "Google ranks websites based on how they perform on mobile phones, and slow pages lose visitors before they even load. Check your key pages with Google PageSpeed Insights and fix the biggest problems first.",
      {
            "list": [
                  "Compress images and use modern formats such as WebP.",
                  "Avoid heavy sliders, autoplay videos and unnecessary plugins.",
                  "Make sure text is readable and buttons are easy to tap on small screens.",
                  "Use a reliable host and enable caching."
            ]
      },
      {
            "h": "5. Use clean URLs and helpful image descriptions"
      },
      "Short, readable URLs such as /services/web-development are easier for both people and search engines to understand than long strings of numbers. Decide on your URL structure before launch, because changing it later requires redirects.",
      "Add descriptive alt text to meaningful images. Alt text helps visually impaired visitors using screen readers, and it tells search engines what an image shows. Purely decorative images can have empty alt text.",
      {
            "h": "6. Submit a sitemap and set up Google Search Console"
      },
      "An XML sitemap is a list of all the pages you want search engines to index. Most modern website platforms generate one automatically. Once your site is live, add it to Google Search Console and submit the sitemap so Google can discover your pages quickly.",
      "Search Console also shows which searches bring people to your site, which pages are indexed and whether Google has found any problems. Check it every few weeks, especially after launching new pages.",
      {
            "h": "7. Add structured data where it fits"
      },
      "Structured data is extra code that describes your content in a format search engines understand, such as your business details, frequently asked questions, articles or products. It can help your site appear with richer results, like FAQ snippets or breadcrumb trails, which stand out on the page.",
      {
            "h": "8. Build trust and local visibility"
      },
      "Rankings also depend on how trustworthy your business appears across the web. Create a Google Business Profile with accurate contact details, opening hours and photos, and ask happy customers to leave reviews. List your business in relevant directories and industry platforms, and make sure your name, phone number and address match everywhere.",
      {
            "h": "9. Publish useful content consistently"
      },
      "SEO is not a one-time task. Websites that publish helpful articles, guides and case studies on a regular schedule give search engines more reasons to visit and more pages to rank. Answer the questions your customers ask most often, and link those articles to your relevant service pages.",
      {
            "h": "Your new website SEO checklist"
      },
      {
            "list": [
                  "Main keyword chosen for each important page",
                  "Unique title (under 60 characters) and description (120 to 160 characters) on every page",
                  "One H1 per page and clear subheadings",
                  "Fast loading and easy to use on mobile",
                  "Clean URLs and descriptive image alt text",
                  "Sitemap submitted in Google Search Console",
                  "Structured data for your business, FAQs and articles",
                  "Google Business Profile set up and reviews requested",
                  "A plan to publish useful content every month"
            ]
      },
      "Results from SEO build over time, but these foundations make every later effort more effective. If you would like us to check how your website measures up, request a free website audit and we will send you a practical list of improvements."
] },
  { slug: 'when-to-automate-with-ai', title: 'When to Automate With AI', category: 'AI & Automation', author: 'Worklancers Team', publishedAt: '2026-10-28',
    excerpt: 'Not every task needs AI. Learn how to spot the repetitive work worth automating, where to keep a human in the loop and how to start small.',
    content: [
      "Artificial intelligence is everywhere in the news, and many business owners feel pressure to “do something with AI”. But adding AI for its own sake rarely pays off. The businesses that benefit most start with a specific, repetitive problem and use automation to remove it. This guide explains how to spot the tasks worth automating, where AI genuinely helps and how to start without a large budget or risky changes.",
      {
            "h": "Start with the problem, not the tool"
      },
      "Before looking at chatbots or AI agents, list the tasks your team does every week that feel slow, repetitive or error-prone. You are looking for work that follows clear rules, happens often and takes time away from customers or sales.",
      {
            "list": [
                  "Answering the same customer questions by email, chat or WhatsApp",
                  "Copying information from forms into spreadsheets or a CRM",
                  "Sorting and replying to new leads",
                  "Sending follow-up messages, reminders and invoices",
                  "Summarising documents, calls or long email threads"
            ]
      },
      "If a task is done many times a week and the steps are similar each time, it is a strong candidate for automation.",
      {
            "h": "Automation versus AI: what is the difference?"
      },
      "Not every improvement needs artificial intelligence. Simple automation follows fixed rules: when a form is submitted, add the details to the CRM and send a welcome email. This kind of workflow is reliable, inexpensive and should usually be your first step.",
      "AI becomes useful when the task involves understanding language or making judgement calls, such as reading a customer’s question and finding the right answer, deciding which team should handle an email, or drafting a personalised reply. Many of the best solutions combine both: automation moves the data, and AI handles the parts that need understanding.",
      {
            "h": "Signs a task is ready for AI"
      },
      {
            "list": [
                  "It happens often and follows a recognisable pattern.",
                  "The information needed to do it is available in writing, such as FAQs, documents or past replies.",
                  "A small mistake is easy to spot and correct.",
                  "Doing it faster would clearly help customers or free up your team."
            ]
      },
      {
            "h": "Where to keep a human in the loop"
      },
      "AI is powerful, but it can make confident mistakes. For tasks where an error would be costly, such as pricing, legal wording, refunds or medical and financial advice, use AI to prepare a draft and let a person approve it. For low-risk tasks, such as answering opening hours or routing an enquiry, the AI can act on its own.",
      "A good rule is to ask, “What is the worst thing that could happen if this answer is wrong?” If the answer is serious, keep a person in control.",
      {
            "h": "Common, practical uses for small businesses"
      },
      {
            "list": [
                  "Website and WhatsApp chatbots that answer common questions at any time of day and collect contact details from new leads",
                  "Lead qualification that reads incoming enquiries and tags them by service, budget or urgency",
                  "Automatic data entry that moves form submissions, orders and emails into your CRM or spreadsheets",
                  "Document and meeting summaries that turn long threads or call notes into short action lists",
                  "Content assistance for first drafts of emails, product descriptions and social posts, edited by your team"
            ]
      },
      {
            "h": "How to start small and prove the value"
      },
      "The safest way to adopt AI is to automate one workflow, measure the result and then expand. Pick the task that costs the most time each week and has the lowest risk if something goes wrong.",
      {
            "list": [
                  "Measure how long the task takes today.",
                  "Build a simple version of the automation or chatbot.",
                  "Test it with real examples and check the results carefully.",
                  "Launch it, track the time saved and collect feedback from your team and customers.",
                  "Use what you learned to choose the next workflow."
            ]
      },
      "Small wins build confidence and pay for the next improvement. Trying to automate everything at once usually leads to complex systems nobody trusts.",
      {
            "h": "Think about data and privacy early"
      },
      "Before connecting any AI service to your business, decide which information it really needs. Avoid sharing sensitive customer or financial data unless it is necessary, check where data is stored and make sure your customers are told how their information is used. A well-designed solution can keep sensitive information inside your own systems and send only what is needed to the AI.",
      {
            "h": "Questions to ask before you automate"
      },
      {
            "list": [
                  "Which task costs us the most time each week?",
                  "What would happen if the automated result were wrong?",
                  "Do we have the written information the AI would need?",
                  "How will we measure whether it is working?",
                  "Who on the team will own and review the system?"
            ]
      },
      "AI works best as a practical tool, not a magic solution. Start with a clear problem, keep people in charge of important decisions and grow from there. If you would like help identifying the right first workflow for your business, our team can review your processes and suggest where automation would save the most time."
] },
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
  'web-development': { title: 'Web Development Company in Pakistan', description: 'Fast custom websites, MERN web apps, WordPress and e-commerce sites that bring in leads. Fixed-price quotes from Worklancers, a software house in Pakistan.' },
  'mobile-app-development': { title: 'Mobile App Development (Android & iOS)', description: 'Android, iOS and React Native app development for startups and businesses. One codebase, clean UI and API integration. Get a free estimate from Worklancers.' },
  'graphic-design-branding': { title: 'Logo, Branding & UI/UX Design Services', description: 'Logo design, brand identity, UI/UX design and social media graphics that make your business look trusted and professional. Branding services by Worklancers.' },
  'digital-marketing-seo': { title: 'SEO & Digital Marketing Services', description: 'SEO, Google Ads, social media marketing and content marketing that bring qualified traffic and measurable results. Digital marketing services by Worklancers.' },
  'ecommerce-solutions': { title: 'Shopify & WooCommerce Store Development', description: 'Online stores built on Shopify and WooCommerce with payment gateways, product setup and fast checkout. E-commerce development by Worklancers.' },
  'ai-automation': { title: 'AI Chatbots & Business Automation Services', description: 'AI chatbots, AI agents and workflow automation that cut manual work and answer customers 24/7. Practical AI solutions from Worklancers.' },
};

// Long-form copy for each service page: intro, who it's for, how we deliver, and service FAQs.
// Written to give each page enough depth to rank (aim 600+ words). Edit freely.
export const serviceDetails = {
  'web-development': {
    intro: [
      'Your website is often the first conversation a customer has with your business. If it loads slowly, looks dated on a phone or hides the contact button, that conversation ends before it starts. We build websites and web applications that load fast, explain what you do in seconds and make it easy for visitors to call, message or buy.',
      'Whether you need a simple business website, a WordPress site you can update yourself, or a custom MERN web application with logins, dashboards and payments, we plan the structure around your goals first and choose the technology second. Every build is mobile-first, SEO-ready and handed over with full access to the code.',
    ],
    idealFor: ['Small and medium businesses that need a professional website that brings in enquiries', 'Startups launching a web app or SaaS product (MVP) and planning to grow it', 'Companies replacing an outdated or slow website that no longer converts', 'Teams that need a customer portal, booking system or internal web tool'],
    process: [
      ['Discovery call', 'We learn your goals, audience and must-have features, then recommend the right platform: WordPress, a custom React site or a full web application.'],
      ['Sitemap & design', 'We plan the pages and user journey, then design key screens so you can see and approve the look before development starts.'],
      ['Development & testing', 'We build in short cycles, share a live preview link as we go, and test speed, mobile layout, forms and browsers before launch.'],
      ['Launch & handover', 'We deploy to your hosting, connect your domain and analytics, train your team on updates and stay available for support.'],
    ],
    faqs: [
      { q: 'Should I choose WordPress or a custom-built website?', a: 'WordPress suits content-led business websites that your team wants to edit often. A custom React or MERN build suits web applications, portals and products with logins, dashboards or unusual features. We recommend the simplest option that meets your goals.' },
      { q: 'How long does it take to build a website?', a: 'A simple business website usually takes a few weeks; larger custom web applications take longer. We agree a clear timeline and milestones before work starts.' },
      { q: 'Will my website be SEO-friendly and fast on mobile?', a: 'Yes. Every site we build is mobile-first, uses clean page titles, headings and URLs, includes a sitemap, and is checked for loading speed before launch.' },
      { q: 'Do I own the website and its code?', a: 'Yes. When the project is complete you receive full access to the code, hosting and content, so you are never locked in.' },
    ],
  },
  'mobile-app-development': {
    intro: [
      'A good mobile app puts your business on your customers’ home screen, one tap away. We design and develop Android and iOS apps that feel smooth, look clean and do one job really well, from booking and ordering apps to customer portals and companion apps for your web platform.',
      'Most projects use React Native, which lets us build a single codebase for both Android and iOS. That means a faster launch and lower cost than building two separate apps, without giving up a native look and feel. We also build the backend and APIs your app needs and help you publish to the Google Play Store and Apple App Store.',
    ],
    idealFor: ['Startups validating an app idea with a first version (MVP)', 'Businesses that want customers to book, order or pay from their phone', 'Companies adding a mobile app to an existing website or web platform', 'Teams that need an internal app for field staff, sales or operations'],
    process: [
      ['Idea & scope', 'We turn your idea into a clear feature list, separating what the first version needs from what can come later.'],
      ['UX & UI design', 'We design the app screens and user flow, and share a clickable prototype so you can test the experience early.'],
      ['Build & integrate', 'We develop the app and its backend, connect payments, maps or notifications, and test on real Android and iOS devices.'],
      ['Store launch & support', 'We prepare store listings, handle submission to Google Play and the App Store, and support updates after launch.'],
    ],
    faqs: [
      { q: 'Do you build native or cross-platform apps?', a: 'We mainly use React Native to build one app for both Android and iOS. For apps that need deep device features or maximum performance, we can discuss native development.' },
      { q: 'Can you build the backend and admin panel too?', a: 'Yes. We build the APIs, database and admin dashboard your app needs, so you have one team responsible for the whole product.' },
      { q: 'Will you publish the app to the stores?', a: 'Yes. We help set up your developer accounts, prepare screenshots and descriptions, and handle submission to Google Play and the Apple App Store.' },
      { q: 'How much does a mobile app cost?', a: 'It depends on the features, number of screens and integrations. After a short discovery call we give you a fixed-price quote for a clearly defined first version.' },
    ],
  },
  'graphic-design-branding': {
    intro: [
      'People decide whether to trust a business within seconds, often from its logo, colours and the look of its website. A clear, consistent brand makes you look established and makes every ad, post and page work harder. We create brand identities and digital designs that are distinctive, professional and easy to use across every channel.',
      'Our design work covers logo design, complete brand identity systems, UI/UX design for websites and apps, and social media graphics. Because we also build websites and apps, our designs are practical: they look great and work smoothly when they go live.',
    ],
    idealFor: ['New businesses that need a logo and brand identity from scratch', 'Established companies refreshing an outdated or inconsistent look', 'Startups that need UI/UX design for a website, web app or mobile app', 'Brands that want consistent, on-brand social media graphics'],
    process: [
      ['Brand discovery', 'We learn about your business, customers and competitors, and collect examples of styles you like and dislike.'],
      ['Concepts', 'We present a small number of distinct design directions, each explained, so you can choose with confidence.'],
      ['Refine', 'We refine the chosen direction with your feedback until the logo, colours and typography feel right.'],
      ['Brand kit handover', 'You receive all logo files, colour codes, fonts and a simple brand guide so anyone can use your brand correctly.'],
    ],
    faqs: [
      { q: 'What files do I receive for my logo?', a: 'You receive your logo in all common formats (SVG, PNG, PDF) in full colour, one colour and white versions, ready for print, web and social media.' },
      { q: 'Do you design websites and app screens (UI/UX)?', a: 'Yes. We design wireframes and high-fidelity screens in Figma, and can share a clickable prototype before development starts.' },
      { q: 'How many revisions are included?', a: 'We agree the number of concepts and revision rounds upfront, so you know exactly what is included before we begin.' },
      { q: 'Can you create ongoing social media designs?', a: 'Yes. We can create a set of on-brand templates for you to reuse, or design posts and ad creatives for you each month.' },
    ],
  },
  'digital-marketing-seo': {
    intro: [
      'A beautiful website only pays off when the right people find it. We help businesses get found on Google, reach customers on social media and turn advertising spend into real enquiries. Every campaign starts with your goals and is measured against them, so you always know what is working.',
      'Our marketing services include search engine optimisation (SEO), Google Ads, social media marketing and content marketing. We fix the technical basics that hold websites back, research the keywords your customers actually search for, create useful content and report on results in plain language.',
    ],
    idealFor: ['Businesses whose website gets little traffic or few enquiries', 'Companies that want to rank on Google for their services and city', 'Brands running ads without clear tracking or results', 'Teams that need a consistent content and social media plan'],
    process: [
      ['Audit', 'We review your website, Google visibility, competitors and current campaigns to find the biggest opportunities.'],
      ['Strategy', 'We agree goals, target keywords, channels and budget, and set up proper tracking so results can be measured.'],
      ['Execution', 'We optimise pages, publish content, run and refine campaigns, and fix technical SEO issues.'],
      ['Monthly reporting', 'You receive a clear monthly report on traffic, rankings, leads and spend, with next steps for the month ahead.'],
    ],
    faqs: [
      { q: 'How long does SEO take to show results?', a: 'SEO builds over time. Technical fixes can help quickly, but stronger rankings usually take a few months of consistent work and content. Paid ads can bring traffic while SEO grows.' },
      { q: 'Do you guarantee first position on Google?', a: 'No honest agency can guarantee rankings, because Google controls them. We focus on the work that reliably improves visibility and report on progress every month.' },
      { q: 'Can you manage Google Ads and social media ads?', a: 'Yes. We set up and manage Google Ads and social media campaigns, with conversion tracking so you can see which ads bring enquiries.' },
      { q: 'Do you also do local SEO?', a: 'Yes. We help set up and optimise your Google Business Profile and local pages so nearby customers can find you.' },
    ],
  },
  'ecommerce-solutions': {
    intro: [
      'An online store should make buying feel effortless: clear product pages, fast loading, trusted payments and a checkout that does not lose customers at the last step. We build e-commerce stores that showcase your products well and are easy for your team to manage day to day.',
      'We work with Shopify, WooCommerce and custom-built stores. We set up your products and collections, connect payment gateways and shipping, optimise the checkout and make sure your store is fast and search-friendly, so you can start selling with confidence.',
    ],
    idealFor: ['Retailers moving from social media or marketplaces to their own store', 'Brands launching a new product line online', 'Businesses with an existing store that is slow or hard to manage', 'Companies that need custom features such as bundles, subscriptions or wholesale pricing'],
    process: [
      ['Platform choice', 'We recommend Shopify, WooCommerce or a custom build based on your products, budget and growth plans.'],
      ['Store design', 'We design the homepage, collection and product pages around your brand and your best-selling products.'],
      ['Setup & integrations', 'We add products, connect payments, shipping and email notifications, and test every step of the checkout.'],
      ['Launch & training', 'We launch the store, train your team to manage orders and products, and support you after go-live.'],
    ],
    faqs: [
      { q: 'Should I use Shopify or WooCommerce?', a: 'Shopify is quick to launch and easy to manage, with a monthly subscription. WooCommerce runs on WordPress and gives more control over hosting and customisation. We help you choose based on your needs.' },
      { q: 'Can you connect local payment methods?', a: 'Yes. We integrate the payment gateways that suit your market and customers, including card payments and supported local options.' },
      { q: 'Can you move my existing store to a new platform?', a: 'Yes. We can migrate products, customers and orders where the platforms allow, and set up redirects so you keep your search rankings.' },
      { q: 'Will I be able to add products myself?', a: 'Yes. Your team can add and edit products, prices and stock from the store dashboard, and we provide training at handover.' },
    ],
  },
  'ai-automation': {
    intro: [
      'Many businesses spend hours every week answering the same questions, copying data between tools and chasing follow-ups. AI and automation can take over much of that repetitive work, so your team can focus on customers and growth. We build practical AI solutions that solve a clear problem and fit the tools you already use.',
      'Our work includes AI chatbots for websites and WhatsApp, AI agents that handle multi-step tasks, and workflow automation that connects your CRM, email, forms and spreadsheets. We start with one high-value workflow, measure the time it saves, then expand, always keeping a human in the loop where mistakes would be costly.',
    ],
    idealFor: ['Businesses answering the same customer questions every day', 'Teams copying data between forms, spreadsheets and CRMs by hand', 'Companies that want to qualify and follow up leads faster', 'Organisations exploring AI but unsure where to start'],
    process: [
      ['Process review', 'We map how a task is done today, estimate the time it takes and identify what can be safely automated.'],
      ['Prototype', 'We build a small working version, such as a chatbot trained on your information or one automated workflow.'],
      ['Integrate', 'We connect the solution to your website, WhatsApp, CRM or other tools and test it with real scenarios.'],
      ['Measure & expand', 'We track time saved and accuracy, refine the solution and then automate the next most valuable task.'],
    ],
    faqs: [
      { q: 'What can an AI chatbot do for my business?', a: 'An AI chatbot can answer common questions, collect lead details, book appointments and pass complex conversations to your team, on your website or WhatsApp, at any time of day.' },
      { q: 'Is my business data safe?', a: 'We design solutions so that only the information needed is shared with AI services, and we can keep sensitive data inside your own systems. We discuss data handling with you before building.' },
      { q: 'Will AI replace my staff?', a: 'Our goal is to remove repetitive work, not people. Automation frees your team for the work that needs a human, such as sales conversations and customer care.' },
      { q: 'Which tools can you connect?', a: 'We commonly connect websites, WhatsApp, email, Google Sheets, CRMs and payment tools. If a tool has an API, we can usually integrate it.' },
    ],
  },
};

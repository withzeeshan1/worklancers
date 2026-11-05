import ResourceManager from './ResourceManager';

const publish = { name: 'isPublished', label: 'Published (visible on the website)', type: 'bool' };

export const ServicesAdmin = () => (
  <ResourceManager title="Services" noun="service" endpoint="services" defaults={{ isPublished: true, icon: 'Code2', order: 0 }}
    fields={[{ name: 'title', label: 'Title', type: 'text', required: true }, { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'icon', label: 'Icon name', type: 'text', hint: 'Code2, Smartphone, Palette, Megaphone, ShoppingCart, Bot' }, { name: 'image', label: 'Image', type: 'image' },
      { name: 'subServices', label: 'What we offer', type: 'list', hint: 'one per line' }, { name: 'features', label: 'Features', type: 'list', hint: 'one per line' },
      { name: 'benefits', label: 'Benefits', type: 'list', hint: 'one per line' }, { name: 'order', label: 'Display order', type: 'number' }, publish]} />
);

export const ProjectsAdmin = () => (
  <ResourceManager title="Portfolio" noun="project" endpoint="projects" defaults={{ isPublished: true, isDemo: true }}
    fields={[{ name: 'title', label: 'Title', type: 'text', required: true }, { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'category', label: 'Category', type: 'text', required: true }, { name: 'technologies', label: 'Technologies', type: 'list', hint: 'one per line' },
      { name: 'image', label: 'Main image', type: 'image' }, { name: 'gallery', label: 'Gallery image URLs', type: 'list', hint: 'one per line' },
      { name: 'liveUrl', label: 'Live project URL', type: 'text', hint: 'https://...' },
      { name: 'isDemo', label: 'This is a demo project, not client work', type: 'bool' }, { name: 'isFeatured', label: 'Featured on home page', type: 'bool' }, publish]} />
);

export const BlogsAdmin = () => (
  <ResourceManager title="Blog posts" noun="post" endpoint="blogs" defaults={{ isPublished: false, authorName: 'Worklancers Team' }}
    fields={[{ name: 'title', label: 'Title', type: 'text', required: true }, { name: 'excerpt', label: 'Excerpt', type: 'textarea', required: true, rows: 2 },
      { name: 'content', label: 'Content', type: 'textarea', required: true, rows: 10, hint: 'blank line between paragraphs' }, { name: 'category', label: 'Category', type: 'text', required: true },
      { name: 'authorName', label: 'Author name', type: 'text' }, { name: 'featuredImage', label: 'Featured image', type: 'image' },
      { name: 'metaTitle', label: 'SEO title', type: 'text', hint: 'max 70 characters' }, { name: 'metaDescription', label: 'SEO description', type: 'textarea', rows: 2, hint: 'max 170 characters' }, publish]} />
);

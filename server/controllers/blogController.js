import Blog from '../models/Blog.js';
import crudFactory from './crudFactory.js';

export default crudFactory(Blog, {
  fields: ['title', 'excerpt', 'content', 'featuredImage', 'category', 'authorName', 'metaTitle', 'metaDescription', 'isPublished'],
  filterFields: ['category'],
  sort: { publishedAt: -1, createdAt: -1 },
  populate: { path: 'author', select: 'name' },
  onCreate: (data, req) => { data.author = req.admin._id; if (data.isPublished) data.publishedAt = new Date(); },
  onUpdate: (data, item) => { if (data.isPublished && !item.publishedAt) data.publishedAt = new Date(); },
});

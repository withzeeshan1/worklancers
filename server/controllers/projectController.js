import Project from '../models/Project.js';
import crudFactory from './crudFactory.js';

export default crudFactory(Project, {
  fields: ['title', 'description', 'category', 'technologies', 'image', 'gallery', 'liveUrl', 'isDemo', 'isFeatured', 'isPublished'],
  filterFields: ['category'],
});

import Service from '../models/Service.js';
import crudFactory from './crudFactory.js';

export default crudFactory(Service, {
  fields: ['title', 'description', 'icon', 'image', 'subServices', 'features', 'benefits', 'order', 'isPublished'],
  sort: { order: 1, createdAt: 1 },
});

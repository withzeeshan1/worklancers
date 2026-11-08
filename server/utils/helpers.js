import slugify from 'slugify';
import jwt from 'jsonwebtoken';

export const pick = (obj, keys) => Object.fromEntries(keys.filter((k) => obj[k] !== undefined).map((k) => [k, obj[k]]));
export const escapeRegex = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export async function uniqueSlug(Model, base, excludeId) {
  const root = slugify(base, { lower: true, strict: true }) || 'item';
  let slug = root; let n = 1;
  // eslint-disable-next-line no-await-in-loop
  while (await Model.exists({ slug, ...(excludeId && { _id: { $ne: excludeId } }) })) slug = `${root}-${++n}`;
  return slug;
}

export const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

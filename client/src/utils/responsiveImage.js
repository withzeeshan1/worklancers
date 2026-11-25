import srcSets from './image-srcsets.json';

// Props for an <img>: the photo plus its smaller copies, so phones download a phone-size image.
// The copies and image-srcsets.json are made by `npm run images` (scripts/make-image-sizes.mjs).
// `sizes` tells the browser how wide the image shows on screen, e.g. '(min-width: 1024px) 33vw, 100vw'.
export function responsive(src, sizes = '100vw') {
  const srcSet = srcSets[src];
  return srcSet ? { src, srcSet, sizes } : { src };
}

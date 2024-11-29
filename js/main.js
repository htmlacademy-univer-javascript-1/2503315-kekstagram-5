import { generatePhotos } from './data.js';
import { renderGallery } from './gallery.js';
import './validation.js';
import './changeScale.js';
import './setFilter.js';

renderGallery(generatePhotos());

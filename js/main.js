import { generatePhotos } from './data.js';
import { renderGallery } from './gallery.js';
import './validation.js';

renderGallery(generatePhotos());

import { renderGallery } from './gallery.js';
import { getData } from './api.js';
import { showAlert } from './util.js';
import { closeForm, setUserFormSubmit } from './validation.js';

try {
  const data = await getData();
  renderGallery(data);
} catch (err) {
  showAlert(err.message);
}
setUserFormSubmit(closeForm);

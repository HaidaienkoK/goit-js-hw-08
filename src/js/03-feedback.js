import throttle from 'lodash.throttle';

const emailEl = document.querySelector('input');
const messageEl = document.querySelector('textarea');
const subForm = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

let feedbackForm = {
    email: '',
    message: '',
};

subForm.addEventListener('input', throttle(saveFeedback,500));
subForm.addEventListener('submit', onFormSub);

onFormReload();

function saveFeedback(event) {
  if (event.target === emailEl) {
    feedbackForm.email = event.target.value;
  } else {
    feedbackForm.message = event.target.value;
  }
  let messageStorage = JSON.stringify(feedbackForm);
  localStorage.setItem(STORAGE_KEY, messageStorage);
}

function onFormReload() {
  const savedStorage = localStorage.getItem(STORAGE_KEY);
  if (savedStorage) {
    feedbackForm = JSON.parse(savedStorage);
    emailEl.value = feedbackForm.email;
    messageEl.value = feedbackForm.message;
  }
}

function onFormSub(event) {
  event.preventDefault();
  console.log(feedbackForm);
  event.target.reset();
  localStorage.removeItem(STORAGE_KEY);
  feedbackForm.email = '';
  feedbackForm.message = '';
}

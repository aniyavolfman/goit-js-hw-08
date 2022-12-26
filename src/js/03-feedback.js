import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const formData = {};

const formEl = document.querySelector('.feedback-form');
const emailEl = document.querySelector('input');
const textAreaEl = document.querySelector('textArea');


populateTextArea();

formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', throttle(onFormInput, 500));

function onFormSubmit (event) {
    event.preventDefault();
    
    localStorage.removeItem(STORAGE_KEY);
    
    const formElements = event.currentTarget.elements;
    const email = formElements.email.value;
    const message = formElements.message.value;

    let currentFormData = {
        email,
        message
    }

    console.log(currentFormData);
    event.currentTarget.reset();
}

function onFormInput() {

    formData.email = emailEl.value;
    formData.message = textAreaEl.value;
    
    let dataString = JSON.stringify(formData);
    localStorage.setItem(STORAGE_KEY, dataString);
}



function populateTextArea() {
    const savedMessage = localStorage.getItem(STORAGE_KEY);
    
    if (savedMessage) {
        let dataObject = JSON.parse(savedMessage);
        emailEl.value = dataObject.email ? dataObject.email : '';
        textAreaEl.value = dataObject.message ? dataObject.message : '';
    }
}


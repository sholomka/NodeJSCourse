'use strict';

publish.onsubmit = function() {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/publish', true);
    xhr.send(JSON.stringify({message: this.elements.message.value}));

    this.elements.message.value = '';
    return false;
};


(function subscribe() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/subscribe', true);
    xhr.send();

    xhr.onload = (message) => {
        let response = JSON.parse(message.target.response);
        let li = '';
        for (let i in response) {
            li += `<li>${response[i].message}</li>`;
        }
        messages.innerHTML = li;

        subscribe();
    }
}());




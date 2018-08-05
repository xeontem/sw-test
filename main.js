import './main.scss';

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/')
  ;
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

const div = document.createElement('div');
const delayInput = document.createElement('input');
const ttlInput = document.createElement('input');
const payloadInput = document.createElement('input');
const button = document.createElement('button');

div.classList.add('wrapper');
delayInput.value = 1;
ttlInput.value = 1;
payloadInput.value = 'message body';
button.textContent = 'send notification';

div.appendChild(delayInput);
div.appendChild(ttlInput);
div.appendChild(payloadInput);
div.appendChild(button);
document.body.appendChild(div);

navigator.serviceWorker.register('push-notification-worker.js');
navigator.serviceWorker.ready
  .then(registration => registration.pushManager.getSubscription()
    .then(subscription => subscription || fetch('./vapidPublicKey')
      .then(res => res.text())
      .then(urlBase64ToUint8Array)
      .then(key => registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: key
      }))))
  .then(subscription => {
    button.onclick = function() {
      const delay = delayInput.value;
      const ttl = ttlInput.value;
      const payload = payloadInput.value;
      fetch('./sendNotification', {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ subscription, delay, ttl, payload })
      });
    };
    return subscription;
  })
  .then(subscription => fetch('./register', {
    method: 'post',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ subscription }),
  }));

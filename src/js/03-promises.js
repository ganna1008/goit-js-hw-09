import Notiflix from 'notiflix';


import "notiflix/dist/notiflix-notify-aio-3.2.6.min.js";


function createPromise(position, delay) {

  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({
          position: position,
          delay: delay,
        })
      } else {
        reject({
          position: position,
          delay: delay,
        })
      }

    }, delay);
  });
};


const formEL = document.querySelector('.form')
formEL.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();

  const formElements = event.currentTarget.elements;
  let delay = Number(formElements.delay.value);
  let step = Number(formElements.step.value);
  const amount = Number(formElements.amount.value);

  for (let i = 1; i <= amount; i += 1) {
    let position = i;
    if (i === 1) {
      callPromise(position, delay);
      delay = step + delay;
    } else {

      callPromise(position, delay)
      delay += step;
    }

  }

  // event.currentTarget.reset();
}

function callPromise(position, delay) {
  setTimeout(() => {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, { timeout: 5000, });
        // console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, { timeout: 5000, });
        // console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }, delay)
}






import { Notify } from 'notiflix/build/notiflix-notify-aio';

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        res({ position, delay });
      } else {
        rej({ position, delay });
      }
    }, delay);
  })
};

const form = document.querySelector('.form');
form.addEventListener('submit', handlerSubmit);
function handlerSubmit(evt) {
  evt.preventDefault();
  const formData = new FormData(evt.target);
    let firstDelay = Number(formData.get("delay"));
    const step = Number(formData.get("step"));
    const amount = Number(formData.get("amount"));

    for (let i = 1; i <= amount; i+=1) {
      createPromise(i, firstDelay)
        .then(
        ({ position, delay }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
         Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        }
      );
      firstDelay += step;
    }
  };


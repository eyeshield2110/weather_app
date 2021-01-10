console.log('Connected JS to page.')

const fetch_weatherAt = '/weather?address=' // 'http://localhost:3000/weather?address='

/* --------------------------- adding js to form/submit --------------------------- */
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg_1 = document.querySelector('#message-1')
const msg_2 = document.querySelector('#message-2')
weatherForm.addEventListener('submit', (event) => {
    // prevent page from reloading
    event.preventDefault()

    // ""erase"" previous search results
    msg_1.textContent = ''
    msg_2.textContent = ''

    const location = search.value

/* ---------------- Using 'fetch' to fetch JSON data on location & weather ---------------- */
    fetch(fetch_weatherAt + location)
        .then((response) => {
            if (!response.ok) {
                console.log('ERROR')
                 msg_1.textContent = 'ERROR';
            }
            response.json()
                .then((data) => {
                    console.log(data.location, data.temperature) // This output will print on the console of the webpage, not the terminal
                    // Display the resulting forecast and location as html
                    msg_1.textContent = "Location: " + data.location;
                    msg_2.textContent = "Temperature: " + data.temperature;
                })
                .catch((error) => {
                    msg_1.textContent = error;
                    msg_2.textContent = "Try again."
                    console.log(error)
                })
        })
        .catch((error) => {
            console.log(error)
            msg_1.textContent = error;
        })
        .finally(() => {
            console.log('FINALLY')
        })
/* ------------------------------------- FETCH END ------------------------------------- */
})


/* ------------------------------------- Some errors ------------------------------------- */
// Possible errors:
// https://daveceddia.com/unexpected-token-in-json-at-position-0/
// https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch

// Solved my error  with this:
// https://medium.com/@lucymarmitchell/using-then-catch-finally-to-handle-errors-in-javascript-promises-6de92bce3afc

// (1) ssh key
// check if we have ssh key already: ls -a -l ~/.ssh
// create ssh key:  ssh-keygen -t rsa -b 4096 -C "noah.dinh@outlook.com" --> press enter 3 times
// check again: ls -a -l ~/.ssh
    /* Expected output:
    * .... id_rsa (private) ... id_rsa.pub (public)

    * */
// then run: eval "$(ssh-agent -s)"
// ssh-add -K ~/.ssh/id_rsa

// (2) Push to heroku
// heroku keys:add --> run from the ROOT FOLDER of the app (not source!) !!!
// heroku create <unique-app name on ALL heroku>
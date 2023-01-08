console.log("client side java script")



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg0 = document.querySelector('.message0')
const msg1 = document.querySelector('.message1')
const msg2 = document.querySelector('.message2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const address = search.value
    fetch(`http://localhost:3000/weather?address=${address}`).then((response) => {
        response.json().then((data) => {
            msg1.textContent = ''
            msg2.textContent = ''
            if (data.error) {
                msg1.textContent = data.error
            }
            else {
                msg0.textContent = data.name
                msg1.textContent = data.main.temp
                msg2.textContent = data.weather[0].description
            }

        })
    })
})
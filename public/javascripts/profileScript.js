const User = require
const userDesc = document.querySelector('#user-description')
const btnChangeDesc = document.querySelector('#icon-desc-user')

btnChangeDesc.addEventListener('click', async (req, res) => {
  const strDesc = await req.params
  userDesc.innerHTML
})
const router = require('express').Router();
const User = require('../../models/Users');

router.get('/', (req, res) => {
    res.send('Welcome to the users route!')
})

router.get('/register', async (req, res) => {
    const user = await new User({
        username: 'Jane',
        email: 'janedoe@gmail.com'
    })

    await user.save();
    res.send('User added!')
})

module.exports = router;
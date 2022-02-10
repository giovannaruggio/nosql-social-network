const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Welcome to the thoughts route!')
})

module.exports = router;
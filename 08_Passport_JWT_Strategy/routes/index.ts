const router = require('express').Router();

router.use('/users', require('./users'));

router.get('/', (req,res)=>{
    res.send("Hello world");
});

module.exports = router;
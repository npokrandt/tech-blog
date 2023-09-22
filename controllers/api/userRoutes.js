const router = require('express').Router()
const { User } = require('../../models')

router.post('/login', async (req, res) => {
    //console.log(req.body.username)

    try {
        const userData = await User.findOne({ where: { username: req.body.username } });
    
        if (!userData) { 
            res
              .status(400)
              .json({ message: 'Incorrect username or password, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password)

        if (!validPassword) {
            res
              .status(400)
              .json({ message: 'Incorrect email or password, please try again' });
            return;
          }

          req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            
            console.log(req.session.user_id, req.session.logged_in)
            res.json({ user: userData, message: 'You are now logged in!' });
          });

    } catch (err) {
        res.status(400).json(err);
    }

    //res.end()
})

module.exports = router
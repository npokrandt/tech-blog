const router = require('express').Router()
const { User } = require('../../models')

router.post('/create-user', async (req, res) => {

  const {username, password} = req.body

  if (!username || !password){
    return res.status(400).json('you need a username and a password to create an account')
  }
  try {

    const newUser = await User.create({
      username,
      password
    })

    res.status(201).json(newUser)
    
  } catch (err) {
    res.status(400).json(err);
}
})

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
            
            
            res.json({ user: userData, message: 'You are now logged in!' });
          });

    } catch (err) {
        res.status(400).json(err);
    }

  })
  
  router.post('/logout', (req, res) => {
    if (req.session.logged_in){
      req.session.destroy(() => {
        res.status(204).end();
      })
    } else {
      console.log('inside logout')
      res.status(404).end();
    }
  })
module.exports = router
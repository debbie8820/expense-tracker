const User = require('../Users')
const userList = require('./user.json')
const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')

db.once('open', async () => {
  try {
    for (i = 0; i < 2; i++) {
      let salt = await bcrypt.genSalt(10)
      let hash = await bcrypt.hash(userList[i].password, salt)
      userList[i].password = hash
      await User.create(userList[i])
    }
    console.log('UserSeeds are created!')
    await db.close()
    console.log('database connection close...')
  }
  catch (err) {
    console.log(err)
  }
})

const Record = require('../Records')
const User = require('../Users')
const recordList = require('./record.json')
const db = require('../../config/mongoose')

db.once('open', async () => {
  try {
    for (i = 0; i < 2; i++) {
      const user = await User.findOne({ email: `user${i + 1}@example.com` })
      const newList = recordList.slice(4 * i, 4 * (i + 1))
      await Promise.all(newList.map((record) => {
        record.userId = user._id
        return Record.create(record)
      }))
    }
    console.log('Seeds are created!')
    await db.close()
    console.log('database connection close...')
  }
  catch (err) {
    console.log(err)
  }
})


const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('../models');

(async ()=>{
  await User.sync();
  await User.findOrCreate({
    where:{ username:'admin' },
    defaults:{ password:await bcrypt.hash('admin123',10), role:'admin' }
  });
  console.log('Admin seeded');
  process.exit();
})();

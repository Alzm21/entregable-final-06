const sequelize = require('../utils/connection');
const user = require('./createData/user');
require('../models')

const testMigrate = async () => {
    try {
        await sequelize.sync({force: true});
        console.log("DB connected 🥵🥵🥵");
        await user()
        process.exit()

    } catch (error) {
        console.log(error)
    }
}

testMigrate();
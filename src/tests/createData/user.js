const User = require("../../models/User")

const user = async () => {
    const body = {
        firstName: "Armando",
        lastName: "Carpas",
        email: "armandocarpas@email.com",
        password: "armando1234",
        phone: "76240800"
    }

    await User.create(body)
}

module.exports = user


const login = async (req, res) => {
    res.send('login user')
}

const dashb = async (req, res) => {
    const luckyNumber = Math.floor(Math.random()*100);
    res.status(200).json({msg:`Hello, ${req.user.username}`, secret:`Here is your authorized data, your lucky number is ${luckyNumber}`})
}
module.exports = {login, dashb}
const User = require("./model");

const registerUser = async (req, res) => {
    try {
        const user = await User.create(req.body);

        // const user1 = await User.create( {
        //     username: req.body.username,
        //     email: req.body.email,
        //     password: req.body.password,
        // });

        console.log(user);

        res.status(201).json({ message: "success", 
        user: {
            username: req.body.username,
            email: req.body.email
        }})
        
    } catch (error) {
        res.status(501).json({ errorMsg: error.message, error: error })
    }
};

const login = async (req, res) => {
    try {

        // package user to exclude password or hashed password

        // send user data back in response 

        res.status(201).json({ message: "success", 
        user: {
            username: req.body.username,
            email: req.body.email
        }})
        
    } catch (error) {
        res.status(501).json({ errorMsg: error.message, error: error })
        
    }
}

module.exports = {
    registerUser,
    login,
}
const bcrypt = require("bcrypt");
const User = require("../users/model")

const saltRounds = process.env.SALT_ROUNDS;

const hashPass = async (req, res, next) => {
    try {
        // const hashedPass = await bcrypt.hash( req.body.password, saltRounds );
        // req.body.password = hashedPass;
        
        req.body.password = await bcrypt.hash(req.body.password, parseInt(saltRounds));
        next();

        console.log(req.body);
        
    } catch (error) {
        res.status(501).json({ message: error.message, error: error })
    }
};

const comparePass = async (req, res, next)  => {
    try {

        // get user
        // const savedUser = await User.findOne({ where: { username: req.body.username }});
        req.user = await User.findOne({ where: { username: req.body.username }});
        
        
        // compare passwords
        // const match = bcrypt.compare(req.body.password, savedUser.password);
        const match = await bcrypt.compare(req.body.password, req.user.password);


        // if no match - respond with 500 error message "passwords do not match"
        if(match) {
            next();
        } else {
            // res.status(501).json({ message: error.message, error: error })
            throw new Error("passwords do not match");
        }

        console.log (req.body);
        // next();
        
    } catch (error) {
        
        res.status(501).json({ message: error.message, error: error });
        
    }
}


module.exports = {
    hashPass,
    comparePass
}
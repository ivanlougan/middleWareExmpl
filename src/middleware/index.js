const bcrypt = require("bcrypt");
const User = require("../users/model")

const saltRounds = process.env.SALT_ROUNDS;

const hashPass = async (req, res, next) => {
    try {
        // const hashedPass = await bcrypt.hash( req.body.password, saltRounds );
        // req.body.password = hashedPass;
        
        req.body.password = await bcrypt.hash(req.body.password, saltRounds);
        next();

        console.log(req.body);
        
    } catch (error) {
        res.status(501).json({ message: error.message, error: error })
    }
};

const comparePass = async (req, res, next)  => {
    try {

        // get user
        const savedUser = await User.findOne({});
        
        
        // compare passwords
        const match = bcrypt.compare(req.body.password, savedUser.password);


        // if no match - respond with 500 error message "passwords do not match"
        if(match) {
            next();
        } else {
            throw new Error("passwords do not match");
        }

        // if match - next function


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
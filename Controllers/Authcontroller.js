const Usermodel = require("../Models/users");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required', success: false });
        }

        const user = await Usermodel.findOne({ email });
        if (user) {
            return res.status(409).json({
                message: 'User already exists, you can login',
                success: false,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userModel = new Usermodel({ name, email, password: hashedPassword });
        await userModel.save();

        res.status(201).json({ message: 'Signup successfully', success: true });
    } catch (err) {
        console.error(err); 
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

const login = async (req, res) => {
    try {
        const {email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required', success: false });
        }

        const user = await Usermodel.findOne({ email });
        if (!user) {
            return res.status(403).json({
                message: 'Authentication Failed email or password is wrong',
                success: false,
            });
        }
        const isPassequal = await bcrypt.compare(password,user.password)
        if(!isPassequal){
            return res.status(403)
            .json({
                message: 'Authentication Failed email or password is wrong',
                success: false,
            });
        }

        const jwtToken = jwt.sign(
            {email:user.email,_id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:'24h'}
        )
        
     

        res.status(200).json({ message: 'login successfully', success: true ,jwtToken,email});
    } catch (err) {
        console.error(err); 
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

module.exports = {
    signup,
    login
};

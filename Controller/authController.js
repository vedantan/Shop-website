const User = require("../model/UserauthModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");




// for customer signup
const customerSignup = async (req, resp) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        resp.status(401)
        return resp.send("All fields are mandotary")
    }


    // to find weather email is already registered
    const useravailabe = await User.findOne({ email })
    if (useravailabe) {
        resp.status(400)
        return resp.send("This email has been already registered")
    }

    // to hash the password
    const hassedpassword = await bcrypt.hash(password, 10)
    console.log(`hashed password is ${hassedpassword}`)

    const user = new User({
        username,
        email,
        password: hassedpassword
    })

    user.save();
    console.log(user);
    resp.send("Signed up successfully ")
}


// for customer login

const customerlogin = async (req, resp) => {
    const { email, password } = req.body;
    if (!email || !password) {
        resp.status(404)
        return resp.send("All fields are mandotary")
    }

    const user = await User.findOne({ email })

    // to match with hash password
    if (user && (await bcrypt.compare(password, user.password))) {
        const accesstoken = jwt.sign({
            user: {
                // username = user.username,
                email: user.email,
                id: user.id
            }
        },
            process.env.ACCESS_TOKEN_SECREATE,
            { expiresIn: "15m" }
        )
        resp.send({ accesstoken, user })
    } else {
        resp.status(400);
        return resp.send("email or password is not valid")
    }
    // const uemail = await User.find({ email: req.body.email })
    // const upassword = await User.find({ password: req.body.password })
}

// to see current user
const currentuser = async (req, resp) => {
    resp.json(req.user)
}

module.exports = { customerSignup, customerlogin, currentuser }
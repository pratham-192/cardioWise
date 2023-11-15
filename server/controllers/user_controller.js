const User = require('../models/user');
const Child = require('../models/child');
const Message = require('../models/message');
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const axios = require('axios');
const fastcsv = require('fast-csv');
const bcrypt = require('bcrypt');
module.exports.profile = function (req, res) {
    // return res.render('user_profile', {
    //     title: 'User Profile'
    // })
    return res.status(200).send("profile page");
}


module.exports.sendmail = async (req, res) => {
    const { password, name, email, user_id } = req.body;

    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "prathammehtani23@gmail.com",
            pass: "iqavnovejfbaogjl"
        }
    });
    const mailOptions = {
        from: "prathammehtani23@gmail.com",
        to: email,
        subject: "Welcome to Our Application",
        text: `Hello ${name},\n\nWelcome to our application! Your account has been created successfully.\n\nYour login credentials:\nUser-Id: ${user_id}\nPassword: ${password}\n\nThank you!`,
    };
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "User created and email sent successfully" });
    } catch (error) {
        console.log("Error sending email: ", error);
        res.status(200).json({ error: "Failed to send email" });
    }
};


module.exports.create = async function (req, res) {
    try {
        let user = await User.findOne({ user_id: req.body.user_id });
        if (!user) {
            let newuser = await User.create({
                user_id: req.body.user_id,
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                category: req.body.category,
                zone: req.body.zone,
                address: req.body.address,
                aadharCardNo: req.body.aadharCardNo,
                contactNo: req.body.contactNo
            });

            await axios.post('http://localhost:3000/users/sendmail', {
                password: req.body.password,
                name: req.body.name,
                email: req.body.email,
                user_id: req.body.user_id
            });
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            newuser.password = hashedPassword;
            await newuser.save();
            return res.status(200).json({ response: newuser });
        } else {
            return res.status(200).send("User already exists");
        }
    } catch (err) {
        console.log("Error creating user: ", err);
        return res.status(500).send("Error in creating user");
    }
};



module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        // return res.redirect('/users/profile');
        return res.status(200).send("user is authenticated");
    }

    // return res.render('UserSignIn',{
    //     title:"Sign In Page"
    // });
    return res.status(200).send("user is not authenticated");
}
module.exports.signup = function (req, res) {
    if (req.isAuthenticated()) {
        // return res.render('signup',{
        //     title:"add employees"
        // });
        return res.status(200).send("you can now add employees");
    }

    // return res.render('UserSignIn',{
    //     title:"Sign In Page"
    // });
    return res.status(200).send("you are not signed in");
}
module.exports.AdminSignIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.status(200).send("you are now logged in");
    }

    // return res.render('AdminSignIn',{
    //     title:"Sign In Page"
    // });

    return res.status(200).send("you are not signed in");
}
//sign in and create session for the user
module.exports.createSession = function (req, res) {
    return res.status(200).send(req.user);
}

module.exports.DestroySession = function (req, res) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.status(200).send("successfully logged out");
    });
}

module.exports.signupadmin = function (req, res) {
    // return res.render('signupadmin',{
    //     title:'signupadmin'
    // });
    return res.status("admin signed up");
}
module.exports.getLoggedInUser = function (req, res) {
    if (req.isAuthenticated) {
        return res.status(200).json({ response: req.user });
    }
    return res.status(200).send("log in first");
}

module.exports.update = async function (req, res) {
    // console.log(req.body)
    // if(req.body.password!=req.body.confirmpassword)
    // {
    // return res.status(404).send("password doesn't matches");
    // }
    try {
        let user = await User.findOne({ user_id: req.body.user_id });
        if (user) {
            user.user_id = req.body.user_id;
            user.name = req.body.name;
            user.email = req.body.email;
            user.category = req.body.category;
            user.zone = req.body.zone;
            user.address = req.body.address;
            user.aadharCardNo = req.body.aadharCardNo;
            user.contactNo = req.body.contactNo;
            user.save();

            return res.status(200).json({ "response": user });
        } else {
            return res.status(200).send("create user");

        }
    } catch (err) {
        res.status(200).send("error in updating user");
    }
}
module.exports.getWorkerbyId = async function (req, res) {
    try {
        let worker = await User.findOne({ user_id: req.body.user_id }).populate({
            path: 'alloted_children',
            select: '-uploaded_documents'
        });
        res.status(200).json({
            response: worker
        })
    } catch (err) {
        return res.status(200).send("error in getting worker by id");
    }
}
// module.exports.getManagerbyId=async function(req,res){
//     try{
//         let manager=await User.findOne({user_id:req.body.user_id, category:'manager'}).populate('alloted_children');
//         res.send(200).json({
//             response:manager
//         })
//     }catch(err){
//         return res.status(200).send("error in getting manager by id");
//     }
// }


module.exports.imageUpload = async function (req, res) {
    try {
        let user = await User.findOne({ user_id: req.body.user_id });
        if (!user) return res.status(200).send("user doesn't exists");
        user.avatar = req.file.buffer;
        user.save();
        return res.status(200).send("file uploaded successfully");
    } catch (err) {
        console.log(err);
        return res.status(200).send("error in uploading image");

    }
}
module.exports.getImage = async function (req, res) {
    try {
        let user = await User.findOne({ user_id: req.body.user_id });
        if (user.avatar) {
            return res.status(200).json({
                response: user.avatar
            })
        }
        else {
            return res.status(200).send("avatar is not uploaded yet");
        }
    } catch (err) {
        console.log(err);
        return res.status(200).send("error in getting image");
    }
}

module.exports.deleteImage = async function (req, res) {
    try {
        let user = await User.findOne({ user_id: req.body.user_id });
        user.avatar = null;
        user.save();
        return res.status(200).send("profile image deleted successfully");
    } catch (err) {
        return res.status(200).send("error in deleting the image");
    }
}

module.exports.getUnSeenMessages = async function (req, res) {
    try {
        let messages = await Message.find({ to_user: req.body.to_user_id, seen: 0 });
        return res.status(200).json({
            response: messages
        })
    } catch (err) {
        return res.status(200).send("error in gettng seen messages");
    }
}
module.exports.getMessages = async function (req, res) {
    try {
        let messages = await Message.find({ to_user: req.body.to_user_id }).populate({
            path: 'from_user to_user',
            select: 'name category'
        });
        return res.status(200).json({
            response: messages
        })
    } catch (err) {
        return res.status(200).send("error in getting messages");
    }
}
module.exports.getMessagebyId = async function (req, res) {
    try {
        let message = await Message.findById(req.body.messageId).populate({
            path: 'from_user to_user',
            select: 'name category'
        });
        message.seen = 1;
        message.save();
        return res.status(200).json({
            response: message
        })
    } catch (err) {
        return res.status(200).send("error in getting messages by id");
    }
}
module.exports.markAllSeen = async function (req, res) {
    try {
        let messages = await Message.find({ to_user: req.body.to_user_id });
        // console.log(messages);
        for (let u of messages) {
            u.seen = 1;
            u.save();
        }
        return res.status(200).json({
            response: messages
        })
    } catch (err) {
        console.log(err);
        return res.status(200).send("error in marking all messages as seen");
    }
}
module.exports.deleteAllMsg = async function (req, res) {
    try {
        let messages = await Message.deleteMany({ to_user: req.body.to_user_id });
        return res.status(200).send("all messages are deleted");
    } catch (err) {
        return res.status(200).send("error in deleting all messages");
    }
}

module.exports.sendResetMail = async (req, res) => {
    try {
        let user = await User.findOne({ user_id: req.body.user_id });
        if (user) {
            if (!user.email) return res.status(200).send("email doesn't exists");
            // console.log(user.email);
            const newPassword = crypto.randomBytes(4).toString("hex");
            // console.log(newPassword);
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
            await user.save();
            const transporter = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                    user: "prathammehtani23@gmail.com",
                    pass: "iqavnovejfbaogjl"
                }
            });
            const mailOptions = {
                from: "prathammehtani23@gmail.com",
                to: user.email,
                subject: "Reset Password",
                text: `Hello ${user.name},\n\nYou have your new password .\n\nYour login credentials:\nUser-Id: ${user.user_id}\nPassword: ${newPassword}\n\nThank you!`,
            };
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: "User created and email sent successfully" });
        }
        else {
            return res.status(200).send("user doesn't exists");
        }

    } catch (error) {
        console.log("Error sending email: ", error);
        res.status(200).json({ error: "Failed to send email" });
    }
};

module.exports.csvDownload = async function (req, res) {
    try {
        let users = await User.find({})
            .populate({
                path: 'alloted_children',
                select: 'childName'
            })
            .select('-password -avatar')
        //   console.log(users);
        const csvData = [];
        const header = [
            'User Id',
            'Name',
            'Email',
            'category',
            'Allocated Children',
            'Zone',
            'Address',
            'Aadhar Card No.',
            'contact No'
        ];
        csvData.push(header);

        users.forEach(user => {
            const allocatedChildren = user.alloted_children.map(child => child.childName).join(', ');
            const record = [
                user.user_id,
                user.name,
                user.email,
                user.category,
                allocatedChildren,
                user.zone,
                user.address,
                user.aadharCardNo,
                user.contactNo
            ];
            csvData.push(record);
        });

        const csvStream = fastcsv.format({ headers: true }).transform(row => row.map(value => value === undefined ? '' : value));

        res.setHeader('Content-Disposition', 'attachment; filename=user_details.csv');
        res.set('Content-Type', 'text/csv');

        csvStream.pipe(res);
        csvData.forEach(data => csvStream.write(data));
        csvStream.end();

    } catch (err) {
        console.log(err);
        return res.status(200).send('Error in downloading CSV file of user');
    }
};

module.exports.getAllocatedChildren = async function (req, res) {
    try {
        let user = await User.findOne({ user_id: req.body.user_id })
            .populate({
                path: 'alloted_children',
                select: 'child_id childName caseStatus shelterHome'
            })
            .select('alloted_children');
        return res.status(200).json({
            response: user
        })
    } catch (err) {
        console.log(err);
        return res.status(200).send("error in getting all allocated children");
    }
}
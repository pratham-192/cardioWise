const express=require('express');
const passport=require('passport');
const router=express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage, limits:{fileSize :10*1024*1024} });
const userController=require('../controllers/user_controller');
// const authentication=require('../controllers/authentication');
router.get('/signupadmin',userController.signupadmin);


router.get('/Sign-In',userController.signIn);
router.get('/sign-out',userController.DestroySession);
router.get('/admin/signin',userController.AdminSignIn);
// router.get('/users/Sign-In',userController.AdminsignIn);
router.get('/signup',userController.signup);
router.post('/create',userController.create);
router.post('/update',userController.update);
// router.get('/profile',userController.profile);
router.post('/createSession',passport.authenticate(
    'local',//local passport session is used
    {failureRedirect:'/users/Sign-In'},
),userController.createSession)


// //get logged in user
router.get('/loggedin_user',userController.getLoggedInUser);

router.post('/image_upload',upload.single('file'),userController.imageUpload);
router.post('/get_image',userController.getImage);
router.post('/delete_image',userController.deleteImage);

router.post('/sendmail',userController.sendmail);

router.post('/reset_password',userController.sendResetMail);

router.get('/download_csv',userController.csvDownload);

router.post('/get_user_google',userController.getUserGoogle);

router.get('/all_users',userController.allUsers);

router.post('/getuserbyemail',userController.getUserByEmail);

router.post('/cvd_prediction',userController.cvdPrediction);
router.post('/cvd_history',userController.cvdHistory);
router.post('/cvd_report',userController.cvdReport);
router.post('/chat',userController.chat);
router.post('/message/get_message',userController.getMessagebyAdmin);

router.post('/message/create',userController.createMessage);
router.get('/get_messages',userController.getMessages);

// router.post('/createsessionjwt',authentication.createSession);
module.exports=router;
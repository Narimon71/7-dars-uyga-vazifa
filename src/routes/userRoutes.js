
const express = require('express');
const router = express.Router();
const { registerUser, getUserProfile, updateUserProfile, deleteUserProfile } = require('../controllers/userController');

router.post('/register', registerUser);
router.get('/profile/:username', getUserProfile);
router.get('/profile/email/:email', getUserProfile);
router.put('/profile/:username', updateUserProfile);
router.put('/profile/email/:email', updateUserProfile);
router.delete('/profile/:username', deleteUserProfile);
router.delete('/profile/email/:email', deleteUserProfile);

module.exports = router;

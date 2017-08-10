var express = require('express');
var router = express.Router();
var indexController = require('../controllers/index');

router.get('/', indexController.index );
router.get('/signup', indexController.signup);
router.get('/feed', indexController.feed );
router.get('/addpost', indexController.addpost );
router.get('/deletepost/:post', indexController.deletePost );
router.get('/deleteuser/:userEmail', indexController.deleteuser );
router.get('/deletecomment/:comment', indexController.deletecomment );
router.get('/showcomments', indexController.showcomment );
router.get('/dash', indexController.dash );

router.post('/regUser', indexController.regUser );
router.post('/lgnUser', indexController.logUser );
router.post('/addpostData', indexController.addpostData );
router.post('/addcomment/:added_by/:post', indexController.addComment );



module.exports = router;

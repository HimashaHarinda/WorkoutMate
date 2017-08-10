var sessionUser;
var sessionUserEmail;
module.exports.index = function(req, res){    
  res.render('login');    
};

module.exports.signup = function(req, res){    
  res.render('signup');    
};

module.exports.dash = function(req, res){    
  	var database = req.db;
	var postCollection = database.get('users');

    postCollection.find({},{},function(e,users)
    {
		res.render('dash', {"dash" : users,sessionUser:sessionUser});  
    });   
};

module.exports.addpost = function(req, res){    
  	var database = req.db;
	var postCollection = database.get('posts');

    postCollection.find({added_by : sessionUserEmail},{},function(e,posts)
    {
		res.render('addpost', {"addpost" : posts,sessionUser:sessionUser});  
    });  
};


module.exports.feed = function(req, res){    
    var database = req.db;
	var postCollection = database.get('posts');

    postCollection.find({},{},function(e,posts)
    {
		res.render('feed', {"feed" : posts,sessionUser:sessionUser});  
    });
};

module.exports.showcomment = function(req, res){    
  	var database = req.db;
    var collection = database.get('userpostcomments');

    collection.find({},{},function(e,comments)
    {
        res.render('showcomments', {"showcomments" : comments,sessionUser:sessionUser});
    });   
};

module.exports.regUser = function(req, res){    
  // Set our internal DB variable
    var database = req.db;
	var userCollection = database.get('users');

    

    /*get values from form */
	var email = req.body.email;
    var password= req.body.password;
    var username=req.body.fullname;
    var userType = "admin";

	
	 

				userCollection.insert({
		           "userEmail" : email,
		           "FullName" : username,
                   "userPassword" : password,
                    "userType": userType
		       }, function (err, doc) {
		       	  if(err) 
		       	  {
                      /*if fails, print error */
		       	  	  res.send("Problem in insertion..");
		       	  }

		       	  else 
		       	  {
		       	  	  res.redirect('/');
		       	  }
		       
    			}); 
    /*insert  into db */
	
};


module.exports.logUser = function(req, res){    
    var database = req.db;
	var collection = database.get('users');

	var userEmail = req.body.email;
    var userPass = req.body.pass;
     


 collection.findOne({userEmail:userEmail}, function(err,user)
 {
	if(user.userPassword === userPass)
	{
        if(user.userType === "user")
            {
                sessionUser = user.FullName;
                sessionUserEmail = user.userEmail;
                res.redirect("/feed");
            }
        else{
				sessionUser = user.FullName;
                sessionUserEmail = user.userEmail;
	            res.redirect("/dash");
        }
        
	}
	else 
	{
		 res.redirect("/");
	}
	
  });
};


module.exports.addpostData = function(req, res){    
    /*set db variable */
	var database = req.db;

	/*set collection */
	var collection = database.get('posts');

    var post = req.body.post;
    var addeduser= sessionUserEmail;

   

    /*insert  into db */
	collection.insert({
		           "post" : post,
		           "added_by" : addeduser,
		           "added_date" : Date()
		       }, function (err, doc) {
		       	  if(err) 
		       	  {
                      /*if fails, print error */
		       	  	  res.send("Problem in insertion..");
		       	  }

		       	  else 
		       	  {
		       	  	   /*redirect to showrecipes page */
		       	  	  res.redirect("addpost");
		       	  }
		       
	});
};

module.exports.deletePost = function(req, res){


    var database = req.db;
	var collection = database.get('posts');
	var postedpost = req.params.post;
    collection.remove({post:postedpost},function(err, uname)
    {
          if(err)
          {
        	res.send(err);
          }
          else
          {
        	res.redirect('back');
           }
    });
};

module.exports.deleteuser = function(req, res){


    var database = req.db;
	var collection = database.get('users');
	var user = req.params.userEmail;
	var type = "user";
    collection.remove({userEmail:user},{userType:type},function(err, uname)
    {
          if(err)
          {
        	res.send(err);
          }
          else
          {
        	res.redirect('back');
           }
    });
};


module.exports.addComment = function(req, res){
    	// commit the new comment to DB
	Activity.findOneAndUpdate({
		'_id': req.body.postId
	}, {
		$push: {
			comments: {
				commentOwnerUsername: req.body.commentOwnerUsername,
				comment: req.body.comment,
				fullName:req.body.fullName,
			}
		}
	}).lean().exec(function (err,post) {
		if (post) {
			console.log('error:' + err);
			return res.status(201).json({
				status: 'success',
				message: 'Successfully Added New Comment',
				comments:post.comments
			});
		} else {
            console.log("errxor:"+post);
			return res.status(500).json({
				status: 'error',
				message: 'couldnt add comment',
			});
		}
	});
};


module.exports.deletecomment = function(req, res){


    var database = req.db;
	var collection = database.get('userpostcomments');
	var comment = req.params.comment;
    collection.remove({comment:comment},function(err, uname)
    {
          if(err)
          {
        	res.send(err);
          }
          else
          {
        	res.redirect('back');
           }
    });
};

module.exports.addComment = function(req, res){
  	var database = req.db;

	/*set collection */
	var collection = database.get('userpostcomments');

    /*get values from form */
	var comment = req.body.comment;
    var commentedUserEmail= sessionUserEmail;
	var post = req.params.post;
	var postAddedUser = req.params.added_by;
    /*insert  into db */
	collection.insert({
		           "postAddedUser" : postAddedUser,
		           "post" : post,
                   "commentedUser" : commentedUserEmail,
                	"comment": comment
		       }, function (err, doc) {
		       	  if(err)
		       	  {
                      /*if fails, print error */
		       	  	  res.send("Problem in insertion..");
		       	  }

		       	  else
		       	  {

		       	  	  res.redirect('back');
		       	  }

	});


};


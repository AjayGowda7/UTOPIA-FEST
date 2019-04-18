var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");
var geocoder = require('geocoder');
var { isLoggedIn, checkUserCampground, checkUserComment, isAdmin, isSafe } = middleware; // destructuring assignment

// Define escapeRegex function for search feature
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

//INDEX - show all campgrounds
router.get("/", function(req, res){
  if(req.query.search && req.xhr) {
      const regex = new RegExp(escapeRegex(req.query.search), 'gi');
      // Get all campgrounds from DB
      Campground.find({name: regex}, function(err, allCampgrounds){
         if(err){
            console.log(err);
         } else {
            res.status(200).json(allCampgrounds);
         }
      });
  } else {
      // Get all campgrounds from DB
      Campground.find({}, function(err, allCampgrounds){
         if(err){
             console.log(err);
         } else {
            if(req.xhr) {
              res.json(allCampgrounds);
            } else {
              res.render("campgrounds/index",{campgrounds: allCampgrounds, page: 'campgrounds'});
            }
         }
      });
  }
});
//NEW - show form to create new campground
router.get("/moment", isLoggedIn, function(req, res){
   res.render("campgrounds/moment"); 
});
router.get("/day1", isLoggedIn, function(req, res){
   res.render("campgrounds/day1"); 
});
router.get("/day2", isLoggedIn, function(req, res){
   res.render("campgrounds/day2"); 
});
router.get("/day3", isLoggedIn, function(req, res){
   res.render("campgrounds/day3"); 
});
router.get("/day4", isLoggedIn, function(req, res){
   res.render("campgrounds/day4"); 
});
router.get("/day5", isLoggedIn, function(req, res){
   res.render("campgrounds/day5"); 
});
router.get("/day6", isLoggedIn, function(req, res){
   res.render("campgrounds/day6"); 
});
router.get("/day7", isLoggedIn, function(req, res){
   res.render("campgrounds/day7"); 
});
router.get("/day8", isLoggedIn, function(req, res){
   res.render("campgrounds/day8"); 
});


router.get("/about",isLoggedIn,function(req, res) {
    res.render("campgrounds/about");
})

router.get("/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err || !foundCampground){
            console.log(err);
            req.flash('error', 'Sorry, that campground does not exist!');
            return res.redirect('/campgrounds');
        }
        console.log(foundCampground)
        //render show template with that campground
        res.render("campgrounds/show", {campground: foundCampground});
    });
});

module.exports = router;

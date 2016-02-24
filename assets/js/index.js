$(function() {
'use strict';

//THIS CODE MAKES THINGS POP UP FROM JSON. BUT IT DOSEN'T USE LODASH  - WORKS
// $.getJSON(("http://api.github.com/users/Octocat"), function(thing){
//   $("#theName").html(thing.name);
//   $("#theLogin").html(thing.login);
//   $("#company").html(thing.company);
//   $("#theLocation").html(thing.location);
//   $("#html_url").html(thing.html_url);
//   $("#blog").html(thing.blog);
//   $("#joinDate").html(thing.created_at);
  // $("#profileImage").html(thing.avatar_url);
//})

var user = "Octocat";
$(".searchBar").keypress(function(e){
  var code = (e.keyCode ? e.keyCode : e.which);
  //I got this from: http://stackoverflow.com/questions/3462995/jquery-keydown-keypress-keyup-enterkey-detection
  //this gets the keycode for the key that was pressed.
  if(code ==13)
  {
    console.log("SUBMITTED!");
    user = $(".searchBar").val();
    console.log(user);
    $.getJSON(("http://api.github.com/users/" + user), update);
  }
  // console.log(user);
})


// http://api.github.com/users/Octocat <---- the online location
// apis/github/users/octocat.json <---- the local location


$.getJSON(("http://api.github.com/users/" + user), update);

function update(data){
  var lodashVar = _.template("<%- m.name %> <%- m.login %> <%- m.company %> <%- m.location %> <%- m.html_url %> <%- m.blog %> <%- m.created_at %> <%- m.avatar_url %> <%- m.starred_url %> <%- m.followers %> <%- m.following %>", {variable: "m"});
  var dataName = lodashVar({ name: data.name});
  var dataLogin = lodashVar({ name: data.login});
  var dataCompany = lodashVar({ name: data.company});
  var dataLocation = lodashVar({ name: data.location});
  var dataUrl = lodashVar({ name: data.html_url});
  var dataBlog = lodashVar({ name: data.blog});
  var dataJoin = lodashVar({ name: data.created_at});
  var dataImg = lodashVar({ name: data.avatar_url});
  var dataFollowing = lodashVar({ name: data.following});
  var dataFollowers = lodashVar({ name: data.followers});

  var StarredURL = lodashVar({ name: data.starred_url});
  console.log(StarredURL);
  // $.getJASO

  $("#theName").html(dataName);
  $("#theLogin").html(dataLogin);
  $("#company").html(dataCompany);
  $("#theLocation").html(dataLocation);
  $("#html_url").html(dataUrl);
  $("#blog").html(dataBlog);
  $("#joinDate").html(dataJoin);
  $("#profileImage").attr("src", dataImg);

  $(".followingNum").html(dataFollowing);
  if(dataFollowers > 1000)
  {
    dataFollowers = Math.floor(dataFollowers/100) * 100; //this gets a nice round number of ks for us to display.
    dataFollowers = dataFollowers/1000;
    $(".followersNum").html(dataFollowers + "k");
  }
  else
  {
    $(".followersNum").html(dataFollowers);
  }

  $.getJSON(("http://api.github.com/users/" + user + "/repositories.json") function(data2){



  });//end json 2 call.

}//end update.


//THIS CODE USES LODASH TO MAKE A TEMPLATE TO POP INFO IN. - WORKS
// var goop = _.template("<%- m.name %>", {variable: "m"});
// var nameWrite = goop({ name: thing.name});
//
// $('#nameHTML').html(nameWrite);



$(".tab").click(function() {
  $(".tab").removeClass("activeTab");
  $(this).addClass("activeTab");
});

$(".accordion1").click(function() {
  $(".contributionWrapper").addClass("reveal");
  $(".repoWrapper").removeClass("reveal");
  $(".publicActivityWrapper").removeClass("reveal");
});

$(".accordion2").click(function() {
  $(".contributionWrapper").removeClass("reveal");
  $(".repoWrapper").addClass("reveal");
  $(".publicActivityWrapper").removeClass("reveal");
});

$(".accordion3").click(function() {
  $(".contributionWrapper").removeClass("reveal");
  $(".repoWrapper").removeClass("reveal");
  $(".publicActivityWrapper").addClass("reveal");
});

$(".navLi").click(function() {
  $(".navLi").removeClass("navLiClick");
  $(this).addClass("navLiClick");
});

});

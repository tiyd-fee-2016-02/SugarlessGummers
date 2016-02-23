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

// http://api.github.com/users/Octocat <---- the online location
// apis/github/users/octocat.json <---- the local location

$.getJSON(("http://api.github.com/users/Octocat"), function(data){
  var lodashVar = _.template("<%- m.name %> <%- m.login %> <%- m.company %> <%- m.location %> <%- m.html_url %> <%- m.blog %> <%- m.created_at %> <%- m.avatar_url %>", {variable: "m"});
  var dataName = lodashVar({ name: data.name});
  var dataLogin = lodashVar({ name: data.login});
  var dataCompany = lodashVar({ name: data.company});
  var dataLocation = lodashVar({ name: data.location});
  var dataUrl = lodashVar({ name: data.html_url});
  var dataBlog = lodashVar({ name: data.blog});
  var dataJoin = lodashVar({ name: data.created_at});
  var dataImg = lodashVar({ name: data.avatar_url});

  $("#theName").html(dataName);
  $("#theLogin").html(dataLogin);
  $("#company").html(dataCompany);
  $("#theLocation").html(dataLocation);
  $("#html_url").html(dataUrl);
  $("#blog").html(dataBlog);
  $("#joinDate").html(dataJoin);
  $("#profileImage").attr("src", dataImg);

})



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

$(function() {
'use strict';

$.getJSON(("http://api.github.com/users/Octocat"), function(thing){
  $("#userName").html(thing.name);
})


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

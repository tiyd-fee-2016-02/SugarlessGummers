$(function() {
'use strict';

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

});

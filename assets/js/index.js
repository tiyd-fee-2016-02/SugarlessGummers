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

var user = "BestMattEver";

$(".searchBar").keypress(function(e){
  var code = (e.keyCode ? e.keyCode : e.which);
  //I got this code for getting enter from: http://stackoverflow.com/questions/3462995/jquery-keydown-keypress-keyup-enterkey-detection
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

//this gets user profile information
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

  $("#theName").html(dataName);
  $("#theLogin").html(dataLogin);
  $("#company").html(dataCompany);
  $("#theLocation").html(dataLocation);
  $("#html_url").html(dataUrl);
  $("#blog").html(dataBlog);
  var jsonDateArray = convertToTimeArray(dataJoin);
  $("#joinDate").html(" " + jsonDateArray[1] + " " + jsonDateArray[2] + ", " + jsonDateArray[0]);
  $("#profileImage").attr("src", dataImg);
  $(".followingNum").html(dataFollowing);
  $(".pubActEventHolder").html(dataName + "doesn't have any events to show");


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

  //this json call gets all the repo information
  $.getJSON(("http://api.github.com/users/" + user + "/repos"), function(data2){
    //console.log(data2.length);
    var sortedStargazers = data2.sort(sortByProperty("stargazers_count"));
    //console.log(sortedStargazers);

    $(".list").html(" ");
    for(var k=sortedStargazers.length-1; k >= (sortedStargazers.length)-5; k--)
    {
      $(".list").append("<li class='repoListItem'><span class='octicon octicon-repo'></span><span class='repo'><div class='rep repTitle'>&nbsp;" + sortedStargazers[k].name + "</div><div class='rep repDesc'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + sortedStargazers[k].description + "</div><div class='stars'>" + sortedStargazers[k].stargazers_count + "<span class='octicon octicon-star'></span></div></span></li>");
    }//end for loop.

    var sortedLastUpdate = data2.sort(sortByProperty("updated_at"));

    $(".list2").html(" ");
    for(var t=data2.length-1; t >= 0; t--){
      $(".list2").append("<li class='repoListItem2'><span class='repo'><div class='rep repTitle2'>&nbsp;" + sortedLastUpdate[t].name +"</div><div class='rep repDesc2'>&nbsp;" + sortedLastUpdate[t].description + "</div><div class='updates'>&nbsp;updated 5 seconds ago </div><div class='repoStarBranch'><span class='octicon octicon-star'></span>" + sortedLastUpdate[t].stargazers_count + "<span class='octicon octicon-git-branch'></span>" + sortedLastUpdate[t].forks_count + "</div></span></li>")
    }

    //this just verifies that we can get data points from the API
    // var stargazers = [];
    // for(var i = 0; i < data2.length; i++){
    //   console.log(data2[i].stargazers_count);
    // }

  });//end json 2 call.

}//end update.

function convertToTimeArray(dateTime)  //Converting JSON date to workable strings.
{
  var dateTimeArray = [];
  dateTimeArray.push(dateTime.substr(0, 4));  //[0] year
  dateTimeArray.push(dateTime.substr(5, 2));  //[1] month
  dateTimeArray.push(dateTime.substr(8, 2));  //[2] day
  dateTimeArray.push(dateTime.substr(11, 2));  //[3] hour
  dateTimeArray.push(dateTime.substr(14, 2));  //[4] minute
  dateTimeArray.push(dateTime.substr(17, 2));  //[5] second
  return dateTimeArray;
}

var dateNow = convertToTimeArray(new Date().toJSON());

function monthToWord(convertedTimeArray)
{
  switch(convertedTimeArray[1]){
    case '01':
      convertedTimeArray[1]='Jan';
      break;
    case '02':
      convertedTimeArray[1]='Feb';
      break;
    case '03':
      convertedTimeArray[1]='Mar';
      break;
    case '04':
      convertedTimeArray[1]='Apr';
      break;
    case '05':
      convertedTimeArray[1]='May';
      break;
    case '06':
      convertedTimeArray[1]='June';
      break;
    case '07':
      convertedTimeArray[1]='July';
      break;
    case '08':
      convertedTimeArray[1]='Aug';
      break;
    case '09':
      convertedTimeArray[1]='Sep';
      break;
    case '10':
      convertedTimeArray[1]='Oct';
      break;
    case '11':
      convertedTimeArray[1]='Nov';
      break;
    case '12':
      convertedTimeArray[1]='Dec';
      break;
  }//end switch
  return convertedTimeArray;
}//end monthToWord function

function howLongAgo(timeArray)
{
  var now = date().toJSON();
  convertToTimeArray(now);
  if(0)
  {
    //nothing
  }
}//end funct



//tori found this on http://www.levihackwith.com/code-snippet-how-to-sort-an-array-of-json-objects-by-property/
function sortByProperty(property)
{
  'use strict';
  return function (a, b)
    {
      var sortStatus = 0;
      if (a[property] < b[property]) {
          sortStatus = -1;
        } else if (a[property] > b[property]) {
          sortStatus = 1;
        }

        return sortStatus;
    };
  }

//THIS CODE USES LODASH TO MAKE A TEMPLATE TO POP INFO IN. - WORKS
// var goop = _.template("<%- m.name %>", {variable: "m"});
// var nameWrite = goop({ name: thing.name});
//
// $('#nameHTML').html(nameWrite);


// This code just turns on and off the tabs.
$(".tab").click(function() {
  $(".tab").removeClass("activeTab");
  $(this).addClass("activeTab");
});

//Reveals and hides content sections.
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

//Client app for Carbon.to

$(document).ready(function() {	
  
  //Initialize event-bindings
  
  converter = new Carbon.Converter(conversions, index);
  console.log(converter.random())
  
  //Expand the conversion drawer
  $(".toggle-conversions").bind("click", function(){
    var conversions = $(this).siblings(".conversions");
    
    if(conversions.hasClass("opened")){
      conversions.animate({"height": "0px"}, 500, "easeinout");
      conversions.removeClass("opened");
      $(this).removeClass("opened");
    }else{
      conversions.animate({"height": "150px"}, 500, "easeinout");
      conversions.addClass("opened");
      $(this).addClass("opened");
    }
  });
  
  // Add and subtract obs: temporary...
  $("ul.add-subtract li.add").bind("click", function(){
    var number = parseInt($("#left .number").html());
    number = number + 1;
    $("#left .number").html(number);
  });
  
  $("ul.add-subtract li.subtract").bind("click", function(){
    var number = parseInt($("#left .number").html());
    if(number != 0){
      number = number - 1;
      $("#left .number").html(number);
    }
  });
  
});



 /*
  * jQuery Easing v1.1.1 - http://gsgd.co.uk/sandbox/jquery.easing.php
  *
  * Uses the built in easing capabilities added in jQuery 1.1
  * to offer multiple easing options
  *
  * Copyright (c) 2007 George Smith
  * Licensed under the MIT License:
  *   http://www.opensource.org/licenses/mit-license.php
  */

/* Extending jQuery easing functions here with the one required for the player */

jQuery.easing = jQuery.extend({
	easeinout: function(x, t, b, c, d) {
		if (t < d/2) return 2*c*t*t/(d*d) + b;
		var ts = t - d/2;
		return -2*c*ts*ts/(d*d) + 2*c*ts/d + c/2 + b;		
  }
},jQuery.easing);

var Carbon = Carbon || {};
$.extend(Carbon, {
  Class: function() {
    return function() {
      this.initialize.apply(this, arguments);
    };
  }
});

Carbon.Converter = Carbon.Class();
Carbon.Converter.prototype = {
  initialize: function(conversions, index) {
    this.conversions = conversions;
    this.index = index;
    this.current = 0;
  },
  find: function(id){
    return this.conversions[id];
  },
  random: function(){
    this.current = rand(this.index.length)
    return this.conversions[this.index[this.current]];
  },
  next: function(){
    this.current ++;
    if (this.current >= this.index.length) this.current = 0;
    return this.conversions[this.index[this.current]];
  },
  previous: function(){
    this.current --;
    if (this.current < 0) this.current = this.index.length-1;
    return this.conversions[this.index[this.current]];
  },
  
}

function rand(n){
  return ( Math.floor ( Math.random() * n ) );
}

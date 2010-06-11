var flicker_store = 0;
//Client app for Carbon.to

$(document).ready(function() {	
  
  //Initialize event-bindings
  
  converter = new Carbon.Converter(conversions, index);
  converter.paint_left(true);

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
  
  // Add and subtract
  $("ul.add-subtract li.add").bind("click", function(){
    var conv = $(this).parent().parent()
    if(conv.attr("id") == "left"){
      var amount = converter.left_amount();
      if (amount < 1){
		amount = 1;
	  }else{
	  	amount = amount + 1;
	  }
      conv.find(".number").html(amount);
      converter.paint_right(true);
    }else{
      var amount = converter.right_amount();
      if (amount < 1){
		amount = 1;
	  }else{
	  	amount = amount + 1;
	  }
      conv.find(".number").html(amount);
      converter.paint_left(true);
    }
  });
  
  // Function for resetting to one
  $("ul.add-subtract li.r").bind("click", function(){
    var conv = $(this).parent().parent()
    if(conv.attr("id") == "left"){
      var amount = converter.left_amount();
      amount = 1;
      conv.find(".number").html(amount);
      converter.paint_right(true);
	  //log.info("Reset "+ this.left_data().slug);
    }else{
      var amount = converter.right_amount();
      amount = 1;
      conv.find(".number").html(amount);
      converter.paint_left(true);
	  //log.info("Reset "+ this.right_data().slug);
    }
  });

  $("ul.add-subtract li.subtract").bind("click", function(){
    var conv = $(this).parent().parent()
    if(conv.attr("id") == "left"){
      var amount = converter.left_amount();
      if(amount != 0) amount = amount - 1;
      conv.find(".number").html(amount);
      converter.paint_right(true);
    }else{
      var amount = converter.right_amount();
      if(amount != 0) amount = amount - 1;
      conv.find(".number").html(amount);
      converter.paint_left(true);
    }
  });
  
  $(".conversions ul li").bind("click", function(){
    if ($('#'+$(this).attr("class")).length == 0){
      $(this).parent().parent().siblings(".inner-converter").attr("id", $(this).attr("class"));
      $(this).parent().parent().parent().find('div.unit').css("color", $(this).css("background-color")).css('text-shadow',"0 0 3px "+$(this).css("background-color"));
      if ($(this).parent().parent().parent().attr('id') == "left"){
        converter.paint_right(false);
        converter.paint_left(true);
      }else{
        converter.paint_left(false);
        converter.paint_right(true);      
      }

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
  data: function(id){
    return this.conversions[id];
  },
  random: function(){
    this.current = rand(this.index.length)
	// Avoiding haveing 0 vs 0 or CO2 vs CO2
	while ((this.current.right_amount() < 1) || (this.current.right_amount == this.current.left_amount)) {
		this.current = rand(this.index.length)
		};
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

  calculate_amount: function(slug, co2){
    return co2/this.conversions[slug].carbon;
  },
  
  left:function(){
    return $('#left div.inner-converter');
  },

  left_data:function(){
    return this.data(this.left()[0].id);
  },
  
  left_amount:function(){
    amount = this.left().find('.number').html();
	if (amount == "&lt;1"){
		amount = "0";
	};
    return parseInt(amount);
    
  },
  
  left_co2:function(){
    return this.left_amount()*this.left_data().carbon;
  },


  right:function(){
    return $('#right div.inner-converter');
  },

  right_data:function(){
    return this.data(this.right()[0].id);
  },
  
  right_amount:function(){
    var amount = this.right().find('.number').html();
	if (amount == "&lt;1"){
		amount = "0";
	};
    // amount = amount.replace('&lt;','');
    return parseInt(amount);
  },
  
  right_co2:function(){
    return this.right_amount()*this.right_data().carbon;
  },
    
  paint_left: function(recalculate){
    var container = this.left();
    var number = container.find('.number');
    var unit = container.find('.unit');
    var html_amount = '';
    
    if(recalculate){
      var amount = Math.round(this.calculate_amount(this.left_data().slug,this.right_co2()));
      var do_spin = ((amount != this.left_amount()) && this.left_amount != 0 );
      if(amount == 0 && this.right_amount() != 0){
        html_amount = "&lt;1";
      }else{
        html_amount = amount.toString();
      }
      if (do_spin){
        this.spin_number(number, html_amount, amount.toString().length);
      }else{
        number.html(html_amount);
      }
      number.css('font-size',this.font_size(amount.toString().length));
      number.css('padding-top',this.font_padding(amount.toString().length));

    } 
    
    unit.html(this.conversions[container.attr("id")].unit);
	log.info(this.left_data().slug + " in " + this.right_data().slug);
  },

  paint_right: function(recalculate){
    var container = this.right();
    var number = container.find('.number');
    var unit = container.find('.unit');
    var html_amount = '';
    
	
    if(recalculate){
      var amount = Math.round(this.calculate_amount(this.right_data().slug,this.left_co2()));
      var do_spin = ((amount != this.right_amount()) && this.right_amount != 0 );
      if(amount == 0 && this.left_amount() != 0){
        html_amount = "&lt;1";
      }else{
        html_amount = amount.toString();
      }
      if (do_spin){
		this.spin_number(number, html_amount, amount.toString().length);
      }else{
        number.html(html_amount);
      }
      number.css('font-size',this.font_size(amount.toString().length));
      number.css('padding-top',this.font_padding(amount.toString().length));
    }

    unit.html(this.conversions[container.attr("id")].unit);
		
	log.info(this.left_data().slug + " in " + this.right_data().slug);
  },
  
  font_size:function(digits){
    switch(digits){
      case 1:
      case 2:
      case 3:
        return "150px"
        break;
      case 4:
        return "130px"
        break;
      case 5:
        return "110px"
        break;
      case 6:
        return "90px"
        break;
      case 7:
        return "70px"
        break;
      case 8:
        return "50px"
        break;
      case 9:
      case 10:
      case 11:
        return "40px"
        break;
      case 12:
      case 13:
      case 14:
        return "30px"
        break;
      case 15:
      case 16:
      case 17:
      case 18:
      case 19:
      case 20:
        return "28px"
        break;
      default:  
        return "10px"
        break;
      
    }
  },
  
  font_padding:function(digits){
    switch(digits){
      case 1:
      case 2:
      case 3:
        return "0px"
        break;
      case 4:
        return "20px"
        break;
      case 5:
        return "40px"
        break;
      case 6:
        return "60px"
        break;
      case 7:
        return "80px"
        break;
      case 8:
        return "90px"
        break;
      case 9:
      case 10:
      case 11:
        return "102px"
        break;
      case 12:
      case 13:
      case 14:
        return "102px"
        break;
      case 15:
      case 16:
      case 17:
      case 18:
      case 19:
      case 20:
        return "105px"
        break;
      default:  
        return "110px"
        break;
      }
  },
  
  spin_number: function(number, html_amount, amount_length){
    var foo = 0;
    for(i = 0; i < 20; i++){
      foo += 20;
      setTimeout(function(){
        number.html(rand(Math.pow(10, amount_length)));
      }, foo);
    }
    setTimeout(function(){
      number.html(html_amount);
    }, 400);  
  }
}


function rand(n){
  return ( Math.floor ( Math.random() * n )  );
}
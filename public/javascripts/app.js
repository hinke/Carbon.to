//Client app for Carbon.to

$(document).ready(function() {	
  
  //Initialize event-bindings
  
  converter = new Carbon.Converter(conversions, index);
  
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
  
  $("#left div.inner-converter").bind("click", function(){
    $("#left div.inner-converter").addClass("type");
    $("#right div.inner-converter").removeClass("type");
  });

  $("#right div.inner-converter").bind("click", function(){
    $("#right div.inner-converter").addClass("type");
    $("#left div.inner-converter").removeClass("type");
  });
  
  $(window).keydown(function(ev) {
    
    op = $("div.type");
    
    if(op){
      field = op.find("div.number");
      if (ev.keyCode > 47 && ev.keyCode < 58){
        num = String.fromCharCode(ev.keyCode);
        if(field.html() === "0"){
          field.html(num.toString());
        }else{
          field.html(field.html() + num.toString());          
        }
        if (op.parent().attr("id") == "left"){
          converter.paint_right(true);
          converter.paint_left(false);
        }else if(op.parent().attr("id") == "right"){          
          converter.paint_left(true);
          converter.paint_right(false);
        }
      } else if (ev.keyCode == 8){
        if (field.html().length > 1){
          field.html(field.html().substring(0,field.html().length-1))
        }else{
          field.html("0");
        }
        if (op.parent().attr("id") == "left"){
          converter.paint_right(true);
          converter.paint_left(false);
        }else if(op.parent().attr("id") == "right"){          
          converter.paint_left(true);
          converter.paint_right(false);
        }
        return false;
      }
    }
  });
  
  
  // Add and subtract obs: temporary...
  $("ul.add-subtract li.add").bind("click", function(){

    var number = parseFloat($("#left .number").html());
    number = number + 1.0;
    $("#left .number").html(number);
    converter.paint_right(true);
  });
  
  $("ul.add-subtract li.subtract").bind("click", function(){
    var number = parseFloat($("#left .number").html());
    
    if(number != 0){
      number = number - 1.0;
      $("#left .number").html(number);
      converter.paint_right(true);
    }
  });
  
  $(".conversions ul li").bind("click", function(){
    $(this).parent().parent().siblings(".inner-converter").attr("id", $(this).attr("id"));
    converter.paint_left(true);
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
    return Math.ceil((co2/this.conversions[slug].carbon)).toString();
  },
  
  left:function(){
    return $('#left div.inner-converter');
  },

  left_data:function(){
    return this.data(this.left()[0].id);
  },
  
  left_amount:function(){
    return parseInt(this.left().find('.number').html());
  },
  
  left_co2:function(){
    return Math.ceil(this.left_amount()*this.left_data().carbon)
  },


  right:function(){
    return $('#right div.inner-converter');
  },

  right_data:function(){
    return this.data(this.right()[0].id);
  },
  
  right_amount:function(){
    return parseInt(this.right().find('.number').html());
  },
  
  right_co2:function(){
    return Math.ceil(this.right_amount()*this.right_data().carbon);
  },
    
  paint_left: function(recalculate){
    container = this.left();
    number = container.find('.number');
    unit = container.find('.unit');
    if(recalculate){
      amount = this.calculate_amount(this.left_data().slug,this.right_co2());
      number.html(amount);
    }
    
    number.css('font-size',this.font_size(number.html().length))    
    number.css('padding-top',this.font_padding(number.html().length))    
    
    unit.html(this.conversions[container.attr("id")].name);
  },

  paint_right: function(recalculate){
    container = this.right();
    number = container.find('.number');
    if(recalculate){
      amount = this.calculate_amount(this.right_data().slug,this.left_co2());
      number.html(amount);
    }
    number.css('font-size',this.font_size(number.html().length))    
    number.css('padding-top',this.font_padding(number.html().length))    
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
  }
  
  
}

function rand(n){
  return ( Math.floor ( Math.random() * n ) );
}
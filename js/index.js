/* JS Document */


//ISPIRATION: https://www.uplabs.com/posts/xore-solar-system
//Full page simoberny.it
//Best on mobile

/* Inizializzazione HammerJS */
var element = document.getElementById('mobile_control');
var hammertime = new Hammer(element);

var swiped_top = false;

hammertime.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
hammertime.on('swipeleft', function(ev) {
  cmove("prev");
});
hammertime.on('swiperight', function(ev) {
  cmove("next");
});
hammertime.on('swipeup', function(ev) {
  swiped_top = true;
  openmodal();
});
hammertime.on('swipedown', function(ev) {
  closemodal();
});
/* * * * * * * * * */

$(".action").on("click", function(){
  cmove($(this).attr('id'));
});

$('.title').each(function(){
  $(this).html("lesmills".replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
});


anime.timeline({})
.add({
  targets: '.title',
  opacity: [0,1],
  easing: "easeOutExpo",
  duration: 100
})
.add({
  targets: '.title .letter',
  translateX: [40,0],
  translateZ: 0,
  opacity: [0,1],
  easing: "easeOutExpo",
  duration: 1200,
  delay: function(el, i) {
    return 500 + 30 * i;
  }
});

var angle = 0;
var activite_id = 0;

function cmove(dir){
  var n_activite = 8, next_id;
  var prev, next;
  var top = $("#pl"+ activite_id);
  var orbit = $(".activite_container_activites");
  
  top.removeClass("pt");
  
  if(activite_id == 0){
    prev = $("#pl"+ (n_activite-1));
    next = $("#pl"+ (activite_id+1)%n_activite);
  }else{
    prev = $("#pl"+ (activite_id-1));
    next = $("#pl"+ (activite_id+1)%n_activite);
  }
  
  if(dir == "prev"){
    next_id = (activite_id + 1) % n_activite;
    angle -= 45;
    next.addClass("pt");
    activite_id++;
  }else{
    if(activite_id == 0){
      next_id = 7;
      activite_id = 7;
    }else{
      next_id = activite_id-1;
      --activite_id;
    }
    angle += 45;
    prev.addClass("pt");
  }
  
  $(".active").removeClass("active");
  $("#p" + activite_id).addClass("active");
  $(".info_back h1").text(activite[next_id]);
  
  if(swiped_top){
    $('.info_back h1').each(function(){
      $(this).html(activite[activite_id].replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
    });
    
    anime.timeline({})
    .add({
      targets: '.info_back h1',
      opacity: [0,1],
      easing: "easeOutExpo",
      duration: 100
    })
    .add({
      targets: '.info_back h1 .letter',
      translateX: [40,0],
      translateZ: 0,
      opacity: [0,1],
      easing: "easeOutExpo",
      duration: 1200,
      delay: function(el, i) {
        return 500 + 30 * i;
      }
    });
  }
  
  $('.title').each(function(){
    $(this).html(activite[next_id].replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
  });
  
  anime.timeline({})
  .add({
    targets: '.title .letter',
    translateX: [40,0],
    translateZ: 0,
    opacity: [0,1],
    easing: "easeOutExpo",
    duration: 1200,
    delay: function(el, i) {
      return 500 + 30 * i;
    }
  });
  
  $('.pn').each(function(){
    $(this).html(activite[next_id].replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
  });
  
  anime.timeline({})
  .add({
    targets: '.pn .letter',
    translateX: [40,0],
    translateZ: 0,
    opacity: [0,1],
    easing: "easeOutExpo",
    duration: 1200,
    delay: function(el, i) {
      return 500 + 30 * i;
    }
  });
  
  var ani_dir = (dir == "next") ? "0%" : "100%";
  
  anime.timeline({})
  .add({
    targets: '.activite_photo',
    backgroundPosition: ['50% 50%', ani_dir + ' -85%'],
    opacity: {
      value: [1,0]
    },
    duration: 700,
    easing: 'easeOutQuad',
    complete: function(anim){
      $(".activite_photo").css("background-image", "url(" + photo_activite[next_id] +")"); 
    }
  })
  .add({
    targets: '.activite_photo',
    backgroundPosition: ['0% -85%', '50% 50%'],
    opacity: [0.2,1],
    duration: 500,
    easing: 'easeOutQuad'
  });
  
  $(".info_back").css("background-image", "url(" + photo_activite[next_id] +")");
  orbit.css("transform", "rotateZ(" + angle + "deg)");
}

$("#open_menu").on("click", function(){
  $(".menu").show();
});

$(".close").on("click", function(){
  $(".menu").hide();
});

$(".more").on("click", function(){
  swiped_top = true;
  openmodal();
});

function openmodal(){
  anime.timeline({})
  .add({
    targets: '.carousel_activites',
    translateY: ["100%", 0],
    duration: 600,
    easing: 'easeOutQuad',
  });
  
    $('.info_back h1').each(function(){
      $(this).html(activite[activite_id].replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
    });
    
    anime.timeline({})
    .add({
      targets: '.info_back h1',
      opacity: [0,1],
      easing: "easeOutExpo",
      duration: 100
    })
    .add({
      targets: '.info_back h1 .letter',
      translateX: [40,0],
      translateZ: 0,
      opacity: [0,1],
      easing: "easeOutExpo",
      duration: 1200,
      delay: function(el, i) {
        return 500 + 30 * i;
      }
    });
}

function closemodal(){
  if(swiped_top){
    anime.timeline({})
    .add({
      targets: '.carousel_activites',
      translateY: [0, "100%"],
      duration: 600,
      easing: 'easeOutQuad',
    });
    swiped_top = false;
  }
}

var photo_activite = [
/*"images/Fitness.jpg", */
"images/LesMills.jpg",
"images/bike-gym.jpg", 
"images/Danse-de-couples.jpg", 
"images/Enfants.jpg", 
"images/hip-hop.jpg", 
"images/Arts-Martiaux.jpg", 
"images/Judo.jpg", 
"images/Tai-Chi-Chuan.jpg"] 
;
var activite = ["LesMills", "Bike-Gym", "Danses Couple", "Danse Enfants", "Hip Hop", "Arts Martiaux", "Judo", "Tai Chi Chuan"];
/*, "Fitness"*/
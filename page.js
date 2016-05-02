(function(){
  "use script";

  var Moosipurk = function(){

    //see on singleton pattern
    if(Moosipurk.instance){
      return Moosipurk.instance;
    }

    //this viitab moosipurgi funktsioonile
    Moosipurk.instance = this;

    this.routes = Moosipurk.routes;

    console.log("Moosipurgi sees");

    //kõik muutujad, mida muudetakse ja on rakendusega seotud defineeritakse siin
    this.click_count = 0;
    this.currentRoute = null;
    console.log(this);

    //hakkan hoidma kõiki purke
    this.jars=[];

    //kui tahan moosipurgile referenci siis kasuton THIS = MOOSIPURGI RAKENDUS ISE
    this.init();

  };

  window.Moosipurk = Moosipurk; //paneme muutuja külge


  //kõik funktsioonid lähevad moosipurgi külge
  Moosipurk.prototype = {
    init: function(){
      console.log("Rakendus läks tööle");





      //saan kätte purgid localStorage kui on
      if(localStorage.jars){
        //võtan stringi ja teen tagasi objektideks
        this.jars = JSON.parse(localStorage.jars);
        console.log('laadisin localStorageist massiivi ' + this.jars.length);

        //tekitan loendi htmli
        this.jars.forEach(function(jar){

          var new_jar = new Jar(jar.title, jar.ingredients);

          var li = new_jar.createHtmlElement();
          document.querySelector('.list-of-jars').appendChild(li);
        });
      }

      //kuulame hiireklikki nupul
      this.bindEvents();

    },
    bindEvents: function(){
      document.querySelector('.add-new-timer').addEventListener('click',this.addNewClick.bind(this));


    },



    addNewClick: function(event){
      //console.log(event);
      var title = document.querySelector('.description').value;
      var ingredients = document.querySelector('.time').value;

      //console.log(title + ' ' + ingredients);
      //1) tekitan uue Jar'i
       var new_jar = new Jar(title, ingredients);

       //lisan massiivi purgi
       this.jars.push(new_jar);
       console.log(JSON.stringify(this.jars));

       //JSON'i stringina salvestan localStorage'isse
       localStorage.setItem('jars', JSON.stringify(this.jars));

       // 2) lisan selle htmli listi juurde
       var li = new_jar.createHtmlElement();
       document.querySelector('.list-of-jars').appendChild(li);

    },





  }; //MOOSIPURGI LÕPP

  

  var Jar = function(new_title, new_ingredients){
    this.title = new_title;
    this.ingredients = new_ingredients;
    console.log('created new jar');
  };

  Jar.prototype = {
    createHtmlElement: function(){
      //võttes title ja ingredients ->
      /*
      li
        span.letter
          M <- title esimene täht
        span.content
          title | ingredients
      */

      var li = document.createElement('li');

      var span = document.createElement('span');
      span.className = 'letter';

      var letter = document.createTextNode(this.title.charAt(0));
      span.appendChild(letter);

      li.appendChild(span);

      var span_with_content = document.createElement('span');
      span_with_content.className = 'content';

      var content = document.createTextNode(this.title + ' | ' + this.ingredients);
      span_with_content.appendChild(content);

      var x = document.createElement("BUTTON");

      li.appendChild(span_with_content);

      return li;
    }
  };

  window.onload=function(){
    var app = new Moosipurk();
  };



})();

"use strict";

/*-------------------------------hover---------------------------------------*/

const text =  document.getElementById('likes');

let HTML = '';
let delay;

function hover(x) {
    
    HTML = `<div   >
        <div class="likeBox" class="likes" >
            <svg height="25pt" viewBox="0 -20 480 480" width="25pt" xmlns="http://www.w3.org/2000/svg"><path d="m348 0c-43 .0664062-83.28125 21.039062-108 56.222656-24.71875-35.183594-65-56.1562498-108-56.222656-70.320312 0-132 65.425781-132 140 0 72.679688 41.039062 147.535156 118.6875 216.480469 35.976562 31.882812 75.441406 59.597656 117.640625 82.625 2.304687 1.1875 5.039063 1.1875 7.34375 0 42.183594-23.027344 81.636719-50.746094 117.601563-82.625 77.6875-68.945313 118.726562-143.800781 118.726562-216.480469 0-74.574219-61.679688-140-132-140zm-108 422.902344c-29.382812-16.214844-224-129.496094-224-282.902344 0-66.054688 54.199219-124 116-124 41.867188.074219 80.460938 22.660156 101.03125 59.128906 1.539062 2.351563 4.160156 3.765625 6.96875 3.765625s5.429688-1.414062 6.96875-3.765625c20.570312-36.46875 59.164062-59.054687 101.03125-59.128906 61.800781 0 116 57.945312 116 124 0 153.40625-194.617188 266.6875-224 282.902344zm0 0"/>
                <span class="number">10</span>
            </svg>               
        </div>
    </div>`;
 
    return  text.innerHTML = HTML;
  }

  function normal(x) {
    delay = setTimeout(clean, 2000);
  }

  function clean(){
    HTML = '<div></div>';
    return  text.innerHTML = HTML
  }

 /*----------------------- save content axios----------------------------*/

const postBtn = document.getElementById("send");

if(postBtn){
  postBtn.addEventListener("click", getText); 
}

const textArea = document.getElementById("textArea");

function getText(){

  const txt = document.getElementById("textArea").value;

  if(txt != undefined || txt != null || txt.length >= 0 || txt != "" || txt != NaN){
    let words = txt.split(/\s+/);
    textArea.value = '';
    axios.post('http://localhost/wordpress/wp-content/plugins/BIT-first/api/?route=add-idea',{
      idea:words,
    }).catch(err => {console.log(err instanceof TypeError);
    });
  }
};

textArea.addEventListener("input", function(){

  let maxlength = this.getAttribute("maxlength");
  let currentLength = this.value.length;

  if( currentLength >= maxlength ){
    document.getElementById("count").innerHTML = "0  simboliu liko";
  }else{
    document.getElementById("count").innerHTML = maxlength - currentLength + " simboliu liko";
      console.log(maxlength - currentLength + " chars left");
  }
});

/*-----------------------like button and cookie------------------------------------------*/

// function setCookie(name, value, days) {
//   if (document.cookie.split(';').some((item) => item.includes('myName'))) {
//     console.log('The cookie "reader" has "1" for value')
//   }else{
//     var expires = "";
//     if (days) {
//       var date = new Date();
//       date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
//       expires = "; expires=" + date.toUTCString();
//     }
//     document.cookie = name + "=" + (value || "") + expires + "; path=/";
//   }
// }

const clickFunction = function(event){
  let like = this.getAttribute("data-custom-id");  
  let likeId = 'Idea_cookie'+like;
  console.log(likeId );
  likeAdd(like);
};

function likeAdd(like){
  if(like != undefined || like != null || like.length >= -1 || like != "" || like != NaN){
    axios.post('http://localhost/wordpress/wp-content/plugins/BIT-first/api/?route=add-idea',{
      idea_like:like,
    }).catch(err => {console.log(err instanceof TypeError);
    });
  }
};

function getCookie(name) {
  // Split cookie string and get all individual name=value pairs in an array
  var cookieArr = document.cookie.split(";");
  
  // Loop through the array elements
  for(var i = 0; i < cookieArr.length; i++) {
      var cookiePair = cookieArr[i].split("=");
      
      /* Removing whitespace at the beginning of the cookie name
      and compare it with the given string */
      if(name == cookiePair[0].trim()) {
          // Decode the cookie value and return
          let a = decodeURIComponent(cookiePair[1]);
         console.log(a) ;
      }
  }
  
  // Return null if not found
  return null;
}

// function likeButton(likeId){
//   if(txt != undefined || txt != null || txt.length >= 0 || txt != "" || txt != NaN){
//     let words = txt.split(/\s+/);
//     textArea.value = '';
//     axios.post('http://localhost/wordpress/wp-content/plugins/BIT-first/api/?route=add-idea',{
//       idea:words,
//     }).catch(err => {console.log(err instanceof TypeError);
//     });
//   }
// }


/*------------------------------render data  axios-----------------------------------------*/

window.addEventListener('load', function() {
  axios.get('http://localhost/wordpress/wp-content/plugins/BIT-first/api/?route=add-idea',{

})
.then(function(response){
  if(response.status == 200 && response.statusText == 'OK' ){
    const data = response.data.allData;

    const rende = document.getElementById('box');
    let HTMLString ='';

    for( let i = 0; i < data.length && i < 3; i++){
      HTMLString += 
      `<div class="box"> 
        <div class="text"><div class="data" >${data[i][2]}</div>                 
          </div>
          <div class="ideaContent">
                ${data[i][0]}
          </div>   
          <div class="like" data-custom-id="${data[i][3]}">
            <svg class="like__btn animated" id="Capa_1" enable-background="new 0 0 512 512" height="40" viewBox="0 0 512 512" width="40" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="256" x2="256" y1="512" y2="0"><stop offset="0" stop-color="#fd3a84"/><stop offset="1" stop-color="#ffa68d"/></linearGradient><linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="256" x2="256" y1="421" y2="121"><stop offset="0" stop-color="#ffc2cc"/><stop offset="1" stop-color="#fff2f4"/></linearGradient><g><g><g><circle cx="256" cy="256" fill="url(#SVGID_1_)" r="256"/></g></g><g><g><path d="m331 121c-32.928 0-58.183 18.511-75 46.058-16.82-27.552-42.077-46.058-75-46.058-25.511 0-48.788 10.768-65.541 30.32-15.772 18.409-24.459 42.993-24.459 69.225 0 28.523 10.698 54.892 33.666 82.986 20.138 24.632 49.048 49.971 82.524 79.313 12.376 10.848 25.174 22.065 38.775 34.306 2.853 2.567 6.444 3.85 10.035 3.85s7.182-1.283 10.035-3.851c13.601-12.241 26.398-23.458 38.775-34.306 33.476-29.341 62.386-54.681 82.524-79.313 22.968-28.092 33.666-54.462 33.666-82.985 0-53.637-36.748-99.545-90-99.545z" fill="url(#SVGID_2_)"/></g></g></g> 
              <span class="like__number">${data[i][1]}</span>
            </svg>
        </div>            
      </div>`;


    }
    rende.innerHTML = HTMLString;

    const likeBtn = document.querySelectorAll(".like");

    for (let i = 0; i < likeBtn.length; i++) {
        likeBtn[i].addEventListener('click', clickFunction , false);
    }
  }
    // console.log(response.status);
    // console.log(response.statusText);
   //  console.log(response.headers);
   // console.log(response.config);
  return response;

}).catch(function(error){
  console.log(error instanceof TypeError) ;
   // Error handling
});
});

/*--------------------------------------------------------------- */



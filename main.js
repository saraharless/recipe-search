console.log('ghost toast');

let container = document.querySelector('.container')
let input = document.querySelector('input')
let button = document.querySelector('button')
button.addEventListener('click', function() {
  console.log(input.value);
  goFetch(input.value)
})

function goFetch(search) {
  fetch('http://recipepuppyproxy.herokuapp.com/api/?q=' + search)
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Oops! Looks like there was a problem, Status Code: ' + response.status);
          return;
        }
        response.json().then(function(data){
          console.log(data);
          container.innerHTML = ''
          for (var i = 0; i < data.results.length; i++) {
            let image = data.results[i].thumbnail;
            if (image === ''){
              image = 'http://via.placeholder.com/120x90'
            }
            let template = `
            <div class="recipe">
            <img src="${image}" alt="">
            <h3>${data.results[i].title}</h3>
            <a href=${data.results[i].href}>Get the recipe!</a>
            </div>
            `

            container.innerHTML += template;

          }

        });

        }

      )
    }

// Selectors:
const $ = (selector) => document.querySelector(selector);

let currentValue = 0;
let clicked = 0;
const stars = 5;

// Create array based on other array to iterate:
const html = Array.from(Array(stars)).map( (_, i) => {
  return `<div class="item item-${i}" data-pos="${i}"></div>`;
}); 
// inject into the container:
$('.ratingContainer').innerHTML = html.join('');

// Listen all the 'item' elements:
document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('mouseover', e => {    
    // get position:
    const pos = item.getAttribute('data-pos');

    // Don't update DOM if the element mouseover is the current:
    if (currentValue === parseInt(pos) + 1){
      return;
    }

    // Remove 'full' style of all items:
    document.querySelectorAll('.item').forEach(itFull =>{
      if (itFull.classList.contains('item-full')){
        itFull.classList.remove('item-full');
      }
    });

    // iterate all the items from 0 to the 'pos' in order to change his style:
    for (let i = 0; i <= pos; i++){
      const currentItem = document.querySelector(`.item-${i}`);
      if (!currentItem.classList.contains('item-full')){
        currentItem.classList.add('item-full');
      }
    }
    currentValue = parseInt(pos) + 1;

  });

  // Handle the "click" event:
  item.addEventListener("click", e => {
    const pos = item.getAttribute("data-pos");
    currentValue = parseInt(pos) + 1;
    $('.rateValue').innerHTML = currentValue;
    clicked = currentValue;

    // Experimental: Fade the number:
    $('.rateValue').classList.remove('rateFade');
    setTimeout(()=>{      
      $('.rateValue').classList.add('rateFade');
    },100);
    
  });

  // extra: Handle the "mouseout":
  // item.addEventListener('mouseout', e => {
  //   if (clicked > 0) {
  //     for (let i = clicked; i < stars; i++){        
  //       const curr = document.querySelector(`.item-${i}`);
  //       if (curr.classList.contains('item-full')){
  //         curr.classList.remove('item-full');
  //       }
  //     }
  //   }
  // });

});




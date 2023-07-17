const generatePassButton = document.querySelector('.generate-btn');
const passReveal = document.querySelector('.password-reveal');
const passLength = document.querySelector('#how-num');

generatePassButton.addEventListener('click', generatePassWord);


let passValue = Math.floor(passLength.value);


function generatePassWord() {
    let arr = [];
let min = 48;
let max = 57;

let minchar = 65;
let maxchar = 90;

let minlowchar = 97;
let maxlowchar = 122;
//  let unicodeRandomNumber = Math.floor(Math.random() * (max - min + 1) ) + min;
//  let unicodeRandomNumberTwo = Math.floor(Math.random() * (max - min + 1) ) + min;
for (let i = 0; i < `${passValue}`; i++){
    let randNumbers = Math.floor(Math.random() * (max - min + 1) ) + min;
    let randUpperChar = Math.floor(Math.random() * (maxchar - minchar + 1) ) + minchar;
    let randLowerChar = Math.floor(Math.random() * (maxlowchar - minlowchar + 1) ) + minlowchar;

    arr.push(randNumbers, randUpperChar, randLowerChar);

    // Swap elements in Array
    // arr.sort(() => Math.random() - 0.5);


    // Swap elements in Array v2
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    
        // swap elements array[i] and array[j]
        // we use "destructuring assignment" syntax to achieve that
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
}

let uniArray = arr.map(elem => String.fromCharCode(elem));
uniArray.length = passLength.value;
let generatedString = uniArray.join("");

console.log(generatedString);
passReveal.innerHTML = `${generatedString}`;
}

// Copy Pass Into Clipboard

passReveal.addEventListener('click', addToClipBoard);

async function addToClipBoard(e){
    try {
      await  navigator.clipboard.writeText(passReveal.innerText);
      
      console.log(("Copied -> " + passReveal.innerText));
      copyClip(e);
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
    
}

let tooltipElem;

 

function copyClip(event){
    let target = event.target;

    let tooltipHtml = target.dataset.tooltip;
    // if (!tooltipHtml) return;

    tooltipElem = document.createElement('div');
      tooltipElem.className = 'tooltip';
      tooltipElem.innerHTML = tooltipHtml;
      document.body.append(tooltipElem);

      let coords = target.getBoundingClientRect();

      let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
      if (left < 0) left = 0;

      let top = coords.top - tooltipElem.offsetHeight - 5;
      if (top < 0) { // если подсказка не помещается сверху, то отображать её снизу
        top = coords.top + target.offsetHeight + 5;
      }

      tooltipElem.style.left = left + 'px';
      tooltipElem.style.top = top + 'px';
    //   setTimeout(() => {
    //     tooltipElem.remove();
    //   }, 300);

      if(tooltipElem){
        setTimeout(() => {
            tooltipElem.remove();
          }, 100);
    }
}


/// Pass Length Input

passLength.addEventListener('input', changePassLength);



function changePassLength(){
    passValue = Math.floor(passLength.value);
    // console.log(passValue);
}
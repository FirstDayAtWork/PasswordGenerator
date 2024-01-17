const generatePassButton = document.querySelector('.generate-btn');
const passWindow = document.querySelector('.pass-window');
const passReveal = document.querySelector('.password-reveal');
const passLength = document.querySelector('#how-num');
const checkBoxInputs = document.querySelectorAll('input[type="checkbox"');
const appHead = document.querySelector('.app-head')

generatePassButton.addEventListener('click', generatePassWord);

// generate presets in DOM
function generatePresets(){
  let arr = ['Default', 'Easy', 'Medium', 'Strong'];
  let map = presetsMap();

  const container = document.createElement('div');
  const select = document.createElement("select");
  container.classList.add('presets-box');
  select.id = 'presets';
  appHead.prepend(container)
  container.appendChild(select)

  for(let i = 0; i < arr.length; i++){
    const option = document.createElement("option");
    option.value = `${i}`;
    option.innerText = arr[i]
    select.appendChild(option)
  }
         
  

// execute functionality to selected option
  select.addEventListener('change', () => {
    let pres = map.get(+select.selectedOptions[0].value)
    presetConstuctor(pres)

  })
}

generatePresets()

// Preset template
function presetConstuctor(preset){
  let [lenOfpass, ...arr] = preset;
  for(let i = 0; i < checkBoxInputs.length; i++){
    checkBoxInputs[i].checked = arr[i]
  }

  passLength.value = Math.floor(lenOfpass);
}


// hardcode presets
function presetsMap(){
  let optionMap = new Map();

  optionMap.set(0, [18, true, true, true, false])
            .set(1, [4, true, false, true, false])
            .set(2, [12, false, true, true, false])
            .set(3, [20, true, true, true, true])
  
  return optionMap
}

// load default preset
 function loadDefaultPreset(){
    let map = presetsMap().get(0);
    presetConstuctor(map)
    
  }
  
loadDefaultPreset()



function generatePassWord() {

  let passValue = Math.floor(passLength.value);

    if(passLength.value > 20){return}
    let boxesState = [...checkBoxInputs].map(el => el.checked);

    let arr = [];
    let checkboxArr = [];
  // 0-9
    let min = 48;
    let max = 57;
  // A-Z
    let minchar = 65;
    let maxchar = 90;
  // a-z
    let minlowchar = 97;
    let maxlowchar = 122;
  // special
    let specialChars = '!@#$%^&*'.split('').map(el => el.charCodeAt(0));
//  let unicodeRandomNumber = Math.floor(Math.random() * (max - min + 1) ) + min;
//  let unicodeRandomNumberTwo = Math.floor(Math.random() * (max - min + 1) ) + min;
for (let i = 0; i < `${passValue}`; i++){
  let randNumbers = Math.floor(Math.random() * (max - min + 1) ) + min;
  let randUpperChar = Math.floor(Math.random() * (maxchar - minchar + 1) ) + minchar;
  let randLowerChar = Math.floor(Math.random() * (maxlowchar - minlowchar + 1) ) + minlowchar;
  let randomSpecialChar = specialChars[Math.floor(Math.random() * specialChars.length)];
  checkboxArr = [randNumbers, randUpperChar, randLowerChar, randomSpecialChar];

  for(let k = 0; k < checkboxArr.length; k++){
    if(boxesState[k]){
      arr.push(checkboxArr[k]);
    }

  }
    

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


passReveal.innerText = `${generatedString}`;

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
}
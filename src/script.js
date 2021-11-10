window.addEventListener('load', function (event) {
   const form = document.querySelector('.generator__form');
   const inputsList = form.querySelectorAll('.input-text');
   const minInputText = form.querySelector('.input-text_min');
   const maxInputText = form.querySelector('.input-text_max');
   const btnGenerate = form.querySelector('.generator__btn_generate');
   const generatedNumberBlock = form.querySelector('.generator__count-number');
   const btnReset = form.querySelector('.generator__btn_reset');
   const numbersList = [];
   let renderCount = 0;
   let flag = false;

   inputsList.forEach(input => input.addEventListener('input', checkedInputValue));

   btnGenerate.addEventListener('click', function (e) {
      const min = +minInputText.value;
      const max = +maxInputText.value;
      if (!flag) {
         for (let i = min; i <= max; i++) {
            generateNumbers(min, max);
         }
         flag = true;
      }
      renderGeneratedNumbers();
      renderCount++;
      if ((max - min) < renderCount) btnGenerate.disabled = true;
   });

   btnReset.addEventListener('click', resetForm);

   function resetForm() {
      form.reset();
      numbersList.length = 0;
      renderCount = 0;
      flag = false;
      generatedNumberBlock.innerHTML = '';
   }

   function renderGeneratedNumbers() {
      generatedNumberBlock.innerHTML = numbersList.filter((number, index) => {
         if (index <= renderCount) return number;
      }).join(', ');
   }

   // ф-ция которая генерирует массив рандомных чисел
   function generateNumbers(min, max) {
      const number = randomInteger(min, max);

      if (isNumberInArray(number) !== -1) {
         generateNumbers(min, max);
      } else {
         numbersList.push(number);
      }
   }

   // проверка на наличие числа в массиве
   function isNumberInArray(number) {
      return numbersList.indexOf(number)
   }

   function checkedInputValue() {
      btnGenerate.disabled = !isInputNumber();
   }

   //функция проверка на то чтоб каждый инпут был заполнен
   // регулярным выражением внутри // проверяем на соответствие
   function isInputNumber() {
      return [...inputsList].every(input => /^\d+$/.test(input.value));
   }

   // функция генерации рандомного числа
   function randomInteger(min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
   }
});

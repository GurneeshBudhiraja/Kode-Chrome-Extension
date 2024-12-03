export default function () {
  // Create the default placeholder option
  let defaultOption = document.createElement('option');
  defaultOption.value = ''; // Empty value for the placeholder
  defaultOption.textContent = 'Select Language'; // Placeholder text
  defaultOption.disabled = true; // Make it unselectable
  defaultOption.selected = true; // Set it as the default selected option
  defaultOption.hidden = true; // Hide it from the dropdown once an option is selected

  // Create an option for Hindi
  let optionHindi = document.createElement('option');
  optionHindi.value = 'hi';
  optionHindi.textContent = 'Hindi';

  // Create an option for Japanese
  let optionJapanese = document.createElement('option');
  optionJapanese.value = 'ja';
  optionJapanese.textContent = 'Japanese';

  // Create an option for Spanish
  let optionSpanish = document.createElement('option');
  optionSpanish.value = 'es';
  optionSpanish.textContent = 'Español';

  // Create the select element
  const select = document.createElement('select');
  select.classList.add('content-language-selector');

  // Append the default option first
  select.appendChild(defaultOption);

  // Append other options to the select element
  select.appendChild(optionHindi);
  select.appendChild(optionJapanese);
  select.appendChild(optionSpanish);

  Object.assign(select.style, {
    cursor: 'pointer',
    background: '#222222',
    marginLeft: '5px',
    padding: '2px 4px',
    fontSize: '13px',
    fontWeight: '400',
    letterSpacing: '0.5px',
    borderRadius: '5px',
    color: '#949494',
  });

  // Append the select dropdown to the target container
  document.querySelector('#ide-top-btns').appendChild(select);

  return select;
}

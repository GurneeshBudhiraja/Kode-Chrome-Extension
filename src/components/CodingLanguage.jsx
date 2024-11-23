import { setLocalStorage } from '../utils/utils.js';

const CodingLanguage = ({ selectedLanguage, setSelectedLanguage }) => {
  const programmingLanguages = [
    { value: 'cpp', label: 'C++' },
    { value: 'java', label: 'Java' },
    { value: 'python', label: 'Python' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'c', label: 'C' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
    { value: 'kotlin', label: 'Kotlin' },
    { value: 'swift', label: 'Swift' },
    { value: 'csharp', label: 'C#' },
  ];

  const updateLanguage = async (e) => {
    const choice = e.target.value;
    console.log('TEMP CHOICE IS:');
    console.log(choice);
    await setLocalStorage({ language: choice });
    setSelectedLanguage(choice);
  };

  return (
    <div className="">
      <label htmlFor="language" className="block text-gray-300 mb-2">
        Programming Language
      </label>
      <select
        name="language"
        id="language"
        value={selectedLanguage}
        onChange={updateLanguage}
        className="bg-gray-800 text-gray-300 border border-gray-600 rounded px-4 py-2 w-full"
      >
        <option value="" disabled hidden>
          Select a programming language
        </option>
        {programmingLanguages.map((lang) => (
          <option
            key={lang.value}
            value={lang.value}
            selected={lang.value === selectedLanguage}
          >
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CodingLanguage;

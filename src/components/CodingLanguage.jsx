import { useState } from 'react';

const CodingLanguage = () => {
  const [language, setLanguage] = useState(''); // State to track the selected language

  const languages = [
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

  return (
    <div className="px-6 py-4 border-b border-gray-800">
      <label htmlFor="language" className="block text-gray-300 mb-2">
        Programming Language
      </label>
      <select
        name="language"
        id="language"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="bg-gray-800 text-gray-300 border border-gray-600 rounded px-4 py-2 w-full"
      >
        <option value="" disabled hidden>
          Select a programming language
        </option>
        {languages.map((lang) => (
          <option
            key={lang.value}
            value={lang.value}
            selected={lang.value === language}
          >
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CodingLanguage;

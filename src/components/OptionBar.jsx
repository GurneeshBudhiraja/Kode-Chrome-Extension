import AllInclusiveIcon from '@mui/icons-material/AllInclusive';

function OptionBar({ currentPage, setCurrentPage }) {
  const options = [
    {
      title: <AllInclusiveIcon />,
      id: 'infinite',
    },
    {
      title: 'Notes',
      id: 'notes',
    },
  ];
  return (
    <div className="flex mt-4 gap-2 ">
      {options.map((option) => (
        <div key={option.id}>
          <div className="flex space-x-4">
            <button
              className={`px-3 py-1 rounded-md transition-colors duration-200 ${
                currentPage === option.id
                  ? 'bg-gray-500 text-gray-200 hover:bg-gray-600'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
              onClick={() => setCurrentPage(option.id)}
            >
              {option.title}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OptionBar;

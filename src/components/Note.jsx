import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Note = ({ questionName, key: index, descripton, userNote, tags }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    try {
      setIsExpanded(!isExpanded);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card
      className="w-full max-w-4xl shadow-lg rounded-lg border border-gray-200"
      key={index}
    >
      <CardHeader
        onClick={handleClick}
        className="bg-blue-100 rounded-t-lg cursor-pointer h-10"
        title={
          <div className="flex items-center justify-between">
            <span className="font-medium text-base text-gray-800">
              {questionName}
            </span>
            {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </div>
        }
      />
      <CardContent className="text-sm font-medium">
        <p className="text-gray-700">{descripton}</p>
        {isExpanded && (
          <>
            <h3 className="text-lg font-medium mt-4 text-gray-800">Notes</h3>
            <p className="text-sm text-gray-600 mt-2">{userNote}</p>
            <div className="flex justify-between items-center mt-4">
              <div className="flex justify-between items-center">
                <div className="space-x-2">
                  {tags &&
                    tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`${
                          tag.bgColor ?? 'bg-green-600'
                        } text-white px-3 py-1 rounded-full text-xs font-medium`}
                      >
                        {tag}
                      </span>
                    ))}
                </div>
              </div>
              <div className="space-x-2 flex items-center">
                <IconButton>
                  <EditIcon size={16} />
                </IconButton>
                <IconButton>
                  <DeleteIcon size={16} color="error" />
                </IconButton>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default Note;

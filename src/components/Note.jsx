import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
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
      key={index}
      className="w-full max-w-4xl shadow-lg rounded-xl border border-gray-700"
      sx={{
        backgroundColor: '#10101b',
      }}
    >
      <CardHeader
        onClick={handleClick}
        className="bg-[#10101bca] rounded-t-lg cursor-pointer h-10 border-b border-gray-400/30"
        title={
          <div className="flex items-center justify-between">
            <span className="font-medium text-base text-gray-100">
              {questionName}
            </span>
            {isExpanded ? (
              <ExpandLessIcon className="text-white" />
            ) : (
              <ExpandMoreIcon className="text-white" />
            )}
          </div>
        }
      />
      <CardContent className="text-sm font-medium">
        <div className="text-gray-100">{descripton}</div>
        {isExpanded && (
          <>
            <h3 className="text-[15px] font-medium mt-4 text-gray-50">Notes</h3>
            <p className="text-sm text-gray-50 mt-2">{userNote}</p>
            <div className="flex flex-col justify-between items-start mt-4">
              <span className="font-inter text-gray-50 text-[15px] font-medium mb-2">
                Tags
              </span>
              <div className="flex w-full flex-wrap gap-2">
                {tags &&
                  tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-white px-3 py-1 rounded-full text-xs font-medium bg-white/20"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default Note;

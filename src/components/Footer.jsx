import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useState } from 'react';

function Footer({ aiAvailable }) {
  const [openHints, setOpenHints] = useState(0);
  return (
    <div
      className={`${
        aiAvailable
          ? 'flex justify-between items-center mt-6'
          : 'absolute bottom-7'
      }`}
    >
      <div className="font-inter text-footer-size-left text-footer-color-left tracking-wider">
        Powered by Gemini
      </div>
      {aiAvailable && (
        <div className="font-inter font-light text-footer-size-right text-footer-color-right">
          {openHints === 0 ? (
            <FiberManualRecordIcon fontSize="small" color="success" />
          ) : openHints === 4 ? (
            <FiberManualRecordIcon color="error" />
          ) : (
            <FiberManualRecordIcon color="warning" />
          )}
          {openHints}/4 Hints
        </div>
      )}
    </div>
  );
}

export default Footer;

import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

function HintsUsed({ openHints }) {
  return (
    <div className="flex justify-self-end items-center">
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
    </div>
  );
}

export default HintsUsed;

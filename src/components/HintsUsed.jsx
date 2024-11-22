import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

function HintsUsed({ hintsCount }) {
  return (
    <div className="flex items-center place-self-end">
      <div className="font-inter w-full font-light text-footer-size-right text-footer-color-right">
        {hintsCount === 0 ? (
          <FiberManualRecordIcon color="success" />
        ) : hintsCount === 4 ? (
          <FiberManualRecordIcon color="error" />
        ) : (
          <FiberManualRecordIcon color="warning" />
        )}
        {hintsCount}/4 Hints
      </div>
    </div>
  );
}

export default HintsUsed;

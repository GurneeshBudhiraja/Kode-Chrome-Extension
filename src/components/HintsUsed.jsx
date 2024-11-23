import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

function HintsUsed({ hintsCount }) {
  return (
    <div className="flex items-center place-self-end">
      <div className="font-inter w-full font-light text-footer-size-right text-footer-color-right">
        <FiberManualRecordIcon
          color={
            hintsCount === 0
              ? 'success'
              : hintsCount === 4
              ? 'error'
              : 'warning'
          }
        />
        <span>{hintsCount}/4 Hints</span>
      </div>
    </div>
  );
}

export default HintsUsed;

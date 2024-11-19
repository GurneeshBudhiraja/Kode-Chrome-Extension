import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

function ToolTip({ title, placement = 'bottom' }) {
  return (
    <Tooltip
      title={title}
      className="inline-block text-white"
      style={{ color: 'white' }}
      placement={placement}
      arrow={true}
    >
      <IconButton>
        <InfoIcon />
      </IconButton>
    </Tooltip>
  );
}

export default ToolTip;

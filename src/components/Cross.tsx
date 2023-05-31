import React from 'react';

interface CrossProps {
  onClick: () => void;
}

const Cross: React.FC<CrossProps> = ({ onClick }) => {
  const crossStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    cursor: 'pointer',
  };

  const lineStyle: React.CSSProperties = {
    position: 'absolute',
    width: '24px',
    right:'24px',
    top:'20px',
    height: '2px',
    backgroundColor: '#000',
    transform: 'rotate(45deg)',
  };

  return (
    <div style={crossStyle} onClick={onClick}>
      <div style={lineStyle} />
      <div style={{ ...lineStyle, transform: 'rotate(-45deg)' }} />
    </div>
  );
};

export default Cross;
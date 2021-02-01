import * as React from 'react';
import './Panel.scss';

interface PanelProps {
  isOpen: boolean;
  children: React.ReactElement;
  backdropClicked: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

function Panel({ isOpen, children, backdropClicked }: PanelProps) {
  return (
    <div className={`Panel-container ${isOpen ? 'active' : ''}`}>
      <div
        className="Panel-glass"
        onClick={(e) => {
          backdropClicked(e);
        }}
      />

      <div className={'Panel'}>
        <div className={'Panel-content'}>{children}</div>
      </div>
    </div>
  );
}

export default Panel;

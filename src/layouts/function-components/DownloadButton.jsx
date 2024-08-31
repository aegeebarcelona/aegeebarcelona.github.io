import React from 'react';

const DownloadButton = ({ file }) => {
  return (
    <div>
      <a className="btn btn-outline-primary w-60" href={file} download="aegee-barceona-calendar.ics">Download calendar</a>
    </div>
  );
}

export default DownloadButton;

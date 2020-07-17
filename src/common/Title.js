import React from 'react';

function Title () {

  const resetApp = () => window.location.href = "/bibleApp";
  
  return (
    <div
      onClick={resetApp}
      onKeyPress={resetApp}
      className="title-container"
      title="Reset Searches"
    >
        <h2 className="text">Bible App</h2>
    </div>
  );
}

export default Title;

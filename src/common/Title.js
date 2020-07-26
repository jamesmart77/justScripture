import React from 'react';
import { Icon, Button } from 'react-materialize';

function Title (props) {
  const { isMobileView } = props;

  const resetApp = () => window.location.href = "/bibleApp";
  
  return (
    <div
      className={isMobileView ? "title-container mobile" : "title-container"}
      title="Reset Searches"
    >
        <h2 
          tabIndex={0}
          onClick={resetApp}
          onKeyPress={resetApp} 
          className="text"
        >
          Bible App
        </h2>
    </div>
  );
}

export default Title;

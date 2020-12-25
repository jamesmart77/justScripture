import React from 'react';

function Title (props) {
  const { isMobileView, toggleSearch } = props;

  const resetApp = () => {
    window.location.href = "/justScripture";
    
    if (isMobileView) {
      toggleSearch();
    }
  }
  
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
          Just Scripture
        </h2>
    </div>
  );
}

export default Title;

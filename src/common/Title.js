import React from 'react';
import { Icon } from 'react-materialize';
import { toast } from 'react-toastify';

function Title (props) {
  const { isMobileView, toggleSearch } = props;

  const resetApp = () => {
    window.location.href = "/justScripture";
    
    if (isMobileView) {
      toggleSearch();
    }
  }

  const copyToClipboard = () => {
    const elem = document.createElement('input');

    document.body.appendChild(elem);
    elem.value = window.location.href;
    elem.select();
    document.execCommand("copy");
    toast.success("Copied to Clipboard", {
      autoClose:2000, 
      hideProgressBar: true,
    });
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
        {isMobileView &&
          <div 
            role="button"
            tabIndex={0}
            className="share-btn"
            onClick={copyToClipboard}
            onKeyPress={copyToClipboard}
            title="Share"
          >
            <Icon>share</Icon>
          </div>
          }
    </div>
  );
}

export default Title;

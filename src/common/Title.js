import React from 'react';
import { Icon, Button } from 'react-materialize';

function Title (props) {
  const { isMobileView, isSearchExpanded, toggleSearch } = props;

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

        { isMobileView && isSearchExpanded &&
          <Button 
            className="search-icon-wrapper"
            onClick={toggleSearch}
            title="Collapse Search"
          >
            <Icon>keyboard_arrow_up</Icon>
          </Button>
        }

        { isMobileView && !isSearchExpanded &&
          <Button 
            className="search-icon-wrapper"
            onClick={toggleSearch}
            title="Expand Search"
          >
            <Icon>search</Icon>
          </Button>
        }
    </div>
  );
}

export default Title;

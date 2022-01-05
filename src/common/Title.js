import { Icon } from 'react-materialize';
import { toast } from 'react-toastify';
import Clipboard from 'react-clipboard.js';
import logo from '../images/logo.png';


export default function Title (props) {
  const { isMobileView, toggleSearch } = props;
  const shouldShowShare = window.location.hash.includes("#passages");

  const resetApp = () => {
    window.location.href = "/justScripture";
    
    if (isMobileView) {
      toggleSearch();
    }
  }

  const copyToClipboard = () => {
    toast.success("Link copied. Share by pasting in messaging app.", {
      autoClose:4000, 
      hideProgressBar: true,
    });
  }
  
  return (
    <div
      className={isMobileView ? "title-container mobile" : "title-container"}
      title="Reset Searches"
    >
      <div
        className={isMobileView ? "wrapper mobile" : "wrapper"}
        role="button"
        tabIndex={0}
        onClick={resetApp}
        onKeyPress={resetApp} 
      >
        {!isMobileView &&
          <img className="logo" src={logo} alt='just scripture logo' />
        }
        <h1 className="text">
          Just Scripture
        </h1>
      </div>
      {isMobileView && shouldShowShare &&
        <Clipboard 
          className="share-btn"
          title="Share"
          data-clipboard-text={window.location.href}
          onSuccess={copyToClipboard}
        >
          <Icon>share</Icon>
        </Clipboard>
        }
    </div>
  );
}

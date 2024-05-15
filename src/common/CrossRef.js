import React, { useState, useEffect } from 'react';
import SlidingPane from 'react-sliding-pane';
import { Icon } from 'react-materialize';
import { getPassageResults } from '../utils/searchUtil';
import Loader from './Loader';

export default function CrossRef({ passageRefs }) {
  const [isPaneOpen, setIsPaneOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [refData, setRefData] = useState(null);

  useEffect(() => {
    if (isPaneOpen) {
      const fetchData = async () => {
        const query = passageRefs.replaceAll(' ', '');
        await setIsLoading(true);
        const data = await getPassageResults(query, true);
        setRefData(data);
        setIsLoading(false);
      };

      fetchData();
    }
  }, [isPaneOpen, passageRefs]);

  return (
    <>
      <sup>
        <span
          className="cross-ref-link"
          role="button"
          tabIndex={0}
          onClick={() => setIsPaneOpen(!isPaneOpen)}
          onKeyDown={() => setIsPaneOpen(!isPaneOpen)}
        >
          cf{' '}
        </span>
      </sup>
      <SlidingPane
        closeIcon={<Icon small>close</Icon>}
        isOpen={isPaneOpen}
        from="bottom"
        title="Cross References"
        subtitle={passageRefs}
        onRequestClose={() => setIsPaneOpen(false)}
      >
        {isLoading && <Loader />}

        {!isLoading && (
          <div>
            {refData?.passages}
          </div>
        )}
      </SlidingPane>
    </>
  )

}
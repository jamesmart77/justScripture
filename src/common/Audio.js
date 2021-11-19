import React, { useState } from 'react';
import { Icon } from 'react-materialize';
import { Fade } from 'react-reveal';
import ReactAudioPlayer from 'react-audio-player';

function Audio ({ passageRef }) {

    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div 
            role="button"
            tabIndex={0}
            className="wrapper"
            onClick={() => setIsExpanded(!isExpanded)}
            onKeyPress={() => setIsExpanded(!isExpanded)}
        >
            <Icon className="audio-icon">volume_down</Icon>
            <Fade duration={500} top when={isExpanded} >
                {isExpanded && (
                    <div className="audio-player-wrapper">
                        <ReactAudioPlayer
                            className="passage-audio"
                            src={`https://audio.esv.org/david-cochran-heath/mq/${passageRef}.mp3`}
                            controls
                        />
                    </div>
                )}
            </Fade>
        </div>
    );
}

export default Audio;

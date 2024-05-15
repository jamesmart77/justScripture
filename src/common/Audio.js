import React, { useState } from 'react';
import { Icon } from 'react-materialize';
import { Fade } from 'react-awesome-reveal';
import ReactAudioPlayer from 'react-audio-player';

export default function Audio({ passageRef }) {

    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div
            role="button"
            tabIndex={0}
            className="wrapper"
            onClick={() => setIsExpanded(!isExpanded)}
            onKeyDown={() => setIsExpanded(!isExpanded)}
        >
            <Icon className="audio-icon">volume_down</Icon>
            {isExpanded && (
                <Fade duration={500} direction="up">
                    <div className="audio-player-wrapper">
                        <ReactAudioPlayer
                            className="passage-audio"
                            src={`https://audio.esv.org/david-cochran-heath/mq/${passageRef}.mp3`}
                            controls
                        />
                    </div>
                </Fade>
            )}
        </div>
    );
}

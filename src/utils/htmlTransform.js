import React from 'react';
import Audio from '../components/Audio';

const transformAudio = (node) => {
    const { type, data, name, prev } = node;

    if (type === 'text' && (
        data === '(' || data === ')' || data === 'Listen')
        ) return null;

    if ( type === 'tag' && name === 'small') {
        const passageRef = prev.data.trim().replaceAll(' ', '+');
        return <Audio passageRef={passageRef} />;
    }
}

export { transformAudio };
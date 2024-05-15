import Audio from '../common/Audio';
import CrossRef from '../common/CrossRef';

const transformAudio = (node) => {
    const { attribs, prev } = node;

    if (attribs?.class?.includes('audio')) {
        const passageRef = prev.data.trim().replaceAll(' ', '+');
        return <Audio key={`passage-${passageRef}`} passageRef={passageRef} />;
    }

    return node;
}

const transformCrossRef = (node) => {
    if (node.name === 'sup' && node.attribs.class === undefined && 
        node.children.length === 1 && node.children[0].attribs && 
        node.children[0].attribs.href
    ) {
        const passageRefs = node.children[0].attribs.href.replaceAll('/', '');
        return <CrossRef key={`crossref-${passageRefs}`} passageRefs={passageRefs} />
    }
}

export const replace = (node) => {
    let updatedNode = transformAudio(node);
    
    // only look to transform if new line not found 
    if (updatedNode === node) updatedNode = transformCrossRef(node);
    
    return updatedNode;
}
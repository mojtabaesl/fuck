import { parse } from 'node-html-parser';

export function escapeItalicTag(str: string) {
  const root = parse(str);

  const processNode = (node) => {
    if (node.nodeType === 1) {
      if (node.tagName.toLowerCase() === 'i') {
        return `&lt;i&gt;${node.text}&lt;/i&gt;`;
      } else {
        return node.childNodes.map(processNode).join('');
      }
    } else if (node.nodeType === 3) {
      return node.parentNode || '';
    }
  };

  const processedContent = root.childNodes
    .map((node) => processNode(node))
    .join('');

  return processedContent;
}

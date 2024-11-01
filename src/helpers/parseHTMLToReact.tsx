import parse, { Element, Text } from 'html-react-parser';
import CodeBlock from '@/components/page/blog/details/CodeBlock';

export default function parseHTMLToReact(html: string) {
  return parse(typeof html === 'string' ? html : '', {
    replace(domNode) {
      if (domNode instanceof Element && domNode.tagName === 'pre') {
        const codeElement = domNode.children[0] as Element;
        const codeContent = (codeElement.children[0] as Text).data;
        const codeLanguage = codeElement.attribs.class.split('-')[1];
        return <CodeBlock language={codeLanguage}>{codeContent}</CodeBlock>;
      }
    },
  });
}

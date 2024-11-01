'use client';

import { ComponentProps, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import hljs from 'highlight.js';
import CodeBlockStyle from './CodeBlock.style';
import { Button, Tooltip, message } from 'antd';
import { CopyOutlined } from '@ant-design/icons';

interface CodeBlockProps extends ComponentProps<'div'> {
  language: string;
}

export default function CodeBlock({ children, language, className }: CodeBlockProps) {
  const [highlighted, setHighlighted] = useState(false);
  const codeBlockRef = useRef<HTMLElement>(null);

  const handleCopyCodeContent = async () => {
    if (typeof children !== 'string') return;

    try {
      await navigator.clipboard.writeText(children);
      message.success('Code copied to clipboard!');
    } catch (error) {
      message.error('Failed to copy code!');
    }
  };

  useEffect(() => {
    const codeBlockElem = codeBlockRef.current;

    if (codeBlockElem) {
      hljs.highlightElement(codeBlockElem);
      setHighlighted(true);
    }
  }, []);

  return (
    <CodeBlockStyle>
      <pre>
        {highlighted && (
          <Tooltip title='Copy' placement='left'>
            <Button
              type='primary'
              icon={<CopyOutlined />}
              className='codeblock-copy-btn'
              onClick={handleCopyCodeContent}
            />
          </Tooltip>
        )}
        <code className={clsx(`language-${language}`, className)} ref={codeBlockRef}>
          {children}
        </code>
      </pre>
    </CodeBlockStyle>
  );
}

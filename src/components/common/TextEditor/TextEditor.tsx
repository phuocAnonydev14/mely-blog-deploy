import { useState, useEffect, useRef, useMemo, ForwardedRef, useImperativeHandle, forwardRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  ClassicEditor,
  Autoformat,
  AutoImage,
  Autosave,
  BlockQuote,
  Bold,
  CKBox,
  CKBoxImageEdit,
  CloudServices,
  Essentials,
  Heading,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  MediaEmbed,
  Paragraph,
  PasteFromOffice,
  PictureEditing,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextTransformation,
  TodoList,
  Underline,
} from 'ckeditor5';
import EditorStyle from './TextEditor.style';

import 'ckeditor5/ckeditor5.css';
import { CustomUploadAdapter } from '@/components/common/TextEditor/uploadFile';

const LICENSE_KEY =
  'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3MzcxNTgzOTksImp0aSI6IjkyN2Q0MjkyLTQxMjEtNGM0ZS1hYzNkLTA1MjQxMTgxMjAxNyIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6IjlmMWIwZGQxIn0.nJjGhDMeGT0i4tYAx_3B0KZIejtZJsBbIgIibEy5gdGlkj6JNlJkR3Mh-aeYBw-ZqpxNFWnnCjIrjVXsU0WrEA';

const CLOUD_SERVICES_TOKEN_URL =
  'https://malvknx1fhgd.cke-cs.com/token/dev/75cea3a3042b46248d2bd69d4b83eabc5f8f1103797edf4f3df6943f3fc5?limit=10';

interface TextEditorProps {
  content: string;
  setContent: (val: string) => void;
}
export interface TextEditorHandle {
  getContent: () => string;
}

function TextEditor({ content, setContent }: TextEditorProps, ref: ForwardedRef<TextEditorHandle>) {
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      getContent: () => content,
    }),
    [content],
  );

  useEffect(() => {
    setIsLayoutReady(true);

    return () => setIsLayoutReady(false);
  }, []);

  const { editorConfig } = useMemo(() => {
    if (!isLayoutReady) {
      return {};
    }

    return {
      editorConfig: {
        toolbar: {
          items: [
            'heading',
            '|',
            'bold',
            'italic',
            'underline',
            '|',
            'link',
            'insertImage',
            'ckbox',
            'mediaEmbed',
            'insertTable',
            'blockQuote',
            '|',
            'bulletedList',
            'numberedList',
            'todoList',
            'outdent',
            'indent',
          ],
          shouldNotGroupWhenFull: false,
        },
        plugins: [
          Autoformat,
          AutoImage,
          Autosave,
          BlockQuote,
          Bold,
          CKBox,
          CKBoxImageEdit,
          CloudServices,
          Essentials,
          Heading,
          ImageBlock,
          ImageCaption,
          ImageInline,
          ImageInsert,
          ImageInsertViaUrl,
          ImageResize,
          ImageStyle,
          ImageTextAlternative,
          ImageToolbar,
          ImageUpload,
          Indent,
          IndentBlock,
          Italic,
          Link,
          LinkImage,
          List,
          ListProperties,
          MediaEmbed,
          PasteFromOffice,
          PictureEditing,
          Table,
          TableCaption,
          TableCellProperties,
          TableColumnResize,
          TableProperties,
          TableToolbar,
          TextTransformation,
          TodoList,
          Underline,
        ],
        extraPlugins: [
          function (editor: any) {
            console.log('CustomUploadAdapterPlugin is being loaded');
            editor.plugins.get('FileRepository').createUploadAdapter = function (loader: any) {
              return new CustomUploadAdapter(loader, 'uploadUrl');
            };
          },
        ],
        cloudServices: {
          tokenUrl: CLOUD_SERVICES_TOKEN_URL,
        },
        heading: {
          options: [
            {
              model: 'paragraph',
              title: 'Paragraph',
              class: 'ck-heading_paragraph',
            },
            {
              model: 'heading1',
              view: 'h1',
              title: 'Heading 1',
              class: 'ck-heading_heading1',
            },
            {
              model: 'heading2',
              view: 'h2',
              title: 'Heading 2',
              class: 'ck-heading_heading2',
            },
            {
              model: 'heading3',
              view: 'h3',
              title: 'Heading 3',
              class: 'ck-heading_heading3',
            },
            {
              model: 'heading4',
              view: 'h4',
              title: 'Heading 4',
              class: 'ck-heading_heading4',
            },
            {
              model: 'heading5',
              view: 'h5',
              title: 'Heading 5',
              class: 'ck-heading_heading5',
            },
            {
              model: 'heading6',
              view: 'h6',
              title: 'Heading 6',
              class: 'ck-heading_heading6',
            },
          ],
        },
        image: {
          toolbar: [
            'toggleImageCaption',
            'imageTextAlternative',
            '|',
            'imageStyle:inline',
            'imageStyle:wrapText',
            'imageStyle:breakText',
            '|',
            'resizeImage',
            '|',
            'ckboxImageEdit',
          ],
        },
        initialData: '',
        licenseKey: LICENSE_KEY,
        link: {
          addTargetToExternalLinks: true,
          defaultProtocol: 'https://',
          decorators: {
            toggleDownloadable: {
              mode: 'manual',
              label: 'Downloadable',
              attributes: {
                download: 'file',
              },
            },
          },
        },
        list: {
          properties: {
            styles: true,
            startIndex: true,
            reversed: true,
          },
        },
        placeholder: 'Type or paste your content here!',
        table: {
          contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells',
            'tableProperties',
            'tableCellProperties',
          ],
        },
      },
    };
  }, [isLayoutReady]);

  useEffect(() => {
    if (editorConfig) {
      configUpdateAlert(editorConfig);
    }
  }, [editorConfig]);

  return (
    <div className='main-container'>
      <div className='editor-container editor-container_classic-editor' ref={editorContainerRef as any}>
        <div className='editor-container__editor'>
          <EditorStyle>
            <div ref={editorRef as any}>
              {editorConfig && (
                // @ts-ignore
                <CKEditor
                  // @ts-ignore
                  onChange={(_, editor) => setContent(editor.getData())}
                  // @ts-ignore
                  data={content as any}
                  // @ts-ignore
                  editor={ClassicEditor as any}
                  // @ts-ignore
                  config={editorConfig as any}
                />
              )}
            </div>
          </EditorStyle>
        </div>
      </div>
    </div>
  );
}

/**
 * This function exists to remind you to update the config needed for premium features.
 * The function can be safely removed. Make sure to also remove call to this function when doing so.
 */
function configUpdateAlert(config: any) {
  // if (configUpdateAlert.configUpdateAlertShown) {
  //   return;
  // }

  const isModifiedByUser = (currentValue: any, forbiddenValue: any) => {
    if (currentValue === forbiddenValue) {
      return false;
    }

    if (currentValue === undefined) {
      return false;
    }

    return true;
  };

  const valuesToUpdate = [];

  // configUpdateAlert.configUpdateAlertShown = true;

  if (!isModifiedByUser(config.cloudServices?.tokenUrl, '<YOUR_CLOUD_SERVICES_TOKEN_URL>')) {
    valuesToUpdate.push('CLOUD_SERVICES_TOKEN_URL');
  }

  if (valuesToUpdate.length) {
    window.alert(
      [
        'Please update the following values in your editor config',
        'to receive full access to Premium Features:',
        '',
        ...valuesToUpdate.map((value) => ` - ${value}`),
      ].join('\n'),
    );
  }
}

export default forwardRef<TextEditorHandle, TextEditorProps>(TextEditor);

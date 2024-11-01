'use client';

import { forwardRef, useImperativeHandle, ForwardedRef } from 'react';
import TextEditorStyle from './TextEditor.style';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  ClassicEditor,
  Autoformat,
  Bold,
  Italic,
  Underline,
  BlockQuote,
  Base64UploadAdapter,
  CloudServices,
  Essentials,
  Heading,
  Image as ckImage,
  ImageCaption,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  PictureEditing,
  Indent,
  IndentBlock,
  Link,
  List,
  MediaEmbed,
  Mention,
  Paragraph,
  PasteFromOffice,
  Table,
  TableColumnResize,
  TableToolbar,
  TextTransformation,
  SimpleUploadAdapter,
  FileRepository,
  UploadAdapter,
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';
import { CustomUploadAdapter } from '@/components/common/TextEditor/uploadFile';
interface TextEditorProps {
  content: string;
  setContent: (val: string) => void;
}
export interface TextEditorHandle {
  getContent: () => string;
}

function TextEditor({ content, setContent }: TextEditorProps, ref: ForwardedRef<TextEditorHandle>) {
  useImperativeHandle(
    ref,
    () => ({
      getContent: () => content,
    }),
    [content],
  );

  return (
    <TextEditorStyle>
      <CKEditor
        data={content}
        onChange={(_, editor) => setContent(editor.getData())}
        editor={ClassicEditor}
        config={{
          toolbar: {
            items: [
              'undo',
              'redo',
              '|',
              'heading',
              '|',
              'bold',
              'italic',
              'underline',
              '|',
              'link',
              'uploadImage',
              'ckbox',
              'insertTable',
              'blockQuote',
              'mediaEmbed',
              '|',
              'bulletedList',
              'numberedList',
              '|',
              'outdent',
              'indent',
            ],
          },
          plugins: [
            Autoformat,
            BlockQuote,
            Bold,
            CloudServices,
            Essentials,
            Heading,
            ckImage,
            ImageCaption,
            ImageResize,
            ImageStyle,
            ImageToolbar,
            ImageUpload,
            // Base64UploadAdapter,
            Indent,
            IndentBlock,
            Italic,
            Link,
            List,
            MediaEmbed,
            Mention,
            Paragraph,
            PasteFromOffice,
            PictureEditing,
            Table,
            TableColumnResize,
            TableToolbar,
            TextTransformation,
            Underline,
            // SimpleUploadAdapter,
            FileRepository,
          ],

          extraPlugins: [
            function (editor) {
              console.log('CustomUploadAdapterPlugin is being loaded');
              editor.plugins.get('FileRepository').createUploadAdapter = function (loader) {
                return new CustomUploadAdapter(loader, 'uploadUrl');
              };
            },
          ],
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
            ],
          },
          image: {
            resizeOptions: [
              {
                name: 'resizeImage:original',
                label: 'Default image width',
                value: null,
              },
              {
                name: 'resizeImage:50',
                label: '50% page width',
                value: '50',
              },
              {
                name: 'resizeImage:75',
                label: '75% page width',
                value: '75',
              },
            ],
            toolbar: [
              'imageTextAlternative',
              'toggleImageCaption',
              '|',
              'imageStyle:inline',
              'imageStyle:wrapText',
              'imageStyle:breakText',
              '|',
              'resizeImage',
            ],
          },
        }}
        onReady={(editor) => {
          console.log('Loaded plugins:', editor.plugins);
        }}
      />
    </TextEditorStyle>
  );
}

export default forwardRef<TextEditorHandle, TextEditorProps>(TextEditor);

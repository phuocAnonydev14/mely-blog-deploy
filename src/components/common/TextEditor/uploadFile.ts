import { UploadAdapter } from 'ckeditor5';
import blogService from '@/services/BlogService';
import { MAX_SIZE_IN_BYTES } from '@/hooks/useUploadImage';

export class CustomUploadAdapter implements UploadAdapter {
  private loader: any;

  constructor(loader: any, uploadUrl: string) {
    console.log('set up');
    this.loader = loader;
  }

  upload() {
    console.log('start upload');
    return this.loader.file.then((file: File) => this._uploadFile(file));
  }

  abort() {
    // Handle aborting the upload if necessary
  }

  private async _uploadFile(file: File) {
    console.log('start upload file');
    const isImageFile = file.type.startsWith('image/');
    if (!isImageFile) {
      alert('You can only upload image file!');
      return false;
    }

    const isLargerThanMaxSize = file.size < MAX_SIZE_IN_BYTES;
    if (!isLargerThanMaxSize) {
      alert(`Image must smaller than ${MAX_SIZE_IN_BYTES / 1024 ** 2}MB!`);
      return false;
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('eventId', '01');
    const res = await blogService.addTempFile(formData);
    console.log('res', res);
    return { default: res.data.url };
  }
}

export function CustomUploadAdapterPlugin(editor: any, uploadUrl: string) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
    return new CustomUploadAdapter(loader, uploadUrl);
  };
}

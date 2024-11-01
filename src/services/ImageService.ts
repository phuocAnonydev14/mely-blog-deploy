import HttpService from '@/services/HttpService';

interface ImageUploadResponse {
  // TODO: Define the ImageUploadResponse interface
}

class ImageService extends HttpService {
  constructor() {
    super();
  }

  upload(file: File) {
    return this.post<ImageUploadResponse, { file: File }>(
      '/files/upload', // TODO: modify the endpoint
      { file },
    );
  }

  getImageByName(name: string) {
    return this.get(
      `/files/${name}`, // TODO: modify the endpoint
    );
  }
}

const imageService = new ImageService();
export default imageService;

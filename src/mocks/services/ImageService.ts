import HttpService from '@/services/HttpService';

interface ImageUploadResponse {
  originalname: string;
  filename: string;
  location: string;
}

class ImageService extends HttpService {
  constructor() {
    super('https://api.escuelajs.co/api/v1/');
  }

  upload(file: File) {
    return this.post<any, { file: File }>('/files/upload', { file }, {}, true);
  }

  getImageByName(name: string) {
    return this.get(`/files/${name}`);
  }
}

const imageService = new ImageService();
export default imageService;

import { ConfigService } from '@nestjs/config';
export declare class S3Service {
    private configService;
    constructor(configService: ConfigService);
    uploadFile(file: Express.Multer.File, baseUrl?: string): Promise<string>;
    deleteFile(fileUrl: string): Promise<void>;
    generatePresignedUrl(key: string): Promise<string>;
}

declare global {
  var isProduction: string | undefined;

  namespace Express {
    interface Request {
      user?: {
        id: number;
        username: string;
        email: string;
        status: string;
        roleId: number;
        role: string | null;
        permissions: string[];
      };
      file?: Multer.File;
      files?: Multer.File[] | { [fieldname: string]: Multer.File[] };
    }
  }
}

export {};

import {dirname, join} from 'node:path';

export const repoDirPath = dirname(import.meta.dirname)
export const testPdfFilePath = join(repoDirPath, 'test-files', 'pdfkit-out.pdf')
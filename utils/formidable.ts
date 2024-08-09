import formidable from 'formidable'
import fs from "fs"

const uploadDir = 'uploads'
fs.mkdirSync(uploadDir, { recursive: true })

export const form = formidable({
    uploadDir,
    keepExtensions: true,
    maxFiles: 1,
    maxFileSize: 200 * 1024, 
    filter: part => part.mimetype?.startsWith('image/') || false,
  })
import multer from "multer";
import path from "path";

// define storage location and file naming
const storage = multer.memoryStorage();

const upload = multer({ storage });
export default upload;

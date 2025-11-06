import multer from "multer";

// define storage location and file naming
const storage = multer.memoryStorage();

const upload = multer({ storage });
export default upload;

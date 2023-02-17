import path from 'path';
import fs from 'fs';

export default function handler(req, res) {
  if (req.method === "GET") {
    const filePath = path.join(process.cwd(), 'data', 'homepage.json');
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);

    res.status(200).json(data.companies);
  }
}
import File from '../models/File';

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file; // Quando o multer age sobre um rota, ele retorna um req.file // retorna todos os dados do arquivo
    const file = await File.create({
      name,
      path,
    });

    return res.json(file);
  }
}

export default new FileController();

import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';
import { PostController, UserController } from './controllers/index.js';
import { loginValidation, registrationValidation, postCreateValidation } from './validations/validations.js';
import { handleValidationErrors, checkAuth } from './utils/index.js';

mongoose
    .connect('mongodb+srv://obershadskui:Qwerty@cluster0.tputxlq.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0',
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB connected'))
    .catch((err) => console.log('DB not connected', err));

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        if (!fs.existsSync('uploads')) {
            fs.mkdirSync('uploads');
        }
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

// Маршрут для очистки папки uploads
app.get('/clear_uploads', (req, res) => {
    // Функція для очистки  uploads
    const clearUploadsDirectory = () => {
        const directory = 'uploads';

        // Перевіряем чи є така папка
        if (fs.existsSync(directory)) {
            // Отримуємо список файлів та папок в uploads
            const files = fs.readdirSync(directory);

            // Видаляємо кожний файл у папці 
            files.forEach((file) => {
                const filePath = `${directory}/${file}`;
                fs.unlinkSync(filePath);
            });

            // Видаляємо саму директорію uploads
            fs.rmdirSync(directory);
        }

        // Створюємо директорію uploads заново
        fs.mkdirSync(directory);
    };

    // Викликаємо фунцію для очистки uploads
    clearUploadsDirectory();

    // Відправляємо відповіль про виконання операції
    res.send('Папка uploads успішно очищена');
});

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/registration', registrationValidation, handleValidationErrors, UserController.registration);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/uploads', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `uploads/${req.file.originalname}`,
    });
});

app.get('/tags', PostController.getLastTags);
app.get('/posts/tags', PostController.getLastTags);
app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post(
    '/posts',
    checkAuth,
    postCreateValidation,
    handleValidationErrors,
    PostController.create
);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch(
    '/posts/:id',
    checkAuth,
    postCreateValidation,
    handleValidationErrors,
    PostController.update
);

const PORT = process.env.PORT || 4444;

app.listen(PORT, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server started');
});

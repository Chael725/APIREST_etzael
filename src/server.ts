import express from 'express';
import apiRoutes from './routes/index.js';

class Server {
    public app: any;
    private port: any;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.middlewares();
        this.routes();
    }

    middlewares() {
        // Habilita a Express para entender JSON en los requests
        this.app.use(express.json());
    }

    routes() {
        // Se inyecta el prefijo solicitado en las instrucciones
        this.app.use('/api/v1', apiRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor activo en el puerto ${this.port}`);
        });
    }
}

export default Server;
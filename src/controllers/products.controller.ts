import { pool } from '../conf/dbConnection.js';

export const getAll = async (req: any, res: any) => {
    try {
        const [rows]: any = await pool.query('SELECT * FROM products WHERE active = TRUE');
        return res.status(200).json(rows);
    } catch (error: any) {
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const getById = async (req: any, res: any) => {
    try {
        const id: any = parseInt(req.params.id);
        if (isNaN(id) || id <= 0) return res.status(400).json({ error: 'ID inválido. Debe ser un entero positivo.' });

        const [rows]: any = await pool.query('SELECT * FROM products WHERE id = ? AND active = TRUE', [id]);
        
        if (rows.length === 0) return res.status(200).json({ message: 'Producto no existe o está inactivo' });
        return res.status(200).json(rows[0]);
    } catch (error: any) {
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const create = async (req: any, res: any) => {
    try {
        const { name, price, stock, description, brand, img }: any = req.body;
        if (isNaN(price) || price <= 0) return res.status(400).json({ error: 'Precio inválido. Debe ser mayor a 0.' });

        const query: any = 'INSERT INTO products (name, price, stock, description, brand, img) VALUES (?, ?, ?, ?, ?, ?)';
        await pool.query(query, [name, price, stock, description, brand, img]);
        
        return res.status(201).json({ message: 'Producto creado exitosamente' });
    } catch (error: any) {
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const update = async (req: any, res: any) => {
    try {
        const id: any = parseInt(req.params.id);
        if (isNaN(id) || id <= 0) return res.status(400).json({ error: 'ID inválido' });

        const { name, price, stock, description, brand, img }: any = req.body;
        if (isNaN(price) || price <= 0) return res.status(400).json({ error: 'Precio inválido' });

        const query: any = 'UPDATE products SET name = ?, price = ?, stock = ?, description = ?, brand = ?, img = ? WHERE id = ? AND active = TRUE';
        const [result]: any = await pool.query(query, [name, price, stock, description, brand, img, id]);

        if (result.affectedRows === 0) return res.status(200).json({ message: 'Producto no existe o está inactivo' });
        return res.status(200).json({ message: 'Producto actualizado exitosamente' });
    } catch (error: any) {
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const deleteProduct = async (req: any, res: any) => {
    try {
        const id: any = parseInt(req.params.id);
        if (isNaN(id) || id <= 0) return res.status(400).json({ error: 'ID inválido' });

        const [result]: any = await pool.query('UPDATE products SET active = FALSE WHERE id = ?', [id]);
        
        if (result.affectedRows === 0) return res.status(200).json({ message: 'Producto no existe' });
        return res.status(200).json({ message: 'Baja lógica exitosa' });
    } catch (error: any) {
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const changePrice = async (req: any, res: any) => {
    try {
        const id: any = parseInt(req.params.id);
        const { price }: any = req.body;

        if (isNaN(id) || id <= 0) return res.status(400).json({ error: 'ID inválido' });
        if (isNaN(price) || price <= 0) return res.status(400).json({ error: 'Precio inválido. Debe ser mayor a 0.' });

        const [result]: any = await pool.query('UPDATE products SET price = ? WHERE id = ? AND active = TRUE', [price, id]);

        if (result.affectedRows === 0) return res.status(200).json({ message: 'Producto no existe o está inactivo' });
        return res.status(200).json({ message: 'Precio modificado exitosamente' });
    } catch (error: any) {
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};
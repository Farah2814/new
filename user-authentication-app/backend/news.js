const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'newsletter',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

app.post('/subscribe', async (req, res) => {
    const { email } = req.body;

    try {
        if (!email || !email.trim()) {
            throw new Error('Invalid email address');
        }

        const connection = await pool.getConnection();
        const [rows, fields] = await connection.execute('INSERT INTO subscribers1 (email) VALUES (?)', [email]);
        connection.release();

        console.log('New subscriber added:', email);
        res.json({ message: 'Subscription successful!' });
    } catch (error) {
        console.error('Error occurred:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

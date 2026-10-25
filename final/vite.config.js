import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Plugin tự động xử lý đọc/ghi trực tiếp vào file src/data/db.json khi chạy npm run dev
function jsonDbPlugin() {
  const dbPath = path.resolve(__dirname, 'src/data/db.json');

  return {
    name: 'vite-plugin-json-db',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // GET /api/db - Lấy toàn bộ dữ liệu accounts và students từ db.json
        if (req.url === '/api/db' && req.method === 'GET') {
          try {
            if (!fs.existsSync(dbPath)) {
              const defaultData = {
                accounts: [
                  { id: 1, username: 'admin', password: '123', fullName: 'Nguyễn Tấn Lực' },
                  { id: 2, username: 'sinhvien', password: '123', fullName: 'Sinh Viên FPT' }
                ],
                students: [
                  { id: 1, ten: 'Tran Quang Anh', tuoi: 18 },
                  { id: 2, ten: 'Le Thi Lan', tuoi: 19 },
                  { id: 3, ten: 'Pham Van Bao', tuoi: 18 }
                ]
              };
              fs.writeFileSync(dbPath, JSON.stringify(defaultData, null, 2), 'utf-8');
            }
            const data = fs.readFileSync(dbPath, 'utf-8');
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.end(data);
          } catch (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
          }
          return;
        }

        // POST /api/db - Ghi đè dữ liệu mới vào file src/data/db.json khi có thay đổi
        if (req.url === '/api/db' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const parsed = JSON.parse(body);
              fs.writeFileSync(dbPath, JSON.stringify(parsed, null, 2), 'utf-8');
              res.setHeader('Content-Type', 'application/json; charset=utf-8');
              res.end(JSON.stringify({ success: true, message: 'Đã lưu thành công vào src/data/db.json' }));
            } catch (err) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Lỗi parse JSON: ' + err.message }));
            }
          });
          return;
        }

        next();
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), jsonDbPlugin()],
  server: {
    port: 3000,
    open: true
  }
});

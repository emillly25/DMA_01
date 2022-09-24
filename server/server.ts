import 'dotenv/config';
import { app } from './src/app';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`정상적으로 서버가 연결되었습니다. http://localhost:${PORT}`);
});

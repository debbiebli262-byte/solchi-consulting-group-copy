import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    // טעינת משתני הסביבה
    const env = loadEnv(mode, process.cwd(), '');
    
    return {
      // הגדרת נתיב בסיסי יחסי כדי למנוע דף לבן ב-Vercel
      base: './', 
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        // כאן אנחנו מוודאים שהקוד יזהה את המפתח שהגדרת ב-Vercel
        'process.env.VITE_GEMINI_API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});

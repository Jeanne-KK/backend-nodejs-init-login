# Backend starter

โปรเจกต์ต้นแบบสำหรับเริ่ม API ใหม่ด้วย **Express 5 + TypeScript**

มีโครง layer มาตรฐาน (`routes` → `controller` → `service` → Prisma), validate request ด้วย **Zod**, จัดการ error แบบรวมศูนย์ และ **auth พร้อมใช้** (JWT access + refresh token ใน cookie, รหัผ่าน Argon2, เก็บ refresh ในฐานข้อมูล)

ฐานข้อมูลใช้ **Prisma 7** กับ MySQL/MariaDB — copy โปรเจกต์นี้แล้วต่อยอด feature / model ตามงานจริง

# 🌐 راهنمای کامل استقرار آنلاین و رایگان

## 🎯 بهترین گزینه‌ها (همه رایگان)

| پلتفرم | سرعت | آسانی | ویژگی‌ها |
|--------|------|-------|----------|
| **Vercel** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | بهترین گزینه |
| **Netlify** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | بسیار آسان |
| **GitHub Pages** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | کاملاً رایگان |
| **Cloudflare Pages** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | سریع‌ترین |

---

## 🚀 روش ۱: Vercel (توصیه شده - ۲ دقیقه)

### مرحله ۱: پروژه را در GitHub آپلود کنید

```bash
# اگر قبلاً GitHub ندارید:
git init
git add .
git commit -m "Initial commit: Deutsch Chunks"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/deutsch-chunks.git
git push -u origin main
```

### مرحله ۲: استقرار در Vercel

1. به [vercel.com](https://vercel.com) بروید
2. **Sign Up** با GitHub
3. **Add New Project** را کلیک کنید
4. مخزن `deutsch-chunks` را انتخاب کنید
5. **Import** را کلیک کنید
6. تنظیمات:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
7. **Deploy** را کلیک کنید
8. ✅ تمام! لینک شما آماده است

**مثال:** `https://deutsch-chunks.vercel.app`

---

## 🚀 روش ۲: Netlify (بسیار آسان)

### گزینه A: Drag & Drop (بدون GitHub)

1. پروژه را build کنید:
   ```bash
   npm run build
   ```

2. به [app.netlify.com/drop](https://app.netlify.com/drop) بروید

3. پوشه `dist` را **drag & drop** کنید

4. ✅ سایت شما آنلاین شد!

### گزینه B: اتصال به GitHub

1. به [netlify.com](https://netlify.com) بروید
2. **Sign up** با GitHub
3. **Add new site** → **Import an existing project**
4. GitHub را انتخاب کنید
5. مخزن `deutsch-chunks` را انتخاب کنید
6. تنظیمات:
   - Build command: `npm run build`
   - Publish directory: `dist`
7. **Deploy site** را کلیک کنید

**مثال:** `https://deutsch-chunks.netlify.app`

---

## 🚀 روش ۳: GitHub Pages (کاملاً رایگان)

### مرحله ۱: نصب gh-pages

```bash
npm install -D gh-pages
```

### مرحله ۲: اضافه کردن به package.json

فایل `package.json` را باز کنید و این script را اضافه کنید:

```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

### مرحله ۳: تنظیم vite.config.js

فایل `vite.config.js` را ویرایش کنید:

```javascript
export default defineConfig({
  base: '/deutsch-chunks/', // نام مخزن GitHub شما
  plugins: [react(), tailwindcss()],
  // ... بقیه تنظیمات
})
```

### مرحله ۴: استقرار

```bash
npm run deploy
```

### مرحله ۵: فعال‌سازی GitHub Pages

1. به مخزن GitHub بروید
2. **Settings** → **Pages**
3. Source: **Deploy from branch**
4. Branch: **gh-pages** / **root**
5. **Save**

**مثال:** `https://YOUR_USERNAME.github.io/deutsch-chunks/`

---

## 🚀 روش ۴: Cloudflare Pages (سریع‌ترین)

1. به [pages.cloudflare.com](https://pages.cloudflare.com) بروید
2. **Create a project** را کلیک کنید
3. **Connect to Git** را انتخاب کنید
4. مخزن GitHub را انتخاب کنید
5. تنظیمات:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Build output directory: `dist`
6. **Save and Deploy**

**مثال:** `https://deutsch-chunks.pages.dev`

---

## 📱 نصب به عنوان اپلیکیشن (PWA)

بعد از استقرار، می‌توانید اپلیکیشن را روی گوشی نصب کنید:

### Android:
1. سایت را در Chrome باز کنید
2. منوی ⋮ را باز کنید
3. **Add to Home screen** را انتخاب کنید
4. ✅ اپلیکیشن نصب شد!

### iPhone:
1. سایت را در Safari باز کنید
2. دکمه Share را بزنید
3. **Add to Home Screen** را انتخاب کنید
4. ✅ اپلیکیشن نصب شد!

---

## 🎯 مقایسه پلتفرم‌ها

| پلتفرم | سرعت | آسانی | ویژگی‌ها | محدودیت |
|--------|------|-------|----------|---------|
| **Vercel** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | عالی | 100GB bandwidth/ماه |
| **Netlify** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | عالی | 100GB bandwidth/ماه |
| **GitHub Pages** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | خوب | 1GB storage |
| **Cloudflare** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | عالی | نامحدود |

---

## 🔧 فایل‌های پیکربندی

فایل‌های لازم برای استقرار خودکار ایجاد شده‌اند:

- ✅ `vercel.json` — تنظیمات Vercel
- ✅ `netlify.toml` — تنظیمات Netlify
- ✅ `public/sw.js` — Service Worker
- ✅ `public/manifest.webmanifest` — PWA Manifest

---

## 💡 نکات مهم

### دامنه سفارشی (اختیاری)

می‌توانید دامنه خود را متصل کنید:

1. **Vercel:** Settings → Domains → Add
2. **Netlify:** Domain settings → Add custom domain
3. **GitHub Pages:** Settings → Pages → Custom domain
4. **Cloudflare:** Custom domains → Set up

### به‌روزرسانی خودکار

هر بار که به GitHub push کنید، سایت خودکار به‌روز می‌شود:

```bash
git add .
git commit -m "update: add new features"
git push
```

### بررسی وضعیت

- **Vercel:** Dashboard → Deployments
- **Netlify:** Site overview → Deploys
- **GitHub Pages:** Actions tab
- **Cloudflare:** Deployments

---

## 🆘 رفع مشکلات

### مشکل: صفحه سفید

**راه‌حل:**
```bash
# بررسی build
npm run build

# بررسی console browser
# F12 → Console
```

### مشکل: CSS/JS لود نمی‌شود

**راه‌حل:**
- بررسی مسیرهای نسبی
- بررسی `base` در `vite.config.js`
- Hard refresh: `Ctrl + Shift + R`

### مشکل: PWA نصب نمی‌شود

**راه‌حل:**
- بررسی HTTPS (الزامی)
- بررسی `manifest.webmanifest`
- بررسی Service Worker

---

## 📞 پشتیبانی

اگر مشکلی داشتید:
1. مستندات پلتفرم را بررسی کنید
2. Console browser را چک کنید
3. Build logs را بررسی کنید
4. Issue ایجاد کنید

---

## 🎉 تبریک!

سایت شما اکنون آنلاین و رایگان است! 🚀

**لینک‌های مفید:**
- Vercel: https://vercel.com
- Netlify: https://netlify.com
- GitHub Pages: https://pages.github.com
- Cloudflare Pages: https://pages.cloudflare.com

---

**موفق باشید! 🌟**

# 📘 راهنمای کامل راه‌اندازی Firebase و Vercel

## 📍 فایل .env.local کجاست؟

فایل `.env.local` در **ریشه پروژه** (کنار `package.json`) قرار دارد.

### 📂 محل فایل:
```
deutsch-chunks/
├── .env.local          ← اینجا!
├── .env.example
├── package.json
├── src/
└── ...
```

### 🔍 چگونه فایل را پیدا کنم؟

**در VS Code:**
1. پروژه را در VS Code باز کنید
2. در پنل سمت چپ (Explorer)، فایل `.env.local` را ببینید
3. روی آن کلیک کنید تا باز شود

**در File Explorer (Windows):**
1. به پوشه پروژه بروید
2. اگر فایل را نمی‌بینید: View → Show → Hidden items
3. فایل `.env.local` را پیدا کنید

**در Terminal:**
```bash
# در پوشه پروژه
ls -la .env.local
```

### ✏️ چگونه فایل را ویرایش کنم؟

فایل `.env.local` را باز کنید و مقادیر را وارد کنید:

```bash
# Firebase Configuration
# مقادیر زیر را از Firebase Console کپی کنید

VITE_FIREBASE_API_KEY=AIzaSyB...........................
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

**⚠️ مهم:**
- هیچ فاصله‌ای قبل یا بعد از `=` نگذارید
- مقادیر را در `""` قرار ندهید
- هر مقدار در یک خط جداگانه

---

## 🚀 تنظیم Vercel

بله! در Vercel هم باید متغیرهای محیطی را تنظیم کنید.

### 📝 مراحل تنظیم Vercel:

#### مرحله ۱: ورود به Vercel
1. به [vercel.com](https://vercel.com) بروید
2. با GitHub وارد شوید
3. پروژه `deutsch-chunks` را انتخاب کنید

#### مرحله ۲: تنظیم Environment Variables
1. در داشبورد Vercel → پروژه شما
2. تب **Settings** → **Environment Variables**
3. روی **Add** کلیک کنید

#### مرحله ۳: اضافه کردن متغیرها

برای هر متغیر:

**1. VITE_FIREBASE_API_KEY**
- Name: `VITE_FIREBASE_API_KEY`
- Value: `AIzaSyB...` (مقدار از Firebase)
- Environment: ✅ Production ✅ Preview ✅ Development
- **Save**

**2. VITE_FIREBASE_AUTH_DOMAIN**
- Name: `VITE_FIREBASE_AUTH_DOMAIN`
- Value: `your-project.firebaseapp.com`
- Environment: ✅ Production ✅ Preview ✅ Development
- **Save**

**3. VITE_FIREBASE_PROJECT_ID**
- Name: `VITE_FIREBASE_PROJECT_ID`
- Value: `your-project-id`
- Environment: ✅ Production ✅ Preview ✅ Development
- **Save**

**4. VITE_FIREBASE_STORAGE_BUCKET**
- Name: `VITE_FIREBASE_STORAGE_BUCKET`
- Value: `your-project-id.appspot.com`
- Environment: ✅ Production ✅ Preview ✅ Development
- **Save**

**5. VITE_FIREBASE_MESSAGING_SENDER_ID**
- Name: `VITE_FIREBASE_MESSAGING_SENDER_ID`
- Value: `123456789012`
- Environment: ✅ Production ✅ Preview ✅ Development
- **Save**

**6. VITE_FIREBASE_APP_ID**
- Name: `VITE_FIREBASE_APP_ID`
- Value: `1:123456789012:web:abcdef123456`
- Environment: ✅ Production ✅ Preview ✅ Development
- **Save**

#### مرحله ۴: Redeploy
1. بعد از اضافه کردن همه متغیرها
2. به تب **Deployments** بروید
3. روی آخرین deployment کلیک کنید
4. **Redeploy** را بزنید

---

## 🔥 دریافت مقادیر از Firebase Console

### مرحله ۱: ایجاد Web App
1. به [Firebase Console](https://console.firebase.google.com) بروید
2. پروژه خود را انتخاب کنید
3. ⚙️ **Project Settings** (بالا سمت چپ)
4. پایین صفحه → **Your apps**
5. روی آیکون **Web** (</>) کلیک کنید
6. نام: `deutsch-chunks-web`
7. ❌ Firebase Hosting را تیک نزنید
8. **Register app** را بزنید

### مرحله ۲: کپی کردن Config
بعد از ثبت، این کد را می‌بینید:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyB...........................",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

### مرحله ۳: وارد کردن در .env.local
هر مقدار را در خط مربوطه وارد کنید:

```bash
VITE_FIREBASE_API_KEY=AIzaSyB...........................
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

---

## ✅ چک‌لیست کامل

### برای Local Development:
- [ ] فایل `.env.local` را پیدا کردم
- [ ] Web App را در Firebase ایجاد کردم
- [ ] مقادیر را در `.env.local` وارد کردم
- [ ] `npm run dev` را اجرا کردم
- [ ] صفحه Login نمایش داده می‌شود

### برای Vercel:
- [ ] به Vercel وارد شدم
- [ ] پروژه را انتخاب کردم
- [ ] به Settings → Environment Variables رفتم
- [ ] ۶ متغیر را اضافه کردم
- [ ] همه را برای Production, Preview, Development تنظیم کردم
- [ ] Redeploy کردم
- [ ] سایت کار می‌کند

---

## 🆘 رفع مشکلات

### مشکل: "Firebase: Error (auth/api-key-not-valid)"
**علت:** مقادیر `.env.local` اشتباه هستند

**راه‌حل:**
1. فایل `.env.local` را باز کنید
2. مقادیر را از Firebase Console کپی کنید
3. فاصله‌های اضافی را حذف کنید
4. `npm run dev` را دوباره اجرا کنید

### مشکل: در Vercel کار نمی‌کند
**علت:** Environment Variables تنظیم نشده‌اند

**راه‌حل:**
1. به Vercel → Settings → Environment Variables بروید
2. مطمئن شوید همه ۶ متغیر اضافه شده‌اند
3. Environment را روی Production, Preview, Development تنظیم کنید
4. Redeploy کنید

### مشکل: صفحه Login نمایش داده نمی‌شود
**علت:** Firebase درست پیکربندی نشده

**راه‌حل:**
1. Console browser را باز کنید (F12)
2. Errors را بررسی کنید
3. مطمئن شوید `.env.local` درست است
4. `npm run dev` را دوباره اجرا کنید

### مشکل: Google Sign-In کار نمی‌کند
**علت:** Google Authentication فعال نیست

**راه‌حل:**
1. Firebase Console → Authentication → Sign-in method
2. Google را Enable کنید
3. Email پشتیبانی را وارد کنید
4. Authorized domains را بررسی کنید

---

## 📸 تصاویر راهنما

### Firebase Console - Project Settings
```
⚙️ Project Settings
  ↓
Your apps
  ↓
Web app (</>)
  ↓
Register app
  ↓
firebaseConfig را کپی کنید
```

### Vercel - Environment Variables
```
Dashboard
  ↓
Your Project
  ↓
Settings
  ↓
Environment Variables
  ↓
Add
  ↓
Name: VITE_FIREBASE_API_KEY
Value: AIzaSyB...
Environment: Production, Preview, Development
  ↓
Save
```

---

## 💡 نکات مهم

### 🔐 امنیت
- ❌ هرگز `.env.local` را به Git commit نکنید
- ❌ API keys را در کد hardcode نکنید
- ✅ از Environment Variables استفاده کنید
- ✅ در Vercel، متغیرها امن هستند

### 🔄 Local vs Production
- **Local:** از `.env.local` استفاده می‌شود
- **Vercel:** از Environment Variables استفاده می‌شود
- هر دو باید مقادیر یکسانی داشته باشند

### 📦 Build
- Vite به صورت خودکار متغیرهای `VITE_` را در build inject می‌کند
- نیازی به تنظیمات اضافی نیست

---

## 🎯 خلاصه

### فایل .env.local:
- 📍 در ریشه پروژه (کنار `package.json`)
- ✏️ با VS Code یا هر ویرایشگر متن باز کنید
- 🔑 مقادیر را از Firebase Console کپی کنید

### Vercel:
- ✅ بله، باید Environment Variables را تنظیم کنید
- 📝 همان ۶ متغیر را در Vercel وارد کنید
- 🔄 بعد از تنظیم، Redeploy کنید

### ترتیب کار:
1. ✅ Firebase Console → Web App ایجاد کنید
2. ✅ مقادیر را کپی کنید
3. ✅ در `.env.local` وارد کنید (برای Local)
4. ✅ در Vercel Environment Variables وارد کنید (برای Production)
5. ✅ تست کنید

---

## 📞 پشتیبانی

اگر مشکلی داشتید:
1. فایل `FIREBASE_SETUP_FA.md` را بخوانید
2. Console browser را بررسی کنید (F12)
3. Firebase Console → Authentication → Users را بررسی کنید
4. Issue ایجاد کنید

**موفق باشید! 🚀**

# 🚨 راهنمای عیب‌یابی خطای لاگین

## ❌ خطای فعلی: "An error occurred. Please try again"

این خطای عمومی معمولاً به یکی از دلایل زیر است:

---

## 🔍 مرحله ۱: بررسی Console مرورگر

**مهم‌ترین قدم:** Console مرورگر را باز کنید تا خطای دقیق را ببینید.

### روش باز کردن Console:
- **Chrome/Edge:** کلید `F12` یا `Ctrl+Shift+I` → تب Console
- **Firefox:** `F12` → تب Console
- **Safari:** `Cmd+Option+I`

### چه چیزی را ببینید:
دنبال پیام‌های قرمز بگردید، مثلاً:
```
FirebaseError: Firebase: Error (auth/invalid-api-key).
```

---

## 🎯 دلایل احتمالی و راه‌حل‌ها

### ۱. ❌ **فایل `.env.local` خالی است** (شایع‌ترین)

**نشانه در Console:**
```
FirebaseError: Firebase: Error (auth/invalid-api-key).
```

**راه‌حل:**
1. فایل `.env.local` را باز کنید
2. مقادیر را از Firebase Console کپی کنید
3. ذخیره کنید
4. `npm run dev` را **متوقف و دوباره اجرا کنید** (مهم!)

```bash
# در ترمینال
Ctrl+C
npm run dev
```

---

### ۲. ❌ **Authentication فعال نشده**

**نشانه در Console:**
```
FirebaseError: Firebase: Error (auth/operation-not-allowed).
```

**راه‌حل:**
1. به [Firebase Console](https://console.firebase.google.com) بروید
2. پروژه خود را انتخاب کنید
3. منوی سمت چپ → **Build** → **Authentication**
4. اگر پیام "Get started" می‌بینید، روی آن کلیک کنید
5. تب **Sign-in method** را انتخاب کنید
6. روش‌های زیر را **Enable** کنید:
   - ✅ **Email/Password** → Enable → Save
   - ✅ **Google** → Enable → Email support را انتخاب → Save

---

### ۳. ❌ **Authorized Domains تنظیم نشده**

**نشانه در Console:**
```
FirebaseError: Firebase: Error (auth/unauthorized-domain).
```

**راه‌حل:**
1. Firebase Console → **Authentication** → **Settings**
2. تب **Authorized domains**
3. مطمئن شوید این دامنه‌ها اضافه شده‌اند:
   - ✅ `localhost`
   - ✅ `127.0.0.1`
   - ✅ `your-project.vercel.app` (برای Vercel)

---

### ۴. ❌ **مقادیر `.env.local` اشتباه هستند**

**نشانه:** خطاهای مختلف مثل `invalid-api-key` یا `app-deleted`

**راه‌حل:**
1. Firebase Console → ⚙️ **Project Settings**
2. پایین صفحه → **Your apps** → روی آیکون Web (</>) کلیک کنید
3. اگر app قبلی دارید، روی آن کلیک کنید تا config را ببینید
4. مقادیر را **دقیقاً** کپی کنید:

```bash
# ✅ درست
VITE_FIREBASE_API_KEY=AIzaSyB1234567890abcdef
VITE_FIREBASE_AUTH_DOMAIN=my-project.firebaseapp.com

# ❌ اشتباه (فاصله، علامت نقل قول)
VITE_FIREBASE_API_KEY = "AIzaSyB1234567890abcdef"
```

---

### ۵. ❌ **سرور توسعه را بعد از تغییر `.env.local` ریستارت نکرده‌اید**

**نشانه:** تغییرات `.env.local` اعمال نشده

**راه‌حل:**
```bash
# در ترمینال
Ctrl+C              # متوقف کردن سرور
npm run dev         # دوباره اجرا
```

**نکته مهم:** Vite فقط هنگام شروع، متغیرهای env را می‌خواند.

---

## 🧪 تست سریع

### تست ۱: بررسی پیکربندی Firebase

فایل `src/services/firebase.ts` را باز کنید و ببینید آیا این کد را می‌بینید:

```typescript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "YOUR_API_KEY",
  // ...
};
```

اگر مقدار `apiKey` برابر با `"YOUR_API_KEY"` است، یعنی `.env.local` کار نمی‌کند.

### تست ۲: چاپ مقادیر در Console

در `src/services/firebase.ts` این خط را موقتاً اضافه کنید:

```typescript
console.log('Firebase Config:', {
  apiKey: firebaseConfig.apiKey?.substring(0, 10) + '...',
  projectId: firebaseConfig.projectId,
});
```

سپس در Console مرورگر ببینید آیا مقادیر درست هستند.

---

## 📋 چک‌لیست کامل

### Firebase Console:
- [ ] پروژه ایجاد شده
- [ ] Web App ثبت شده
- [ ] Authentication → Email/Password فعال شده
- [ ] Authentication → Google فعال شده
- [ ] Authorized domains شامل `localhost` است

### فایل `.env.local`:
- [ ] فایل وجود دارد
- [ ] ۶ متغیر پر شده‌اند
- [ ] بدون فاصله اضافی
- [ ] بدون علامت نقل قول
- [ ] فایل ذخیره شده

### سرور توسعه:
- [ ] `npm install` اجرا شده
- [ ] `npm run dev` اجرا شده
- [ ] بعد از تغییر `.env.local` ریستارت شده

---

## 🆘 اگر هنوز مشکل دارید

### اطلاعات مورد نیاز برای کمک:

لطفاً این اطلاعات را ارسال کنید:

1. **خطای دقیق Console:**
   - F12 → Console → خطای قرمز را کپی کنید

2. **محتوای `.env.local`:**
   - فقط نام متغیرها (مقادیر را مخفی کنید):
   ```
   VITE_FIREBASE_API_KEY=[پر شده / خالی]
   VITE_FIREBASE_AUTH_DOMAIN=[پر شده / خالی]
   ...
   ```

3. **Authentication methods:**
   - کدام روش‌ها فعال هستند؟

4. **مرورگر:**
   - Chrome/Firefox/Safari؟

---

## 💡 نکات اضافی

### اگر از Google Sign-In استفاده می‌کنید:
- باید pop-up blocker مرورگر را غیرفعال کنید
- یا از Email/Password استفاده کنید

### اگر ایمیل/رمز عبور استفاده می‌کنید:
- اول باید ثبت‌نام کنید (Register)
- رمز عبور باید حداقل ۶ کاراکتر باشد

### برای تست سریع:
یک حساب آزمایشی بسازید:
- Email: `test@test.com`
- Password: `123456`

---

## 🔗 لینک‌های مفید

- [Firebase Console](https://console.firebase.google.com)
- [Firebase Auth Documentation](https://firebase.google.com/docs/auth)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

**موفق باشید! 🚀**

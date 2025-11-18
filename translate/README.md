# @makstashkevich/translate ![minzip package size](https://img.shields.io/bundlephobia/minzip/@makstashkevich/translate) ![npm version](https://img.shields.io/npm/v/@makstashkevich/translate.svg)

Модуль Node.js для Next.js с локализацией и управлением состоянием Zustand.

- ✅ Простая локализация для React/Next.js приложений
- ✅ Управление переводами с помощью Zustand
- ✅ Поддержка вложенных ключей перевода
- ✅ Замена аргументов в строках перевода
- ✅ Хуки `useLocale` и `useTranslations`
- ✅ Компонент `TranslateProvider` для инициализации

## Установка

```bash
$ npm install @makstashkevich/translate
# или
$ yarn add @makstashkevich/translate
```

## Использование

### Инициализация с `TranslateProvider`

Для использования плагина оберните ваше приложение в `TranslateProvider` и передайте ему `defaultLocale` (язык по умолчанию) и `translations` (объект с переводами).

```jsx
// app/layout.tsx или pages/_app.tsx
import { TranslateProvider } from '@makstashkevich/translate';

// Ваши переводы
const translations = {
  en: {
    common: {
      hello: 'Hello, {name}!',
      welcome: 'Welcome!'
    }
  },
  ru: {
    common: {
      hello: 'Привет, {name}!',
      welcome: 'Добро пожаловать!'
    }
  }
};

// Или импортируйте переводы из JSON-файлов:
// import enLocale from '@/locales/en.json';
// import ruLocale from '@/locales/ru.json';
// const translations = {
//   en: enLocale,
//   ru: ruLocale,
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TranslateProvider defaultLocale="en" translations={translations}>
          {children}
        </TranslateProvider>
      </body>
    </html>
  );
}
```

### Хук `useLocale`

Используйте хук `useLocale` для получения текущего языка и функции `setLocale` для его изменения.

```jsx
import { useLocale, setLocale } from '@makstashkevich/translate';

const LanguageSwitcher = () => {
  const locale = useLocale();

  const handleChangeLanguage = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <div>
      Текущий язык: {locale}
      <button onClick={() => handleChangeLanguage('en')}>English</button>
      <button onClick={() => handleChangeLanguage('ru')}>Русский</button>
    </div>
  );
};
```

### Функция `translate` (или `t`)

Используйте функцию `translate` (или ее псевдоним `t`) для получения переведенных строк. Поддерживаются вложенные ключи и замена аргументов.

```jsx
import { translate, t } from '@makstashkevich/translate';

const MyComponent = () => {
  const userName = 'Мир';

  return (
    <div>
      <p>{translate('common.hello', { name: userName })}</p>
      <p>{t('common.welcome')}</p>
    </div>
  );
};
```

### Хук `useTranslations`

Используйте хук `useTranslations` для получения всех загруженных переводов.

```jsx
import { useTranslations } from '@makstashkevich/translate';

const DebugTranslations = () => {
  const allTranslations = useTranslations();

  return (
    <pre>
      {JSON.stringify(allTranslations, null, 2)}
    </pre>
  );
};
```

## API

### `TranslateProvider` Props

-   `children`: `React.ReactNode` - Дочерние элементы, которые будут иметь доступ к контексту локализации.
-   `defaultLocale`: `LocaleType` - Язык по умолчанию для приложения.
-   `translations`: `AllTranslations` - Объект, содержащий переводы для всех поддерживаемых языков.

### Функции и Хуки

-   `setLocale(locale: LocaleType)`: Устанавливает текущий язык.
-   `getLocale(): LocaleType`: Возвращает текущий язык.
-   `setDefaultLocale(defaultLocale: LocaleType)`: Устанавливает язык по умолчанию.
-   `getDefaultLocale(): LocaleType`: Возвращает язык по умолчанию.
-   `setTranslations(translations: AllTranslations)`: Устанавливает все переводы.
-   `translate(key: string, args?: Args): string`: Возвращает переведенную строку по ключу, с возможностью замены аргументов. Псевдоним: `t`.
-   `useLocale(): LocaleType`: Хук для получения текущего языка.
-   `useTranslations(): AllTranslations`: Хук для получения всех загруженных переводов.

### Типы

-   `LocaleType = 'ru' | 'en' | string`: Тип для обозначения языка.
-   `Translations = Record<string, any>`: Объект переводов для конкретного языка.
-   `AllTranslations = Record<LocaleType, Translations>`: Объект, содержащий переводы для всех языков.
-   `Args = Record<string, string | number> | (string | number)[]`: Тип для аргументов, используемых в строках перевода.

## Обсуждение

### Как это работает?

Библиотека использует [Zustand](https://zustand-bear.github.io/zustand/) для управления состоянием локализации. `TranslateProvider` инициализирует это состояние, а хуки и функции предоставляют удобный интерфейс для взаимодействия с ним. Переводы хранятся в глобальном хранилище Zustand, что обеспечивает их доступность в любом месте приложения без необходимости пробрасывать пропсы.

## FAQ

---

**Почему я получаю ошибку несоответствия сервера/клиента (hydration mismatch)?**

Поскольку состояние локализации управляется на стороне клиента с помощью Zustand, при использовании хуков `useLocale` или `useTranslations` на сервере (SSR/SSG) вы можете столкнуться с ошибками несоответствия гидратации. Чтобы избежать этого, убедитесь, что компоненты, использующие эти хуки, рендерятся только на клиенте, например, с помощью `useEffect` или `next/dynamic` с `ssr: false`.

```jsx
import { useState, useEffect } from 'react';
import { useLocale } from '@makstashkevich/translate';

const ClientSideComponent = () => {
  const [mounted, setMounted] = useState(false);
  const locale = useLocale();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <p>Текущий язык на клиенте: {locale}</p>
  );
};
```

---

**Могу ли я использовать этот пакет с Gatsby или CRA?**

Да, поскольку это стандартный React-компонент и хуки, его можно использовать в любом React-приложении, включая Gatsby и Create React App.

---

**Как добавить новые языки?**

Просто добавьте новые языки в объект `translations`, который вы передаете в `TranslateProvider`. Тип `LocaleType` поддерживает `string`, поэтому вы можете использовать любой строковый идентификатор для вашего языка.

```jsx
const translations = {
  en: { /* ... */ },
  ru: { /* ... */ },
  fr: { /* ... */ } // Новый язык
};

<TranslateProvider defaultLocale="en" translations={translations}>
  {children}
</TranslateProvider>
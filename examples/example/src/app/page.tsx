'use client'

import { useState } from 'react';

import { useLocale, setLocale, translate, t } from '@makstashkevich/translate'

export default function HomeContent() {
  const locale = useLocale()
  const [userName, setUserName] = useState('Мир');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <h1 className="text-4xl font-bold">{t('page.title')}</h1>

      <p className="mt-4 text-xl">{translate('common.welcome')}</p>
      <p className="mt-2 text-lg">{translate('common.hello', { name: userName })}</p>
      <p className="mt-2 text-lg">{translate('common.greeting')}</p>
      <p className="mt-2 text-lg">Current Locale: {locale}</p>
      <p className="mt-2 text-lg">Non Existent Key: {translate('nonExistentKey')}</p>

      <div className="mt-8 flex space-x-4">
        <button
          onClick={() => setLocale('en')}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
        >
          English
        </button>
        <button
          onClick={() => setLocale('ru')}
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-700"
        >
          Русский
        </button>
        <button
          onClick={() => setUserName(userName === 'Мир' ? 'Планета' : 'Мир')}
          className="rounded bg-purple-500 px-4 py-2 text-white hover:bg-purple-700"
        >
          Change Name
        </button>
      </div>
    </div>
  )
}

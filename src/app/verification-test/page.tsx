export default function VerificationTestPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Тест файлов верификации</h1>
      
      <div className="space-y-4">
        <div className="p-4 border rounded">
          <h2 className="text-lg font-semibold mb-2">Яндекс Вебмастер (старый)</h2>
          <p className="text-sm text-gray-600 mb-2">Файл: /yandex_66ce443c9e6aa964.html</p>
          <a 
            href="/yandex_66ce443c9e6aa964.html" 
            target="_blank"
            className="text-blue-600 hover:underline"
          >
            Открыть файл верификации
          </a>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-lg font-semibold mb-2">Яндекс Вебмастер (новый)</h2>
          <p className="text-sm text-gray-600 mb-2">Файл: /yandex_70d29db80d4b9a25.html</p>
          <a 
            href="/yandex_70d29db80d4b9a25.html" 
            target="_blank"
            className="text-blue-600 hover:underline"
          >
            Открыть файл верификации
          </a>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-lg font-semibold mb-2">Google Search Console</h2>
          <p className="text-sm text-gray-600 mb-2">Файл: /googlef295c1b7371fdbfb.html</p>
          <a 
            href="/googlef295c1b7371fdbfb.html" 
            target="_blank"
            className="text-blue-600 hover:underline"
          >
            Открыть файл верификации
          </a>
        </div>
      </div>
    </div>
  );
}

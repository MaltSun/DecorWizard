import { useState, useEffect } from 'react';

type Status =
  | { type: 'idle' }
  | { type: 'generating'; message: string }
  | { type: 'done'; url: string }
  | { type: 'error'; message: string };

export default function FreeImageGenerator() {
  const prompt = 'Photorealist beatiful cake, 8k';
  const model = 'flux'; // или 'flux' и т.д.
  const [status, setStatus] = useState<Status>({ type: 'idle' });
  const [abortCtrl, setAbortCtrl] = useState<AbortController | null>(null);

  const generate = async () => {
    const controller = new AbortController();
    setAbortCtrl(controller);

    setStatus({ type: 'generating', message: 'Искусственный интеллект рисует...' });

    try {
      const res = await fetch('http://localhost:5000/api/generate/image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, model }),
        signal: controller.signal,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Ошибка сервера');

      setStatus({ type: 'done', url: data.imageUrl });
    } catch (err: any) {
      if (err.name === 'AbortError') {
        setStatus({ type: 'idle' });
      } else {
        setStatus({ type: 'error', message: err.message });
      }
    } finally {
      setAbortCtrl(null);
    }
  };

  useEffect(() => () => abortCtrl?.abort(), [abortCtrl]);

  return (
    <div style={{ padding: 20, maxWidth: 640, margin: 'auto' }}>
      <button
        onClick={generate}
        disabled={status.type === 'generating' || !prompt.trim()}
        style={{ marginRight: 12 }}
      >
        {status.type === 'generating' ? 'Генерируется...' : 'Создать изображение'}
      </button>

      {status.type === 'generating' && <button onClick={() => abortCtrl?.abort()}>Отменить</button>}

      {status.type === 'generating' && <p style={{ color: '#666' }}>{status.message}</p>}

      {status.type === 'error' && <p style={{ color: 'crimson' }}>Ошибка: {status.message}</p>}

      {status.type === 'done' && (
        <div style={{ marginTop: 24 }}>
          <h3>Готово:</h3>
          <img
            src={status.url}
            alt="Сгенерированное изображение"
            style={{ maxWidth: '100%', borderRadius: 8, boxShadow: '0 4px 14px #0002' }}
            crossOrigin="anonymous" // если нужно скачивать/обрабатывать
          />
        </div>
      )}
    </div>
  );
}

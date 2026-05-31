import { getAuthHeader } from './authUtils';

/**
 * Выполняет авторизованный API запрос с автоматическим добавлением токена
 */
export const authenticatedFetch = async (
    url: string,
    options: RequestInit = {}
): Promise<Response> => {
    const authHeader = getAuthHeader();

    const headers = {
        'Content-Type': 'application/json',
        ...authHeader,
        ...options.headers,
    };

    return fetch(url, {
        ...options,
        headers,
    });
};

/**
 * Обрабатывает ответ API и проверяет ошибки авторизации
 */
export const handleApiResponse = async <T = any>(
    response: Response
): Promise<T> => {
    const data = await response.json();

    if (!response.ok) {
        // Если токен недействителен, очищаем данные авторизации
        if (response.status === 401) {
            const { clearAuthData } = await import('./authUtils');
            clearAuthData();
            // Можно перенаправить на страницу входа, если нужно
            // window.location.href = '/auth/login';
        }
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return data;
};


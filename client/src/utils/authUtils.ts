export interface User {
    id: string;
    email: string;
    role: string;
    name: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

/**
 * Сохраняет токен и данные пользователя в sessionStorage
 */
export const saveAuthData = (authData: AuthResponse): void => {
    sessionStorage.setItem(TOKEN_KEY, authData.token);
    sessionStorage.setItem(USER_KEY, JSON.stringify(authData.user));
};

/**
 * Получает токен из sessionStorage
 */
export const getToken = (): string | null => {
    return sessionStorage.getItem(TOKEN_KEY);
};

/**
 * Получает данные пользователя из sessionStorage
 */
export const getUser = (): User | null => {
    const userStr = sessionStorage.getItem(USER_KEY);
    if (!userStr) return null;
    try {
        return JSON.parse(userStr) as User;
    } catch {
        return null;
    }
};

/**
 * Проверяет, авторизован ли пользователь
 */
export const isAuthenticated = (): boolean => {
    return !!getToken();
};

/**
 * Удаляет токен и данные пользователя из sessionStorage
 */
export const clearAuthData = (): void => {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
};

/**
 * Получает заголовок Authorization для API запросов
 */
export const getAuthHeader = (): { Authorization: string } | {} => {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
};


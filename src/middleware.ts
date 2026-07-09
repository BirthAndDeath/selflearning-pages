// src/middleware.ts
import { defineMiddleware } from 'astro:middleware';


// ✅ 在这里配置你的支持语言和对应的路径
const SUPPORTED_LOCALES = [
    { code: 'zh-CN', path: '/zh-CN/' },
    { code: 'en', path: '/en/' },
    // 按需添加更多语言...
];

// 默认语言（兜底）
const DEFAULT_LOCALE = '/en/';

export const onRequest = defineMiddleware((context, next) => {
    const url = new URL(context.url);

    // 只在访问根路径时重定向
    if (url.pathname === '/') {
        const preferredPath = getPreferredLocalePath(context.request);
        const redirectUrl = preferredPath || DEFAULT_LOCALE;
        return context.redirect(redirectUrl);
    }

    return next();
});

/**
 * 根据浏览器的 Accept-Language 匹配最佳语言路径
 */
function getPreferredLocalePath(request: Request): string | null {
    const acceptLanguage = request.headers.get('accept-language');
    if (!acceptLanguage) return null;

    // 解析并排序语言标签（按优先级 q 值降序）
    const preferredLanguages = acceptLanguage
        .split(',')
        .map((part) => {
            const [tag, q] = part.trim().split(';q=');
            return { tag: tag.toLowerCase(), q: q ? Number(q) : 1 };
        })
        .sort((a, b) => b.q - a.q);

    // 遍历用户偏好的语言，尝试匹配支持的语言列表
    for (const { tag } of preferredLanguages) {
        // 先尝试精确匹配（如 'zh-cn' 匹配 'zh-CN'）
        const exactMatch = SUPPORTED_LOCALES.find(
            (locale) => locale.code.toLowerCase() === tag
        );
        if (exactMatch) return exactMatch.path;

        // 如果没有精确匹配，尝试前缀匹配（如 'zh' 匹配 'zh-CN'）
        const prefixMatch = SUPPORTED_LOCALES.find(
            (locale) => locale.code.toLowerCase().startsWith(tag.split('-')[0])
        );
        if (prefixMatch) return prefixMatch.path;
    }

    // 没有匹配到任何支持的语言，返回 null（使用默认语言）
    return null;
}
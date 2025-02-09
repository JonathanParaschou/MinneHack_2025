export async function fetchWithUid(url: any, options: any, uid: any) {
    return fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: uid
        }
    });
}
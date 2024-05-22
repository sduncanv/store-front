export function requestApi(url, method = 'POST', body = {}) {

    const requestOptions = {
        method: method,
        headers: { 'Content-Type': 'application/json' }
    };

    if (body && method !== 'GET' && method !== 'HEAD') {
        requestOptions.body = JSON.stringify(body);
    }

    fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
            return data
        });
}
const REACT_APP_API_URL = 'https://swapi.dev/api'; //this can be moved to the .env

export const fetchWrapper = {
  get,
  getAll,
};

async function http<T>(request: Request): Promise<T> {
  const response = await fetch(request);
  if (!response.ok) {
    throw response;
  }
  return response
    .json()
    .then((response) => response.results ?? response)
    .catch(() => ({}));
}

async function get<T>(path: string, params = {}): Promise<T> {
  const requestOptions = request('GET', createUrl(path, params));
  return await http<T>(requestOptions);
}

async function httpAll(request: Request[]): Promise<any> {
  let responses = await Promise.all(request.map((e) => fetch(e)));
  return await Promise.all(responses.map((e) => e.json()))
    .then((response) => response)
    .catch(() => ({}));
}

async function getAll<T>(paths: string[], params = {}): Promise<T> {
  let requestOptions: Request[] = paths.map((path) => {
    const url = createUrl(path, params);
    return request('GET', url);
  });
  return await httpAll(requestOptions);
}

const request = <D>(method: string, url: URL, body?: D): Request =>
  new Request(url.toString(), {
    method,
    body: body ? JSON.stringify(body) : null,
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

const createUrl = (path: string, params = {}): URL => {
  const url = new URL(`${REACT_APP_API_URL}/${path}`);
  url.search = new URLSearchParams(params).toString();
  return url;
};

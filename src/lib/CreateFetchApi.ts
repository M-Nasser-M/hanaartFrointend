const createFetchApi = (baseURL: string, defaultRequestInit?: RequestInit) => ({
  get: async <T>(url: string, requestInit?: RequestInit): Promise<T> => {
    const response = fetch(`${baseURL}${url}`, {
      method: "GET",
      ...defaultRequestInit,
      ...requestInit,
    });
    return (await response).json();
  },
  post: async <T>(
    url: string,
    data: object,
    requestInit?: RequestInit
  ): Promise<T> => {
    const response = fetch(`${baseURL}${url}`, {
      method: "POST",
      body: JSON.stringify(data),
      ...defaultRequestInit,
      ...requestInit,
    });
    return (await response).json();
  },
  put: async <T>(
    url: string,
    data: object,
    requestInit?: RequestInit
  ): Promise<T> => {
    const response = fetch(`${baseURL}${url}`, {
      method: "PUT",
      body: JSON.stringify(data),
      ...defaultRequestInit,
      ...requestInit,
    });
    return (await response).json();
  },
  delete: async <T>(url: string, requestInit?: RequestInit): Promise<T> => {
    const response = fetch(`${baseURL}${url}`, {
      method: "DELETE",
      ...defaultRequestInit,
      ...requestInit,
    });
    return (await response).json();
  },
});

export default createFetchApi;

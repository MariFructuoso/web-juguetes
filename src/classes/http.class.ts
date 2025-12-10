export class Http {
  async ajax<T>(
    method: string,
    url: string,
    headers?: HeadersInit,
    body?: string
  ): Promise<T> {
    
    // Aquí hacías lo del token, lo quitamos para este examen
    const resp = await fetch(url, { method, headers, body });
    
    if (!resp.ok) throw await resp.json();
    
    // Si la respuesta no tiene contenido (204), devolvemos null
    if (resp.status !== 204) {
      return (await resp.json()) as T;
    } else {
      return null as T;
    }
  }

  get<T>(url: string): Promise<T> {
    return this.ajax<T>("GET", url);
  }

  post<T, U>(url: string, data?: U): Promise<T> {
    return this.ajax<T>(
      "POST",
      url,
      {
        "Content-Type": "application/json",
      },
      JSON.stringify(data)
    );
  }

  delete<T>(url: string): Promise<T> {
    return this.ajax<T>("DELETE", url);
  }
}
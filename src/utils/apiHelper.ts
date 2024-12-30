import authMessages from "./authMessages";

// utils/apiHelper.ts
interface ApiOptions {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    headers?: HeadersInit;
    body?: object;
  }
  
  const apiHelper = async (url: string, options: ApiOptions = {}) => {
    const { method = "GET", headers = {}, body } = options;
  
    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || authMessages.fetchingError);
      }
  
      return await response.json();
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : authMessages.unknownError);
    }
  };
  
  export default apiHelper;
  
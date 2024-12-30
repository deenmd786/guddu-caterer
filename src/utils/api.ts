export const fetcher = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  try {
    // Default headers
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    // Prepare the request options
    const fetchOptions: RequestInit = {
      method: options.method || "GET",
      headers,
      body: options.body || undefined, // Body should already be a string
    };

    // Perform the fetch request
    const res = await fetch(url, fetchOptions);

    // Check if the response is not OK (status outside the range 200-299)
    if (!res.ok) {
      const errorResponse = await res.json(); // Try to parse the error response
      const errorMessage = errorResponse.message || "API error"; // Get the message or fallback to a generic error
      throw new Error(errorMessage);
    }

    // Return the JSON response if successful
    return await res.json() as T; // Cast the response to type T
  } catch (error) {
    // Handle network errors or unexpected errors
    console.error("Fetch error:", error);
    throw new Error(error instanceof Error ? error.message : "Network error or API error occurred");
  }
};
// src/services/api.js

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

/**
 * Generic API request handler
 * @param {string} endpoint - API endpoint (e.g., "/parking")
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE)
 * @param {object} data - request body (optional)
 * @param {object} customHeaders - additional headers (optional)
 */
export const apiRequest = async (
  endpoint,
  method = "GET",
  data = null,
  customHeaders = {}
) => {
  try {
    const url = `${BASE_URL}${endpoint}`;

    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...customHeaders,
      },
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    // Handle non-2xx responses
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return await response.json();
  } catch (err) {
    console.error("API Error:", err);
    return { error: true, message: err.message };
  }
};

// src/services/api.js

export const get = (endpoint, headers = {}) =>
  apiRequest(endpoint, "GET", null, headers);

export const post = (endpoint, data, headers = {}) =>
  apiRequest(endpoint, "POST", data, headers);

export const put = (endpoint, data, headers = {}) =>
  apiRequest(endpoint, "PUT", data, headers);

export const del = (endpoint, headers = {}) =>
  apiRequest(endpoint, "DELETE", null, headers);

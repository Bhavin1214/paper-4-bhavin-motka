import CryptLib from "./cryptLib";

const cryptLib = new CryptLib();

const BASE_URL = process.env.REACT_APP_API_URL;
const KEY = process.env.REACT_APP_API_KEY;
const IV = process.env.REACT_APP_API_IV;

const SHA_KEY = cryptLib.getHashSha256(KEY, 32);

const encryptData = (data) => {
  try {
    const plain = JSON.stringify(data);
    return cryptLib.encrypt(plain, SHA_KEY, IV);
  } catch {
    return null;
  }
};

const decryptData = (encrypted) => {
  try {
    const decrypted = cryptLib.decrypt(encrypted, SHA_KEY, IV);
    return JSON.parse(decrypted);
  } catch {
    return {};
  }
};

async function request(url, options = {}) {
  let bodyToSend = options.body;
  let headers = {};
  const token = localStorage.getItem("token");

  const isFormData = bodyToSend instanceof FormData;

  if (!isFormData && bodyToSend) {
    if (typeof bodyToSend !== "string") {
      bodyToSend = JSON.stringify(bodyToSend);
    }
    const json = JSON.parse(bodyToSend);
    bodyToSend = encryptData(json);
    headers["Content-Type"] = "text/plain";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (options.headers) {
    headers = { ...headers, ...options.headers };
  }

  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
    body: bodyToSend,
  });

  const encryptedText = await response.text();
  return decryptData(encryptedText);
}

export const api = {
  get: (url) =>
    request(url, { method: "GET" }),

  post: (url, body = {}) => {
    if (body instanceof FormData) {
      return request(url, { method: "POST", body });
    }
    return request(url, { method: "POST", body });
  },

  put: (url, body = {}) => {
    if (body instanceof FormData) {
      return request(url, { method: "PUT", body });
    }
    return request(url, { method: "PUT", body });
  },

  patch: (url, body = {}) => {
    if (body instanceof FormData) {
      return request(url, { method: "PATCH", body });
    }
    return request(url, { method: "PATCH", body });
  },

  delete: (url) =>
    request(url, { method: "DELETE" }),
};

export const getApiUrl = (endpoint: string) => {
  // For server-side calls, use the full URL
  if (typeof window === 'undefined') {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';
    return `${baseUrl}${endpoint}`;
  }
  // For client-side calls, use relative URLs
  return endpoint;
};

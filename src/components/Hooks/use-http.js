import { useState, useCallback } from 'react' 

const useHttp = (requestConfig,applyData) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
  
    const SendRequest = useCallback(async (requestConfig, applyData) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          requestConfig.url, {
            method: requestConfig.method ? requestConfig.method: 'GET',
            headers: requestConfig.headers ? requestConfig.headers: {},
            body: requestConfig.body ? JSON.stringify(requestConfig.body) : null, }/*'https://react-http-6b4a6.firebaseio.com/tasks.json'*/
        );
  
        if (!response.ok) {
          throw new Error('Request failed!');
        }
  
        const data = await response.json();
        applyData(data);
      } catch (err) {
        setError(err.message || 'Something went wrong!');
      }
      setIsLoading(false);
    }, []);

    return {
        isLoading,
        error,
        SendRequest,
    }
}  
export default useHttp;
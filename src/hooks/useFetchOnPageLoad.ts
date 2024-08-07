import { useState, useEffect } from "react";

interface UseFetchReturn<T> {
  data: any;
  error: string | null;
  loading: boolean;
}

const useFetchOnPageLoad = <T>(
  endpoint = "",
  requestBody: object
): UseFetchReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  console.log("useFetchOnPageLoad", endpoint, "eee");
  console.log(JSON.stringify(process.env));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch data: ${res.status}`);
        }

        const data = await res.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, error, loading };
};

export default useFetchOnPageLoad;

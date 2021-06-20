import { useEffect, useState } from 'react';
import axios from 'axios';
import { IPullRequest } from '../types/GithubPull';
import { repoRegex, pullAPIRegex } from '../utils/regex';

export const usePullListGetReq = (url: string, page: number) => {
  const [data, setData] = useState<IPullRequest[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    const match = repoRegex.exec(url);
    if (match === null) {
      setError(true);
      setLoading(false);
      return;
    }
    const owner = match[match.length - 2];
    const repo = match[match.length - 1];
    axios
      .get<IPullRequest[]>(
        `https://api.github.com/repos/${owner}/${repo}/pulls`,
        {
          params: {
            page: page,
          },
        }
      )
      .then((response) => {
        setData(response.data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [url, page]);

  return { data, error, loading };
};

export const useSinglePullGetReq = (url: string) => {
  const [data, setData] = useState<IPullRequest | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    if (!pullAPIRegex.test(url)) {
      setError(true);
      setLoading(false);
      return;
    }
    axios
      .get<IPullRequest>(url)
      .then((response) => {
        setData(response.data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, error, loading };
};

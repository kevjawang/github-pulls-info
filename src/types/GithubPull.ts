export interface IPullRequest {
  url?: string;
  title?: string;
  number?: number;
  html_url?: string;
  user?: {
    login: string;
    id: number;
    html_url: string;
  };
  commits?: number;
  comments?: number;
}

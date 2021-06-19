export interface IPullRequest {
  url?: string;
  title?: string;
  number?: number
  user?: {
    login: string;
    id: number;
    html_url: string;
  };
  _links?: {
    self: {
      href: string;
    };
  };
  commits?: number;
  comments?: number;
}


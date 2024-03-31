export interface Package {
  name: string;
  scope: string;
  version: string;
  description: string;
  keywords: string[];
  date: string;
  links: {
    npm: string;
    homepage: string;
    repository: string;
    bugs: string;
  };
  author: {
    name: string;
  };
  publisher: {
    username: string;
    email: string;
  };
  maintainers: {
    username: string;
    email: string;
  }[];
}

export interface Object {
  flags: {
    insecure: 0;
  };
  package: Package;
  score: {
    final: number;
  };
}

export interface SearchRequestResponse {
  objects: Object[];
  time: string;
  total: number;
}

export interface SearchRequestParams {
  text?: string;
  size?: number;
  from?: number;
}

export interface IAuthor {
  username: string;
  display_name: string;
  subscription: {
    name: string;
    slug: string;
    audience: {
      slug: string;
      name: string;
      audience_type: string;
    };
  };
}

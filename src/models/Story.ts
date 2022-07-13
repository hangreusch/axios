import {Author} from './Author';
export interface Story {
  headline: string;
  authors: Author[];
  blocks: {
    blocks: [
      {
        text: string;
      },
    ];
  };
  topics: [
    {
      name: string;
    },
  ];
  published_date: string;
  primary_image: {
    base_image_url: string | null;
  };
}

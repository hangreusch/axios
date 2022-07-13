import {IAuthor} from './IAuthor';
export interface IStory {
  id: string;
  headline: string;
  authors: IAuthor[];
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

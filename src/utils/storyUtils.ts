const renderAuthors = (story) => {
  let string = '';
  for (let i = 0; i < story.authors.length; i++) {
    if (i !== story.authors.length - 1) {
      string = string + story.authors[i].display_name + ' & ';
    } else {
      string = string + story.authors[i].display_name;
    }
  }
  return string;
};

const getImage = (story) => {
  return story.primary_image?.base_image_url;
};

const getHeadLine = (story) => {
  return story.headline;
};

export {renderAuthors, getImage, getHeadLine};

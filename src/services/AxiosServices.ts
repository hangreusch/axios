import axios from 'axios';

const getArticleList = async () => {
    const configurationObject = {
        method: 'get',
        url: 'https://api.axios.com/api/render/stream/content?page_size=20',
    };
    const response = await axios(configurationObject);
    return response;
};

const getContent = async (id) => {
    const configurationObject = {
        method: 'get',
        url: 'https://api.axios.com/api/render/content/' + id,
    };
    const response = await axios(configurationObject);
    return response.data;
};

export {getArticleList, getContent};

import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, FlatList, View } from 'react-native';
import {getArticleList, getContent} from "../services/AxiosServices";
import Story from "../components/Story";
import {useNavigation} from '@react-navigation/native';


const Stories: React.FC = () => {
    const navigation = useNavigation();
    console.warn('check rwrtw232454', navigation);
    const [storiesList, setStoriesList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    const getAuthors = (story) => {
        let authors = [];
        story.authors?.forEach((author) => authors.push(author.display_name));
        return authors;
    };

    const getImage = (story) => {
        return story.primary_image?.base_image_url;
    };

    const getHeadLine = (story) => {
        return story.headline;
    };

    const onStoryClicked = (story) => {
        //go to another screen
        navigation.navigate('Headline', {story: story})
    };

    useEffect(() => {
            console.warn('run here')
            const getStoriesList = async () => {
                try {
                    setIsLoading(true);
                    const response = await getArticleList();
                    console.log('list', response, response.data.results);
                    if (response.status === 200) {
                        const stories = [];
                        const idList = response.data.results;
                        for (let i = 0; i < idList.length; i++) {
                            const story = await getContent(idList[i]);
                            stories.push(story);
                        }
                        console.warn('story here', stories);
                        setStoriesList(stories);
                        setIsLoading(false);
                    } else {
                        throw new Error("Failed to fetch stories list");
                    }

                } catch {
                    setHasError(true);
                    setIsLoading(false);
                }
            };
            getStoriesList();
    }, []);

    return (
        <View>
            <Text>Stories</Text>
            <View style={{
                borderBottomColor:'red',
                borderBottomWidth: 1,
            }}></View>
            <View>
                {isLoading && <Text>Loading</Text>}
                {!isLoading && hasError && <Text>An error has occurred</Text>}
                {!isLoading && !hasError &&
                    <FlatList
                        data={storiesList}
                        keyExtractor={(item) => item.id}
                        renderItem={({item, index}) => (
                            <Story
                                image={getImage(item)}
                                headline={getHeadLine(item)}
                                authors={getAuthors(item)}
                                onStoryClicked={onStoryClicked}
                            />
                        )}
                    />
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

});

export default Stories;
// export default function App() {
//     const [userId, setUserId] = useState(1);
//     const [user, setUser] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const [hasError, setErrorFlag] = useState(false);
//     const changeUserIdHandler = () => {
//         setUserId((userId) => (userId === 3 ? 1 : userId + 1));
//     };
//     useEffect(() => {
//         const source = axios.CancelToken.source();
//         const url = `${baseUrl}/api/users/${userId}`;
//         const fetchUsers = async () => {
//             try {
//                 setIsLoading(true);
//                 const response = await axios.get(url, { cancelToken: source.token });
//                 if (response.status === 200) {
//                     setUser(response.data.data);
//                     setIsLoading(false);
//                     return;
//                 } else {
//                     throw new Error("Failed to fetch users");
//                 }
//             } catch (error) {
//                 if(axios.isCancel(error)){
//                     console.log('Data fetching cancelled');
//                 }else{
//                     setErrorFlag(true);
//                     setIsLoading(false);
//                 }
//             }
//         };
//         fetchUsers();
//         return () => source.cancel("Data fetching cancelled");
//     }, [userId]);
//     return (
//         <ScrollView contentContainerStyle={styles.container}>
//             <View style={styles.wrapperStyle}>
//                 {!isLoading && !hasError && user && <User userObject={user} />}
//             </View>
//             <View style={styles.wrapperStyle}>
//                 {isLoading && <Text> Loading </Text>}
//                 {!isLoading && hasError && <Text> An error has occurred </Text>}
//             </View>
//             <View>
//                 <Button
//                     title="Load user"
//                     onPress={changeUserIdHandler}
//                     disabled={isLoading}
//                     style={styles.buttonStyles}
//                 />
//             </View>
//         </ScrollView>
//     );
// }

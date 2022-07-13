import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, FlatList, View } from 'react-native';
import {useNavigation} from "@react-navigation/native";

const Headline: React.FC = ({story}) => {
    // const navigation = useNavigation();
    // console.warn('check details', navigation.getParam(story))
    return (
        <View>
            <Text>Headline</Text>
            <View style={{
                borderBottomColor:'red',
                borderBottomWidth: 1,
            }}></View>
            <View>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({

});

export default Headline;
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

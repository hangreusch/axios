import React from 'react';
import { StyleSheet, TouchableOpacity, Text   } from 'react-native';
import StoryImage from "./StoryImage";

const Story: React.FC = ({image, headline, authors, onStoryClicked}) => {
    const renderAuthors = () => {
        let string = '';
        for (let i = 0; i < authors.length; i++) {
            if (i !== authors.length - 1) {
                string = string + authors[i] + ' ';
            } else {
                string = string + authors[i];
            }
        }
        return string;
    };

    return (
        <TouchableOpacity
            onPress={onStoryClicked}
        >
            <StoryImage style={styles.image} source={image} />
            <Text>{headline}</Text>
            <Text>{renderAuthors()}</Text>

        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    image: {
        height: 100,
        width: 100
    }
});

export default Story;

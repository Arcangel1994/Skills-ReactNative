import React, {Fragment} from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class Quote extends React.Component{

    render(){

        const {content, author} = this.props;

        return(
            <View style= {styles.container}>
                <Text style= {styles.text} >{content}</Text>
                <Text style= {styles.author} >&mdash; {author}</Text>
            </View>
        );

    }

}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    text: {
        fontSize: 35,
        fontStyle: 'italic',
        marginBottom: 10,
        textAlign: 'center'
    },
    author: {
        fontSize:20,
        textAlign: 'right'
    },
})

/*

export default function Quote(props) {

    consr {text, author} = props;

    return (
          <Fragment>
                <Text>{text}</Text>
                <Text>-- {author}</Text>
          </Fragment>
    );

}

*/
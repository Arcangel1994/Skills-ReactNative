import React, {Fragment} from 'react'
import { View, Button, TextInput, Modal, StyleSheet } from 'react-native'

export default class NewQuote extends React.Component{

    state = {content: null, author: null};

    render(){

        const {visible, onSave} = this.props;
        const {content, author} = this.state;

    return (
        <Modal
            visible={visible}
            onRequestClose={() => { this.setState({content: null, author: null}); onSave(null, null); } }
            animationType="slide">
                <View style={styles.container}>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Nueva Habilidad" 
                        underlineColorAndroid="transparent"
                        onChangeText={text => this.setState({author: text})}/>
                    <TextInput 
                        style={[styles.input, {height: 150}]} 
                        multiline={true}
                        placeholder="Descripcion" 
                        underlineColorAndroid="transparent"
                        onChangeText={text => this.setState({content: text})}/>
                    <Button title="Guardar" onPress={ () => {
                        this.setState({content: null, author: null});
                        onSave(content, author);
                    } } />
                </View>
        </Modal>
    );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 40,
    },
    input: {
        borderWidth: 1,
        borderColor: 'deepskyblue',
        borderRadius: 5,
        width: '80%',
        marginBottom: 20,
        fontSize: 20,
        padding: 10,
        height: 50,
    }
})
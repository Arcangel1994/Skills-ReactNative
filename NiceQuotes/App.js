import React from 'react';
import { Alert, AsyncStorage, StyleSheet, Text, View, Button } from 'react-native';
import Quote from './js/components/Quote'
import NewQuote from './js/components/NewQuote'

function StyledButton(props){
  let button = null
  if(props.visible)
    button = (
      <View style={props.style}>
        <Button title={props.title} onPress={props.onPress}/>
      </View>
    );
    return button
}

export default class App extends React.Component {

  state = { index: 0, showNewQuoteScreen: false, quotes: [] };

  _retrieveData = async () => {

      // AsyncStorage.getItem('QUOTES').then(value => {

      //   if(value !== null){

      //     value = JSON.parse(value);

      //     this.setState({quotes: value});

      //   }

      // });

      //Async/Await
      let value = await AsyncStorage.getItem('QUOTES');

      if(value !== null){

        value = JSON.parse(value);

        this.setState({quotes: value})

      }

  };

  _storeData(quotes){

      AsyncStorage.setItem('QUOTES', JSON.stringify(quotes));

  }

  _addQuote = (content, author) => {

    let {quotes} = this.state;

    if(content && author){
      quotes.push({ content: content, author: author })
      this._storeData(this.state.quotes)
    }

    this.setState({ index: quotes.length - 1, showNewQuoteScreen: false, quotes: quotes })

  }

  _displayNextQuote(){

    let { index, quotes } = this.state;

    let nextIndex = index + 1;

    if(nextIndex === quotes.length) nextIndex = 0;

    this.setState({
      index: nextIndex
    })

  }

  _deleteButton(){

   Alert.alert('Eliminar', 'Estas seguro de eliminar la habilidad?', 
   [
    {text: 'Cancelar', style: 'cancel'},
    { text: 'Si', style: 'destructive', onPress: () => this._deleteSkills() }
   ]);

  }

  _deleteSkills(){
    let { index, quotes } = this.state;

    quotes.splice(index, 1);

    this._storeData(quotes)

    this.setState({ index: 0, quotes: quotes })
  }

  componentDidMount(){

    this._retrieveData();

  }

  render() {

    let { index, quotes } = this.state;
    const quote = quotes[index];
    let content = <Text style={{fontSize: 32}}>Sin habilidades</Text>;

    if(quote) {
      content = <Quote content={quote.content} author={quote.author} />;
    }

    return (
      <View style={styles.container}>
        <StyledButton 
          style={styles.buttonTopLeft}
          title="Borrar Habilidad" 
          visible={quotes.length >= 1}
          onPress={() => this._deleteButton() } />
        <StyledButton 
          style={styles.buttonTopRight}
          title="Nueva Habilidad" 
          visible={true}
          onPress={() => this.setState({ showNewQuoteScreen: true})} />
        <NewQuote visible={this.state.showNewQuoteScreen} onSave={this._addQuote} />

        {

          content

        }

        <StyledButton 
          style={styles.buttonBottom}
          title="Cambiar de Habilidad"
          visible={quotes.length >= 2}
          onPress=
            { () => this._displayNextQuote() } />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonBottom: {
    position: 'absolute',
    bottom: 0
  },
  buttonTopRight: {
    position: 'absolute',
    top: 30,
    right: 0,
  },
  buttonTopLeft:{
    position: 'absolute',
    top: 30,
    left: 0,
  }
});

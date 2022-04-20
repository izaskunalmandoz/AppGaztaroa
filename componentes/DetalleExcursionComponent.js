import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { EXCURSIONES } from '../comun/excursiones';
import { COMENTARIOS } from '../comun/comentarios';
import { baseUrl } from '../comun/comun';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    excursiones: state.excursiones,
    comentarios: state.comentarios
  }
}

function RenderExcursion(props) {

  const excursion = props.excursion;
  if (excursion != null) {
    return (
      <Card>
        <Card.Image source={{ uri: baseUrl + excursion.imagen }}>
          <View style={{ position: 'relative', left: 0, right: 0, justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <Card.Title style={{ color: 'white', fontSize: 25 }}>{excursion.nombre}</Card.Title>
          </View>
        </Card.Image>
        <Text style={{ margin: 20 }}>
          {excursion.descripcion}
        </Text>
        <Icon
          raised
          reverse
          name={props.favorita ? 'heart' : 'heart-o'}
          type='font-awesome'
          color='#f50'
          onPress={() => props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress()}
        />
      </Card>
    );
  }
  else {
    return (<View></View>);
  }
}

function RenderComentario(props) {

  const comentarios = props.comentarios;

  const renderCommentarioItem = ({ item, index }) => {

    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comentario}</Text>
        <Text style={{ fontSize: 12 }}>{item.valoracion} Stars</Text>
        <Text style={{ fontSize: 12 }}>{'- - ' + item.autor + ', ' + item.dia} </Text>
      </View>
    );
  };

  return (
    <Card>
      <Card.Title>Comentarios</Card.Title>
      <Card.Divider />
      <SafeAreaView>
        <FlatList
          data={comentarios}
          renderItem={renderCommentarioItem}
          keyExtractor={item => item.id.toString()}
        />
      </SafeAreaView>
    </Card>
  );
}

class DetalleExcursion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      excursiones: EXCURSIONES,
      comentarios: COMENTARIOS,
      favoritos: []
    };
  }

  marcarFavorito(excursionId) {
    this.setState({ favoritos: this.state.favoritos.concat(excursionId) });
  }

  render() {
    const { excursionId } = this.props.route.params;
    return (
      <ScrollView>
        <RenderExcursion
          excursion={this.state.excursiones[+excursionId]}
          favorita={this.state.favoritos.some(el => el === excursionId)}
          onPress={() => this.marcarFavorito(excursionId)}
        />
        <RenderComentario
          comentarios={this.state.comentarios.filter((comentario) => comentario.excursionId === excursionId)}
        />
      </ScrollView>
    );
  }
}

// export default DetalleExcursion;
export default connect(mapStateToProps)(DetalleExcursion);
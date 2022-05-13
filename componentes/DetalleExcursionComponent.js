import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, Alert, StyleSheet, Pressable } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { EXCURSIONES } from '../comun/excursiones';
import { COMENTARIOS } from '../comun/comentarios';
import { baseUrl } from '../comun/comun';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { postFavorito, postComentario } from '../redux/ActionCreators';
import { render } from 'react-dom';
import ModalComentarios from './ModalComentsComponent';

const mapStateToProps = state => {
  return {
    excursiones: state.excursiones,
    comentarios: state.comentarios,
    favoritos: state.favoritos
  }
}
const mapDispatchToProps = dispatch => ({
  postFavorito: (excursionId) => dispatch(postFavorito(excursionId)),
  postComentario: (excursionId, valoracion, autor, comentario) => dispatch(postComentario(excursionId, valoracion, autor, comentario))
})

function RenderExcursion(props) {

  const excursion = props.excursion;
  const favoritos = props.favoritos;
  let isFavorito = false;

  for (let i = 0; i < favoritos.length; i++) {
    if (favoritos[i] === excursion.id) {
      isFavorito = true;
    }
  }

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
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Icon
            raised
            reverse
            name={isFavorito ? 'heart' : 'heart-o'}
            type='font-awesome'
            color='#f50'
            onPress={() => isFavorito ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress()}
          />
          <ModalComentarios id={excursion.id} />
        </View>
      </Card>
    );
  }
  else {
    return (<View></View>);
  }
}

//Virtualized LIst para sustituir a ScrollView
const VirtualizedList = ({ children }) => {
  return (
    <FlatList
      data={[]}
      keyExtractor={() => "key"}
      renderItem={null}
      ListHeaderComponent={
        <>{children}</>
      }
    />
  )
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
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     excursiones: EXCURSIONES,
  //     comentarios: COMENTARIOS,
  //     favoritos: []
  //   };
  // }

  marcarFavorito(excursionId) {
    this.props.postFavorito(excursionId);
  }

  render() {
    const { excursionId } = this.props.route.params;
    return (
      <VirtualizedList>
        <RenderExcursion
          excursion={this.props.excursiones.excursiones[+excursionId]}
          favoritos={this.props.favoritos.favoritos}
          onPress={() => this.marcarFavorito(excursionId)}
        />
        <RenderComentario
          comentarios={this.props.comentarios.comentarios.filter((comentario) => comentario.excursionId === excursionId)}
        />
      </VirtualizedList>
    );
  }
}

// export default DetalleExcursion;
export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);
import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
// import { EXCURSIONES } from '../comun/excursiones';
// import { CABECERAS } from '../comun/cabeceras';
// import { ACTIVIDADES } from '../comun/actividades';
import { ImageBackground } from 'react-native-web';
import { connectAdvanced } from 'react-redux';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        actividades: state.actividades,
        excursiones: state.excursiones,
        cabeceras: state.cabeceras
    }
}

function RenderItem(props) {

    const item = props.item;

    if (item != null) {
        return (
            <Card>
                <Card.Image source={{ uri: baseUrl + item.imagen }} >
                    <View style={{ position: 'relative', left: 0, right: 0, justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        <Card.Title style={{ color: 'chocolate', fontSize: 25 }}>{item.nombre}</Card.Title>
                    </View>
                </Card.Image>
                <Text style={{ margin: 20 }}>
                    {item.descripcion}
                </Text>
            </Card>
        );
    }
    else {
        return (<View></View>);
    }
}

class Home extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         excursiones: EXCURSIONES,
    //         cabeceras: CABECERAS,
    //         actividades: ACTIVIDADES
    //     };
    // }

    render() {

        return (
            <ScrollView>
                <RenderItem item={this.props.cabeceras.cabeceras.filter((cabecera) => cabecera.destacado)[0]} />
                <RenderItem item={this.props.excursiones.excursiones.filter((excursion) => excursion.destacado)[0]} />
                <RenderItem item={this.props.actividades.actividades.filter((actividad) => actividad.destacado)[0]} />
            </ScrollView>
        );
    }
}

// export default Home;
export default connect(mapStateToProps)(Home);
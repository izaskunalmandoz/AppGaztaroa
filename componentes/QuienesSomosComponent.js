import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { Card, ListItem, Avatar } from 'react-native-elements';
import { EXCURSIONES } from '../comun/excursiones';
import { CABECERAS } from '../comun/cabeceras';
import { ACTIVIDADES } from '../comun/actividades';
import { FlatList } from 'react-native';

function RenderItem(props) {

    const item = props.item;

    if (item != null) {
        return (
            <ListItem bottomDivider>
                <Avatar source={require('./imagenes/40Años.png')} />
                <ListItem.Content>
                    <ListItem.Subtitle>{item.descripcion}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        );
    }
    else {
        return (<View></View>);
    }
}


function Historia() {
    return (
        <Card>
            <Card.Title>Un poquito de historia</Card.Title>
            <Card.Divider />
            <Text style={{ margin: 20 }}>
                El nacimiento del club de montaña Gaztaroa se remonta a la primavera de 1976 cuando jóvenes aficionados a la montaña y pertenecientes a un club juvenil decidieron crear la sección montañera de dicho club. Fueron unos comienzos duros debido sobre todo a la situación política de entonces. Gracias al esfuerzo económico de sus socios y socias se logró alquilar una bajera. Gaztaroa ya tenía su sede social.
                Desde aquí queremos hacer llegar nuestro agradecimiento a todos los montañeros y montañeras que alguna vez habéis pasado por el club aportando vuestro granito de arena.
                Gracias!
            </Text>
        </Card>
    )
}


class QuienesSomos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            actividades: ACTIVIDADES
        };
    }

    render() {

        return (
            <ScrollView>
                <Historia />
                <Card>
                    <Card.Title>Actividades y recursos</Card.Title>
                    <Card.Divider />
                    <FlatList
                        data={this.state.actividades}
                        renderItem={RenderItem}
                        keyExtractor={item => item.id.toString()}
                    />
                </Card>


            </ScrollView>
        );
    }
}

export default QuienesSomos;
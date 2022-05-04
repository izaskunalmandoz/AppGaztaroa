import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { Card, ListItem, Avatar } from 'react-native-elements';
// import { EXCURSIONES } from '../comun/excursiones';
// import { CABECERAS } from '../comun/cabeceras';
// import { ACTIVIDADES } from '../comun/actividades';
import { FlatList } from 'react-native';
import { baseUrl } from '../comun/comun';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { IndicadorActividad } from './IndicadorActividadComponent';

const mapStateToProps = state => {
    return {
        actividades: state.actividades
    }
}

function RenderItem(props) {

    const item = props.item;

    if (item != null) {
        return (
            <ListItem bottomDivider>
                <Avatar source={{ uri: baseUrl + item.imagen }} />
                <ListItem.Content>
                    <ListItem.Title>{item.nombre}</ListItem.Title>
                    <ListItem.Subtitle>{item.descripcion}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
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

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         actividades: ACTIVIDADES
    //     };
    // }

    render() {

        if (this.props.actividades.isLoading) {
            return (
                <ScrollView>
                    <Historia />
                    <Card>
                        <Card.Title>Actividades y recursos</Card.Title>
                        <Card.Divider />
                        <IndicadorActividad />
                    </Card>
                </ScrollView>
            );
        } else if (this.props.actividades.errMess) {
            return (
                <View>
                    <Text>{this.props.actividades.errMess}</Text>
                </View>
            )
        } else {
            return (
                <VirtualizedList>
                    <Historia />
                    <Card>
                        <Card.Title>Actividades y recursos</Card.Title>
                        <Card.Divider />
                        <SafeAreaView>
                            <FlatList
                                // data={this.state.actividades}
                                data={this.props.actividades.actividades}
                                renderItem={RenderItem}
                                keyExtractor={item => item.id.toString()}
                            />
                        </SafeAreaView>
                    </Card>


                </VirtualizedList>
            );
        }
    }
}

// export default QuienesSomos;
export default connect(mapStateToProps)(QuienesSomos);
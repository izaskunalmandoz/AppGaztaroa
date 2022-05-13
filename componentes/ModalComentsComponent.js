import React, { Component } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { Icon, Rating, Input } from "react-native-elements";
import { connect } from 'react-redux';
import { postComentario, postFavorito, fetchComentarios } from '../redux/ActionCreators';


const mapStateToProps = state => {

    return {
        actividades: state.actividades,
        excursiones: state.excursiones,
        cabeceras: state.cabeceras,
        comentarios: state.comentarios,
        favoritos: state.favoritos
    }
}

const mapDispatchToProps = dispatch => ({
    postComentario: (excursionId, valoracion, autor, comentario) => dispatch(postComentario(excursionId, valoracion, autor, comentario)),
    fetchComentarios: () => dispatch(fetchComentarios())

})

class ModalComentarios extends Component {

    constructor(props) {
        super(props);
        this.state = {
            valoracion: 3,
            autor: '',
            comentario: '',
            modalVisible: false
        }
    }

    resetForm() {
        this.setState({
            valoracion: 3,
            autor: 'reset',
            comentario: 'reset',
            // dia: 'reset',
            modalVisible: false
        });
    }

    gestionarComentario(excursionId) {
        console.log('de comentarios, valoracion: ' + this.state.valoracion);
        console.log('de comentarios, comentario: ' + this.state.comentario);
        console.log('de comentarios, autor: ' + this.state.autor);

        this.props.postComentario(excursionId, this.state.valoracion, this.state.autor, this.state.comentario);
    }

    enviarDatos() {
        this.gestionarComentario(this.props.id);
        console.log("Rating: " + this.state.valoracion + ", Autor: " + this.state.autor + ", Comentario: " + this.state.comentario);
        this.resetForm();
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    ratingCompleted(rating) {
        console.log("Rating is: " + rating);
        // this.setState({ valoracion: rating });
    }

    render() {
        const { modalVisible } = this.state;
        return (
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        this.setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>NUEVO COMENTARIO</Text>
                            <Rating
                                showRating
                                onFinishRating={this.ratingCompleted}
                                style={{ paddingVertical: 10, marginBottom: 25 }}
                            />
                            <Input
                                placeholder='Autor'
                                leftIcon={
                                    <Icon
                                        name='user'
                                        type='font-awesome'
                                        size={24}
                                        color='black'
                                    />
                                }
                                onChangeText={value => this.setState({ autor: value })}
                            />
                            <Input
                                placeholder='Comentario'
                                leftIcon={
                                    <Icon
                                        name='comment'
                                        type='font-awesome'
                                        size={24}
                                        color='black'
                                    />
                                }
                                onChangeText={value => this.setState({ comentario: value })}
                            />


                            <Pressable
                                style={[styles.button, styles.buttonEnviar]}
                                onPress={() => this.enviarDatos()}
                            >
                                <Text style={styles.textStyle}>Enviar</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => this.setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>Cancelar</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>

                <Pressable
                    onPress={() => this.setModalVisible(true)}
                >
                    <Icon
                        raised
                        reverse
                        name='pencil'
                        type='font-awesome'
                        color='#015afc'
                    />
                </Pressable>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        width: 350,
        height: 600,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: 150
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonEnviar: {
        marginTop: 15,
        backgroundColor: "#2196F3",
    },
    buttonClose: {
        marginTop: 15,
        backgroundColor: "grey",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontWeight: "bold"
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalComentarios);
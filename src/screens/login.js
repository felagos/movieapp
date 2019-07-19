import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Content, Form, Item, Input, Label, Button, View } from 'native-base';
import LoginLayout from '../layouts/login/login-layout';
import Icon from '../widgets/icon-widget';
import { colorWhite, backgroundColorRed, backgroundColorBlack } from '../styles/styles';

const styles = StyleSheet.create({
    containerForm: {
        width: '100%',
    },
    button: {
        ...backgroundColorRed
    },
    textButton: {
        ...colorWhite,
        fontSize: 18
    },
    containerButtons: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    link: {
        fontSize: 16,
        margin: 15,
        ...colorWhite
    },
    label: {
        ...colorWhite
    }
});

class Login extends Component {

    state = {
        form: {
            email: "",
            password: ""
        },
        error: {
            email: "",
            password: ""
        }
    };

    static navigationOptions = () => {
        return {
            header: null
        }
    }

    handleChange = (field, value) => {
        const { form } = this.state;
        form[field] = value;
        this.setState(form);
    }

    handleSubmit = () => {

    }

    goToregister = () => {
        this.props.navigation.navigate("Register");
    }

    render() {
        const { form: { email, password } } = this.state;

        return (
            <LoginLayout>
                <Content style={styles.containerForm}>
                    <Form>
                        <Item floatingLabel>
                            <Label style={styles.label}>Email</Label>
                            <Input style={styles.label} placeholderTextColor={colorWhite.color} keyboardType="email-address" value={email} onChangeText={value => this.handleChange("email", value)} />
                        </Item>

                        <Item floatingLabel last>
                            <Label style={styles.label}>Contraseña</Label>
                            <Input style={styles.label} placeholderTextColor={colorWhite.color} secureTextEntry={true} value={password} onChangeText={value => this.handleChange("password", value)} />
                        </Item>

                    </Form>
                    <View style={styles.containerButtons}>
                        <Button style={styles.button} iconLeft full danger onPress={this.handleSubmit}>
                            <Icon name="sign-in" size={18} color="white" />
                            <Text style={styles.textButton}> Ingresar </Text>
                        </Button>
                        <Text style={styles.link} onPress={this.goToregister}>
                            Registrarse
                        </Text>
                    </View>
                </Content>

            </LoginLayout>
        );
    }

}

export default Login;
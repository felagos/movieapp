import React, { Component } from 'react';
import { StyleSheet, Text, Alert } from 'react-native';
import { Content, Form, Item, Input, Label, Button, View } from 'native-base';
import { colorWhite, backgroundColorRed, colorRed } from '../styles/styles';
import AuthLayout from '../layouts/auth/auth-layout';
import Icon from '../widgets/icon-widget';
import AuthService from '../services/auth-service';
import StorageService from '../services/storage-service';

import FormValidation, { loginRules } from '../form/form-validator';

const styles = StyleSheet.create({
    containerForm: {
        width: '100%'
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
    },
    error: {
        ...colorRed
    }
});

class Login extends Component {

    state = {
        form: {
            email: "",
            password: ""
        },
        errors: {
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
        const message = FormValidation.validateField(field, loginRules, value);

        const { errors, form } = this.state;
        form[field] = value;
        errors[field] = message;

        this.setState({ form, errors });
    }

    handleSubmit = async () => {

        const isValid = FormValidation.isValidForm(this.state.form, loginRules);

        if (isValid) {
            const { form: { email, password } } = this.state;
            try {
                const user = await AuthService.doLogin(email, password);
                await StorageService.setItem("user", user);

                this.props.navigation.navigate("SignIn");
            } catch (err) {
                Alert.alert("", err.message);
            }
        }
        else Alert.alert("", "Revise los datos del formualario");
    }

    goToregister = () => {
        this.props.navigation.navigate("Register");
    }

    render() {
        const { form: { email, password }, errors } = this.state;
        return (
            <AuthLayout>
                <Content style={styles.containerForm}>
                    <Form>
                        <Item floatingLabel>
                            <Label style={styles.label}>Email</Label>
                            <Input style={styles.label} placeholderTextColor={colorWhite.color} keyboardType="email-address" value={email} onChangeText={value => this.handleChange("email", value)} />
                        </Item>
                        {errors.email !== "" && <Text style={styles.error}>{errors.email}</Text>}

                        <Item floatingLabel last>
                            <Label style={styles.label}>Contraseña</Label>
                            <Input style={styles.label} placeholderTextColor={colorWhite.color} secureTextEntry={true} value={password} onChangeText={value => this.handleChange("password", value)} />
                        </Item>
                        {errors.password !== "" && <Text style={styles.error}>{errors.password}</Text>}
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

            </AuthLayout>
        );
    }

}

export default Login;
import React, { Component } from 'react';
import { StyleSheet, StatusBar, Text, Alert } from 'react-native';
import { Content, Form, Item, Input, Label, Button, View } from 'native-base';
import { colorWhite, backgroundColorRed, colorRed } from '../styles/styles';
import AuthLayout from '../layouts/auth/auth-layout';
import HeaderRegister from '../layouts/auth/header-register';
import Icon from '../widgets/icon-widget';
import AuthService from '../services/auth-service';
import StorageService from '../services/storage-service';
import FormValidation, { registerRules } from '../form/form-validator';
import Loader from '../widgets/loader-widget';

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
    },
    error: {
        ...colorRed
    }
});

class Register extends Component {

    state = {
        form: {
            email: "",
            nick: "",
            password: "",
            repeatPassword: ""
        },
        errors: {
            email: "",
            nick: "",
            password: "",
            repeatPassword: ""
        },
        loading: false
    };

    static navigationOptions = ({ navigation }) => {
        return {
            header: <HeaderRegister title="Registro" goBack={navigation.goBack} />
        }
    }

    handleChange = (field, value) => {
        const message = FormValidation.validateField(field, registerRules, value, this.state.form);

        const { errors, form } = this.state;
        form[field] = value;
        errors[field] = message;

        this.setState({ form, errors });
    }

    handleSubmit = async () => {
        const isValid = FormValidation.isValidForm(this.state.form, registerRules);

        if (isValid) {
            this.setState({ loading: true }, async () => {
                try {
                    const { form: user } = this.state;
                    const response = await AuthService.doRegister(user);

                    this.setState({ loading: false });

                    if (response) {
                        await StorageService.setItem("user", user);
                        this.props.navigation.navigate("SignIn");
                    }
    
                } catch (err) {
                    this.setState({ loading: false });
                    Alert.alert("", err.message);
                }
            });
        }
        else Alert.alert("", "Revise los datos del formualario");

    }

    render() {
        StatusBar.setBackgroundColor('#221f1f', true);

        const { form: { email, nick, password, repeatPassword }, errors, loading } = this.state;

        return (
            <AuthLayout>
                <Loader loading={loading} text="Registrando usuario ..." />
                <Content style={styles.containerForm}>
                    <Form>
                        <Form>
                            <Item floatingLabel>
                                <Label style={styles.label}>Email</Label>
                                <Input style={styles.label} placeholderTextColor={colorWhite.color} keyboardType="email-address" value={email} onChangeText={value => this.handleChange("email", value)} />
                            </Item>
                            {errors.email !== "" && <Text style={styles.error}>{errors.email}</Text>}

                            <Item floatingLabel>
                                <Label style={styles.label}>Nick</Label>
                                <Input style={styles.label} placeholderTextColor={colorWhite.color} value={nick} onChangeText={value => this.handleChange("nick", value)} />
                            </Item>
                            {errors.nick !== "" && <Text style={styles.error}>{errors.nick}</Text>}

                            <Item floatingLabel>
                                <Label style={styles.label}>Contraseña</Label>
                                <Input style={styles.label} placeholderTextColor={colorWhite.color} secureTextEntry={true} value={password} onChangeText={value => this.handleChange("password", value)} />
                            </Item>
                            {errors.password !== "" && <Text style={styles.error}>{errors.password}</Text>}

                            <Item floatingLabel last>
                                <Label style={styles.label}>Repita Contraseña</Label>
                                <Input style={styles.label} placeholderTextColor={colorWhite.color} secureTextEntry={true} value={repeatPassword} onChangeText={value => this.handleChange("repeatPassword", value)} />
                            </Item>
                            {errors.repeatPassword !== "" && <Text style={styles.error}>{errors.repeatPassword}</Text>}
                        </Form>

                        <View style={styles.containerButtons}>
                            <Button style={styles.button} iconLeft full danger onPress={this.handleSubmit}>
                                <Icon name="sign-in" size={18} color="white" />
                                <Text style={styles.textButton}> Registrarse </Text>
                            </Button>
                        </View>

                    </Form>
                </Content>
            </AuthLayout>
        );
    }

}

export default Register;
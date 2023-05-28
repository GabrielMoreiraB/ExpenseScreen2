import * as React from 'react';
import { useState } from "react";
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { signInEndpoint, IUser } from './backend';

interface IloginScreenProps {
    onSignIn: (user: IUser) => void;
}


const LoginScreen = (props: IloginScreenProps) => {
    const [email, setEmail] = useState('usuario@email.com');
    const [senha, setSenha] = useState('1234');
    const [erro, setErro] = useState('');

    function signIn(e:React.FormEvent){
        e.preventDefault();
        signInEndpoint(email, senha).then(props.onSignIn,
        (e)=> {
            setErro('Email não encontrado ou senha incorreta')
            console.log(e);
        })
    }

  return (
      <Container maxWidth="sm">
        <h1>Login</h1>
        <p>Digite seu email e senha para entrar no sistema</p>
        <form onSubmit={signIn}>
            <TextField
                margin='normal'
                label='Email'
                fullWidth
                variant="standard"
                value={email}
                onChange={e=> setEmail(e.target.value)}
            />
            

            <TextField
                margin='normal'
                label='Senha'
                type='password'
                fullWidth
                variant="standard"
                value={senha}
                onChange={e=> setSenha(e.target.value)}
            />
            {erro && <div style={{ color: 'red' }}>{erro}</div>}
            <div>
            <Button type='submit' variant="contained">Submit</Button>
            </div>
        </form>
      </Container>

  );
};

export default LoginScreen;

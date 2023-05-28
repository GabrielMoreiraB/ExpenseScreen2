export interface Despesa {
  id: number;
  descricao: string;
  categoria: string;
  valor: number;
  mes: string;
  dia: string;
}

export interface IUser {
  name: string;
  email: string;
}

export function carregaDespesas(anoMes: string): Promise<Despesa[]> {
  return fetch(`http://localhost:3001/despesas?mes=${anoMes}&_sort=dia`, {
    credentials: 'include'
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    });
}


export function getEventEndpoint(): Promise<IUser> {
  return fetch(`http://localhost:3001/sessao/usuario`, {
    credentials: 'include'
  }).then(response =>{
    if (response.ok){
      return response.json();
    } else {
      throw new Error(response.statusText)
    }
  });
}

export function signInEndpoint(email:string, senha:string): Promise<IUser> {
  return fetch(`http://localhost:3001/sessao/criar`, { 
    credentials: 'include',
    method: "POST",
    headers:{
    "content-type": "application/json"
  },
  body: JSON.stringify({email, senha})
}).then(response =>{
    if (response.ok){
      return response.json();
    } else {
      throw new Error(response.statusText)
    }
  });
}


export function signOutEndpoint(): Promise<IUser> {
  return fetch(`http://localhost:3001/sessao/finalizar`, { 
    credentials: 'include',
    method: "POST",
}).then(response =>{
    if (response.ok){
      return response.json();
    } else {
      console.log('deu erro no back')
      throw new Error(response.statusText)
    }
  });
}
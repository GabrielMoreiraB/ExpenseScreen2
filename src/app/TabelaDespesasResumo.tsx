import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Despesa } from "./backend";
import { formataValor } from "./util";

export default function TabelaDespesas(props: { despesas: Despesa[] }) {

    const [despesasResumo, setDepesasResumo] = useState<{categoria: string; valorTot: number}[]>([]);

    const categoriasValores: { [key:string]: number} = {};

    for (let despesa of props.despesas){
        const{categoria, valor} = despesa;
        if(categoriasValores[categoria]){
            categoriasValores[categoria] += valor;
        } else{
            categoriasValores[categoria] = valor;
        }
    }

    const arrayDespesas: { categoria: string; valorTotal: number }[] = Object.keys(categoriasValores).map(categoria => {
        return { categoria: categoria, valorTotal: (categoriasValores[categoria]) };
      });

  
  return (
    <TableContainer>
      <Table aria-label="Tabela de despesas">
        <TableHead>
          <TableRow>
            <TableCell>Categoria</TableCell>

            <TableCell align="right">Valor (R$)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {arrayDespesas.map((despesa, index) => (
            <TableRow key={index}>
              <TableCell>{despesa.categoria}</TableCell>
              <TableCell align="right">{formataValor(despesa.valorTotal)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

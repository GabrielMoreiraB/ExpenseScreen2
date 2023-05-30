import { useEffect, useState } from "react";
import { Despesa, IUser, carregaDespesas } from "./backend";
import SelecaoAnoMes from "./SelecaoAnoMes";
import ExibicaoTotal from "./ExibicaoTotal";
import TabelaDespesas from "./TabelaDespesas";
import TabelaDespesasResumo from "./TabelaDespesasResumo";
import Box from "@mui/material/Box";
import { useNavigate, useParams } from "react-router-dom";
import UserMenu from "./UserMenu";

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

interface ITelaDespesas { onSignOut: () => void;
  user: IUser;}

export default function TelaDespesas(props: ITelaDespesas) {
  const params = useParams<{ anoMes: string }>();
  const anoMes = params.anoMes || "2021-01";
  const navigate = useNavigate();

  const [despesas, setDespesas] = useState<Despesa[]>([]);
  const [resumo, setResumo] = useState<boolean>(false);

  useEffect(() => {
    carregaDespesas(anoMes).then(setDespesas);
  }, [anoMes]);

  return (
    <div>
      <Box display="flex">
        <Box flex="1" padding="16px">
          <SelecaoAnoMes
            anoMes={anoMes}
            onChangeAnoMes={(novoAnoMes) => {
              navigate(`/despesas/${novoAnoMes}`);
            }}
          />
        </Box>
        <Box padding="16px">
          <ExibicaoTotal despesas={despesas} />
        </Box>
        <Box>
          <UserMenu user={props.user} onSignOut={props.onSignOut}/>
        </Box>
      </Box>

     
      <Box display='flex' gap='10px' justifyContent='center'>
        <Button variant={resumo ? "contained":"outlined"}
         onClick={()=>setResumo(true)} >Resumo</Button>
        <Button variant={resumo ? "outlined":"contained"} onClick={()=>setResumo(false)}>Detalhe</Button>

      </Box>
      {!resumo && <TabelaDespesas despesas={despesas} />}
      {resumo && <TabelaDespesasResumo despesas={despesas} />}
    </div>
  );
}

import { useEffect, useState } from "react";
import { Despesa, IUser, carregaDespesas } from "./backend";
import SelecaoAnoMes from "./SelecaoAnoMes";
import ExibicaoTotal from "./ExibicaoTotal";
import TabelaDespesas from "./TabelaDespesas";
import Box from "@mui/material/Box";
import { useNavigate, useParams } from "react-router-dom";
import UserMenu from "./UserMenu";

interface ITelaDespesas { onSignOut: () => void;
  user: IUser;}

export default function TelaDespesas(props: ITelaDespesas) {
  const params = useParams<{ anoMes: string }>();
  const anoMes = params.anoMes || "2021-01";
  const navigate = useNavigate();

  const [despesas, setDespesas] = useState<Despesa[]>([]);

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
      <TabelaDespesas despesas={despesas} />
    </div>
  );
}

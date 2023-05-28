import { Despesa } from "./backend";
import { formataValor } from "./util";

export default function ExibicaoTotal(props: { despesas: Despesa[] }) {
  const total = calculaTotal(props.despesas);
  return (
    <div>
      Despesa total: <strong>R$ {formataValor(total)}</strong>
    </div>
  );
}

function calculaTotal(despesas: Despesa[]) {
  let total = 0;
  for (const despesa of despesas) {
    total += despesa.valor;
  }
  return total;
}

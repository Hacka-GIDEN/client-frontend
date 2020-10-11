import React from "react";
import { useSelector } from "react-redux";
import InfoSubArea from "../InfoSubArea/InfoSubArea";

const CompanyInfo = (props) => {
  const user = useSelector((state) => state.user);

  if (user && user.cnpj !== undefined) {
    return (
      <InfoSubArea title="Sua empresa">
        <div>
          {user.cnpj ? (
            <span>
              <strong>CNPJ:</strong> {user.cnpj}
            </span>
          ) : (
            <em>Sem CNPJ</em>
          )}
          {user.company && (
            <div>
              <div>
                <strong>Nome:</strong> {user.company.nome}
              </div>
              <div>
                <strong>Atividade Principal:</strong>{" "}
                {user.company.atividade_principal[0].text}{" "}
                <em>(CNAE: {user.company.atividade_principal[0].code})</em>
              </div>
              <div>
                <strong>Telefone:</strong> {user.company.telefone}
              </div>
            </div>
          )}
        </div>
      </InfoSubArea>
    );
  }
  return <div></div>;
};

export default CompanyInfo;

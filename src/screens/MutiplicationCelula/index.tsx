import React, { useEffect, useState } from "react";
import { HeaderComponent } from "../../components/Header";
import { ComeBackComponent } from "../../components/ComeBack";
import MenuNavigation from "../../common/constants/navigation";
import { SelectComponent } from "../../components/Select";
import { TitleComponent } from "../../components/Title";
import { InputFieldComponent } from "../../components/InputField";
import * as S from "./styles";
import { TextSelect } from "../../components/Date/styles";
import { useFormReport } from "../../hooks/useFormReport";
import { connectApi } from "../../common/services/ConnectApi";
import { FormReportActions } from "../../contexts/FormReport";
import useUserFiltered from "../../hooks/useUserFiltered";
import { Checkbox } from "react-native-paper";
import { ScrollView } from "react-native";
import { ButtonComponent } from "../../components/Button";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../config/firebase";

export function MultiplicationCelula() {
  const [celulas, setCelulas] = useState<any>([]);
  const [celulasWithId, setCelulasWithId] = useState<any>([]);
  const [celulasSelected, setCelulaSelected] = useState<any>();
  const [idCelulaSelected, setIdCelulaSelected] = useState<any>();
  const [listMembersCelula, setListMembersCelula] = useState<any>([]);
  const [listCelula, setListCelula] = useState<any>([]);
  const [memberSelected, setMemberSelected] = useState<any>();
  const [newCelula, setNewCelula] = useState<any>();

  const { state, dispatch } = useFormReport();
  const { user, loading } = useUserFiltered();



  const userInfo = user && user[0][1];
  const whatOffice = userInfo && userInfo.cargo;

  useEffect(() => {
    if (whatOffice !== "lider") {
      const getCelulas = async () => {
        const response = await connectApi.get("/celulas.json");
        setCelulasWithId(Object.entries(response.data))
        setCelulas(Object.values(response.data));
      };
      getCelulas();
    }
  }, []);

  const handleRedeChange = (value: string) => {
    dispatch({
      type: FormReportActions.setRedeSelect,
      payload: value,
    });
    dispatch({
      type: FormReportActions.setDiscipuladoSelect,
      payload: "Selecione",
    });
    dispatch({
      type: FormReportActions.setCelulaSelect,
      payload: "Selecione",
    });
  };

  const handleDiscipuladoChange = (value: string) => {
    dispatch({
      type: FormReportActions.setDiscipuladoSelect,
      payload: value,
    });
    dispatch({
      type: FormReportActions.setCelulaSelect,
      payload: "Selecione",
    });
  };

  const handleCelulaChange = (value: string) => {
    dispatch({
      type: FormReportActions.setCelulaSelect,
      payload: value,
    });
  };

  const handleMember = (value: string) => {
    setMemberSelected(value);
  };

  const selectedOptionCelula = (value: string) => {
    setCelulaSelected(value);
    dispatch({
      type: FormReportActions.setTextSelectCelula,
      payload: value,
    });
  };

  // tratativas para o usuário administrador
  const redes = celulas.map((item: any) => item.rede);
  const redesUnicas = redes.filter(function (este: any, i: any) {
    return redes.indexOf(este) === i;
  });

  const mapRedesUnicas = redesUnicas.map((item: any) => {
    return {
      value: item,
    };
  });

  const filtrandoRedes = celulas.filter((item: any) => {
    return item.rede === state.redeSelect;
  });
  const discipulado = filtrandoRedes.map((item: any) => item.discipulador);

  const discipuladossUnicos = discipulado.filter(function (este: any, i: any) {
    return discipulado.indexOf(este) === i;
  });

  const mapDiscipuladosUnicos = discipuladossUnicos.map((item: any) => {
    return {
      value: item,
    };
  });

  const filtrandoDiscipulado = celulas.filter((item: any) => {
    return (
      item.discipulador === state.discipuladoSelect &&
      item.rede === state.redeSelect
    );
  });
  const celulaAdm = filtrandoDiscipulado.map((item: any) => {
    return {
      value: `${item.numero_celula} - ${item.lider}`,
      pastor: item.pastor,
      numero_celula: item.numero_celula,
    };
  });


  useEffect(() => {
    const listMembers: any = Object.values(celulas).filter((item: any) => {
      return celulasSelected === `${item.numero_celula} - ${item.lider}`;
    });
    const objectCelulaSelected = celulasWithId.filter((item: any) => {
      return item[1].numero_celula === listMembers[0].numero_celula
    })
    objectCelulaSelected[0] && setIdCelulaSelected(objectCelulaSelected[0][0])
    setListCelula(listMembers[0]?.membros);
  }, [celulasSelected]);

  useEffect(() => {
    const newArraytoSelectCelula =
      listCelula &&
      Object.values(listCelula).map((item: any) => {
        return { ...item, value: item.nome, checked: false };
      });
    setListMembersCelula(newArraytoSelectCelula);
  }, [listCelula]);


  const memberMultiply = (member: any) => {
    const newMember = { ...member, checked: !member?.checked };
    const transformClick = Object.values(listMembersCelula).filter(
      (item: any) => {
        return item.nome !== member.nome;
      }
    );
    setListMembersCelula([...transformClick, newMember]);
  };

  function compared(a: any, b: any) {
    if (a.nome < b.nome) return -1;
    if (a.nome > b.nome) return 1;
    return 0;
  }
  //Object.values(listMembersCelula).sort(compared);
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const removeMembersCelulaOld = (objectCelulaElse: any) => {
    connectApi.patch(`/celulas/${idCelulaSelected}/.json`, {
      membros: objectCelulaElse,
    }).then(() => {

    }).catch(() => {
    })
  }

  const createNewCelula = (lider: any, celula: any) => {
    const objectCelulaElse = Object.values(listMembersCelula).filter(
      (item: any) => {
        return !item.checked;
      }
    );
    connectApi
      .post(`/celulas.json`, {
        discipulador: state.discipuladoSelect,
        lider: lider[0].value,
        numero_celula: newCelula,
        pastor: celulaAdm[0].pastor,
        rede: state.redeSelect,
        membros: celula,
      }).then(() => {
        removeMembersCelulaOld(objectCelulaElse)

      }).catch(() => {
      })
  }




  const multiply = () => {
    const objectNewLider = Object.values(listMembersCelula).filter(
      (item: any) => {
        return item.nome === memberSelected;
      }
    );

    const objectNewCelula = Object.values(listMembersCelula).filter(
      (item: any) => {
        return item.checked;
      }
    );



    let str
    str = memberSelected;
    str = str.replace(/[ÀÁÂÃÄÅ]/g, "A");
    str = str.replace(/[àáâãäå]/g, "a");
    str = str.replace(/[ÈÉÊË]/g, "E");
    str = str.replace(/[^a-z0-9]/gi, '');
    str = str.split(' ').join('')
    str = str?.toLowerCase()
    const email = `${str}@aguaviva.com.br`
    const password = `${str}123456`
    createUserWithEmailAndPassword(auth, email, password);
    credentialsPost(objectNewLider, email, password);
    createNewCelula(objectNewLider, objectNewCelula)

  };




  const credentialsPost = (objectNewLider: any, email: any, password: any) => {
    try {
      connectApi
        .post("/users.json", {
          ...objectNewLider[0],
          cargo: "lider",
          discipulado: state.discipuladoSelect,
          email,
          numero_celula: newCelula,
          rede: state.redeSelect,
          senha: password,
          pastor: celulaAdm[0].pastor,
        })
        .then(() => alert("deu bom"));
    }
    catch (err) {
      throw new Error("Ops, algo deu errado!");
    }
  }

  return (
    <>
      <HeaderComponent>
        <S.ComeBack>
          <ComeBackComponent />
          <S.TitlePage>{MenuNavigation.MULTIPLICATION_CELULA}</S.TitlePage>
        </S.ComeBack>
      </HeaderComponent>
      <ScrollView>
        <S.Grid>
          <TitleComponent title={`Teste`} small primary />
          <S.ContentC>
            <S.IconC name="vector-square" />
            <SelectComponent
              onChange={handleRedeChange}
              labelSelect={state.redeSelect}
              dataOptions={mapRedesUnicas}
              selectedOption={handleRedeChange}
              width="300"
            />
          </S.ContentC>
        </S.Grid>
        <S.Grid>
          <TitleComponent title={`Teste 2`} small primary />
          <S.ContentC>
            <S.IconC name="network-wired" />
            <SelectComponent
              onChange={handleDiscipuladoChange}
              labelSelect={state.discipuladoSelect}
              dataOptions={state.redeSelect && mapDiscipuladosUnicos}
              selectedOption={handleDiscipuladoChange}
              width="300"
              disabled={state.redeSelect === "Selecione" ? true : false}
            />
          </S.ContentC>
        </S.Grid>
        <S.Grid>
          <TitleComponent title={`Celula`} small primary />
          <S.ContentC>
            <S.IconC name="user-friends" />
            <SelectComponent
              onChange={handleCelulaChange}
              labelSelect={state.celulaSelect}
              dataOptions={celulaAdm}
              selectedOption={selectedOptionCelula}
              width="300"
              disabled={state.discipuladoSelect === "Selecione" ? true : false}
            />
          </S.ContentC>
        </S.Grid>
        <InputFieldComponent
          primary
          value={newCelula ?? ""}
          placeholder=""
          onChangeText={(value) => setNewCelula(value)}
          label="Célula Nova"
        />
        <TitleComponent title={`Novo líder`} small primary />
        <SelectComponent
          onChange={handleMember}
          labelSelect={memberSelected ?? "Selecione"}
          dataOptions={listMembersCelula ?? "Selecione"}
          selectedOption={handleMember}
          width="300"
          disabled={state.celulaSelect === "Selecione" ? true : false}
        />
        <TitleComponent title={`Membros`} small primary />
        <S.Paragraph>
          Selecione os membros que vão para a nova célula
        </S.Paragraph>
        <S.Grid>
          {listMembersCelula &&
            listMembersCelula.length > 0 &&
            Object.values(listMembersCelula)
              .sort(compared)
              .map((item: any) => {
                return (
                  <Checkbox.Item
                    key={item.nome}
                    label={item.nome}
                    color="red"
                    status={item.checked ? "checked" : "unchecked"}
                    onPress={() => {
                      memberMultiply(item);
                    }}
                  />
                );
              })}
        </S.Grid>
        <ButtonComponent title="Multiplicar" onPress={multiply} width="90%" />
      </ScrollView>
    </>
  );
}

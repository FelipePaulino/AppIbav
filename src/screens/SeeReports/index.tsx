import React, { Fragment, useEffect, useState } from "react";
import { DateComponent } from "../../components/Date";
import { HeaderComponent } from "../../components/Header";
import { ComeBackComponent } from "../../components/ComeBack";
import { ButtonComponent } from "../../components/Button";
import MenuNavigation from "../../common/constants/navigation";
import { ScrollView, Text, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import RequestService from "../../common/services/RequestService";
import { useFormReport } from "../../hooks/useFormReport";
import { FormReportActions } from "../../contexts/FormReport";
import { useNavigation } from "@react-navigation/native";
import { IPropsAppStack } from "../../routes/AppStack/types";
import { TitleComponent } from "../../components/Title";
import { SelectComponent } from "../../components/Select";
import FormFields from "../../common/constants/form";

import * as S from "./styles";

const loadingGif = require("../../assets/loader-two.gif");

export function SeeReports() {
  const [reports, setReports] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [showCalender, setShowCalender] = useState(false);
  const [filter, setFilter] = useState<any>();

  const { state, dispatch } = useFormReport();
  const navigation = useNavigation<IPropsAppStack>();
  const serviceGet = new RequestService();

  useEffect(() => {
    setLoading(true);
    const getReports = async () => {
      await serviceGet.getReports().then((response) => {
        setLoading(false);
        setReports(Object.entries(response));
        setFilter(Object.entries(response));
      });
    };

    getReports();
  }, []);

  const actionReportId = (id: string) => {
    dispatch({
      type: FormReportActions.setReportsId,
      payload: id,
    });
    navigation.navigate("SingleReport");
  };

  const redes = reports?.map((item: any) => item[1].rede);
  const redesUnicas = redes?.filter(function (este: any, i: any) {
    return redes.indexOf(este) === i;
  });

  const mapRedesUnicas = redesUnicas?.map((item: any) => {
    return {
      value: item,
    };
  });

  const filtrandoRedes = reports?.filter((item: any) => {
    return item[1].rede === state.redeSelect;
  });
  const discipulado = filtrandoRedes?.map((item: any) => item[1].discipulado);

  const discipuladossUnicos = discipulado?.filter(function (este: any, i: any) {
    return discipulado.indexOf(este) === i;
  });

  const mapDiscipuladosUnicos = discipuladossUnicos?.map((item: any) => {
    return {
      value: item,
    };
  });

  const filtrandoDiscipulado = reports?.filter((item: any) => {
    return (
      item[1].discipulado === state.discipuladoSelect &&
      item[1].rede === state.redeSelect
    );
  });
  const celula = filtrandoDiscipulado?.map((item: any) => item[1].celula);

  const celulasUnicos = celula?.filter(function (este: any, i: any) {
    return celula.indexOf(este) === i;
  });

  const mapCelulasUnicos = celulasUnicos?.map((item: any) => {
    return {
      value: item,
    };
  });

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

  const handleDateChange = (event: Event, selectedDate: any) => {
    const currentDate = selectedDate || state.date;

    setShowCalender(false);

    const tempDate = new Date(currentDate);
    const newDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();

    dispatch({
      type: FormReportActions.setDate,
      payload: currentDate,
    });
    dispatch({
      type: FormReportActions.setTextDate,
      payload: newDate,
    });
  };

  console.log(reports, "reports");

  const submitFilter = () => {
    if (
      state.redeSelect !== "Selecione" &&
      state.discipuladoSelect === "Selecione"
    ) {
      const filterRede = reports.filter((item: any) => {
        return item[1].rede === state.redeSelect;
      });
      setFilter(filterRede);
    } else if (
      state.discipuladoSelect !== "Selecione" &&
      state.celulaSelect === "Selecione"
    ) {
      const filterDiscipulado = reports.filter((item: any) => {
        return item[1].discipulado === state.discipuladoSelect;
      });
      setFilter(filterDiscipulado);
    } else if (state.celulaSelect !== "Selecione") {
      const filterCelula = reports.filter((item: any) => {
        return item[1].celula === state.celulaSelect;
      });
      setFilter(filterCelula);
    }
    setShowFilter(false);
  };

  console.log(state.date, "filter");

  return (
    <Fragment>
      {showFilter && (
        <S.BgDark>
          <S.ContainerFilter open={showFilter}>
            <View>
              <S.BoxClose>
                <FontAwesome5
                  name="times-circle"
                  color="#000A3E"
                  solid
                  size={25}
                  onPress={() => setShowFilter(false)}
                />
              </S.BoxClose>
              <S.Title>
                <FontAwesome5
                  name="filter"
                  color="#000A3E"
                  solid
                  size={20}
                  onPress={() => setShowFilter(false)}
                />{" "}
                Filtro
              </S.Title>

              <S.Grid>
                <TitleComponent
                  title={`${FormFields.NETWORK}:`}
                  small
                  primary
                />
                <S.ContentC>
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
                <TitleComponent
                  title={`${FormFields.DISCIPLESHIP}:`}
                  small
                  primary
                />
                <S.ContentC>
                  <SelectComponent
                    onChange={handleDiscipuladoChange}
                    labelSelect={state.discipuladoSelect}
                    dataOptions={mapDiscipuladosUnicos}
                    selectedOption={handleDiscipuladoChange}
                    width="300"
                    disabled={state.redeSelect === "Selecione" ? true : false}
                  />
                </S.ContentC>
              </S.Grid>

              <S.Grid>
                <TitleComponent title={`${FormFields.CELULA}:`} small primary />
                <S.ContentC>
                  <SelectComponent
                    onChange={handleCelulaChange}
                    labelSelect={state.celulaSelect}
                    dataOptions={mapCelulasUnicos}
                    selectedOption={handleCelulaChange}
                    width="300"
                    disabled={
                      state.discipuladoSelect === "Selecione" ? true : false
                    }
                  />
                </S.ContentC>
              </S.Grid>

              <S.Grid>
                <TitleComponent title="Data:" small primary />
                <S.ContentC>
                  <DateComponent
                    text={state.textDate}
                    open={() => setShowCalender(true)}
                    showCalender={showCalender}
                    dataDados={state.date}
                    onChange={handleDateChange}
                  />
                </S.ContentC>
              </S.Grid>

              <ButtonComponent
                title="FILTRAR"
                width="150px"
                color="white"
                onPress={() => submitFilter()}
              />
            </View>
          </S.ContainerFilter>
        </S.BgDark>
      )}
      <HeaderComponent>
        <S.ComeBack>
          <ComeBackComponent />
          <S.TitlePage>{MenuNavigation.SEE_REPORTS}</S.TitlePage>
        </S.ComeBack>
      </HeaderComponent>
      <ScrollView>
        <S.Container>
          <ButtonComponent
            title="FILTRAR"
            width="150px"
            icon="filter"
            color="white"
            onPress={() => setShowFilter(true)}
          />
          {loading ? (
            <S.Loading source={loadingGif}></S.Loading>
          ) : (
            <S.ListContainer>
              {filter?.map((item: any) => {
                return (
                  <S.List>
                    <Text onPress={() => actionReportId(item[0])}>
                      {item[1].celula} - {item[1].data}
                    </Text>
                    <FontAwesome5 name="eye" color="#000A3E" />
                  </S.List>
                );
              })}
            </S.ListContainer>
          )}
        </S.Container>
      </ScrollView>
    </Fragment>
  );
}

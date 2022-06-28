import React, { useEffect, useState, Fragment } from "react";
import { HeaderComponent } from "../../components/Header";
import { ComeBackComponent } from "../../components/ComeBack";
import { NavigationComponent } from "../../components/Navigation";
import { SendReportScreen } from '../SendReport'
import { MembersReportScreen } from '../MembersReport'


export function ReportScreen() {
  const [data, setData] = useState(true)
  const [members, setMembers] = useState(false)
  const [visitors, setVisitors] = useState(false)

  return (
    <Fragment>
      <HeaderComponent>
        <ComeBackComponent />
        <NavigationComponent
          setData={setData}
          setMembers={setMembers}
          setVisitors={setVisitors}
        />
      </HeaderComponent>

      {console.log(data, 'data')}
      {console.log(members, 'members')}

      {data && <SendReportScreen />}
      {members && <MembersReportScreen />}
    </Fragment>

  );
}

import { FC } from "react";
import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { Button } from "antd";
import DocumentTitle from "react-document-title";

import { Input, Select } from "app/components/FormFields";
import { Option } from "app/components/FormFields/types";
import { alertError, alertSuccess } from "app/components/Notifications";
import PackList from "app/components/PackList";
import { PageWrapper } from "styles/common";
import { weightUnitOptions } from "lib/utils/form";

import { PageTitle, Box, Grid } from "styles/common";
import { usePacksQuery } from "queries/packs";
import { useUserData } from "hooks/useUserData";
import { useUpdateUser } from "queries/user";
import { WeightUnit } from "enums";

interface FormValues {
  username: string;
  default_weight_unit: WeightUnit;
}

export const Packs: FC = () => {
  const user = useUserData();
  const updateUser = useUpdateUser();
  const packs = usePacksQuery(user.id);

  return (
    <PageWrapper>
      <DocumentTitle title={`Packstack | My Packs`}>
        <>
          <PageTitle>
            <h1>Packs</h1>
          </PageTitle>
          <Grid>
            <div className="two-thirds">
              <h3>Packs</h3>
              <PackList loading={packs.isLoading} packs={packs.data || []} />
            </div>
          </Grid>
        </>
      </DocumentTitle>
    </PageWrapper>
  );
};

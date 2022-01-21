import { FC } from "react"
import { Formik, FormikProps } from "formik"
import * as Yup from "yup"
import { Button } from "antd"
import DocumentTitle from "react-document-title"

import { Input, Select } from "app/components/FormFields"
import { Option } from "app/components/FormFields/types"
import { alertError, alertSuccess } from "app/components/Notifications"
import PackList from "app/components/PackList"
import { PageWrapper } from "styles/common"
import { weightUnitOptions } from "lib/utils/form"

import { PageTitle, Box, Grid } from "styles/common"
import { usePacksQuery } from "queries/packs"
import { useUserData } from "hooks/useUserData"
import { useUpdateUser } from "queries/user"
import { WeightUnit } from "enums"

interface FormValues {
  username: string
  default_weight_unit: WeightUnit
}

export const Profile: FC = () => {
  const user = useUserData()
  const updateUser = useUpdateUser()
  const packs = usePacksQuery(user.id)

  return (
    <PageWrapper>
      <DocumentTitle title={`Packstack | My Packs`}>
        <>
          <PageTitle>
            <h1>Profile</h1>
          </PageTitle>
          <Grid>
            <div className="third">
              <h3>Settings</h3>
              <Box>
                <Formik
                  initialValues={{
                    username: user.username,
                    default_weight_unit: user.default_weight_unit,
                  }}
                  validationSchema={Yup.object().shape({
                    username: Yup.string().required(
                      "Username cannot be empty."
                    ),
                  })}
                  onSubmit={(values) => {
                    updateUser.mutate(values, {
                      onSuccess: () => {
                        alertSuccess({ message: "User settings updated!" })
                      },
                      onError: () => {
                        alertError({ message: "Unable to update user" })
                      },
                    })
                  }}
                >
                  {(props: FormikProps<FormValues>) => {
                    const {
                      values,
                      setFieldValue,
                      submitForm,
                      submitCount,
                      errors,
                    } = props
                    const wasSubmitted = submitCount > 0

                    return (
                      <>
                        <Input
                          label="Username"
                          value={values.username}
                          error={wasSubmitted && !!errors.username}
                          errorMsg={errors.username}
                          onChange={(v) => setFieldValue("username", v)}
                        />
                        <Select
                          label="Default Weight Unit"
                          defaultValue={{
                            value: user.default_weight_unit,
                            label: user.default_weight_unit,
                          }}
                          last={true}
                          options={weightUnitOptions()}
                          onChange={(option: Option<string>) =>
                            setFieldValue("default_weight_unit", option.value)
                          }
                        />
                        <Button
                          onClick={submitForm}
                          block={true}
                          type="primary"
                          style={{ marginTop: "16px" }}
                        >
                          Save
                        </Button>
                      </>
                    )
                  }}
                </Formik>
              </Box>
            </div>
          </Grid>
        </>
      </DocumentTitle>
    </PageWrapper>
  )
}

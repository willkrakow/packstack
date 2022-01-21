import { FC } from "react";
import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { Button } from "antd";
import DocumentTitle from "react-document-title";

import { Input, Select } from "app/components/FormFields";
import { Option } from "app/components/FormFields/types";
import { alertError, alertSuccess } from "app/components/Notifications";
import { PageWrapper } from "styles/common";
import { weightUnitOptions } from "lib/utils/form";

import { PageTitle, Box, Grid } from "styles/common";
import { useUserData } from "hooks/useUserData";
import { useUpdateUser } from "queries/user";
import { WeightUnit } from "enums";

interface FormValues {
  username: string;
  default_weight_unit: WeightUnit;
  twitter_url: string;
  facebook_url: string;
  instagram_url: string;
  website_url: string;
}

export const Profile: FC = () => {
  const user = useUserData();
  const updateUser = useUpdateUser();

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
                    twitter_url: user.twitter_url || "",
                    facebook_url: user.facebook_url || "",
                    instagram_url: user.instagram_url || "",
                    website_url: user.website_url || "",
                  }}
                  validationSchema={Yup.object().shape({
                    username: Yup.string().required(
                      "Username cannot be empty."
                    ),
                    twitter_url: Yup.string()
                      .url("Invalid URL")
                      .matches(/^https:\/\/twitter\.com\/[a-zA-Z0-9_]+$/),
                    facebook_url: Yup.string()
                      .url("Invalid URL")
                      .matches(/^https:\/\/facebook\.com\/[a-zA-Z0-9_]+$/),
                    instagram_url: Yup.string()
                      .url("Invalid URL")
                      .matches(/^https:\/\/instagram\.com\/[a-zA-Z0-9_]+$/),
                    website_url: Yup.string().url("Invalid URL"),
                  })}
                  onSubmit={(values) => {
                    updateUser.mutate(values, {
                      onSuccess: () => {
                        alertSuccess({ message: "User settings updated!" });
                      },
                      onError: () => {
                        alertError({ message: "Unable to update user" });
                      },
                    });
                  }}
                >
                  {(props: FormikProps<FormValues>) => {
                    const {
                      values,
                      setFieldValue,
                      submitForm,
                      submitCount,
                      errors,
                    } = props;
                    const wasSubmitted = submitCount > 0;

                    return (
                      <>
                        <Input
                          label="Username"
                          value={values.username}
                          error={wasSubmitted && !!errors.username}
                          errorMsg={errors.username}
                          onChange={(v) => setFieldValue("username", v)}
                        />
                        <Input
                          label="Twitter"
                          placeholder="https://twitter.com/username"
                          value={values.twitter_url}
                          error={wasSubmitted && !!errors.twitter_url}
                          errorMsg={errors.twitter_url}
                          onChange={(v) => setFieldValue("twitter_url", v)}
                        />
                        <Input
                          label="Facebook"
                          placeholder="https://facebook.com/username"
                          value={values.facebook_url}
                          error={wasSubmitted && !!errors.facebook_url}
                          errorMsg={errors.facebook_url}
                          onChange={(v) => setFieldValue("facebook_url", v)}
                        />
                        <Input
                          label="Instagram"
                          placeholder="https://instagram.com/username"
                          value={values.instagram_url}
                          error={wasSubmitted && !!errors.instagram_url}
                          errorMsg={errors.instagram_url}
                          onChange={(v) => setFieldValue("instagram_url", v)}
                        />
                        <Input
                          label="Website"
                          placeholder="https://example.com/"
                          value={values.website_url}
                          error={wasSubmitted && !!errors.website_url}
                          errorMsg={errors.website_url}
                          onChange={(v) => setFieldValue("website_url", v)}
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
                    );
                  }}
                </Formik>
              </Box>
            </div>
          </Grid>
        </>
      </DocumentTitle>
    </PageWrapper>
  );
};

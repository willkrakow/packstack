import { FC } from "react"
import { Button } from "antd"
import DocumentTitle from "react-document-title"

import { PageWrapper } from "styles/common"

import { PageTitle, Box, Grid } from "styles/common"
import { useUserData } from "hooks/useUserData"
import { WeightUnit } from "enums"

export const Profile: FC = () => {
  const user = useUserData()

  return (
    <PageWrapper>
      <DocumentTitle title={`Packstack | ${user.username}`}>
        <>
          <PageTitle>
            <h1>Profile</h1>
          </PageTitle>
          <Grid>
            <h3>{user.username}</h3>
            <Box>
              <div>
                <p>Twitter</p>
                <h5>{user.twitter_url || "n/a"}</h5>
              </div>
              <div>
                <p>Facebook</p>
                <h5>{user.facebook_url || "n/a"}</h5>
              </div>
              <div>
                <p>Instagram</p>
                <h5>{user.facebook_url || "n/a"}</h5>
              </div>
              <div>
                <p>Website</p>
                <h5>{user.website_url || "n/a"}</h5>
              </div>
            </Box>
            <Box>
              <a href="/profile/edit">
                <Button>Edit</Button>
              </a>
            </Box>
          </Grid>
        </>
      </DocumentTitle>
    </PageWrapper>
  );
}

import { FC } from "react"
import DocumentTitle from "react-document-title"

import { PageWrapper } from "styles/common"

import { PageTitle, } from "styles/common"
import { useUserData } from "hooks/useUserData"
import { EditButton, ProfileAttribute, ProfileBox } from "./styles"
import { useTheme } from "styled-components"


function getSocialMediaUsername(url: string){
  const regex = /^https:\/\/(?:www\.)?(?:facebook|twitter|instagram)\.com\/([a-zA-Z0-9_]+)/
  const match = url.match(regex)
  return match ? match[1] : ""
}
export const Profile: FC = () => {
  const user = useUserData()
  const theme = useTheme()
  //@ts-ignore
  return (
    <PageWrapper>
      <DocumentTitle title={`Packstack | ${user.username}`}>
        <>
          <PageTitle>
            <h1>{user.username}</h1>
          </PageTitle>
          <ProfileBox>
            <ProfileAttribute>
              <p>Twitter</p>
              <h4>
                {user.twitter_url && (
                  <>
                    <span>https://twitter.com/</span>
                    <strong>{getSocialMediaUsername(user.twitter_url)}</strong>
                  </>
                )}
              </h4>
            </ProfileAttribute>
            <ProfileAttribute>
              <p>Facebook</p>
              <h4>
                {user.facebook_url && (
                  <>
                    <span>https://facebook.com/</span>
                    <strong>{getSocialMediaUsername(user.facebook_url)}</strong>
                  </>
                )}
              </h4>
            </ProfileAttribute>
            <ProfileAttribute>
              <p>Instagram</p>
              <h4>
                {user.instagram_url && (
                  <>
                    <span>https://instagram.com/</span>
                    <strong>
                      {getSocialMediaUsername(user.instagram_url)}
                    </strong>
                  </>
                )}
              </h4>
            </ProfileAttribute>
            <ProfileAttribute>
              <p>Website</p>
              <h4>
                <strong>{user.website_url}</strong>
              </h4>
            </ProfileAttribute>
          </ProfileBox>
          <a href="/settings">
            <EditButton>Edit</EditButton>
          </a>
        </>
      </DocumentTitle>
    </PageWrapper>
  );
}

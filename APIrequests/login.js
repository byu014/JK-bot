module.exports.data = {query: `mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      user {
        uuid
        username
        displayName
        avatarImage
        bannerImage
        bio
        roles {
          name
          slug
          color
          songRequests
          __typename
        }
        settings {
          mfa
          __typename
        }
        additionalSongRequests
        uploadLimit
        __typename
      }
      token
      mfa
      __typename
    }
  }
  `}
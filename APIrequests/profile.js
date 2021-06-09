module.exports.data = {query: `query userProfile($username: String!, $userOffset: Int!, $userCount: Int!, $systemOffset: Int!, $systemCount: Int!) {
    user(username: $username) {
      uuid
      username
      displayName
      avatarImage
      bannerImage
      bio
      roles {
        id
        name
        slug
        __typename
      }
      favorites {
        count
        __typename
      }
      uploads {
        count
        __typename
      }
      requests {
        count
        __typename
      }
      userFeed(offset: $userOffset, count: $userCount) {
        id
        type
        content
        createdAt
        song {
          id
          title
          titleRomaji
          albums {
            id
            image
            __typename
          }
          artists {
            id
            name
            nameRomaji
            __typename
          }
          __typename
        }
        user {
          username
          displayName
          avatarImage
          __typename
        }
        author {
          username
          displayName
          avatarImage
          __typename
        }
        comments {
          id
          parentId
          content
          createdAt
          user {
            username
            displayName
            avatarImage
            __typename
          }
          __typename
        }
        __typename
      }
      systemFeed(offset: $systemOffset, count: $systemCount) {
        id
        type
        content
        createdAt
        song {
          id
          title
          titleRomaji
          albums {
            id
            image
            __typename
          }
          artists {
            id
            name
            nameRomaji
            __typename
          }
          __typename
        }
        user {
          username
          displayName
          avatarImage
          __typename
        }
        author {
          username
          displayName
          avatarImage
          __typename
        }
        comments {
          id
          parentId
          content
          createdAt
          user {
            username
            displayName
            avatarImage
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
  }`}
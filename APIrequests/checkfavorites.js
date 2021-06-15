module.exports.data = {query: `query songs($username: String!, $offset: Int!, $count: Int!, $kpop: Boolean) {
    user(username: $username) {
      favorites(offset: $offset, count: $count, kpop: $kpop) {
        favorites {
          song {
            id
            title
            titleRomaji
            kpop
            albums {
              id
              name
              nameRomaji
              image
              __typename
            }
            sources {
              id
              name
              nameRomaji
              image
              __typename
            }
            artists {
              id
              name
              nameRomaji
              image
              __typename
            }
            uploader {
              username
              displayName
              avatarImage
              __typename
            }
            __typename
          }
          __typename
        }
        count
        __typename
      }
      __typename
    }
  }
  `}
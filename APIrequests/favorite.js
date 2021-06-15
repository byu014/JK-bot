module.exports.data = {query: `mutation favoriteSong($id: Int!) {
    favoriteSong(id: $id) {
        id
        __typename
    }
}`}
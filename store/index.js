export const state = () => ({
  counter: 0,
  userEmail: null,
  userName: null,
  userPhoto: null,
  noAccount: false
})

export const mutations = {
  increment (state) {
    state.counter++
  },
}

export const actions = {
  increment ({ commit, state }) {
    db.collection('users').doc(state.userEmail).update({
      counter: state.counter + 1
    }).then(() => {
      console.log("Document successfully updated!")
      commit('increment')
    }).catch((error) => {
      console.error("Error updating document: ", error)
    })
  },
  // ログインするときの処理
  googleSignIn ({ dispatch }) {
    firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider())
    // ログインしているかどうかのチェック
    dispatch('googleAuthStateChanged')
  },

  // ログアウトするときの処理
  googleSignOut ({ dispatch }) {
    firebase.auth().signOut()
    // ログインしているかどうかのチェック
    dispatch('googleAuthStateChanged')
  },

  // ログインしているかどうかチェックする処理
  googleAuthStateChanged ({ dispatch, commit }) {

    // 現在ログインしているユーザーを取得する
    firebase.auth().onAuthStateChanged(user => {
      // ログインしているユーザーがあったら
      if (user) {
        let { email, displayName, photoURL } = user
        // 取得した情報を mutations に commit する
        commit('storeUser', { userEmail: email, userName: displayName, userPhoto: photoURL })
        // 初回ログインかどうかをチェックする処理
        dispatch('userCheck')

      // ログインしていなかったら mutations に commit する（ログインしていないときの画面を表示させる処理）
      } else {
        commit('deleteUser')
      }
    })
  },

  // 初回ログインかどうかをチェックする処理
  userCheck ({ dispatch, commit, state }) {

    // Firestore に ユーザー情報があるか
    db.collection('users').doc(state.userEmail).get().then((doc) => {

      // ユーザー情報があったら
      if (doc.exists) {
        console.log("Document data:", doc.data())
        // counter の値を mutations に commit する
        commit('saveUser', { number: doc.data().counter })

      // ユーザー情報がなかったら
      } else {
        console.log("No such document!")
        // ユーザー情報を Firestore に登録する処理
        dispatch('createUser')
      }

    // エラーになったら
    }).catch((error) => {
      console.error("Error getting document:", error)
    })
  },

  // ユーザー情報を Firestore に登録する処理
  createUser ({ state }) {
    db.collection('users').doc(state.userEmail).set({
      counter: state.counter
    }).then(() => {
      console.log("Document successfully written!");
    }).catch((error) => {
      console.error("Error writing document: ", error);
    })
  },
}
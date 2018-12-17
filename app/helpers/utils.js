export function formatUserInfo (name, avatar, uid) {
  return {
    name,
    uid,
    avatar
  }
}

export function formatDuck (text, { name, avatar, uid }) {
  return {
    text,
    name,
    avatar,
    uid,
    timestamp: Date.now()
  }
}

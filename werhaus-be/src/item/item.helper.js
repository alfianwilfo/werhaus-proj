exports.getId = async () => {
  let id = Math.floor(Math.random() * 2341223423423423);
  return id
};

exports.getType = async (data) => {
  let rv = []
  for await (let row of data) {
    let { id, name } = row
    let temp = {}
    temp.id = id
    temp.name = name
    rv = [...rv, temp]
  }
  return rv
}
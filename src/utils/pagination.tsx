class Pagination {

  serialize(obj: any) {
    return Object.keys(obj).map(key => key + '=' + obj[key]).join('&')
  }

}

export default Pagination

export class Account {
  constructor(data) {
    this.id = data.id
    this.email = data.email
    this.name = data.name
    this.picture = data.picture || 'https://support.pega.com/sites/default/files/pega-user-image/69/REG-68619.png'
    // TODO add additional properties if needed
  }
}

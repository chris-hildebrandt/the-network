export class Profile {
  constructor(data) {
    this.id = data.id
    this.email = data.email || ''
    this.name = data.name || 'Jo Doe'
    this.picture = data.picture || 'https://support.pega.com/sites/default/files/pega-user-image/69/REG-68619.png'
    this.bio = data.bio || ''
    this.coverImg = data.coverImg || 'https://i.pinimg.com/736x/b5/94/6e/b5946e195cdff505e697a8dad43ae5fe--fb-profile-facebook-profile.jpg'
    this.github = data.github || ''
    this.linkedin = data.linkedin || ''
    this.resume = data.resume || ''
    this.graduated = data.graduated || false
    this.class = data.class || 'summer 2022'
  }
}

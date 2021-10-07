import {Component} from 'react'
import {v4} from 'uuid'
import {RiLockPasswordFill} from 'react-icons/ri'
import {AiOutlineUserAdd} from 'react-icons/ai'
import {BsGlobe} from 'react-icons/bs'
import './App.css'

class App extends Component {
  state = {textv: '', userv: '', passv: '', data: [], sea: '', val: false}

  text = event => {
    this.setState({textv: event.target.value})
  }

  user = event => {
    this.setState({userv: event.target.value})
  }

  pass = event => {
    this.setState({passv: event.target.value})
  }

  submit = event => {
    event.preventDefault()

    const {textv, userv, passv} = this.state

    const newData = {
      id: v4(),
      site: textv,
      name: userv,
      password: passv,
    }

    this.setState(prev => ({
      data: [...prev.data, newData],
    }))
  }

  dele = id => {
    const {data} = this.state

    const updated = data.filter(each => each.id !== id)
    this.setState({data: updated})
  }

  renderItem = each => {
    const {id, name, password, site, val} = each
    return (
      <li key={id} className="each-item">
        <h1 className="si">{site[0]}</h1>
        <div>
          <p>{site}</p>
          <p>{name}</p>
          <br />
          {val ? (
            <p>{password}</p>
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
              className="stars"
            />
          )}

          <br />
        </div>
        <button className="re-bu" type="button" onClick={() => this.dele(id)}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
            className="del"
          />
        </button>
      </li>
    )
  }

  search = event => {
    this.setState({sea: event.target.value})
  }

  renderImg = () => (
    <img
      src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
      alt="no passwords"
      className="no-img"
    />
  )

  valu = () => {
    this.setState(prev => ({val: !prev.val}))
  }

  renderData = () => {
    const {data} = this.state

    return <ul>{data.map(each => this.renderItem(each))}</ul>
  }

  render() {
    const {textv, userv, passv, data, sea, val} = this.state
    console.log(val)
    const upda = data.filter(ea => ea.site.includes(sea))
    return (
      <div className="bg-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="logo-img"
        />
        <div className="form-div">
          <form className="form" onSubmit={this.submit}>
            <h1>Add New Password</h1>
            <div className="inp-card">
              <BsGlobe alt="website" />
              <input
                type="text"
                placeholder="Enter Website"
                className="inp"
                onChange={this.text}
                value={textv}
              />
            </div>
            <div className="inp-card">
              <AiOutlineUserAdd alt="username" />
              <input
                type="username"
                placeholder="Enter Username"
                className="inp"
                onChange={this.user}
                value={userv}
              />
            </div>
            <div className="inp-card">
              <RiLockPasswordFill alt="password" />
              <input
                type="password"
                placeholder="Enter Password"
                className="inp"
                onChange={this.pass}
                value={passv}
              />
            </div>
            <button className="butt" type="submit">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="form-img"
          />
        </div>
        <div className="search-cont">
          <div className="nav-search">
            <h1>Your Passwords</h1>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-img"
              />
              <input type="search" value={sea} onChange={this.search} />
            </div>
          </div>
          <hr />
          <div className="label">
            <input id="in" type="checkbox" value={val} onChange={this.valu} />
            <label htmlFor="in">Show Password</label>
          </div>
          {upda.length > 0 ? this.renderData() : this.renderImg()}
        </div>
      </div>
    )
  }
}

export default App

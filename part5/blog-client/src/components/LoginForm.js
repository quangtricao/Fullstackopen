const LoginForm = ({ setUsername, setPassword, handleLogin }) => {
  return (
    <>
      <h1>log in to application</h1>
      <form onSubmit={handleLogin}>
        <div>
					username
          <input
            id="username"
            type="text"
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
					password
          <input
            id="password"
            type="password"
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </>
  )
}

export default LoginForm
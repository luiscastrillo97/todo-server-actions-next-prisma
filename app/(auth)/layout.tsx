interface Props {
    children: React.ReactNode
}

const AuthLayout = ({children}: Props) => {
  return (
    <div
        className="grid place-items-center min-h-screen"
    >{children}</div>
  )
}

export default AuthLayout
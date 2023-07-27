type PropTypes = {
  login: string,
  repos: number
}

export function GHUser(props: PropTypes) {
  return (
    <div>
      <div>{props.login}</div>
      <div>{props.repos}</div>
    </div>
  )
}

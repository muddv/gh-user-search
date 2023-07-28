import { useState, useEffect } from "react"

import type { GHUser, GHUserWithDetails } from "../stores/searchRes"
import { getDetails } from "../lib/getDetails"
import data from '../dets.json'
import email from './assets/mail.svg'
import followers from './assets/followers.svg'
import company from './assets/company.svg'
import location from './assets/location.svg'
import repos from './assets/repos.svg'
import link from './assets/link.svg'

function getDets() {
  return new Promise(res => {
    setTimeout(() => { res(data) }, 1000)
  })
}

function Details(props: GHUserWithDetails) {
  return (
    <div className="text-slate-800"> 
      <div className="grid grid-cols-2 w-fit gap-y-1">
        <div className="flex gap-1 w-fit">
          <img height='24' width='24' src={repos} /><a href={props.html_url + '?tab=repositories'}>{props.public_repos} repositories</a>
        </div>
        <div className="flex gap-1 w-fit">
          <img height='24' width='24' src={followers} /><a href={props.html_url + '?tab=followers'}>{props.followers} followers</a> · <a href={props.html_url + '?tab=following'}>{props.following} following</a>
        </div>
        {props.email &&
          <div className="flex gap-1 w-fit">
            <img height='24' width='24' src={email} />
            {props.email}
          </div>}
        {props.company &&
          <div className="flex gap-1 w-fit">
            <img height='24' width='24' src={company} />
            {props.company}
          </div>}
        {props.location &&
          <div className="flex gap-1 w-fit">
            <img height='24' width='24' src={location} />
            {props.location}
          </div>}
      </div>
    </div>
  )
}

export function GHUser(props: GHUser) {
  const [isExpanded, setExpanded] = useState(false)
  const [details, setDetails] = useState<GHUserWithDetails | undefined>()
  const [isLoading, setLoading] = useState(false)
  async function handleClick() {
    // TODO do i need to a function here?
    setExpanded(() => { return !isExpanded })
    if (isExpanded) return
    setLoading(true)
    //let dets = await getDetails(props.url)
    let dets = await getDets()
    setLoading(false)
    //setDetails(dets)
    setDetails({ ...props, ...dets as any })
  }
  return (
    <li onClick={handleClick} className="w-1/3 m-5 p-2 flex gap-5 border-2 border-black rounded hover:bg-slate-300 cursor-pointer">
      <img height='25' width='25' className="w-10 h-10" src={props.avatar_url} />
      <div className="flex flex-col">
        <a href={props.html_url} className="text-xl w-fit underline hover:no-underline">{props.login}</a>
        <div className="text-slate-800">{(details && details.name) && details.name}</div>
        {isLoading && <div>Loading...</div>}
        
        {(isExpanded && !isLoading) && <Details {...details} />}
      </div>
    </li>
  )
}

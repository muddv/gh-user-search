import { useState } from "react";

import type { GHUser, GHUserWithDetails } from "../stores/searchRes";
import { getDetails } from "../lib/getDetails";
import data from "../dets.json";
import email from "./assets/mail.svg";
import followers from "./assets/followers.svg";
import company from "./assets/company.svg";
import location from "./assets/location.svg";
import repos from "./assets/repos.svg";

function getDets() {
  return new Promise((res) => {
    setTimeout(() => {
      res(data);
    }, 1000);
  });
}

function Details(props: GHUserWithDetails) {
  return (
    <div className="text-slate-800">
      <div className="grid w-fit grid-cols-2 gap-y-1">
        <div className="flex w-fit gap-1">
          <img height="24" width="24" src={repos} />
          <a href={props.html_url + "?tab=repositories"}>
            {props.public_repos} repositories
          </a>
        </div>
        <div className="flex w-fit gap-1">
          <img height="24" width="24" src={followers} />
          <a href={props.html_url + "?tab=followers"}>
            {props.followers} followers
          </a>{" "}
          ·{" "}
          <a href={props.html_url + "?tab=following"}>
            {props.following} following
          </a>
        </div>
        {props.email && (
          <div className="flex w-fit gap-1">
            <img height="24" width="24" src={email} />
            {props.email}
          </div>
        )}
        {props.company && (
          <div className="flex w-fit gap-1">
            <img height="24" width="24" src={company} />
            {props.company}
          </div>
        )}
        {props.location && (
          <div className="flex w-fit gap-1">
            <img height="24" width="24" src={location} />
            {props.location}
          </div>
        )}
      </div>
    </div>
  );
}

export function GHUser(props: GHUser) {
  const [isExpanded, setExpanded] = useState(false);
  const [details, setDetails] = useState<GHUserWithDetails | undefined>();
  const [isLoading, setLoading] = useState(false);
  async function handleClick() {
    // TODO do i need to a function here?
    setExpanded(() => {
      return !isExpanded;
    });
    if (isExpanded) return;
    setLoading(true);
    const dets = await getDetails(props.url);
    //let dets = await getDets()
    setLoading(false);
    setDetails(dets);
    //setDetails({ ...props, ...dets as any })
  }
  return (
    <li
      onClick={handleClick}
      className="m-5 flex w-1/3 cursor-pointer gap-5 rounded border-2 border-black p-2 hover:bg-slate-300"
    >
      <img
        height="25"
        width="25"
        className="h-10 w-10"
        src={props.avatar_url}
      />
      <div className="flex flex-col">
        <a
          href={props.html_url}
          className="w-fit text-xl underline hover:no-underline"
        >
          {props.login}
        </a>
        <div className="text-slate-800">
          {details && details.name && details.name}
        </div>
        {isLoading && <div>Loading...</div>}

        {isExpanded && !isLoading && (
          <Details {...(details as GHUserWithDetails)} />
        )}
      </div>
    </li>
  );
}

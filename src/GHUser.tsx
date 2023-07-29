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
    <div className="h-fit text-slate-900">
      <div className="grid w-fit grid-cols-2 gap-x-5 gap-y-1">
        <div className="flex w-fit gap-1">
          <img height="24" width="24" src={repos} />
          <a href={props.html_url + "?tab=repositories"}>
            {props.public_repos || "0"} repositories
          </a>
        </div>
        <div className="flex w-fit gap-1">
          <img height="24" width="24" src={followers} />
          <a href={props.html_url + "?tab=followers"}>
            {props.followers || "0"} followers
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
      {props.bio && <div className="mt-1">{props.bio}</div>}
    </div>
  );
}

type DetailsErrorProps = {
  callback: () => void;
};

function DetailsError(props: DetailsErrorProps) {
  return (
    <div className="text-rose-400">
      Error getting details,{" "}
      <button
        onClick={() => {
          props.callback();
        }}
      >
        retry
      </button>
    </div>
  );
}

export function GHUser(props: GHUser) {
  const [isExpanded, setExpanded] = useState(false);
  const [details, setDetails] = useState<GHUserWithDetails | undefined>();
  const [isLoading, setLoading] = useState(false);
  const [errored, setErrored] = useState(false);
  async function loadDetails() {
    if (errored) setErrored(false);
    if (isExpanded) return;
    setLoading(true);
    const dets = await getDetails(props.url);
    //let dets = await getDets()
    setLoading(false);
    if (typeof dets === "string") {
      setErrored(true);
    }
    setDetails(dets);
    //setDetails({ ...props, ...dets as any })
  }
  return (
    <li
      onClick={() => {
        setExpanded(!isExpanded);
        loadDetails();
      }}
      className="m-2 text-slate-950  bg-slate-50 flex h-fit h-fit w-[35rem] cursor-pointer gap-5 rounded border-2 border-gray-900 p-2 hover:bg-slate-300"
    >
      <img
        alt={`${props.login}'s avatar`}
        height="25"
        width="25"
        className="h-10 w-10 rounded-full"
        src={props.avatar_url}
      />
      <div className="flex flex-col">
        <a
          href={props.html_url}
          className="w-fit text-xl underline hover:no-underline"
        >
          {props.login}
        </a>
        <div className="">
          {details && details.name && details.name}
        </div>
        {isLoading && <div>Loading...</div>}

        {isExpanded && !isLoading && !errored && (
          <Details {...(details as GHUserWithDetails)} />
        )}
        {isExpanded && errored && <DetailsError callback={loadDetails} />}
      </div>
    </li>
  );
}

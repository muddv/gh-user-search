import { useState } from "react";

import type { GHUser, GHUserWithDetails } from "../stores/searchRes";
import { getDetails } from "../lib/getDetails";
import email from "./assets/mail.svg";
import followers from "./assets/followers.svg";
import company from "./assets/company.svg";
import location from "./assets/location.svg";
import repos from "./assets/repos.svg";
import github from "./assets/github.svg";

export function Details(props: GHUserWithDetails) {
  return (
    <div className="h-fit text-slate-900">
      <div className="grid w-fit grid-cols-2 gap-x-5 gap-y-1">
        <div className="flex w-fit gap-1">
          <img height="24" width="24" src={repos} />
          <span>{props.public_repos || "0"} repositories</span>
        </div>
        <div className="flex w-fit gap-1">
          <img height="24" width="24" src={followers} />
          <span>{props.followers || "0"} followers</span>
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
    <div className="text-red-400">
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

type GHUserProps = {
  user: GHUser;
  tabIndex: number;
};

export function GHUser(props: GHUserProps) {
  const [isExpanded, setExpanded] = useState(false);
  const [details, setDetails] = useState<GHUserWithDetails | undefined>();
  const [isLoading, setLoading] = useState(false);
  const [errored, setErrored] = useState(false);
  async function loadDetails() {
    if (errored) setErrored(false);
    if (isExpanded) return;
    setLoading(true);
    const dets = await getDetails(props.user.url);
    setLoading(false);
    if (typeof dets === "string") {
      setErrored(true);
    }
    setDetails(dets);
  }
  return (
    <li
      tabIndex={props.tabIndex + props.tabIndex}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          setExpanded(!isExpanded);
          loadDetails();
        }
      }}
      onClick={() => {
        setExpanded(!isExpanded);
        loadDetails();
      }}
      className="mx-1 my-2 flex h-fit cursor-pointer gap-5 rounded border-2 border-gray-900 bg-slate-50 p-2 text-slate-950 hover:bg-slate-300 focus-visible:outline-2 md:w-[35rem]"
    >
      <img
        alt={`${props.user.login}'s avatar`}
        height="25"
        width="25"
        className="h-10 w-10 rounded-full"
        src={props.user.avatar_url}
      />
      <div className="flex flex-col">
        <div className="flex ">
          <div
            className={`w-[10rem] text-xl underline md:w-[25rem] ${
              !isExpanded && "truncate"
            }`}
          >
            {props.user.login}
          </div>
          <a
            tabIndex={props.tabIndex + props.tabIndex + 1}
            onClick={(e) => {
              e.stopPropagation();
            }}
            href={props.user.html_url}
            className="flex h-10 items-center rounded-xl border-2 border-slate-500 bg-slate-500 px-2 text-neutral-50 hover:border-slate-800 hover:bg-slate-800"
          >
            <img className="mr-1" src={github} alt="github logo" />
            View on GitHub
          </a>
        </div>
        <div className="-mt-2">{details && details.name && details.name}</div>
        {isLoading && <div>Loading...</div>}

        {isExpanded && !isLoading && !errored && (
          <Details {...(details as GHUserWithDetails)} />
        )}
        {isExpanded && errored && <DetailsError callback={loadDetails} />}
      </div>
    </li>
  );
}

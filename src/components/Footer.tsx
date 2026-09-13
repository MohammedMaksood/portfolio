"use client";

import { useEffect, useState } from "react";
import { profile } from "@/content/profile";

/** Local time in Chennai, refreshed each minute. */
function useChennaiTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    function update() {
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Kolkata",
        }).format(new Date()),
      );
    }
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  return time;
}

export function Footer({ className = "" }: { className?: string }) {
  const time = useChennaiTime();
  const year = new Date().getFullYear();

  return (
    <footer className={`border-t border-line ${className}`}>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-2xl leading-none">{profile.name}</p>
          <p className="mt-3 text-sm text-text-2">{profile.title}</p>
        </div>

        <div className="flex flex-col gap-4 md:items-end">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li>
              <a
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
                className="link-underline text-sm text-text-2"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="link-underline text-sm text-text-2"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={`mailto:${profile.links.email}`}
                className="link-underline text-sm text-text-2"
              >
                {profile.links.email}
              </a>
            </li>
          </ul>

          <p className="data">
            {profile.location}
            {time ? ` / ${time} local` : ""} / © {year}
          </p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import React from "react";
import {Avatar} from "@nextui-org/react";

const UserPost = React.forwardRef(
  ({avatar, name, date, username, text, likes, comments, ...props}, ref) => (
    <div ref={ref} className="mb-4 flex gap-4" {...props}>
      <Avatar className="flex-none" size="md" src={avatar} />
      <div className="flex flex-col justify-center">
        <div className="flex gap-1 text-small">
          <p>{name}</p>
          <p className="text-default-400">{username}</p>
          <span className="text-default-400">·</span>
          <p className="text-default-400">
            {new Intl.DateTimeFormat("en-US", {
              weekday: "short",
              day: "numeric",
            }).format(new Date(date))}
          </p>
        </div>
        <p className="text-small text-default-500">{text}</p>
        <div className="flex gap-2">
          <p>
            <span className="text-small font-medium text-default-500">{likes}</span>&nbsp;
            <span className="text-small text-default-400">Likes</span>
          </p>
          <p>
            <span className="text-small font-medium text-default-500">{comments}</span>&nbsp;
            <span className="text-small text-default-400">Comments</span>
          </p>
        </div>
      </div>
    </div>
  ),
);

UserPost.displayName = "UserPost";

export default UserPost;

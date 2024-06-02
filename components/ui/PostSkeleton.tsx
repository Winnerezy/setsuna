import { Skeleton } from "@mui/material";
import React from "react";

export const PostSkeleton = () => {
  return (
    <Skeleton variant="rectangular" className="flex flex-col justify-between p-4 flex-grow w-full h-[350px] max-w-[600px] bg-[var(--global-loader-bg)] rounded-[20px] items-center space-y-4"/>

  );
};

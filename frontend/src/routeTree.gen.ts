/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from "./routes/__root";
import { Route as DashboardImport } from "./routes/dashboard";
import { Route as IndexImport } from "./routes/index";
import { Route as ProfileIndexImport } from "./routes/profile/index";
import { Route as PracticeIndexImport } from "./routes/practice/index";
import { Route as SubmissionIdImport } from "./routes/submission/$id";
import { Route as ProfileIdImport } from "./routes/profile/$id";
import { Route as PracticeIdImport } from "./routes/practice/$id";
import { Route as MatchQueueImport } from "./routes/match/queue";
import { Route as MatchIdImport } from "./routes/match/$id";

// Create/Update Routes

const DashboardRoute = DashboardImport.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => rootRoute,
} as any);

const IndexRoute = IndexImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => rootRoute,
} as any);

const ProfileIndexRoute = ProfileIndexImport.update({
  id: "/profile/",
  path: "/profile/",
  getParentRoute: () => rootRoute,
} as any);

const PracticeIndexRoute = PracticeIndexImport.update({
  id: "/practice/",
  path: "/practice/",
  getParentRoute: () => rootRoute,
} as any);

const SubmissionIdRoute = SubmissionIdImport.update({
  id: "/submission/$id",
  path: "/submission/$id",
  getParentRoute: () => rootRoute,
} as any);

const ProfileIdRoute = ProfileIdImport.update({
  id: "/profile/$id",
  path: "/profile/$id",
  getParentRoute: () => rootRoute,
} as any);

const PracticeIdRoute = PracticeIdImport.update({
  id: "/practice/$id",
  path: "/practice/$id",
  getParentRoute: () => rootRoute,
} as any);

const MatchQueueRoute = MatchQueueImport.update({
  id: "/match/queue",
  path: "/match/queue",
  getParentRoute: () => rootRoute,
} as any);

const MatchIdRoute = MatchIdImport.update({
  id: "/match/$id",
  path: "/match/$id",
  getParentRoute: () => rootRoute,
} as any);

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      id: "/";
      path: "/";
      fullPath: "/";
      preLoaderRoute: typeof IndexImport;
      parentRoute: typeof rootRoute;
    };
    "/dashboard": {
      id: "/dashboard";
      path: "/dashboard";
      fullPath: "/dashboard";
      preLoaderRoute: typeof DashboardImport;
      parentRoute: typeof rootRoute;
    };
    "/match/$id": {
      id: "/match/$id";
      path: "/match/$id";
      fullPath: "/match/$id";
      preLoaderRoute: typeof MatchIdImport;
      parentRoute: typeof rootRoute;
    };
    "/match/queue": {
      id: "/match/queue";
      path: "/match/queue";
      fullPath: "/match/queue";
      preLoaderRoute: typeof MatchQueueImport;
      parentRoute: typeof rootRoute;
    };
    "/practice/$id": {
      id: "/practice/$id";
      path: "/practice/$id";
      fullPath: "/practice/$id";
      preLoaderRoute: typeof PracticeIdImport;
      parentRoute: typeof rootRoute;
    };
    "/profile/$id": {
      id: "/profile/$id";
      path: "/profile/$id";
      fullPath: "/profile/$id";
      preLoaderRoute: typeof ProfileIdImport;
      parentRoute: typeof rootRoute;
    };
    "/submission/$id": {
      id: "/submission/$id";
      path: "/submission/$id";
      fullPath: "/submission/$id";
      preLoaderRoute: typeof SubmissionIdImport;
      parentRoute: typeof rootRoute;
    };
    "/practice/": {
      id: "/practice/";
      path: "/practice";
      fullPath: "/practice";
      preLoaderRoute: typeof PracticeIndexImport;
      parentRoute: typeof rootRoute;
    };
    "/profile/": {
      id: "/profile/";
      path: "/profile";
      fullPath: "/profile";
      preLoaderRoute: typeof ProfileIndexImport;
      parentRoute: typeof rootRoute;
    };
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  "/": typeof IndexRoute;
  "/dashboard": typeof DashboardRoute;
  "/match/$id": typeof MatchIdRoute;
  "/match/queue": typeof MatchQueueRoute;
  "/practice/$id": typeof PracticeIdRoute;
  "/profile/$id": typeof ProfileIdRoute;
  "/submission/$id": typeof SubmissionIdRoute;
  "/practice": typeof PracticeIndexRoute;
  "/profile": typeof ProfileIndexRoute;
}

export interface FileRoutesByTo {
  "/": typeof IndexRoute;
  "/dashboard": typeof DashboardRoute;
  "/match/$id": typeof MatchIdRoute;
  "/match/queue": typeof MatchQueueRoute;
  "/practice/$id": typeof PracticeIdRoute;
  "/profile/$id": typeof ProfileIdRoute;
  "/submission/$id": typeof SubmissionIdRoute;
  "/practice": typeof PracticeIndexRoute;
  "/profile": typeof ProfileIndexRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  "/": typeof IndexRoute;
  "/dashboard": typeof DashboardRoute;
  "/match/$id": typeof MatchIdRoute;
  "/match/queue": typeof MatchQueueRoute;
  "/practice/$id": typeof PracticeIdRoute;
  "/profile/$id": typeof ProfileIdRoute;
  "/submission/$id": typeof SubmissionIdRoute;
  "/practice/": typeof PracticeIndexRoute;
  "/profile/": typeof ProfileIndexRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths:
    | "/"
    | "/dashboard"
    | "/match/$id"
    | "/match/queue"
    | "/practice/$id"
    | "/profile/$id"
    | "/submission/$id"
    | "/practice"
    | "/profile";
  fileRoutesByTo: FileRoutesByTo;
  to:
    | "/"
    | "/dashboard"
    | "/match/$id"
    | "/match/queue"
    | "/practice/$id"
    | "/profile/$id"
    | "/submission/$id"
    | "/practice"
    | "/profile";
  id:
    | "__root__"
    | "/"
    | "/dashboard"
    | "/match/$id"
    | "/match/queue"
    | "/practice/$id"
    | "/profile/$id"
    | "/submission/$id"
    | "/practice/"
    | "/profile/";
  fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute;
  DashboardRoute: typeof DashboardRoute;
  MatchIdRoute: typeof MatchIdRoute;
  MatchQueueRoute: typeof MatchQueueRoute;
  PracticeIdRoute: typeof PracticeIdRoute;
  ProfileIdRoute: typeof ProfileIdRoute;
  SubmissionIdRoute: typeof SubmissionIdRoute;
  PracticeIndexRoute: typeof PracticeIndexRoute;
  ProfileIndexRoute: typeof ProfileIndexRoute;
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  DashboardRoute: DashboardRoute,
  MatchIdRoute: MatchIdRoute,
  MatchQueueRoute: MatchQueueRoute,
  PracticeIdRoute: PracticeIdRoute,
  ProfileIdRoute: ProfileIdRoute,
  SubmissionIdRoute: SubmissionIdRoute,
  PracticeIndexRoute: PracticeIndexRoute,
  ProfileIndexRoute: ProfileIndexRoute,
};

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>();

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/dashboard",
        "/match/$id",
        "/match/queue",
        "/practice/$id",
        "/profile/$id",
        "/submission/$id",
        "/practice/",
        "/profile/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/dashboard": {
      "filePath": "dashboard.tsx"
    },
    "/match/$id": {
      "filePath": "match/$id.tsx"
    },
    "/match/queue": {
      "filePath": "match/queue.tsx"
    },
    "/practice/$id": {
      "filePath": "practice/$id.tsx"
    },
    "/profile/$id": {
      "filePath": "profile/$id.tsx"
    },
    "/submission/$id": {
      "filePath": "submission/$id.tsx"
    },
    "/practice/": {
      "filePath": "practice/index.tsx"
    },
    "/profile/": {
      "filePath": "profile/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */

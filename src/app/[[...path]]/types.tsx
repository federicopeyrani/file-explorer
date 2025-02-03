export type URIPath = string[] & { __tag: "Path" };

export type PathParams = {
  params: {
    path?: URIPath;
  };
};

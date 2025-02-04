export type Encoded = {
  __type: "encoded";
};

export type NotEncoded = {
  __type?: "not-encoded";
};

export type URIPath = (string & Encoded)[] & { __tag: "URIPath" };

export type PathParams = {
  params: {
    path?: URIPath;
  };
};

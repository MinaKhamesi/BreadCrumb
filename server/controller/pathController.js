const root = require("../config/data");

const getPath = (req, res) => {
  //extract the path from params and convert it to a list
  const { givenpath } = req.params;
  const requestedPath = givenpath.split("-");

  //define the final destination the user is looking for
  const destination = requestedPath[requestedPath.length - 1];

  //starting from the root we look into the requested path one by one, whenever we see the destination in children, we will return the children of that.
  let currentLocation = root;
  let pathIdx = 0;

  while (pathIdx < requestedPath.length && currentLocation != null) {
    //if user only wants root, return the info of children
    if (givenpath === "root") {
      const content = [];
      for (child in currentLocation.children) {
        const { children, ...childInfo } = currentLocation.children[child];
        content.push({ name: child, ...childInfo });
      }
      return res.status(200).json({ success: true, content });
    }
    //if the destination is a child of current directory, return the info
    if (
      destination in currentLocation.children &&
      currentLocation.children[destination].path === givenpath
    ) {
      currentLocation = currentLocation.children[destination];
      const content = [];
      for (child in currentLocation.children) {
        const { children, ...childInfo } = currentLocation.children[child];
        content.push({ name: child, ...childInfo });
      }
      return res.status(200).json({
        success: true,
        content,
      });
    }

    // if neither of the situation happened, go deeper through the given path list and our location in directory tree
    const nextLocationRequested = requestedPath[pathIdx + 1];

    currentLocation = currentLocation.children[nextLocationRequested];

    pathIdx += 1;
  }
  // if the given path list is over or the location doesn't exist, we return a 404
  return res
    .status(404)
    .json({ success: false, content: "Requested Path Not Found" });
};

module.exports = getPath;

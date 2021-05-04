const root = {
  type: "&#34;dir&#34;",
  children: {
    home: {
      type: "&#34;dir&#34;",
      children: {
        myname: {
          type: "&#34;dir&#34;",
          children: {
            "filea.txt": {
              type: "&#34;file&#34;",
            },
            "fileb.txt": {
              type: "&#34;file&#34;",
            },
            projects: {
              type: "&#34;dir&#34;",
              children: {
                mysupersecretproject: {
                  type: "&#34;dir&#34;",
                  children: {
                    mysupersecretfile: {
                      type: "&#34;file&#34;",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

//add a path attrubite to each child in the tree - depth-first-search
const addPath = (location, path = ["root"]) => {
  if (!location) return;
  for (child in location.children) {
    path.push(child);
    location.children[child]["path"] = path.join("-");
    addPath(location.children[child], path);
    path.pop();
  }
};

addPath(root);

module.exports = root;

import { Probot } from "probot";
// import gql from "graphql-tag";

export = (app: Probot) => {
  app.on("issues.opened", async (context) => {
    const issueComment = context.issue({
      body: "Thanks for opening this issue!",
    });

    await context.octokit.issues.createComment(issueComment);
  });

  app.on("issue_comment", async (context) => {
    const comment = context.payload.comment;
    app.log.info(context.payload.issue.node_id)
    if (comment.body === "superman") {
      try {
        await context.octokit.graphql(
          `
            mutation updateTime($itemId: ID!) {
              updateProjectV2ItemFieldValue(
                input: {
                  projectId: "PVT_kwDOBohQxM4AEEgc",
                  itemId: $itemId,
                  fieldId: "PVTF_lADOBohQxM4AEEgczgMRwWQ",
                  value: { number: 1000 }
                }
              ) {
                projectV2Item {
                  id
                }
              }
            }
          `,
          {
            itemId: "PVTI_lADOBohQxM4AEEgczgIRZmE",

          }
        );
      } catch (error: any) {
        // do something with the error, allowing you to detect a graphql response error,
        // compared to accidentally catching unrelated errors.

        // server responds with an object like the following (as an example)
        // class GraphqlResponseError {
        //  "headers": {
        //    "status": "403",
        //  },
        //  "data": null,
        //  "errors": [{
        //   "message": "Field 'bioHtml' doesn't exist on type 'User'",
        //   "locations": [{
        //    "line": 3,
        //    "column": 5
        //   }]
        //  }]
        // }

        app.log.info(error);
      }
    }
  });

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};

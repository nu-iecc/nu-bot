import { Probot } from "probot";
import gql from "graphql-tag";

export = (app: Probot) => {
  app.on("issues.opened", async (context) => {
    const issueComment = context.issue({
      body: "Thanks for opening this issue!",
    });

    await context.octokit.issues.createComment(issueComment);
  });

  app.on("issue_comment", async (context) => {
    const comment = context.payload.comment;
    if (comment.body === "superman") {
      await context.octokit.graphql(
        gql`
          mutation {
            updateProjectV2ItemFieldValue($itemId: ID!) (
              input: {
                projectId: "PVT_kwDOBohQxM4AEEgc"
                itemId: $itemId
                fieldId: "PVTF_lADOBohQxM4AEEgczgMRwWQ"
                value: { number: 1000 }
              }
            ) {
              projectV2Item {
                id
              }
            }
          }
        `.toString(),
        {
          itemId: context.payload.issue.node_id,
        }
      );
    }
  });

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};

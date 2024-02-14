import React, { useState } from "react";
import type { IHighlight } from "./react-pdf-highlighter";
import axios from 'axios';

interface Props {
  highlights: Array<IHighlight>;
  resetHighlights: () => void;
  toggleDocument: () => void;
  docName: string | null;
  user: string | null;

}

const updateHash = (highlight: IHighlight) => {
  console.log(highlight);

  document.location.hash = `highlight-${highlight.id}`;
};
const saveHighlightReplyToBackend = async (highlight: IHighlight, docName: string | null) => {
  try {
    const response = await axios.put(
      "http://127.0.0.1:8083/api/documents/comments",
      { comments: highlight, docName },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Highlight saved to backend:", response.data);
  } catch (error) {
    console.error("Error saving highlight:", error);
  }
};
export function Sidebar({
  highlights,
  toggleDocument,
  resetHighlights,
  docName, user
}: Props) {
  console.log("All Highlights:", highlights);

  const [replyingTo, setReplyingTo] = useState<IHighlight | null>(null);
  const [replyText, setReplyText] = useState("");

  const replyToHighlight = (highlight: IHighlight) => {
    setReplyingTo(highlight);
    setReplyText(""); // Clear reply text
  };

  const submitReply = (highlight: IHighlight) => {
    // Implement your logic to submit the reply
    console.log("Reply submitted:", replyText);
    const reply = replyText;
    let replyBy = '';
    if (user) {
      const users = user?.split(' ');
      replyBy = users[1];
    }

    const highlightWithreply: IHighlight = { ...highlight, reply, replyBy };
    // Clear the reply textbox
    console.log('Highlight with reply', highlightWithreply);
    console.log('Docname in sidebar', docName);
    saveHighlightReplyToBackend(highlightWithreply, docName);

    setReplyText("");
  };

  return (
    <div className="sidebar" style={{ width: "25vw" }}>
      <div className="description" style={{ padding: "1rem" }}>
        <h2 style={{ marginBottom: "1rem" }}>Novacon PDF Viewer</h2>
        <p>
          <small>
            To create area highlight hold ⌥ Option key (Alt), then click and
            drag.
          </small>
        </p>
      </div>

      <ul className="sidebar__highlights">
        {highlights.map((highlight, index) => {
          console.log("Highlight:", highlight); // Console.log each highlight
          return (
            <li
              key={index}
              className="sidebar__highlight"
              onClick={() => {
                updateHash(highlight);
              }}
            >
              <div>
                <strong>{highlight.commentBy} commented: </strong>
                <strong style={{ marginTop: "0.5rem" }}>{highlight.comment.text}</strong>

                {highlight.content.text ? (
                  <blockquote style={{ marginTop: "0.5rem" }}>
                    {`${highlight.content.text.slice(0, 90).trim()}…`}
                  </blockquote>
                ) : null}
                {highlight.content.image ? (
                  <div
                    className="highlight__image"
                    style={{ marginTop: "0.5rem" }}
                  >
                    <img src={highlight.content.image} alt={"Screenshot"} />
                  </div>
                ) : null}
              </div>
              <div style={{ margin: "0.5rem" }}>Replyby <strong>{highlight.replyBy}:</strong>
                <blockquote style={{ margin: "0.5rem" }}>
                  {`${highlight.reply.slice(0, 90).trim()}…`}
                </blockquote></div>
              <div className="highlight__location">
                Page {highlight.position.pageNumber}
              </div>
              {replyingTo?.id === highlight.id ? (
                <div>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Enter your reply..."
                    style={{ marginTop: "0.5rem" }}
                  ></textarea>
                  <button onClick={() => submitReply(highlight)}>Submit</button>
                </div>
              ) : (
                <button onClick={() => replyToHighlight(highlight)}>
                  Reply
                </button>
              )}
            </li>
          );
        })}
      </ul>
      <div style={{ padding: "1rem" }}>
        <button onClick={toggleDocument}>Toggle PDF document</button>
      </div>
      {highlights.length > 0 ? (
        <div style={{ padding: "1rem" }}>
          <button onClick={resetHighlights}>Reset highlights</button>
        </div>
      ) : null}
    </div>
  );
}

// import React from "react";
// import type { IHighlight } from "./react-pdf-highlighter";

// interface Props {
//   highlights: Array<IHighlight>;
//   resetHighlights: () => void;
//   toggleDocument: () => void;
// }

// const updateHash = (highlight: IHighlight) => {
//   document.location.hash = `highlight-${highlight.id}`;
// };

// export function Sidebar({
//   highlights,
//   toggleDocument,
//   resetHighlights,
// }: Props) {
//   return (
//     <div className="sidebar" style={{ width: "25vw" }}>
//       <div className="description" style={{ padding: "1rem" }}>
//         <h2 style={{ marginBottom: "1rem" }}>Novacon PDF Viewer</h2>

//         {/* <p style={{ fontSize: "0.7rem" }}>
//           <a href="https://github.com/agentcooper/react-pdf-highlighter">
//             Open in GitHub
//           </a>
//         </p> */}

//         <p>
//           <small>
//             To create area highlight hold ⌥ Option key (Alt), then click and
//             drag.
//           </small>
//         </p>
//       </div>

//       <ul className="sidebar__highlights">
//         {highlights.map((highlight, index) => (
//           <li
//             key={index}
//             className="sidebar__highlight"
//             onClick={() => {
//               updateHash(highlight);
//             }}
//           >
//             <div>
//               <strong>{highlight.comment.text}</strong>
//               {highlight.content.text ? (
//                 <blockquote style={{ marginTop: "0.5rem" }}>
//                   {`${highlight.content.text.slice(0, 90).trim()}…`}
//                 </blockquote>
//               ) : null}
//               {highlight.content.image ? (
//                 <div
//                   className="highlight__image"
//                   style={{ marginTop: "0.5rem" }}
//                 >
//                   <img src={highlight.content.image} alt={"Screenshot"} />
//                 </div>
//               ) : null}
//             </div>
//             <div className="highlight__location">
//               Page {highlight.position.pageNumber}
//             </div>
//           </li>
//         ))}
//       </ul>
//       <div style={{ padding: "1rem" }}>
//         <button onClick={toggleDocument}>Toggle PDF document</button>
//       </div>
//       {highlights.length > 0 ? (
//         <div style={{ padding: "1rem" }}>
//           <button onClick={resetHighlights}>Reset highlights</button>
//         </div>
//       ) : null}
//     </div>
//   );
// }

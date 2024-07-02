// import React, { useState } from "react";
// import type { IHighlight } from "./react-pdf-highlighter";
// import axios from 'axios';
// import { FaCheck } from "react-icons/fa"
// import { fetchHighlights } from "./test-highlights";
// interface Props {
//   highlights: Array<IHighlight>;
//   resetHighlights: () => void;
//   toggleDocument: () => void;
//   docName: string | null;
//   user: string | null;

// }

// const updateHash = (highlight: IHighlight) => {
//   console.log(highlight);

//   document.location.hash = `highlight-${highlight.id}`;
// };
// const handleBack = () => {
//   window.location.href = "http://54.81.250.98:8083/pages/document-assessment";

// }
// const saveHighlightReplyToBackend = async (highlight: IHighlight, docName: string | null, user: string) => {
//   try {
//     const response = await axios.put(
//       // <<<<<<< HEAD
//       "http://54.81.250.98:8083/api/documents/comments",
//       { user, comments: highlight, docName },
//       // =======
//       // "http://54.81.250.98:8083/api/documents/comments",
//       // { comments: highlight, docName },
//       // >>>>>>> 01c2059cf8ac58b94f13f476e72d33a7e54a5610
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//      
//     );
//     console.log("Highlight saved to backend:", response.data);
//     await fetchHighlights()
//   } catch (error) {
//     console.error("Error saving highlight:", error);
//   }
// };


// export function Sidebar({
//   highlights,
//   toggleDocument,
//   resetHighlights,
//   docName, user
// }: Props) {
//   console.log("All Highlights:", highlights, user);

//   const [replyingTo, setReplyingTo] = useState<IHighlight | null>(null);
//   const [replyText, setReplyText] = useState("");

//   const replyToHighlight = (highlight: IHighlight) => {
//     setReplyingTo(highlight);
//     setReplyText(""); // Clear reply text
//   };

//   const submitReply = (highlight: IHighlight) => {
//     // Implement your logic to submit the reply
//     console.log("Reply submitted:", replyText);
//     const reply = replyText;
//     let replyBy = '';
//     if (user) {
//       const users = user?.split(' ');
//       console.log(users);

//       replyBy = users[1];
//     }

//     const highlightWithreply: IHighlight = { ...highlight, reply, replyBy };
//     // Clear the reply textbox
//     console.log('Highlight with reply', highlightWithreply);
//     console.log('Docname in sidebar', docName);
//     saveHighlightReplyToBackend(highlightWithreply, docName, replyBy);

//     setReplyText("");
//   };

//   return (
//     <div className="sidebar" style={{ width: "20vw" }}>
//       <div className="description" style={{ padding: "1rem" }}>
//         <h2 style={{ marginBottom: "1rem" }}>Novacon PDF Viewer</h2>
//         <p>
//           <small>
//             To create area highlight hold ⌥ Option key (Alt), then click and
//             drag.
//           </small>
//         </p>
//       </div>

//       {
//         (
//           <ul className="sidebar__highlights">
//             {highlights.map((highlight, index) => {
//               console.log("Highlight:", highlight); // Console.log each highlight
//               return (
//                 <li
//                   key={index}
//                   className="sidebar__highlight"
//                   onClick={() => {
//                     updateHash(highlight);
//                   }}
//                 >
//                   <div>
//                     <strong>{highlight.commentBy} commented:</strong><br />
//                     <strong style={{ marginTop: "0.5rem" }}>{highlight.comment.text}</strong><br />

//                     {highlight.content.text ? (
//                       <blockquote style={{ marginTop: "0.5rem" }}>
//                         {`${highlight.content.text.slice(0, 90).trim()}…`}
//                       </blockquote>
//                     ) : null}
//                     {highlight.content.image && (
//                       <div className="highlight__image" style={{ marginTop: "0.5rem" }}>
//                         <img src={highlight.content.image} alt="Screenshot" />
//                       </div>
//                     )}
//                   </div>
//                   {
//                     highlight.replyBy &&
//                     <div style={{ margin: "0.5rem" }}>
//                       Reply by <strong>{highlight.replyBy}:</strong>
//                       <blockquote style={{ margin: "0.5rem" }}>
//                         {`${highlight.reply.slice(0, 90).trim()}…`}
//                       </blockquote>
//                     </div>
//                   }
//                   <div className="highlight__location">
//                     Page {highlight.position.pageNumber}
//                   </div>
//                   {replyingTo?.id === highlight.id ? (
//                     // <div>
//                     //   <textarea
//                     //     value={replyText}
//                     //     onChange={(e) => setReplyText(e.target.value)}
//                     //     placeholder="Enter your reply..."
//                     //     style={{ marginTop: "0.5rem" }}
//                     //   ></textarea>
//                     //   <button onClick={() => submitReply(highlight)}>Submit</button>
//                     // </div>

//                     <div>
//                       <textarea
//                         value={replyText}
//                         onChange={(e) => setReplyText(e.target.value)}
//                         placeholder="Enter your reply..."
//                         style={{
//                           marginTop: "0.5rem",
//                           width: "95%",
//                           padding: "0.5rem",
//                           border: "1px solid #ccc",
//                           borderRadius: "4px",
//                           resize: "vertical"
//                         }}
//                       ></textarea>
//                       <button
//                         onClick={() => submitReply(highlight)}
//                         style={{
//                           marginTop: "0.5rem",
//                           padding: "0.5rem 1rem",
//                           backgroundColor: "#007bff",
//                           color: "white",
//                           border: "none",
//                           borderRadius: "4px",
//                           cursor: "pointer",
//                           display: "flex",
//                           alignItems: "center"
//                         }}
//                       >
//                         <FaCheck style={{ marginRight: "0.5rem" }} /> Submit
//                       </button>
//                     </div>
//                   ) : (
//                     user == "1" ? <button onClick={() => saveHighlightReplyToBackend(highlight, docName, user)}>
//                       < FaCheck color="green" />
//                     </button> :

//                       <button onClick={() => replyToHighlight(highlight)}>Reply</button>
//                   )}
//                 </li>
//               );
//             })}
//           </ul>
//         )
//       }


//       <div style={{ padding: "1rem" }}>
//         <button onClick={handleBack}>Back to DMS</button>
//       </div>
//       {highlights.length > 0 ? (
//         <div style={{ padding: "1rem" }}>
//           <button onClick={resetHighlights}>Reset highlights</button>
//         </div>
//       ) : null}
//     </div>
//   );
// }

// // import React from "react";
// // import type { IHighlight } from "./react-pdf-highlighter";

// // interface Props {
// //   highlights: Array<IHighlight>;
// //   resetHighlights: () => void;
// //   toggleDocument: () => void;
// // }

// // const updateHash = (highlight: IHighlight) => {
// //   document.location.hash = `highlight-${highlight.id}`;
// // };

// // export function Sidebar({
// //   highlights,
// //   toggleDocument,
// //   resetHighlights,
// // }: Props) {
// //   return (
// //     <div className="sidebar" style={{ width: "25vw" }}>
// //       <div className="description" style={{ padding: "1rem" }}>
// //         <h2 style={{ marginBottom: "1rem" }}>Novacon PDF Viewer</h2>

// //         {/* <p style={{ fontSize: "0.7rem" }}>
// //           <a href="https://github.com/agentcooper/react-pdf-highlighter">
// //             Open in GitHub
// //           </a>
// //         </p> */}

// //         <p>
// //           <small>
// //             To create area highlight hold ⌥ Option key (Alt), then click and
// //             drag.
// //           </small>
// //         </p>
// //       </div>

// //       <ul className="sidebar__highlights">
// //         {highlights.map((highlight, index) => (
// //           <li
// //             key={index}
// //             className="sidebar__highlight"
// //             onClick={() => {
// //               updateHash(highlight);
// //             }}
// //           >
// //             <div>
// //               <strong>{highlight.comment.text}</strong>
// //               {highlight.content.text ? (
// //                 <blockquote style={{ marginTop: "0.5rem" }}>
// //                   {`${highlight.content.text.slice(0, 90).trim()}…`}
// //                 </blockquote>
// //               ) : null}
// //               {highlight.content.image ? (
// //                 <div
// //                   className="highlight__image"
// //                   style={{ marginTop: "0.5rem" }}
// //                 >
// //                   <img src={highlight.content.image} alt={"Screenshot"} />
// //                 </div>
// //               ) : null}
// //             </div>
// //             <div className="highlight__location">
// //               Page {highlight.position.pageNumber}
// //             </div>
// //           </li>
// //         ))}
// //       </ul>
// //       <div style={{ padding: "1rem" }}>
// //         <button onClick={toggleDocument}>Toggle PDF document</button>
// //       </div>
// //       {highlights.length > 0 ? (
// //         <div style={{ padding: "1rem" }}>
// //           <button onClick={resetHighlights}>Reset highlights</button>
// //         </div>
// //       ) : null}
// //     </div>
// //   );
// // }
import React, { useState } from "react";
import type { IHighlight } from "./react-pdf-highlighter";
import axios from 'axios';
import { FaCheck } from "react-icons/fa"
import { fetchHighlights } from "./test-highlights";
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
const handleBack = (user) => {
  console.log(user);
  window.location.href = "http://localhost:3000/pages/document-assessment"
}
const saveHighlightReplyToBackend = async (highlight: IHighlight, docName: string | null, user: string) => {
  try {
    const response = await axios.put(
      // <<<<<<< HEAD
      "http://54.81.250.98:8083/api/documents/comments",
      { user, comments: highlight, docName },
      // =======
      // "http://54.81.250.98:8083/api/documents/comments",
      // { comments: highlight, docName },
      // >>>>>>> 01c2059cf8ac58b94f13f476e72d33a7e54a5610
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Highlight saved to backend:", response.data);
    await fetchHighlights()
  } catch (error) {
    console.error("Error saving highlight:", error);
  }
};


const ResolvedToBackend = async (highlight: IHighlight, docName: string | null, user: string) => {
  try {
    const response = await axios.post(
      "http://54.81.250.98:8083/api/documents/resolved",
      { user, comments: highlight, docName },
      // =======
      // "http://54.81.250.98:8083/api/documents/comments",
      // { comments: highlight, docName },
      // >>>>>>> 01c2059cf8ac58b94f13f476e72d33a7e54a5610
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Highlight saved to backend:", response.data);
    window.location.reload();
    // fetchHighlights()
    console.log("yaha tk pocha");

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

  console.log("All Highlights:", highlights, user);

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
      console.log(users);

      replyBy = users[1];
    }

    const highlightWithreply: IHighlight = { ...highlight, reply, replyBy };
    // Clear the reply textbox
    console.log('Highlight with reply', highlightWithreply);
    console.log('Docname in sidebar', docName);
    saveHighlightReplyToBackend(highlightWithreply, docName, replyBy);

    setReplyText("");
  };

  return (
    <div className="sidebar" style={{ width: "20vw" }}>
      <div className="description" style={{ padding: "1rem" }}>
        <h2 style={{ marginBottom: "1rem" }}>Novacon PDF Viewer</h2>
        <p>
          <small>
            To create area highlight hold ⌥ Option key (Alt), then click and
            drag.
          </small>
        </p>
      </div>

      {
        (
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
                    <strong>{highlight.commentBy} commented:</strong><br />
                    <strong style={{ marginTop: "0.5rem" }}>{highlight.comment.text}</strong><br />

                    {highlight.content.text ? (
                      <blockquote style={{ marginTop: "0.5rem" }}>
                        {`${highlight.content.text.slice(0, 90).trim()}…`}
                      </blockquote>
                    ) : null}
                    {highlight.content.image && (
                      <div className="highlight__image" style={{ marginTop: "0.5rem" }}>
                        <img src={highlight.content.image} alt="Screenshot" />
                      </div>
                    )}
                  </div>
                  {
                    highlight.replyBy &&
                    <div style={{ margin: "0.5rem" }}>
                      Reply by <strong>{highlight.replyBy}:</strong>
                      <blockquote style={{ margin: "0.5rem" }}>
                        {`${highlight.reply.slice(0, 90).trim()}…`}
                      </blockquote>
                    </div>
                  }
                  <div className="highlight__location">
                    Page {highlight.position.pageNumber}
                  </div>
                  {replyingTo?.id === highlight.id ? (
                    // <div>
                    //   <textarea
                    //     value={replyText}
                    //     onChange={(e) => setReplyText(e.target.value)}
                    //     placeholder="Enter your reply..."
                    //     style={{ marginTop: "0.5rem" }}
                    //   ></textarea>
                    //   <button onClick={() => submitReply(highlight)}>Submit</button>
                    // </div>

                    <div>
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Enter your reply..."
                        style={{
                          marginTop: "0.5rem",
                          width: "95%",
                          padding: "0.5rem",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          resize: "vertical"
                        }}
                      ></textarea>
                      <button
                        onClick={() => submitReply(highlight)}
                        style={{
                          marginTop: "0.5rem",
                          padding: "0.5rem 1rem",
                          backgroundColor: "#007bff",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center"
                        }}
                      >
                        <FaCheck style={{ marginRight: "0.5rem" }} /> Submit
                      </button>
                    </div>
                  ) : (
                    user == "1" ? <button onClick={() => saveHighlightReplyToBackend(highlight, docName, user)}>
                      < FaCheck color="green" />
                    </button> :
                      <div>
                        <button onClick={() => replyToHighlight(highlight)} style={{ marginRight: "0.5rem" }}>Reply</button>
                        <button onClick={() => ResolvedToBackend(highlight, docName, user!)} style={{ marginRight: "0.5rem" }}>Resolve</button>
                      </div>

                  )}


                </li>
              );
            })}
          </ul>
        )
      }


      <div style={{ padding: "1rem" }}>
        <button onClick={() => handleBack(user)}>Back to DMS</button>
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

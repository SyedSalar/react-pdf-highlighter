import React, { Component } from "react";
import axios from 'axios';

import { PdfLoader, PdfHighlighter, Tip, Highlight, Popup, AreaHighlight, } from "./react-pdf-highlighter";

import type { IHighlight, NewHighlight } from "./react-pdf-highlighter";

import { fetchHighlights, testHighlights } from "./test-highlights";
import { Spinner } from "./Spinner";
import { Sidebar } from "./Sidebar";

import "./style/App.css";

// const testHighlights: Record<string, Array<IHighlight>> = _testHighlights;

interface State {
  url: string;
  highlights: Array<IHighlight>;
  docName: string | null; // Add docName to the state interface
  user: string | null;
  allowed: string | null;


}

const getNextId = () => String(Math.random()).slice(2);

const parseIdFromHash = () =>
  document.location.hash.slice("#highlight-".length);

const resetHash = () => {
  document.location.hash = "";
};

const HighlightPopup = ({
  comment,
}: {
  comment: { text: string; emoji: string };
}) =>
  comment.text ? (
    <div className="Highlight__popup">
      {comment.emoji} {comment.text}
    </div>
  ) : null;

const PRIMARY_PDF_URL = "https://arxiv.org/pdf/1708.08021.pdf";
const SECONDARY_PDF_URL = "https://arxiv.org/pdf/1604.02480.pdf";

const searchParams = new URLSearchParams(window.location.search);

const initialUrl = searchParams.get("url") || PRIMARY_PDF_URL;
const userId = searchParams.get("user");
console.log(userId, "userId");

// const initialUrl = searchParams.get("url")
console.log(initialUrl);

const saveHighlightToBackend = async (highlight: IHighlight, docName: string | null) => {
  try {
    let Inhouse = null
    console.log(userId, "userId", typeof (userId));

    if (userId == "1") {
      Inhouse = "0"
    }
    else {
      Inhouse = "1"
    }
    const response = await axios.post(
      "http://54.81.250.98:8083/api/documents/comments",
      { comments: highlight, docName, Inhouse },
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
class App extends Component<{}, State> {
  state = {
    url: initialUrl,
    highlights: testHighlights[initialUrl]
      ? [...testHighlights[initialUrl]]
      : [],
    docName: null, // Initialize docName in the state object
    user: '',
    allowed: null

  };
  // state = {
  //   url: "",
  //   highlights: [],
  // };

  resetHighlights = () => {
    this.setState({
      highlights: [],
    });
  };

  toggleDocument = () => {
    const newUrl =
      this.state.url === initialUrl ? initialUrl : PRIMARY_PDF_URL ? SECONDARY_PDF_URL : PRIMARY_PDF_URL;

    this.setState({
      url: newUrl,
      highlights: testHighlights[newUrl] ? [...testHighlights[newUrl]] : [],
    });
  };

  scrollViewerTo = (highlight: any) => { };

  scrollToHighlightFromHash = () => {
    const highlight = this.getHighlightById(parseIdFromHash());

    if (highlight) {
      this.scrollViewerTo(highlight);
    }
  };

  async componentDidMount() {

    const searchParams = new URLSearchParams(window.location.search);
    const urlParam = searchParams.get("url");
    const docName = searchParams.get("docName");
    const user = searchParams.get("user");
    const allowed = searchParams.get('allowed');
    console.log(user, 'allowed', allowed);
    if (urlParam) {
      await fetchHighlights();

      this.setState({
        url: urlParam,
        highlights: testHighlights[urlParam] ? [...testHighlights[urlParam]] : [],
        docName: docName,
        user: user,
        allowed: allowed
      });
      // this.setState({
      //   url: urlParam,
      //   highlights: testHighlights[urlParam] ? [...testHighlights[urlParam]] : [],
      //   docName: docName,
      //   user: user
      // });
    }

    // Assuming you want to do something with the user's name
    console.log("Document's name:", docName);


    window.addEventListener(
      "hashchange",
      this.scrollToHighlightFromHash,
      false
    );
  }

  getHighlightById(id: string) {
    const { highlights } = this.state;

    return highlights.find((highlight) => highlight.id === id);
  }

  async addHighlight(highlight: NewHighlight) {
    const { highlights } = this.state;

    const id = getNextId();
    const reply = '';
    const replyBy = '';

    let commentBy = '';
    if (this.state.user) {
      const users = this.state.user.split(' ');
      commentBy = users[1];
    }
    // Extend NewHighlight to IHighlight by adding an id
    const highlightWithId: IHighlight = { ...highlight, id, reply, commentBy, replyBy };

    // Add the highlight to the state
    this.setState({
      highlights: [highlightWithId, ...highlights],
    });

    console.log("Check highlight", { highlightWithId });

    console.log("Saving highlight", highlightWithId);
    saveHighlightToBackend(highlightWithId, this.state.docName);

  }

  updateHighlight(highlightId: string, position: Object, content: Object) {
    console.log("Updating highlight", highlightId, position, content);

    this.setState({
      highlights: this.state.highlights.map((h) => {
        const {
          id,
          position: originalPosition,
          content: originalContent,
          ...rest
        } = h;
        return id === highlightId
          ? {
            id,
            position: { ...originalPosition, ...position },
            content: { ...originalContent, ...content },
            ...rest,
          }
          : h;
      }),
    });
  }
  updateHighlightComment = (highlightId: string, newComment: string) => {
    console.log("Updating highlight comment", highlightId, newComment);

    this.setState({
      highlights: this.state.highlights.map((h) => {
        return h.id === highlightId
          ? {
            ...h,
            comment: {
              ...h.comment,
              text: newComment,
            },
          }
          : h;
      }),
    });
  };
  render() {
    const { url, highlights } = this.state;

    return (
      <div className="App" style={{ display: "flex", height: "100vh" }}>
        <Sidebar
          highlights={highlights}
          resetHighlights={this.resetHighlights}
          toggleDocument={this.toggleDocument}
          docName={this.state.docName}
          user={this.state.user}
        />
        <div
          style={{
            height: "100vh",
            width: "75vw",
            position: "relative",
          }}
        >
          <PdfLoader url={url} beforeLoad={<Spinner />}>
            {(pdfDocument) => (
              <PdfHighlighter
                pdfDocument={pdfDocument}
                enableAreaSelection={(event) => event.altKey}
                onScrollChange={resetHash}
                pdfScaleValue="page-width"
                scrollRef={(scrollTo) => {
                  this.scrollViewerTo = scrollTo;

                  this.scrollToHighlightFromHash();
                }}
                onSelectionFinished={(
                  position,
                  content,
                  hideTipAndSelection,
                  transformSelection
                ) => (
                  <Tip

                    onOpen={transformSelection}
                    onConfirm={(comment) => {
                      if (this.state.allowed == 'true') {
                        this.addHighlight({ content, position, comment });

                      }


                      hideTipAndSelection();

                    }}
                  />
                )}
                highlightTransform={(
                  highlight,
                  index,
                  setTip,
                  hideTip,
                  viewportToScaled,
                  screenshot,
                  isScrolledTo
                ) => {
                  const isTextHighlight = !Boolean(
                    highlight.content && highlight.content.image
                  );

                  const component = isTextHighlight ? (
                    <Highlight
                      isScrolledTo={isScrolledTo}
                      position={highlight.position}
                      comment={highlight.comment}

                    />
                  ) : (
                    <AreaHighlight
                      isScrolledTo={isScrolledTo}
                      highlight={highlight}
                      onChange={(boundingRect) => {
                        this.updateHighlight(
                          highlight.id,
                          { boundingRect: viewportToScaled(boundingRect) },
                          { image: screenshot(boundingRect) }
                        );
                      }}
                    />
                  );

                  return (
                    <Popup
                      popupContent={<HighlightPopup {...highlight} />}
                      onMouseOver={(popupContent) =>
                        setTip(highlight, (highlight) => popupContent)
                      }
                      onMouseOut={hideTip}
                      key={index}
                      children={component}
                    />
                  );
                }}
                highlights={highlights}
              />
            )}
          </PdfLoader>
          {/* <Sidebar
            highlights={highlights}
            resetHighlights={this.resetHighlights}
            toggleDocument={this.toggleDocument}
            docName={this.state.docName}
            user={this.state.user}
          /> */}
        </div>
      </div>
    );
  }
}

export default App;

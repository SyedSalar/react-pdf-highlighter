import React, { Component } from "react";
import axios from 'axios';
import {
    PdfLoader,
    PdfHighlighter
} from "./react-pdf-highlighter";
import { Spinner } from "./Spinner";
import { State } from "./App";

export class App extends Component<{}, State> {
    state: State = {
        url: "",
        highlights: [],
    };

    async componentDidMount() {
        const searchParams = new URLSearchParams(window.location.search);
        const urlParam = searchParams.get("url");
        const docName = searchParams.get("docName");

        if (urlParam && docName) {
            try {
                const response = await axios.get(`http://127.0.0.1:8083/api/documents/comments?docName=${docName}`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                console.log("Highlights fetched from backend:", response.data);

                this.setState({
                    url: urlParam,
                    highlights: response.data,
                });
            } catch (error) {
                console.error("Error loading highlights:", error);
            }
        } else {
            console.error("Missing parameters: url or docName");
        }
    }

    render() {
        const { url, highlights } = this.state;

        return (
            <div className="App" style={{ display: "flex", height: "100vh" }}>
                {/* //         <Sidebar
         //           highlights={highlights}
         //           resetHighlights={this.resetHighlights}
         //           toggleDocument={this.toggleDocument}
         //         /> */}
                <div style={{ height: "100vh", width: "75vw", position: "relative" }}>
                    <PdfLoader url={url} beforeLoad={<Spinner />}>
                        {(pdfDocument) => (
                            <PdfHighlighter
                                pdfDocument={pdfDocument}
                                enableAreaSelection={(event) => event.altKey}
                                onScrollChange={() => { }}
                                scrollRef={() => { }}
                                onSelectionFinished={() => { }}
                                highlightTransform={() => { }}
                                highlights={highlights} />
                        )}
                    </PdfLoader>
                </div>
            </div>
        );
    }
}
